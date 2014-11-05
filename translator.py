import os
from person import Person
from name import Name
import random
from random import choice

def main():
    person = Person(os.path.dirname(os.path.realpath(__file__)) + "/Westeros")
    descs = {}
    phys = {}
    psych = {}
    age = str(random.randint(4325, 4401))
    tlist = person.traits.get_traits_list()
    traits_dict = person.traits.get_traits_dict()
    elist = person.events.get_events()
    for level in ['0', '1', '2', '3']:
        descs[level] = [trait["description"] for trait in tlist if trait["level"] == level]
        phys[level] = [trait["value"] for trait in tlist if trait["level"] == level if trait["type"] == "physical"]
        psych[level] = [trait["value"] for trait in tlist if trait["level"] == level if trait["type"] == "psychological"]
#     for level in descs:
#         for desc in descs[level]:
#             print desc
#             tokens = nltk.word_tokenize(desc)
#             print tokens
#             tagged = nltk.pos_tag(tokens)
#             print tagged
#             for a in tagged:
#                 print a
#             
#                 syns = wordnet.synsets(a[0])
#                 print "synsets:", syns
#                 
#                 for i in [l.name for s in syns for l in s.lemmas]:
#                     print i

    #print phys
    #print psych
    
    #print elist
    
    name = person.name.get_name()
    
    lord = Name(person.universe.get_names_dict()).get_name()
    
    inform = "GenPerson by Grant Pickett begins here."
    inform += "\n"
    inform += "Include Conversation Framework by Eric Eve."
    inform += name + " is a person.\n"
    synonyms = 'Understand "childhood" or "your childhood" or "his childhood" as "[childhood]".\n'
    synonyms += 'Understand "home" or "your home" or "his home" as "[region]".\n'
    synonyms += 'Understand "adulthood" or "your adulthood" or "his adulthood" as "[adulthood]".\n'

    l1descs = ". ".join(descs['1'])
    l1descs += "."
    extra_items = "Clothing is a kind of thing.  Clothing is wearable.\n"
    social_class = traits_dict["social"][0]["value"]
    profession = person.events.get_profession()["value"]
    # clothing
    if (social_class == "commoner"):
        if (profession == "Merchant"):
            l1descs += " They appear to be wearing very expensive, almost gaudy, clothing of many colors. In addition they have a lot of gold jewelry."
            extra_items += 'A shirt is clothing. The description is "This shirt is very gaudy and expensive looking." ' + name + " is wearing a shirt."
        else:
            if (profession == "Guardsman"):
                l1descs += " This person appears must be a soldier of some variety.  They wear a plain leather jacket over some padded cloth and have a spear in their left hand.  On their head they have"
                l1descs += " a plain leather helm."
                extra_items += 'A spear is a thing. The description is "A long shafted spear with a very sharp point.  A very basic instrument of war." ' + name + " is holding a spear.\n"
                extra_items += 'A jacket is clothing. The description is "A basic piece of armor made of leather and padded cloth." ' + name + " is wearing a jacket.\n"
            else:
                l1descs += " They appear to be wearing very plain clothing.  A brown cloth or burlap tunic, a pair of worn grey pantaloons, and a faded red felt cap."     
                extra_items += 'A tunic is clothing. The description is "A basic piece of clothing normally made from cloth or burlap." ' + name + " is wearing a tunic.\n"
                extra_items += 'A cap is clothing. The description is "A basic piece of headware made from felt and dyed a plain color." ' + name + " is wearing a cap.\n" 
    else:
        if (profession == "Knight"):
            l1descs += " This person is completely covered in knightly regalia.  Under the tabbard displaying their coat of arms, they are wearing a fine hauberk of chainmail.  At their side"
            l1descs += " they have a longsword and across their back a kite shield."
            extra_items += 'A tabbard is clothing. The description is "A part of the equiptment of a knight.  This piece of cloth shows the coat of arms of the knight and is worn over the armor." ' + name + " is wearing a tabbard.\n"
            extra_items += 'A hauberk is clothing. The description is "A hauberk is a type of armor made out of chainmail." ' + name + " is wearing a hauberk.\n"
            extra_items += 'A helm is clothing. The description is "A helm is designed to protect the wearer from blows to the head." ' + name + " is wearing a helm.\n"
            extra_items += 'A longsword is a thing. The description is "A longsword is the pinnacle of one handed midieval weapons technology.  Sharpened to a killing point the idea is to stick the enemy with the pointy end." ' + name + " is holding a longsword.\n"
            extra_items += 'A shield is a thing. The description is "The kite shield is the basic shield of a knight." ' + name + " is holding a shield.\n"
        else:
            l1descs += " This person appears to be very important as represented by their clothing.  Everything they wear is well tailored and finely made.  They have a fine cloak covering their shoulders of"
            l1descs += " silver and blue."
            extra_items += 'A robe is clothing. The description is "This robe is very noble in appearance.  Only a lord should wear such a garment." ' + name + " is wearing a robe."
            extra_items += 'A cloak is clothing. The description is "This cloak is very noble in appearance.  Only a lord should wear such a garment." ' + name + " is wearing a cloak."
    inform += ' The description is "' + l1descs + '"\n '
    
    inform += "Asking " + name + " about something is " + name.split(' ')[0] + "-chatting. \n"
    inform += "Telling " + name + " about something is " + name.split(' ')[0] + "-chatting. \n"
    
    greeting = "After saying hello to " + name +":\n"
    selfquizzing = "After quizzing " + name + " about " + name + ":\n"
    
    #General Topic:  Framing Context, Trait Sentence, Trait Sentence, (Cause Trait Sentence, Event Sentence (or Two), Result Trait (or Two), Special Context Sentence) * N  
    
    #childhood = 'Understand "childhood" or "your childhood" or "his childhood" as "[childhood]".\n'
    
    childhood = "After " + name.split(' ')[0] + '-chatting when the topic understood matches "[childhood]":\n'
    
    childhood += 'Say "'
    
    childhood += build_childhood(traits_dict, elist, person, phys, descs, psych, age, lord)
    childhood += '".'
    
    area = "After " + name.split(' ')[0] + '-chatting when the topic understood matches "[region]":\n'
    
    area += 'Say "'
    area += build_area(traits_dict, elist, person, phys, descs, psych, age, person.events.get_profession()["value"], lord)
    area += '".'
    
    
    adult = "After " + name.split(' ')[0] + '-chatting when the topic understood matches "[adulthood]":\n'
    
    adult += 'Say "'
    adult += build_adulthood(traits_dict, elist, person, phys, descs, psych, age)
    adult += '".'
    

            
                
    
    #if person.culture < 0:
    #    greeting += 'say "' + "'Hello there!' you say.[paragraph break]" + name + " simply says '" + name + "!' enthusiastically, a large grin on their face, looks at you for a moment, and turns back to work." + '"\n'
    #    selfquizzing += 'say "How are you, '+ name +'? you ask.[paragraph break]' + name + '? they say, staring blankly at you with a puzzled look."\n'
    # this is if they are nobility    
    if person.culture >= 0:
        if person.openness > 7:
            greeting += 'say "' + "'Hello there!' you say.[paragraph break]" + name + " says 'Good day to you sir, and isn't it a fine day!' enthusiastically, a large grin on their face." + '"\n'
            selfquizzing += 'say "How are you, '+ name +'? you ask.[paragraph break]' + name + '? they say, staring blankly at you with a puzzled look."\n'
        elif person.openness >= 5:
            greeting += 'say "' + "'Hello there!' you say.[paragraph break]" + name + " says 'Hello, good day to you.' They politely respond. They look slightly annoyed to have been addressed by someone of common birth." + '"\n'
            if person.wealth >= 7:
                selfquizzing += 'say "How are you, '+ name +'? you ask.[paragraph break]' + "'My life is quite comfortable, if you must so inquire.'" + ' they state plainly."\n'
            elif person.wealth >= 5:
                selfquizzing += 'say "How are you, '+ name +'? you ask.[paragraph break]'+ "'I am fine if that is what you are asking, what business is it of yours?'" + ' they say, giving you a slightly puzzled look."\n'             
            else:
                selfquizzing += 'say "How are you, '+ name +'? you ask.[paragraph break]' + name + '? they say, staring blankly at you with a puzzled look."\n'
        else:
            greeting += 'say "' + "'Hello there!' you say.[paragraph break]" + name + " says 'Begone you, I have important business to attend to!' they turn away from you and continue on." + '"\n'
            selfquizzing += 'say "How are you, '+ name +'? you ask.[paragraph break]' + "'I have nothing to speak to you about, why do you presume to speak to me?'" + ' they say, getting frustrated."\n'
            
    #generalized conversation topics
    
    #inform += ""
    #topics = "After " + name + '-chatting when the topic understood matches "[weather]":'
    
    #inform += greeting
    #inform += selfquizzing
    
    farewell = "After saying goodbye to " + name + " when the farewell type is explicit:\n"
    farewell += 'say "' + "'Goodbye' you say.[paragraph break]'Goodbye,' they state plainly and continue on their way." + '"'
    
    inform += synonyms
    inform += "\n"
    inform += greeting
    inform += "\n"
    inform += farewell
    inform += "\n"
    inform += childhood
    
    inform += "\n"
    
    inform += area
    
    inform += "\n"
    
    inform += adult

    inform += "\n"
    inform += extra_items
    inform += "GenPerson ends here."
    print inform
    f = open("GenPerson.i7x","w");
    f.write(inform);
    #print person.events.get_profession()["value"]
    
