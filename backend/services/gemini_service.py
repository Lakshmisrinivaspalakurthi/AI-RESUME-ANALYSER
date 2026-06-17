import google.generativeai as genai

genai.configure(
    api_key="YOUR_GEMINI_KEY"
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def get_ai_feedback(
    resume_text,
    job_description
):

    prompt = f"""
    Analyze this resume:

    {resume_text}

    Job Description:

    {job_description}

    Give:

    1. ATS improvement suggestions
    2. Missing skills
    3. Resume improvements
    4. Project suggestions
    """

    response = model.generate_content(
        prompt
    )

    return response.text
