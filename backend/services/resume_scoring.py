def job_readiness(
    ats,
    quality,
    projects
):

    score = (
        ats * 0.5
        +
        quality * 0.3
        +
        projects * 0.2
    )

    return round(
        score,
        2
    )