def build_area(traits_dict, elist, person, phys, descs, psych, age, profession, lord):
    
    # When they were born is the Framing Context of the Childhood Topic
    
    Born = ""
    Region = ""
    Lord = ""
    Family = ""
    SomeTraits = ""
    ChildEvents = ""
    
    family = ""
    
    Born = "I was born in " + age + " to a " + traits_dict["social"][0]["value"] + " family."
    Born += " Both of my parents were " + traits_dict["social"][0]["value"] + "s."
    
    social_class = traits_dict["social"][0]["value"]
    #profession = prof["value"]    
    #childhood += Born
    
    # Where they were born is also part of the framing context
    
    Region = "My family is sworn to Lord " + lord +". "
    
    place = person.location.get_location()
    
    if place == "The Reach":
        if (social_class == "commoner"):
            if (profession == "Merchant"):
                home_desc = "My family, although of common birth, is exceedingly wealthy.  We make a living buying and selling goods in the ports of Oldtown and the Arbor in the Reach.  My father is one of the "
                home_desc += "greatest wine merchants in all of Westeros.  We have a small manor in Oldtown where I grew up that always smelled of cheese and wine"
            else:
                home_desc = "My family comes from the reach, it is a fertile land and we have been farming the same plot for generations.  We grow fruit "
                home_desc += " in abundance we have served our lord's family for many generations.  We have a small home in the northern region along the Roseroad near Bitterbridge."
                home_desc += " Life is pretty plain for us, nothing really out of the ordinary"
        else:
            if (profession == "Knight"):
                home_desc = "My father was a wandering swordsman out of the Westerlands who saved our lord from the Reach while serving as a Man at Arms in the war of the Ninepenny kings.  He was knighted for "
                home_desc += "his actions in the war and was granted a plot of land in the area around Old Oak.  I took up my father's arms when he grew too weary and I have been a Knight in the "
                home_desc += "service ever since"
            else:
                home_desc = "My family has a small holding in the south of the Reach.  We govern over about twenty families of commoners who work the land and half half a dozen sworn swords."
                home_desc += " We have a small motte and bailey to protect the peasants in times of need and a small hall for gatherings.  Our family has been in the area for generations, tracing"
                home_desc += " our lineage all the way back to the bastard son of one of the Kings named Garth, I forget which"
        # if knight

        # if merchant

        
        
    elif place == "The Vale":
        if (social_class == "commoner"):
            if (profession == "Merchant"):
                home_desc = "My family, although of common birth, is one of the richest in the Vale.  We make a living buying and selling goods in the ports of Gulltown, the Sisters, King's Landing, and even White Harbor."
                home_desc +=  " My family trades in every type of good imaginable but we make most of our money selling the fruits of the Vale to the lords of Kings Landing and the barren North"
            else:
                home_desc = "My family hails from the Vale.  We have for generations lived and toiled in the soil at the foot of the great mountains in the vale of Arryn. "
                home_desc += "We grow mostly grains to feed the soldiers that guard the vale and my father takes great pride in his work providing for the men at arms. "
                home_desc += "We have a small house and several acres of land to call our own and it serves us well enough"
        else:
            if (profession == "Knight"):
                home_desc = "My father was a sworn Knight as was his father before him as am I.  We have been in the service of our lord for generations, many of my ancestors have been "
                home_desc += "knights of the Vail over the years. We have a small bit of land worked by a couple families "
                home_desc += "that we watch over in return for our service"
            else:
                home_desc = "My noble family is from the Vale of Aryn.  There we guard some of the coast along the fingers as protection against pirates from the Stepstones.  "
                home_desc += "My family has a small stone keep and several lookout towers that double as lighthouses.  We take our duty to protect the land very carefully as we have for "
                home_desc += "generations since the original grant"
        # if knight

        # if merchant
        
    
    
    elif place == "The Westerlands":
        if (social_class == "commoner"):
            if (profession == "Merchant"):
                home_desc = "My family is heavily involved in buying and selling goods in Lannisport in the Westerlands. My family owns a number of ships that we commission to go back and forth "
                home_desc +=  "between the Westerlands, the Iron Islands, the Reach and the Arbor.  We trade gold from the Westerlands at these places for various goods that are more in demand. "
                home_desc +=  "We bring iron and wood from the North, wine and fruit form the Reach and Arbor, and Fish from the Iron Islands, all back to the city for a tidy profit"
            else:
                home_desc = "My family hails from the Westerlands.  My family has for the past hundred years, worked in the gold mines of the Crag and surrounding areas. "
                home_desc += "We have a small home near the mines that has been our own for generations.  The gold we mine feeds the coffers of our lord and the stipend he "
                home_desc += "provides allows us to feed ourselves"
        else:
            if (profession == "Knight"):
                home_desc = "My father was a sworn Knight as was his father before him as am I.  We have been in the service of our lord for generations. "
                home_desc += ". My family has a manor in Lannisport and a small keep out in the country.  We spend most of our time in the city managing the manor and visiting court"
            else:
                home_desc = "My noble family is from the Westerlands.  We are tasked with protecting a section of the southern coast from pirates and raiders from the Iron Islands.  "
                home_desc += "We have a wooden keep and a series of stone towers and a small curtain wall surrounding.  We take our duty to protect the land very carefully as we have for "
                home_desc += "generations since the original grant"
        # if knight

        # if merchant

        
    elif place == "The North":
        if (social_class == "commoner"):
            if (profession == "Merchant"):
                home_desc = "I come from a family of merchants out of White Harbor in the North.  We deal with many of the raw goods the North provides and ship them south and east in exchange for more of the southern luxuries. "
                home_desc +=  "Our ships sail north to Eastwatch By the Sea on occasion, and once, in the distant past, we even did business with the wildlings of Hardhome. "
                home_desc +=  "We take goods such as lumber and furs south and trade them for other luxury goods to sell to northern lords and merchants"
            else:
                home_desc = "My family hails from the North.  We are descendants of the first men and have struggled to till the icy land for hundreds of years. "
                home_desc += "We are generally poor subsistence farmers and struggle during the summers and autumns to grow enough wheat for the long cold winters. "
                home_desc += "Despite its dangers, I wouldn't have it any other way, we have our own land, and our freedom to do as we choose"
        else:
            if (profession == "Knight"):
                home_desc = "I come from a family of minor lords in the north. We are guaranteed protectors of some of the areas around flintcliff.  I myself became a Knight, adopting the seven "
                home_desc += "and breaking with the tradition of the old gods"
            else:
                home_desc = "My family is of noble birth from the North.  We were members of the Flint clan, of the mountain clans, but have a more settled lifestyle currently.  "
                home_desc += "We have a small hamlet that we watch over from a wooden keep in the vicinity of deepwood motte.  The farmers work the land and pay tribute and we protect "
                home_desc += "them from wildlings and raiders"
        # if knight
        
        # if merchant

        
        
    elif place == "The Riverlands":
        if (social_class == "commoner"):
            if (profession == "Merchant"):
                home_desc = "I come from a large family of merchants that ply the waters of the trident and it's many forks in the riverlands.  Our ships move up and down the river buying and selling goods as they go. "
                home_desc +=  "I was born on one of these boats and my entire family lives on a large flatship. We have no manor of lands to speak of and move from place to place with the currents"
            else:
                home_desc = "We, my family and I, are farmers from the Riverlands.  We recently resettled near the Saltpans after our farm was burnt in a war between the Blakens and Blackwoods. "
                home_desc += "Our new lord has guaranteed us protection from the fighting that is all too common in this land. "
                home_desc += "We have a chance now to thrive and create a home for ourselves in a new area"
        else:
            if (profession == "Knight"):
                home_desc = "My family recently moved to the Riverlands to get out of the bustle and squalor of Kings Landing. My father was a younger brother of a knight sworn to the service of one of the lords "
                home_desc += "of the crownlands and after his marriage, sought to become knighted himself.  After proving himself in battle, our lord knighted him and took him into his service.  I have sworn to "
                home_desc += "follow in my father's footsteps"
            else:
                home_desc = "I am of noble birth and my family comes from the Riverlands along the Green Fork.  We have a keep overlooking a bend in the river and ensure and protect the trade that passes through, "
                home_desc += "in exchange for a small toll of course. Our keep is modest by most standards but it makes do and we have a number of sworn knights who help enforce the king's peace. "
                home_desc += "It is a good quiet life for the most part, generally uneventful"
        
        
    elif place == "Crownlands":
        if (social_class == "commoner"):
            if (profession == "Merchant"):
                home_desc = "I come from a merchant family from King's Landing.  We make our living by owning and operating a fleet of ships that operate out of the Crownlands and sail all across the narrow sea.  We buy goods from "
                home_desc +=  "as far away as Volantis and sell them at markets up and down the east coast of Westeros.  We sell many of the goods that we buy in the markets of Kings landing to other traders who move them inland"
            else:
                home_desc = "My family hails from the Kingslanding in the Crownlands.  My father was a butcher and my mother his assistant.  We never had much growing up, nor any land to call our own, but it was a fair living."
                home_desc += "We live in a small shack in the shadow of Visenya's hill and give thanks that we are not stuck in fleabottom.  My family mostly serves the various lords and merchants who ply their trade at the capital"
        else:
            if (profession == "Knight"):
                home_desc = "My family is from the Crownlands and my father and I have served as Knights to our lord inside of King's Landing. My father was a younger brother of a knight sworn to the service of one of the lords "
                home_desc += "of the crownlands and after his marriage, sought to become knighted himself.  After proving himself in battle, our lord knighted him and took him into his service.  I have sworn to "
                home_desc += "follow in my father's footsteps"
            else:
                home_desc = "My noble family hails from the Crownlands.  We have lands surrounding duskendale that are worked to provide for food for king's landing.  We have a nice stone keep and a small town surrounding it. "
                home_desc += "We have a number of sworn knight families to help us govern the area. "
                home_desc += "It is a good quiet life for the most part, generally uneventful"
        
        
    elif place == "Iron Islands":
        if (social_class == "commoner"):
            if (profession == "Merchant"):
                home_desc = "I come from a merchant family from Pyke.  Being merchants, we aren't considered much better than farmers, being that we don't pay the iron price, but at least we sail so we have that going for us. "
                home_desc +=  "We deal largely in fish and the loot that the reavers bring home after their adventures across the seas. We sail far to the south to ply our trade often, the markets in the Islands and the North are not "
                home_desc += "as large on this side of the continent as those on the narrow sea"
            else:
                home_desc = "I come from a long line of fisherman and sailors from the Iron Islands.  My father was wounded in a finger dance when young and decided to settle down to farm the land.  We live on the isle of Pyke and "
                home_desc += "provide food to the ships that put in at the port. It is a hard living, the land is not good and farmers are considered the lowliest of the classes in the Islands but we make do"
        # if lord
        else:
            if (profession == "Knight"):
                home_desc = "I come from a family of nobles from the Iron Islands. I wanted to escape the life of raiding so I snuck aboard a ship when I was young and became a squire in the service of a Reach Lord. "
                home_desc += "After I was knighted, my guilt about leaving my family compelled me to return home. I swore my sword to my lord and have been in his service ever since"
            else:
                home_desc = "My family is of noble birth and descended from the ancient reavers of Harlaw in the Iron Islands.  We have fallen on hard times however, and our fleet is not nearly as large as it once was. "
                home_desc += "We have fewer than ten ships and hardly the crew to command them.  Our keep is in dis-repair and all-together far too large for what is left of the garrison. "
                home_desc += "We still have our name however, and our lands, however poor they may be"
        
        
    elif place == "North of The Wall":
        home_desc = "North of the Wall, there are no social classes.  Unlike the kneelers, we are free to do whatever we want when we want. We freefolk seek out the land that we choose. "
        home_desc += "My father was a trapper from a village by the bay of seals and my mother a raider venturing into the north to bring back such food and goods as we needed to get by in this hard land"
        
    
    elif place == "Dorne":
        if (social_class == "commoner"):
            if (profession == "Merchant"):
                home_desc = "My merchant family trades many goods between Dorne and the lands to the east and south. We have a large manor in Sunspear where we coordinate our trade voyages.  We send ships south to the Summer Isles trading the wine of the Arbor "
                home_desc +=  "and Dorne for various exotic goods that we then trade in Kings Landing or Oldtown. In the east we sell the goods of Westeros and collect various spices and dyes to sell to rich lords. It is a rather comfortable lifestyle, "
                home_desc += "if a bit hot in the summer"      
            else:  
                home_desc = "I come from a long line of fisherman and sailors from the river Greenblood in Dorne.  My father was a soldier in the service of our current lord, and as a result of his valor in the "
                home_desc += "stepstones was granted a piece of land to farm from our lord's holdings.  The land is not great but we make do, we have a small house and some livestock that allow us to be self sufficent. "
                home_desc += "It is a quiet life but I wouldn't have it any other way and the ground does have a certainty to it that the river lacked"
        else:
            if(profession == "Knight"):
                home_desc = "I come from a family of nobles from Dorne. My father was the youngest in a large house so set out as a sellsword hedge knight to make his fortune.  After a number of years on the road he came to the attention of our "
                home_desc += "current lord. My family has been in his service ever since, and I, like my father, will be a knight in his household"
            else:
                home_desc = "My family can trace it's lineage back to that of the Rhoynar who first came over in their ships to settle in Dorne so many years ago. We have, for generations, had a keep overlooking the sea of Dorne to "
                home_desc += "the north.  The land surrounding our keep is fertile enough for fruit and walnuts and that is what is grown there.  We trade with the stormlands for the grain we need for the offseason and have about a dozen knights "
                home_desc += "in our service"
        
        
    elif place == "The Stormlands":
        if (social_class == "commoner"):
            if (profession == "Merchant"):
                home_desc = "My merchant family trades many goods between the Stormlands and the lands to the east and south. We have a large manor near Griffen's Roost where we coordinate our trade voyages.  We send ships south to the Summer Isles trading the wine of the Arbor "
                home_desc +=  "and Dorne for various exotic goods that we then trade in Kings Landing or Oldtown. In the east we sell the goods of Westeros and collect various spices and dyes to sell to rich lords. It is a rather comfortable lifestyle, if I don't say so myself"
                home_desc += ""
            else:
                home_desc = "My family has worked and farmed the land around Stonehelm in the Stormlands for generations.  My father was a seargant in the army of the stormlord many years ago. We have a decently fertile plot of land that provides all that we "
                home_desc += "need to survive. "
                home_desc += "It is a quiet life but I wouldn't have it any other way"
        else:
            if (profession == "Knight"):
                home_desc = "I hail from a knightly family in the Stormlands. My father was the youngest in a large house so set out as a sellsword hedge knight to make his fortune.  After a number of years on the road he came to the attention of our "
                home_desc += "current lord. My family has been in his service ever since, and I, like my father, will be a knight in his household"              
            else:
                home_desc = "My noble family is one of many from the Stormlands tasked with the mission of protecting the marches from forign aggressors. The Dornish marches are constantly fought over between the Stormlands the Reach and Dorne so we must "
                home_desc += "be ever vigiliant for forigners, potential spies, and invaders. Our castle has a decent garrison and we have a number of knights sworn to our service"
        

    Region += home_desc
    r = Region.split(".")
    Region = "[one of]" + ".[or]".join(r) + ".[cycling]"
    return Region

