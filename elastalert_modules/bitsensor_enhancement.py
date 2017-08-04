from elastalert.enhancements import BaseEnhancement
from util import convert_array_to_object


class AlertTextEnhancement(BaseEnhancement):
    # The enhancement is run against every match
    # The match is passed to the process function where it can be modified in any way
    # ElastAlert will do this for each enhancement linked to a rule
    def process(self, match):
        match['detections_string'] = ''
        if 'detections' in match:
            match['detections_parsed'] = convert_array_to_object(match['detections'])
