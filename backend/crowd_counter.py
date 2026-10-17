def get_crowd_level(count):
    if count <= 500:
        return "LOW"
    elif count <= 1000:
        return "MEDIUM"
    else:
        return "HIGH"


def get_crowd_data(count):
    return {
        "current_count": count,
        "crowd_level": get_crowd_level(count)
    }