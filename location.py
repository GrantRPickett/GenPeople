import random
import sys
import numpy as np
from numpy import genfromtxt
from numpy.random import random_sample

class Location():
    def __init__(self, location_dict):
        #self.location = random.choice(location_dict["value"])
        #print location_dict["probability"]
        locs = np.array(location_dict["probability"])
        self.location = self.weighted_values(location_dict['value'], locs, 1)[0]
        
        
    def weighted_values(self, values, probabilities, size):
        bins = np.add.accumulate(probabilities)
        return values[np.digitize(random_sample(size), bins)]
    
    def get_location(self):
        return self.location