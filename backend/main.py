from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import PyPDF2
import json
import os

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
        # For production, replace with:
        # "https://your-vercel-app.vercel.app"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gemini Configuration
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise Exception("GOOGLE_API_KEY environment variable not found")

genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def extract_text_from_pdf(file_obj):
    reader = PyPDF2.PdfReader(file_obj)
    text = ""

    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"

    return text


@app.get("/")
def home():
    return {"status": "Backend Running"}


@app.post("/api/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    jobDescription: str = Form(...)
):
    try:
        # Extract Resume Text
        resume_text = extract_text_from_pdf(resume.file)

        if not resume_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from PDF"
            )

        prompt = f"""
You are an expert ATS (Applicant Tracking System) and Senior Recruiter.

Analyze the resume against the job description.

JOB DESCRIPTION:
{jobDescription}

RESUME:
{resume_text}

Return ONLY valid JSON in this format:

{{
  "atsScore": 85,
  "skillMatch": 80,
  "missingSkills": [
    "Docker",
    "AWS"
  ],
  "aiRecommendations": [
    "Add cloud experience",
    "Highlight AI projects"
  ]
}}
"""

        response = model.generate_content(
            prompt,
            generation_config={
                "response_mime_type": "application/json"
            }
        )

        result = json.loads(response.text)

        return result

    except Exception as e:
        print("ERROR:", str(e))
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
