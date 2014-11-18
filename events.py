import random
import sys
import numpy as np
from random import choice
from random import sample
from numpy import genfromtxt
from numpy.random import random_sample

class Events():
    def __init__(self, events_list, traits_list):
        event = {}
        self.events = []
        self.new_traits = []
        self.running_traits = traits_list
        self.profession = {}
        if random.random() < .6:
            self.events.append(self.generate_event(events_list["childwork"], "childhood", "neutral", "childwork"))
        if random.random() < .6:
            self.events.append(self.generate_event(events_list["childtrauma"], "childhood", "bad", "trauma"))
        self.profession = self.generate_event(events_list["profession"], "adult", "neutral", "profession")
        self.events.append(self.profession)
        if random.random() < .9:
            self.events.append(self.generate_event(events_list["marriage"], "adult", "good", "marriage"))
        if random.random() < .4:
            self.events.append(self.generate_event(events_list["youngadulttrauma"], "adult", "bad", "trauma"))
        if random.random() < .4:
            self.events.append(self.generate_event(events_list["middleagechange"], "midage", "neutral", "change"))
        if random.random() < .4:
            self.events.append(self.generate_event(events_list["middleagetrauma"], "midage", "bad", "trauma"))
        if random.random() < .4:
            self.events.append(self.generate_event(events_list["oldagechange"], "oldage", "neutral", "change"))
        if random.random() < .4:
            self.events.append(self.generate_event(events_list["oldagetrauma"], "oldage", "bad", "trauma"))
        
    def weighted_values(self, values, probabilities, size):
        bins = np.add.accumulate(probabilities)
        return values[np.digitize(random_sample(size), bins)]
        
    def generate_event(self, event_dict, era, type, cat):
        event = {}
        event["era"] = era
        event["type"] = type
        event["cat"] = cat
        values = event_dict["value"]
        probabilities = event_dict["probability"]
        
        #print event_dict["value"]
        #print event_dict["influences"]
        #print values
        
        #print probabilities
        for key in self.running_traits.keys():
            for trait in self.running_traits[key]:
                # i is now the index of the probability to be changed
                for i in range (0, len(event_dict["value"])):
                    
                    multcount = event_dict["influences"]['traits'][i].count(trait["value"])
                    #print event_dict["influences"]['traits'][i].count(trait)
                    #print trait
                    if multcount > 0:
                        # the index of the multiplier (if it exists)
                        multdex = event_dict["influences"]["traits"][i].index(trait["value"])
                        # the probability is changed
                        probabilities[i] *= event_dict["influences"]['mults'][i][multdex]                 

                        #print trait
                        #print event_dict["influences"]['mults'][i][multdex]
        
        probabilities /= probabilities.sum() 
        print probabilities
        #print probabilities         
        event["value"] = self.weighted_values(values, probabilities, 1)[0]
        # this is where the feedback to the traits list would go
        eventdex = np.nonzero(values == event["value"])[0]
        print eventdex
        effect_dict = event_dict["effects"]
        result_traits = []
        new_trait = {}
        event["description"] = event_dict["description"][eventdex]
        for j in range(0, len(effect_dict["traits"][eventdex])):
            if random.random() < effect_dict["chance"][eventdex][j]:
                new_trait["value"] = effect_dict["traits"][eventdex][j]
                result_traits.append(new_trait)
                self.new_traits.append(new_trait)
                self.running_traits["new"] = self.new_traits
                new_trait = {}
        event["results"] = result_traits
        return event
    
    def get_events(self):
        return self.events
    
    def get_new_traits(self):
        return [trait["value"] for trait in self.new_traits]
    
    def get_profession(self):
        return self.profession
        
