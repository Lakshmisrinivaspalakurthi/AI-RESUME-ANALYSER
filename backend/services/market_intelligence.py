ROLE_SKILLS = {

    "data analyst": [
        "python",
        "sql",
        "power bi",
        "excel",
        "statistics"
    ],

    "ai engineer": [
        "python",
        "pytorch",
        "tensorflow",
        "llm",
        "rag",
        "docker"
    ],

    "data scientist": [
        "python",
        "machine learning",
        "statistics",
        "sql",
        "deep learning"
    ]
}

def get_market_skills(role):

    role = role.lower()

    return ROLE_SKILLS.get(
        role,
        []
    )
