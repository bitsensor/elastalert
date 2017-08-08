from elastalert.enhancements import BaseEnhancement
from util import convert_array_to_object
from util import parse_detections

# For easier access to nested values in an array , this merges all items in  array
# within  
class AlertTextEnhancement(BaseEnhancement):
    # The enhancement is run against every match
    # The match is passed to the process function where it can be modified in any way
    # ElastAlert will do this for each enhancement linked to a rule
    def process(self, match):
        parsed_match = parse_detections(match)
        match.update(parsed_match)