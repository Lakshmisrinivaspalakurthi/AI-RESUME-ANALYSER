from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import PyPDF2
import json

app = FastAPI()

# 1. CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Configure Gemini AI
GOOGLE_API_KEY = os.getenv("API KEY") # <--- PASTE YOUR KEY HERE
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel('gemini-2.5-flash')

def extract_text_from_pdf(file_obj):
    reader = PyPDF2.PdfReader(file_obj)
    text = ""
    for page in reader.pages:
        extracted = page.extract_text()
        if extracted:
            text += extracted + "\n"
    return text

@app.post("/api/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    jobDescription: str = Form(...)
):
    try:
        resume_text = extract_text_from_pdf(resume.file)
        
        # 3. Create the Prompt
        prompt = f"""
        You are an expert ATS (Applicant Tracking System) and senior tech recruiter.
        Review the following Resume against the provided Job Description.
        
        Job Description:
        {jobDescription}
        
        Resume Text:
        {resume_text}
        
        Analyze the match and provide the output strictly as a JSON object with the following exact keys:
        "atsScore" (number 0-100),
        "skillMatch" (number 0-100),
        "missingSkills" (array of strings),
        "aiRecommendations" (array of strings)
        """

        print("Sending to Gemini...")
        
        # 4. Call Gemini and FORCE pure JSON output
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        
        # 5. Parse the guaranteed JSON response
        analysis_results = json.loads(response.text)

        print("Successfully analyzed!")
        return analysis_results
        
    except Exception as e:
        print(f"Error during analysis: {e}")
        # 6. Throw a real HTTP error so the frontend catches it properly
        raise HTTPException(status_code=500, detail=str(e))
