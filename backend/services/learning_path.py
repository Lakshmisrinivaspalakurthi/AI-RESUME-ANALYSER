def generate_path(
    missing
):

    roadmap = []

    for skill in missing:

        roadmap.append({

            "skill": skill,

            "action":
                f"Learn {skill}",

            "project":
                f"Build project using {skill}"
        })

    return roadmap