def build_adulthood(traits_dict, elist, person, phys, descs, psych, age):
    
    adult = ""
    
    intro = ""
    profession = ""
    marriage = ""
    trauma = ""
    moving = ""          
    MoreTraits = ""
    
    intro = random.choice(["As I grew older, my life changed quite a bit.",
                           "I found myself growing older, turning into a young man.",
                           "I was growing up, I suppose, I had my adult life to look forward to.",
                           "As I grew up, I took on more responsibility and prepared to enter the world.",
                           "I suppose at some point I grew up, though I couldn't really tell you when."])
    
    
    
    
    adult_events = [event for event in elist if event["era"] == "adult"]
    for event in adult_events:
        # the trauma event generator
        if event["cat"] == "trauma":
            etext = ""
            etext += get_event_text_2("an adult", event["type"])
            etext += event["description"][0]
            if (len(event["results"]) > 0):
                for result in event["results"]:
                    etext += get_result_text(result)
            else:
                if (event["type"] == "bad"):
                    etext += " However, luckily"
                etext += random.choice([" It had little impact on my life.",
                                        " It didn't really have a lasting effect.",
                                        " I wasn't changed much by the incident in the long term.",
                                        " My life went on much the same afterwards.",
                                        " I found that life wasn't very different afterwards."])
            trauma += etext
            
        if event["cat"] == "profession":
            etext = ""
            etext += get_event_text_2("an adult", event["type"])
            etext += event["description"][0]
            etext += " I have been a " + event["results"][0]["value"] + " ever since, for better or worse."
            profession += etext
            
        if event["cat"] == "marriage":
            etext = ""
            etext += get_event_text("an adult", event["type"])
            etext += event["description"][0]
            # switch for different types of marriage
            if event["value"] == "GoodMarriage":
                etext += random.choice([" My wife is my greatest companion, truely she is a treasure.",
                                        " I am very happy with my wife.  We work very well together.",
                                        " I am incredibly happy with my marriage."])
            elif event["value"] == "BadMarriage":
                etext += random.choice([" My marriage has been rather turbulent, but we can't separate.",
                                        " I'm not happy, but there is nothing I can do.",
                                        " If I was allowed to escape my marriage, I would."])
            elif event["value"] == "NeutralMarriage":
                etext += random.choice([" I have a very typical marriage.  My wife and I are good companions.",
                                        " My wife and I have worked very hard to raise our children and have come to respect each other.",
                                        " My family is very typical and makes life generally comfortable."])
            elif event["value"] == "EarlyMarriage":
                 etext += random.choice([" Marrying early worked out for me, my wife and I are good companions.",
                                        " Despite getting married early in my life, it seems to have worked out well.",
                                        " My early marriage worked out for me."])
            elif event["value"] == "ForcedMarriage":
                etext += random.choice([" My forced marriage worked out for me fortuneatly.",
                                        " Despite my best intent, our marriage has not been ideal.",
                                        " It seems to be working out."])
            elif event["value"] == "LateMarriage":
                etext += random.choice([" Getting married late has not allowed us to have many children.",
                                        " Sometimes I regret waiting so long.",
                                        " Waiting may not have been the best idea."])
            
            if (len(event["results"]) > 0):
                for result in event["results"]:
                    etext += get_result_text(result)
            else:
                if (event["type"] == "bad"):
                    etext += " However, luckily"
                etext += random.choice([" It had little impact on my life.",
                                        " It didn't really have a lasting effect.",
                                        " I wasn't changed much by the incident in the long term.",
                                        " My life went on much the same afterwards.",
                                        " I found that life wasn't very different afterwards."])
            marriage += etext
    
    if marriage == "":
        marriage += random.choice(["Sometimes I regret not getting married, not often, but sometimes.",
                                   "I sincerely regret the decesion to not get married, now it is too late.",
                                   "I never had a reason to get married, it always seemed more hastle than it was worth."])
        
    if (random.random() < .4):
        moving += "[or]"
        moving += random.choice(["I moved occasionally as a young adult, trying to find a new place to live.",
                                 "I was displaced as a young adult, the home of my youth was destroyed in a war so I needed to find a new place to live.",
                                 "I moved as a young adult.  Mostly I sought to find a new life for myself away from my parents.",
                                 "I moved as a young adult.  I sought my fortune in other lands and places."])
    
    
    
    for i in range(0, random.randint(1, 2)):
        if (random.random() > .5):
            if len(psych["2"]) > 0:
                MoreTraits += "[or]"
                MoreTraits += psych_adult_trait(random.choice(psych["2"]), 2)
        else:  
            if len(psych["1"]) > 0:
                MoreTraits += "[or]"
                MoreTraits += psych_adult_trait(random.choice(psych["1"]), 1)
    #print SomeTraits
    
    

        
    adult += "[one of]"
    adult += intro + "[or]"
    if (profession != ""):
        adult += profession + "[or]"
    adult += marriage + "[or]"
    if (trauma != ""):
        adult += trauma
    adult += moving
    adult += MoreTraits + "[cycling]"
    
    return adult 



