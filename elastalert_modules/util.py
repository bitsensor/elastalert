from itertools import chain

def convert_array_to_object(array):
    json = {}
    for idx in range(len(array)):
        json[str(idx)] = array[idx]
    return json

def parse_array(match, key) :
    o = match[key] if key in match else {}
    parsed = {key+'_parsed': {}}

    if not isinstance(o, list):
        return parsed
    if len(o) == 0:
        return parsed
 
    # Converts array terms into objects 
    # parsed[key + '_parsed'] = convert_array_to_object(o) 

    for sk, value in o[0].iteritems(): 
        value_array = [] 
        if isinstance(value, list):
            value_array = list(chain.from_iterable(sv for sv in (v[sk] for v in o) if sv))
        else:
            value_array = [v[sk] for v in o] 
        unique_values = set(value_array)
        parsed[key + '_parsed'][sk] = ", ".join(str(va) for va in unique_values)
 
    return parsed