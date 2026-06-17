from services.skills import extract_skills

def calculate_ats(
    resume_text,
    job_description
):

    resume_skills = set(
        extract_skills(
            resume_text
        )
    )

    jd_skills = set(
        extract_skills(
            job_description
        )
    )

    matched = list(
        resume_skills &
        jd_skills
    )

    missing = list(
        jd_skills -
        resume_skills
    )

    if len(jd_skills) == 0:

        ats = 0

    else:

        ats = (
            len(matched)
            /
            len(jd_skills)
        ) * 100

    return {
        "ats_score":
            round(
                ats,
                2
            ),
        "matched":
            matched,
        "missing":
            missing
    }