def build_childhood(traits_dict, elist, person, phys, descs, psych, age, lord):
    
    # When they were born is the Framing Context of the Childhood Topic
    
    Born = ""
    Region = ""
    Lord = ""
    Family = ""
    SomeTraits = ""
    ChildEvents = ""
    
    childhood = ""
    
    Born = "I was born in " + age + " to a " + traits_dict["social"][0]["value"] + " family."
    if (random.random() < .45) and (len(phys["1"]) > 0):
        Born += " When I was born it was noticed that I was remarkably " + random.choice(phys["1"]) + ""
        if (random.random() < .7):
            Born += " for my age"
        Born += ".\n"
        
    #childhood += Born
    
    # Where they were born is also part of the framing context
    
    Region = "I hail from " + person.location.get_location() + " where my family is sworn to Lord " + lord +"."
    #print Region
    
    
    # An interaction with a lord is an example of a special context sentence
    
    Lord = ""
    if (random.random() < .2):
        if (random.random() < .50):
            if (len(psych["1"]) > 0):
                Lord = "Our lord was " + random.choice(["very benevolent", "relatively uncaring", "not present often", "a just and honorable man"]) 
                Lord += " and his actions inspired me to become " + random.choice(psych["1"]) + ".\n"
        # Bad lord
        else:
            if (len(psych["2"]) > 0):
                Lord = "Our lord was " + random.choice(["horrible", "malicious", "relatively uncaring", "not present often", "cruel"]) + " and his mistreatment made me "
                Lord += random.choice(psych["2"]) + ".\n"
            
        #print Lord
    
    # Family interaction still within the parameters of a framing context
    Family = ""
    if (len(psych["2"]) > 0):
        Family += "My father was a "+ traits_dict["social"][0]["value"] + " like myself and " + random.choice(["didn't have much time for his children", "was abusive", "died in a war"])
        if (random.random() < .4):
            Family +=  ". In addition my mother "+ random.choice(["died in childbirth", "loved my father very much", "was very important to me", "tried to hold the family together to no avail"]) + " and as a result I became "
            Family += random.choice(psych["2"])
        Family += ".\n"
    #print Family
    
    if (len(person.events.get_new_traits()) > 0):
        # Youth Childhood Event
        Youth = ""
        Youth += "Because of my being " + random.choice(phys["1"]) + " and " + random.choice(phys["1"]) + " I became a " + random.choice(person.events.get_new_traits()) + ". "
        
        Youth += random.choice(["It turned out to be a much better fit than I imagined at the time.",
                                "My family really pushed me into it.",
                                "I had no choice in the matter, it was what was expected of me and I did as best I could.",
                                "I always thought that I should have done that."])
        
        #print Youth
    
    SomeTraits = ""
    
    for i in range(0, random.randint(2, 3)):
        if (random.random() > .5):
            if len(psych["2"]) > 0:
                
                SomeTraits += psych_child_trait(random.choice(psych["2"]), 2)
                SomeTraits += "[or]"
        else:  
            if len(psych["1"]) > 0:
                
                SomeTraits += psych_child_trait(random.choice(psych["1"]), 1)
                SomeTraits += "[or]"
            
    MoreTraits = ""
    
    for i in range(0, random.randint(1, 2)):
        if (random.random() > .5):
            if len(psych["2"]) > 0:
                MoreTraits += "[or]"
                MoreTraits += psych_child_trait(random.choice(psych["2"]), 2)
        else:  
            if len(psych["1"]) > 0:
                MoreTraits += "[or]"
                MoreTraits += psych_child_trait(random.choice(psych["1"]), 1)
    #print SomeTraits
    
    
    child_events = [event for event in elist if event["era"] == "childhood"]
    for event in child_events:
        ChildEvents += build_child_event(event)
    
    childhood += "[one of]"
    childhood += Born + "[or]"
    childhood += Region + "[or]"
    childhood += Lord + "[or]"
    if Family != "":
        childhood += Family + "[or]"
    childhood += SomeTraits
    childhood += ChildEvents
    childhood += MoreTraits + "[cycling]"
    
    return childhood  
    
     
    
