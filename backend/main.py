from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File
from fastapi import Form

import tempfile

from services.parser import (
    extract_text
)

from services.ats_engine import (
    calculate_ats
)

from services.roadmap import (
    generate_roadmap
)

app = FastAPI(
    title="AI Resume Analyzer API"
)

@app.post("/analyze")
async def analyze_resume(

    resume: UploadFile = File(...),

    job_description: str = Form(...)
):

    with tempfile.NamedTemporaryFile(
        delete=False
    ) as tmp:

        content = await resume.read()

        tmp.write(content)

        resume_text = extract_text(
            tmp.name
        )

    result = calculate_ats(
        resume_text,
        job_description
    )

    roadmap = generate_roadmap(
        result["missing"]
    )

    return {

        "ats_score":
            result["ats_score"],

        "matched_skills":
            result["matched"],

        "missing_skills":
            result["missing"],

        "roadmap":
            roadmap
    }
