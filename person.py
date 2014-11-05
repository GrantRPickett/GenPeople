from universe import Universe
from location import Location
from traits import Traits
from events import Events
from name import Name
import sys


class Person():
    def __init__(self, universe_choice):


        self.universe = Universe(universe_choice)
        self.location = Location(self.universe.get_locations_dict())
        self.name = Name(self.universe.get_names_dict())
        self.traits = Traits(self.universe.get_traits_dict(), self.location.get_location())
        self.events = Events(self.universe.get_events_dict(), self.traits.get_traits_dict())
        self.openness = 5
        self.culture = 5
        self.wealth = 5
    
def main():

    person = Person("Westeros")
    print "Name: " + person.name.get_name()
    print "Location: " + person.location.get_location()
    traits_dict = person.traits.get_traits_dict()
    trait_arr = traits_dict
    #for trait in trait_arr
    print "Physical Trait: "
    print trait_arr
    trait_arr = traits_dict["psychological"]
    #for trait in trait_arr
    print "Psychological Trait: "
    print trait_arr
    trait_arr = traits_dict["social"]
    print "Social Trait: "
    print trait_arr
    events_arr = person.events.get_events()
    print "Events: "
    print events_arr
    trait_arr = person.events.get_new_traits()
    print "Event Traits:"
    print trait_arr
        
    
if __name__ == "__main__":
    main()