def build_child_event(event):
    etext = ""
    etext += get_event_text("a child", event["type"])
    etext += event["description"][0]
    if (len(event["results"]) > 0):
        for result in event["results"]:
            etext += get_result_text(result)
    else:
        if (event["type"] == "bad"):
            etext += " However, luckily"
        etext += random.choice([" It had little impact on my life.",
                                " It didn't really have a lasting effect.",
                                " I wasn't changed much by the incident in the long term.",
                                " My life went on much the same afterwards.",
                                " I found that life wasn't very different afterwards."])
        
    return etext

def get_result_text(result):
    text = random.choice([" As a result of this, I became (trait)",
                          " After the incident I became very (trait) as a result.",
                          " When it was over, I found myself a changed man.  I became had become (trait) almost overnight.",
                          " I was changed by the event.  It left a profound effect on me.  I have been (trait) ever since.",
                          " I became (trait) afterwards.",
                          " I found I was (trait) after that.",
                          " I very soon found I was (trait) as a result.",
                          " Almost immediately I found I was (trait)."])
    return text.replace("(trait)", result["value"])

def get_event_text(age, type):
    start_text = ""
    if type == "bad":
        start_text = random.choice([" As (age) I had the misfortune to experience ",
                                    " Unfortunately, as (age) I experienced ",
                                    " When I was (age) I was subjected to "])
                                    
    elif type == "good":
        start_text = random.choice([" As (age) I had the good fortune to experience ",
                                    " Fortunately, as (age) I experienced ",
                                    " When I was (age) I got to witness "])
    else:
        start_text = random.choice([" As (age) I experienced ",
                                    " When I was (age) I witnessed"])
    return start_text.replace("(age)", age)

