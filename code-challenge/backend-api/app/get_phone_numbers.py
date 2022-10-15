import re


def get_match_numbers(data):
    matched_phones_numbers = []

    for i in range(len(data)):
        matched = re.match(r'^(?:(\+49|0049))\s*-?[0-9]{11}\s*$$', data[i])
        if matched:
            matched_phones_numbers.append(matched.group(0))

    return matched_phones_numbers
