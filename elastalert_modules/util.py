

def convert_array_to_object(array):
    json = {}
    for idx in range(len(array)):
        json[idx] = array[idx]
    return json