def get_event_text_2(age, type):
    start_text = ""
    if type == "bad":
        start_text = random.choice([" As (age) I had the misfortune to ",
                                    " Unfortunately, as (age) I ",
                                    " When I was (age) I "])
                                    
    elif type == "good":
        start_text = random.choice([" As (age) I had the good fortune to ",
                                    " Fortunately, as (age) I ",
                                    " When I was (age) I "])
    else:
        start_text = random.choice([" As (age) I ",
                                    " When I was (age) I ",
                                    " When I was finally (age) I ",
                                    " Once I reached (age) I ",
                                    " After becoming (age) I "])
    return start_text.replace("(age)", age)
    
    
def psych_child_trait(trait, level):
    starts = ["Very early I started to act (trait).", 
              "I was a very (trait) child.", 
              "As a child, I was very (trait).", 
              "Much to my parents dismay, I became a very (trait) child.",
              "I was, as my family well remembers, a very (trait) child.",
              "Growing up, I was always very (trait).",
              "I developed a habit of being (trait) very early."]
    if (level == 1):
        starts += ["I showed promise at an early age and was very (trait).",
                   "As a child, I was blessed to be very (trait).",
                   "Fortunately, as a child, I was very (trait).",
                   "I had the good fortune to be a very (trait) child.",
                   "My parents loved that I was very (trait) as a young boy.",
                   "I developed some good habits young and became very (trait) early in life.",
                   "While a child, I worked very hard to become (trait)."]
    elif (level == 2):
        starts += ["I disappointed my parents at an early age and was very (trait).",
                   "As a child, I was cursed to be very (trait).",
                   "Unfortunately, as a child, I was very (trait).",
                   "I had the bad fortune to be a very (trait) child.",
                   "My parents hated that I was very (trait) as a young boy.",
                   "I developed some bad habits young and became very (trait) early in life."]
        
    start = random.choice(starts)
    
    mids = [" I don't know if it was my parents who taught me, or if it was just something I picked up.",
            " It was an interesting time in my life and I have felt very (trait) ever since.",
            " I am not as (trait) as I once was, though I still feel that way sometimes.",
            " Overtime my feelings of (trait) are lessened, but the roots are still there.",
            " I still feel (trait) so many years later.",
            " I am still (trait) to this day.",
            " I have been (trait) ever since."]
    
    if (level == 1):
        mids += [" I am rather blessed to be (trait), aren't I?",
                 " I consider myself really lucky to be (trait).",
                 " Kinda lucky to be (trait) I guess.",
                 " Luckily, I am rather (trait) still."]
    
    elif (level == 2):
        mids += [" I would be less (trait) but that's not who I am.",
                 " Sometimes I don't want to be (trait) but there's not much I can do about it.",
                 " I wish I was less (trait).",
                 " I know that I am (trait) and I have to live with it."]
        
    sent = start
    if random.random() > .5:
        sent = start + random.choice(mids)
    
    sent = sent.replace("(trait)", trait)
    
    return sent

