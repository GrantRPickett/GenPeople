import random
import sys
import numpy as np
from random import choice
from random import sample
from numpy import genfromtxt
from numpy.random import random_sample
class Name():
    def __init__(self, name_dict):
        # find a better way to fix weighted values
        self.first_name = random.choice(name_dict['first']['value'])
        self.last_name = random.choice(name_dict['last']['value'])
        
    def weighted_values(self, values, probabilities, size):
        bins = np.add.accumulate(probabilities)
        return values[np.digitize(random_sample(size), bins)]
    
    def get_name(self):
        return self.first_name + self.last_name