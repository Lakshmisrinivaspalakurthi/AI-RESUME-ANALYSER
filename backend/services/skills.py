COMMON_SKILLS = [

    "python",
    "sql",
    "power bi",
    "tableau",
    "excel",
    "machine learning",
    "deep learning",
    "nlp",
    "tensorflow",
    "pytorch",
    "aws",
    "azure",
    "docker",
    "git"
]

def extract_skills(text):

    text = text.lower()

    skills = []

    for skill in COMMON_SKILLS:

        if skill in text:
            skills.append(skill)

    return skills