def psych_adult_trait(trait, level):
    starts = ["As an adult I started to act (trait).", 
              "I became a very (trait) adult.", 
              "As an adult, I was very (trait).", 
              "Much to my wife's dismay, I became a very (trait) young adult.",
              "I was, as my children well remembers, a very (trait) adult.",
              "I became very (trait) partway through life.",
              "I developed a habit of being (trait)."]
    if (level == 1):
        starts += ["I later showed promise and became (trait).",
                   "I was blessed to become very (trait) later in life.",
                   "Fortunately, over time, I became (trait).",
                   "I had the good fortune to become (trait) later in life.",
                   "I developed some good habits young and became very (trait).",
                   "I worked very hard to become (trait)."]
    elif (level == 2):
        starts += ["I disappointed my family by becoming (trait) over time.",
                   "I was cursed to become very (trait).",
                   "Unfortunately I became very (trait) as the years passed.",
                   "I developed some bad habits later in life and became very (trait)."]
        
    start = random.choice(starts)
    
    mids = [" I don't know if it was my family who taught me, or if it was just something I picked up.",
            " It was an interesting time in my life and I have felt very (trait) ever since.",
            " I am not as (trait) as I once was, though I still feel that way sometimes.",
            " Overtime my feelings of (trait) are lessened, but the roots are still there.",
            " I still feel (trait) so many years later.",
            " I am still (trait) to this day.",
            " I have been (trait) ever since."]
    
    if (level == 1):
        mids += [" I am rather blessed to be (trait), aren't I?",
                 " I consider myself really lucky to be (trait).",
                 " Kinda lucky to be (trait) I guess.",
                 " Luckily, I am rather (trait) still."]
    
    elif (level == 2):
        mids += [" I would be less (trait) but that's not who I am.",
                 " Sometimes I don't want to be (trait) but there's not much I can do about it.",
                 " I wish I was less (trait).",
                 " I know that I am (trait) and I have to live with it."]
        
    sent = start
    if random.random() > .5:
        sent = start + random.choice(mids)
    
    sent = sent.replace("(trait)", trait)
    
    return sent
    
    
    
    
if __name__ == "__main__":
    main()
    