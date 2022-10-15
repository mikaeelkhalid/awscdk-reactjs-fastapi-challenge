def cleaning_data(file_data):
    data = " ".join(file_data.replace(
        ' ', '').replace('\n', ' ').split()).split()
    return data
