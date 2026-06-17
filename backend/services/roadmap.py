def generate_roadmap(
    missing_skills
):

    roadmap = []

    for skill in missing_skills:

        roadmap.append(
            f"Learn {skill}"
        )

        roadmap.append(
            f"Build a project using {skill}"
        )

    return roadmap
