import random
import sys
import numpy as np
from numpy import genfromtxt
import csv
from numpy.random import random_sample

class Universe():
    def __init__(self, universe_name):
        self.locations_dict = {}
        self.traits_dict = {}
        self.names_dict = {}
        self.events_dict = {}
        
        location_arr = []
        prob_arr = []
        with open(universe_name + 'Locations.csv', 'rb') as csvfile:
            read = csv.reader(csvfile, delimiter=',', quotechar='|')
            for row in read:
                location_arr.append(row[0])
                prob_arr.append(row[1])
        # Change the prob array from strings to floats
        prob_arr = np.array(prob_arr).astype(np.float)
        prob_arr /= prob_arr.sum()
        self.locations_dict["value"] = np.array(location_arr)
        self.locations_dict["probability"] = prob_arr
    

        # Doing the traits stuff
        # Loading the traits
        trait_types = ['Physical', 'Psychological', 'Professional', 'Social']
        for type in trait_types:
            trait_arr = []
            prob_arr = []
            desc_arr = []
            level_arr = []
            with open(universe_name + '' + type + 'Traits.csv', 'rb') as csvfile:
                read = csv.reader(csvfile, delimiter=',', quotechar='|')
                for row in read:
                    trait_arr.append(row[0])
                    prob_arr.append(row[1])
                    desc_arr.append(row[2])
                    level_arr.append(row[3])
            # Change the prob array from strings to floats
            prob_arr = np.array(prob_arr).astype(np.float)
            prob_arr /= prob_arr.sum()
            self.traits_dict[type.lower()] = {}
            self.traits_dict[type.lower()]["value"] = trait_arr
            self.traits_dict[type.lower()]["probability"] = prob_arr
            self.traits_dict[type.lower()]["description"] = desc_arr
            self.traits_dict[type.lower()]["level"] = level_arr
            self.traits_dict[type.lower()]["type"] = type.lower()
 
        # The name stuff
        fname_arr = []
        lname_arr = []
        with open(universe_name + 'Names.csv', 'rb') as csvfile:
            read = csv.reader(csvfile, delimiter=',', quotechar='|')
            for row in read:
                fname_arr.append(row[0])
                lname_arr.append(row[1])
        # Change the prob array from strings to floats
        self.names_dict["first"] = {}
        self.names_dict["last"] = {}
        self.names_dict["first"]["value"] = np.array(fname_arr)
        self.names_dict["last"]["value"] = np.array(lname_arr)
                
        #name_arr = []
        #prob_arr = []
        #with open(universe_name + 'LastNames.csv', 'rb') as csvfile:
        #    read = csv.reader(csvfile, delimiter=',', quotechar='|')
        #    for row in read:
        #        name_arr.append(row[0])
        #        prob_arr.append(row[1])
        #self.names_dict["last"]["value"] = np.array(name_arr)
        #self.names_dict["last"]["probability"] = np.array(prob_arr))
         
         
        # The event stuff
         
        event_types = ['ChildWork', 'ChildTrauma', 'Profession', 'Marriage', 'YoungAdultTrauma', 'MiddleAgeChange', 'MiddleAgeTrauma', 'OldAgeChange', 'OldAgeTrauma']
        for type in event_types:
            event_arr = []
            prob_arr = []
            desc_arr = []
            influences_dict = {}
            effects_dict = {}
            influences_dict["traits"] = []
            influences_dict["mults"] = []
            
            effects_dict["traits"] = []
            effects_dict["chance"] = []
             
            with open(universe_name + '' + type + 'Events.csv', 'rb') as csvfile:
                read = csv.reader(csvfile, delimiter=',', quotechar='|')
                for row in read:
                     
                    # The event
                    event_arr.append(row[0])
                    # Its probability
                    prob_arr.append(row[1])
                    # Its description
                    desc_arr.append(row[2])
                    # The traits that can affect the chance the event occurs
                    influences_dict["traits"].append(row[3].split(' '))
                    influences_dict["mults"].append(np.array(row[4].split(' ')).astype(np.float))
                    # The potential traits that can be a result of the event
                    effects_dict["traits"].append(row[5].split(' '))
                    effects_dict["chance"].append(np.array(row[6].split(' ')).astype(np.float))
            # Change the prob array from strings to floats
            prob_arr = np.array(prob_arr).astype(np.float)
            prob_arr /= prob_arr.sum()       
            self.events_dict[type.lower()] = {}
            self.events_dict[type.lower()]["value"] = np.array(event_arr)
            self.events_dict[type.lower()]["probability"] = prob_arr
            self.events_dict[type.lower()]["description"] = np.array(desc_arr)
            self.events_dict[type.lower()]["influences"] = influences_dict
            self.events_dict[type.lower()]["effects"] = effects_dict


    def weighted_values(self, values, probabilities, size):
        bins = np.add.accumulate(probabilities)
        return values[np.digitize(random_sample(size), bins)]
    
    def get_locations_dict(self):
        return self.locations_dict

    def get_traits_dict(self):
        return self.traits_dict

    def get_names_dict(self):
        return self.names_dict

    def get_events_dict(self):
        return self.events_dict
