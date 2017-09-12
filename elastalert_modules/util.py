from itertools import chain

def convert_array_to_object(array):
    json = {}
    for idx in range(len(array)):
        json[str(idx)] = array[idx]
    return json

def parse_detections(match):
    key = 'detections'
    parsed = {key+'_parsed': {}}

    if not isinstance(match[key], list):
        return parsed
    if len(match[key]) == 0:
        return parsed
 
    # Converts array terms into objects 
    # parsed[key + '_parsed'] = convert_array_to_object(match[key]) 

    for sk, value in match[key][0].iteritems(): 
        value_array = [] 
        if isinstance(value, list):
            value_array = list(chain.from_iterable(sv for sv in (v[sk] for v in match[key]) if sv))
        else:
            value_array = [v[sk] for v in match[key]] 
        unique_values = set(value_array)
        parsed[key + '_parsed'][sk] = ", ".join(str(va) for va in unique_values)
 
    return parsed