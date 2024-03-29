var GOTDB = {
    "ages" : ["Child", "Adolescent", "Young Adult", "Middle-age Adult", "Elder"],
    "cities" : [" a large town in ", " a small village in ", " the middle of ",
            "", " that famous part of "],
    "eye colors" : ["blue", "brown", "green", "gray"],
    "hair colors" : ["yellow", "black", "brown", "white"],
    "injuries" : ["arm missing", "leg missing", "face scar", "limp", "none"],
    "jobs" : ["Blacksmith", "Farmer", "Fisherman", "Guard", "Knight",
            "Merchant"],
    "regions" : ["The Reach",
                 "The Westerlands",
                 "The North", 
                 "The Riverlands",
                 "The Vale", 
                 "The Stormlands", 
                 "The Crownlands", 
                 "The Iron Islands",
                 "North of the Wall", 
                 "Dorne"],
    "regionLines" : { "The Reach" : "The Reach is aptly named. We're the ones who give your hand something to do at the table. As the most fertile region of the Seven Kingdoms, we grow the lion's share of the grains and fruit that feed this country.",
    				 "The Westerlands" : "Fools look at the Westerlands and see gold. Fools see our wealth and call it strength. Gold is just another rock. The Westerlands are strong because of House Lannister. From strong leadership comes unity; from unity comes power.",
    				 "The North" : "The North is larger than the other six kingdoms combined.",
    				 "The Riverlands" : "The Riverlands is our home and Gods help us we love it.",
                     "The Vale" : "The borders of the Vale are held to be the Bite to the north, the Bay of Crabs to the south, the Mountains of the Moon to the west and the Narrow Sea to the east.",
                     "The Stormlands" : "The Stormlands is one of the nine constituent regions of the Seven Kingdoms. It is located on the south east coast of the continent of Westeros, on the shores of the Narrow Sea, south of the Crownlands and north of Dorne. The Stormlands are ruled from the castle of Storm's End by House Baratheon.",
                     "The Crownlands" : "The Crownlands are located on the east coast of Westeros, on the shores of the Narrow Sea, north of the Stormlands and south of the Vale of Arryn. ",
                     "The Iron Islands" : "Where the North has its honor and the South its chivalry, the Iron Islands has its strength.",
                     "North of the Wall" : "We're not in the Seven Kingdoms. I am of the free folk from the real north",
                     "Dorne" : "Dorne is in the south of Westeros and has maintained many of it's customs by being the last region to join the Seven Kingdoms. And joined by marriage politics not conquest like the rest."},
    "classes" : ["Slave", "Poor", "Commoner", "Rich", "Noble", "Royal"],
    "childEvents" : [
            {
                "event" : "Parent Death",
                "effect" : {"emotional" : "+35"},
                "line" : "One of my parent's died when I was young and it left a big mark on my life.",
                "requires" : {"childTone" : {"is" : "Negative"}}},
            {"event" : "Injury",
                "effect" : {"brave" : "-35", "assertive" : "-25"},
                "line" : "I was injured while playing outside",
                "requires" : {"childTone" : {"is" : "Negative"}}},
            {
                "event" : "War Child",
                "effect" : {"brave" : "+25", "gentle" : "-25",
                    "trusting" : "-50", "perceptive" : "+10",
                    "creative" : "+10"},
                "line" : "Terrible battles happened all the time while I was growing up. I have many nightmares about it.",
                "requires" : {"childTone" : {"is" : "Negative"}}},
            {"event" : "Family Farm", "effect" : {"diligent" : "+20"},
                "line" : "I worked on my family farm from a young age",
                "requires" : {"social" : {"not" : ["royalty", "nobility"]}}},
            {
                "event" : "Abuse",
                "effect" : {"gentle" : "-45", "trusting" : "-70",
                    "perceptive" : "+10", "creative" : "-10"},
                "line" : "I rather not talk about everything from my childhood.",
                "requires" : {"childTone" : {"is" : "Negative"}}},
            {"event" : "accident", "effect" : {"muscular" : "-35"},
                "line" : "I had a pretty bad accident",
                "requires" : {"childTone" : {"is" : "Negative"}}},
            {"event" : "Kind Family", "line" : "I had a kind family.",
                "requires" : {"childTone" : {"is" : "Positive"}}},
            {"event" : "Mean Family", "line" : "I had a mean family.",
                "effect" : {"trusting" : "-75"},
                "requires" : {"childTone" : {"is" : "Negative"}}},
            {"event" : "Average Family",
                "line" : "I'd say my family was pretty typical."},
            {"event" : "Rich Family", "line" : "We were very well off.",
                "requires" : {"social" : {"not" : ["Poor", "Slave"]}}}, ],
    "adoleEvents" : [
            {
                "event" : "Apperentice",
                "effect" : {"inteligent" : "+20"},
                "line" : "I became an apprentice in the service of a carpenter.",
                "requires" : {"social" : {"not" : ["royalty", "nobility"]}}},
            {"event" : "Family Farm", "effect" : {"diligent" : "+20"},
                "line" : "I worked on my family farm growing up",
                "requires" : {"social" : {"not" : ["royalty", "nobility"]}}},
            {
                "event" : "Cabin Boy",
                "effect" : {"diligent" : "+20"},
                "line" : "I traveled between Oldtown and volantis as a cabin boy.",
                "requires" : {"social" : {"not" : ["royalty", "nobility"]}}},
            {"event" : "Squire", "effect" : {"diligent" : "+20"},
                "line" : "A knight requested I be his squire",
                "requires" : {"social" : {"is" : ["nobility"]}}},
            {"event" : "Fun Adventure",
                "line" : "A couple of friends and I went on a fun adventure.",
                "requires" : {"adoleTone" : {"is" : "Positive"}}},
            {
                "event" : "Dangerous Adventure",
                "line" : "A couple of friends and I went on a dangerous adventure. We almost died.",
                "requires" : {"adoleTone" : {"is" : "Negative"}}},
            {"event" : "Changed Ownership",
                "line" : "My owner lost a bet and I changed ownership.",
                "requires" : {"social" : {"is" : "Slave"}}},
            {"event" : "Avg Adole",
                "line" : "I did lots of chores around the house."},
            {"event" : "Traveled often",
                "line" : "My family moved a few times.",
                "requires" : {"social" : {"not" : ["Poor"]}}},
            {"event" : "Early Marriage",
                "line" : "I married earlier than most.",
                "requires" : {"marriage" : {"is" : "$none"}},
                "effect" : {"marriage" : "$married"}}],
    "yngAdEvents" : [
            {"event" : "War", "line" : "I joined the war effort. It was rough."},
            {"event" : "Imprisoned",
                "line" : "I was in jail. I don't need to tell you about it."},
            {"event" : "Work injury",
                "line" : "I was injured on the job. But it wasn't too bad."},
            {"event" : "Enjoy work", "line" : "I didn't mind working.",
                "effect" : {"diligent" : "+20"},
                "requires" : {"yngAdTone" : {"is" : "Positive"}}},
            {"event" : "Hate Work", "line" : "I hated working.",
                "effect" : {"diligent" : "-40"},
                "requires" : {"yngAdTone" : {"is" : "Negative"}}},
            {"event" : "Bored",
                "line" : "I don't remember doing much interesting."},
            {"event" : "Struggled to eat",
                "line" : "Finding food was a struggle",
                "requires" : {"social" : {"not" : ["Rich", "Noble", "Royal"]}},
                "yngAdTone" : {"is" : "Negative"}},
            {"event" : "Changed Ownership",
                "line" : "I was given to another master to resolve a debt.",
                "requires" : {"social" : {"is" : "Slave"}}},
            {"event" : "Young Blacksmith",
                "line" : "I was trained to be a blacksmith",
                "requires" : {"job" : {"is" : ["[Random]"]}},
                "effect" : {"job" : "$Blacksmith"}},
            {"event" : "Young Guard",
                "line" : "I was trained to be a town guard",
                "requires" : {"job" : {"is" : ["[Random]"]}},
                "effect" : {"job" : "$Guard"}},
            {"event" : "Young Fisherman",
                "line" : "I went fishing and was able to make some money.",
                "requires" : {"job" : {"is" : ["[Random]"]}},
                "effect" : {"job" : "$Fisherman"}},
            {"event" : "Set Free", "line" : "I finally gained my freedom.",
                "requires" : {"social" : {"is" : "Slave"}},
                "effect" : {"social" : "$poor"}},
            {
                "event" : "Young Guard",
                "line" : "Someone told be I should join the local guards. It worked out.",
                "requires" : {"job" : {"is" : ["[Random]"]},
                    "muscular" : {"above" : "50"}},
                "effect" : {"job" : "Guard"}},
            {"event" : "Good Marriage",
                "line" : "I married the love of my life.",
                "requires" : {"marriage" : {"is" : "none"}},
                "effect" : {"marriage" : "$married"}},
            {
                "event" : "Bad Marriage",
                "line" : "I didn't realize what I was getting into with my marriage.",
                "requires" : {"marriage" : {"is" : "none"}},
                "effect" : {"marriage" : "$married"}},
            {
                "event" : "Neutral Marriage",
                "line" : "My marriage has been alright I guess.",
                "requires" : {"marriage" : {"is" : "none"},
                    "effect" : {"marriage" : "$married"}},
                "effect" : {"marriage" : "$married"}},
            {"event" : "Spouse death", "line" : "My wife died in childbirth.",
                "requires" : {"marriage" : "married"},
                "effect" : {"marriage" : "$none"}},
            {"event" : "Forced Marriage",
                "line" : "I had an arranged marriage",
                "requires" : {"marriage" : {"is" : "none"}},
                "effect" : {"marriage" : "$married"}},
            {"event" : "Win tourney",
                "line" : "I won a prize in a local fighting tourney",
                "requires" : {"job" : "Knight"}},
            {"event" : "inheritance",
                "line" : "I received a large inheritance",
                "effect" : {"social" : "rich"}},
            {
                "event" : "Young Knight",
                "line" : "I was knighted.",
                "requires" : {
                    "job" : {"is" : ["[Random]"],
                        "social" : {"is" : ["Rich", "Noble", "Royal"]}},
                    "muscular" : {"above" : "50"}},
                "effect" : {"job" : "$Knight"}},
            {
                "event" : "Assault",
                "line" : "One night I was assaulted but fought off the attackers."},
            {
                "event" : "Young Merchant",
                "line" : "I started making a living by trading goods. I started small but kept expanding.",
                "requires" : {"job" : {"is" : ["[Random]"]}},
                "effect" : {"job" : "$Merchant"}}],
    "midAdEvents" : [
            {"event" : "Draft",
                "line" : "I was drafted to fight in the war for a time."},
            {"event" : "work injury",
                "line" : "I dropped a large object on my foot."},
            {"event" : "Imprisoned",
                "line" : "I was framed for a crime and ended up in jail."},
            {
                "event" : "Assault",
                "line" : "While travelling between towns I was mugged by some criminal scum."},
            {"event" : "lost land",
                "line" : "My property was taken from me and I was homeless.",
                "effect" : {"social" : "$poor"}},
            {"event" : "Good Marriage",
                "line" : "I married the love of my life.",
                "requires" : {"marriage" : {"is" : "none"}},
                "effect" : {"marriage" : "$married"}},
            {
                "event" : "financial success",
                "line" : "I prospered at my career and made some good contacts.",
                "requires" : {"not" : "Slave"}, "effect" : {"social" : "rich"}},
            {"event" : "financial ruin",
                "line" : "I had miserable luck in my career and lost a lot.",
                "requires" : {"not" : "Slave"}, "effect" : {"social" : "poor"}},
            {"event" : "parent death",
                "line" : "One of my parents passed away due to illness."},
            {"event" : "spouse death", "line" : "My wife died in childbirth.",
                "requires" : {"marriage" : {"is" : "married"}},
                "effect" : {"marriage" : "none"}},
            {
                "event" : "Bad Marriage",
                "line" : "I didn't realize what I was getting into with my marriage.",
                "requires" : {"marriage" : {"is" : "none"}},
                "effect" : {"marriage" : "$married"}},
            {"event" : "Neutral Marriage",
                "line" : "My marriage has been alright I guess.",
                "requires" : {"marriage" : {"is" : "none"}},
                "effect" : {"marriage" : "$married"}},
            {"event" : "Forced Marriage",
                "line" : "I had an arranged marriage.",
                "requires" : {"marriage" : {"is" : "none"}},
                "effect" : {"marriage" : "$married"}},
            {"event" : "Enjoy work", "line" : "Having a job isn't half bad.",
                "requires" : {"midAdTone" : {"is" : "Positive"}}},
            {"event" : "Hate Work", "line" : "I don't like my job.",
                "requires" : {"midAdTone" : {"is" : "Negative"}}},
            {"event" : "Bored",
                "line" : "It seems like I'm often bored of my routine."},
            {"event" : "Struggled to afford food",
                "line" : "My job doesn't pay very well and it's sometimes hard to get food.",
                "requires" : {"social" : {"not" : ["Rich", "Noble", "Royal",
                        "Slave"]}}, "midAdTone" : {"is" : "Negative"}},
            {"event" : "Set Free", "line" : "I finally gained my freedom.",
                "requires" : {"social" : {"is" : "Slave"}},
                "effect" : {"social" : "$poor"}},
            {
                "event" : "Changed Ownership",
                "line" : "After I tried to run away, I was given on to a new owner.",
                "requires" : {"social" : {"is" : "Slave"}}}],
    "elderEvents" : [
            {"event" : "Assault",
                "line" : "I was robbed on the street. Who beats up an old man?"},
            {"event" : "Good Marriage",
                "line" : "I married the love of my life.",
                "requires" : {"marriage" : {"is" : "none"}},
                "effect" : {"marriage" : "$married"}},
            {"event" : "spouse death",
                "line" : "My wife died after becoming very sick.",
                "requires" : {"marriage" : {"is" : "married"}},
                "effect" : {"marriage" : "$none"}},
            {
                "event" : "Bad Marriage",
                "line" : "I didn't realize what I was getting into with my marriage.",
                "requires" : {"marriage" : {"is" : "none"}},
                "effect" : {"marriage" : "$married"}},
            {"event" : "Neutral Marriage",
                "line" : "My marriage has been alright I guess.",
                "requires" : {"marriage" : {"is" : "none"}},
                "effect" : {"marriage" : "$married"}},
            {"event" : "Late Marriage",
                "line" : "I finally got married recently.",
                "requires" : {"marriage" : {"is" : "none"}},
                "effect" : {"marriage" : "$married"}},
            {"event" : "Enjoy work",
                "line" : "I still work, I like having something to do.",
                "requires" : {"midAdTone" : {"is" : "Positive"}}},
            {"event" : "Hate Work",
                "line" : "I wish I could retire, but I have to work.",
                "requires" : {"midAdTone" : {"is" : "Negative"}}},
            {"event" : "Bored", "line" : "I don't have much to do these days."},
            {"event" : "Struggled to afford food",
                "line" : "At my age it's hard to get by without support.",
                "requires" : {"social" : {"not" : ["Rich", "Noble", "Royal"]}},
                "midAdTone" : {"is" : "Negative"}},
            {
                "event" : "Changed Ownership",
                "line" : "They don't really think I am very useful these days.",
                "requires" : {"social" : {"is" : "Slave"}}},
            {
                "event" : "Financial success",
                "line" : "I prospered at my career and made some good contacts.",
                "requires" : {"not" : "slave"}, "effect" : {"social" : "rich"}},
            {"event" : "Financial ruin",
                "line" : "I had miserable luck in my career and lost a lot.",
                "requires" : {"not" : "slave"}, "effect" : {"social" : "poor"}},
            {"event" : "Set Free", "line" : "I finally gained my freedom.",
                "requires" : {"social" : {"is" : "Slave"}},
                "effect" : {"social" : "$poor"}},
            {
                "event" : "Community Leader",
                "line" : "I became important in my town leadership and many come to me for advise."},
            {"event" : "Respected",
                "line" : "I live a quiet life and am well respected."}],
    "names" : {
        "first" : ["Abelar", "Addam", "Addison", "Aegon", "Aegor", "Aemon",
                "Aenar", "Aenys", "Aeron", "Aerys", "Aethan", "Aethelmure",
                "Aggar", "Aggo", "Agrivane", "Aladale", "Albar", "Albett",
                "Alebelly", "Alequo", "Alesander", "Alester", "Alfyn", "Allar",
                "Allard", "Alleras", "Alliser", "Alvyn", "Alyce", "Alyn",
                "Amabel", "Ambrode", "Ambrose", "Amerei", "Amory", "Andar",
                "Anders", "Andrew", "Andrey", "Andrik", "Andros", "Androw",
                "Anguy", "Antario", "Anvil", "Ardrian", "Areo", "Argilac",
                "Argrave", "Arlan", "Armen", "Armond", "Arneld", "Arnell",
                "Arnolf", "Aron", "Arrec", "Arron", "Arryk", "Arson", "Arthur",
                "Artos", "Artys", "Arwood", "Arwyn", "Arys", "Assadora",
                "Aubrey", "Aurane", "Axell", "Bael", "Baelor", "Ballabar",
                "Balman", "Balon", "Bandy", "Bannen", "Barristan", "Barth",
                "Bass", "Bayard", "Beardless", "Beck", "Bedwyck", "Belgrave",
                "Bellegere", "Belwas", "Ben", "Benedar", "Benedict", "Benfred",
                "Benfrey", "Benjen", "Bennard", "Bennarion", "Bennet",
                "Bennis", "Beren", "Beric", "Bernarr", "Beron", "Bertram",
                "Betharios", "Big", "Biter", "Black", "Blane", "Bluetooth",
                "Bodger", "Bonifer", "Borcas", "Boremund", "Boros", "Bors",
                "Bowen", "Bradamar", "Bran", "Brandon", "Branston", "Brenett",
                "Bronn", "Brusco", "Bryan", "Bryce", "Bryen", "Brynden",
                "Buford", "Burton", "Butterbumps", "Byam", "Byan", "Byren",
                "Byron", "Cadwyl", "Cadwyn", "Caleotte", "Calon", "Carrot",
                "Castos", "Cayn", "Cedric", "Cedrik", "Cellador", "Cerrick",
                "Cetheres", "Chayle", "Chett", "Chiggen", "Chiswyck",
                "Clarence", "Clayton", "Clement", "Cleon", "Cleos", "Cletus",
                "Cley", "Cleyton", "Clifford", "Clydas", "Cohollo",
                "Coldhands", "Colemon", "Colen", "Colin", "Collio", "Colloquo",
                "Colmar", "Conn", "cont", "Conwy", "Corliss", "Cortnay",
                "Cosgrove", "Cotter", "Courtenay", "Cragorn", "Craster",
                "Crawn", "Cregan", "Creighton", "Cressen", "Creylen",
                "Criston", "Cuger", "Cutjack", "Daario", "Dacks", "Daemon",
                "Daeron", "Dafyn", "Dagmer", "Dagon", "Dagos", "Dake", "Dale",
                "Damion", "Damon", "Dan", "Dancy", "Danny", "Danwell",
                "Dareon", "Daryn", "Daven", "Davos", "Del", "Delonne", "Delp",
                "Demon", "Denestan", "Dennett", "Dennis", "Denyo", "Denys",
                "Deremond", "Dermot", "Desmond", "Devan", "Deziel", "Dick",
                "Dickon", "Dilly", "Dirk", "Dobber", "Dolf", "Domeric",
                "Donal", "Donel", "Donella", "Donnel", "Donnis", "Donnor",
                "Doran", "Dormund", "Dorren", "Drennan", "Dryn", "Dudley",
                "Dunaver", "Dunk", "Dunsen", "Dunstan", "Duram", "Durran",
                "Dyah", "Dykk", "Ebrose", "Eddard", "Edderion", "Eddison",
                "Eden", "Edgerran", "Edmund", "Edmure", "Edmyn", "Edric",
                "Edrick", "Edwyd", "Edwyle", "Edwyn", "Eggon", "Elbert",
                "Eldiss", "Eldon", "Eldred", "Ellery", "Elmar", "Elwood",
                "Elyas", "Elyn", "Elys", "Emmon", "Emmond", "Emrick",
                "Endehar", "Endrew", "Enger", "Eon", "Erik", "Eroeh", "Erreck",
                "Erreg", "Erren", "Errok", "Erryk", "Esgred", "Ethan", "Euron",
                "Eustace", "Eyron", "Farlen", "Ferrego", "Ferret", "Flement",
                "Fogo", "Forley", "Fralegg", "Franklyn", "Frenken", "Gage",
                "Galbart", "Galladon", "Gallard", "Galtry", "Gareth", "Garin",
                "Gariss", "Garizon", "Garlan", "Garrett", "Garrison", "Garse",
                "Garth", "Gascoyne", "Gawen", "Gelmarr", "Gendel", "Gendry",
                "Gerald", "Gerardys", "Geremy", "Gergen", "Gerion", "Germund",
                "Gerold", "Gerren", "Gevin", "Ghael", "Ghost", "Gilbert",
                "Gillam", "Gilwood", "Gladden", "Glendon", "Godric", "Godry",
                "Godwyn", "Goodwin", "Gorghan", "Gormon", "Gormond", "Gorne",
                "Gorold", "Gowen", "Gran", "Grance", "Grazdan", "Greatheart",
                "Greenbeard", "Gregor", "Grenn", "Grey", "Greydon", "Griffin",
                "Grigg", "Groleo", "Grubbs", "Gueren", "Gulian", "Gunthor",
                "Guthor", "Guyard", "Guyne", "Gwayne", "Gylbert", "Gyles",
                "Gynir", "Haegon", "Haereg", "Haggo", "Hake", "Hal", "Halder",
                "Halleck", "Hallis", "Halmon", "Halys", "Harbert", "Hareth",
                "Harlan", "Harlen", "Harlon", "Harmen", "Harmond", "Harmund",
                "Harmune", "Harodon", "Harrag", "Harras", "Harren", "Harrion",
                "Harrold", "Harry", "Harsley", "Harwin", "Harwood", "Harwyn",
                "Harys", "Hayhead", "Helicent", "Helliweg", "Helman", "Hendry",
                "Henk", "Henly", "Herbert", "Heward", "Hibald", "Hilmar",
                "hllor", "Hobb", "Hobber", "Hod", "Hodor", "Hoke", "Hop",
                "Horas", "Horton", "Hosman", "Hosteen", "Hoster", "Hot",
                "Hother", "Hotho", "Howland", "Hugh", "Hugo", "Hullen",
                "Humfrey", "Hyle", "Iggo", "Igon", "Illifer", "Illyrio",
                "Ilyn", "Imry", "Ironbelly", "Jacelyn", "Jack", "Jacks",
                "Jaehaerys", "Jafer", "Jaggot", "Jaime", "Jammos", "Janos",
                "Jaqen", "Jared", "Jarl", "Jason", "Jasper", "Jate", "Jeffory",
                "Jeor", "Jeren", "Jhaqo", "Jhogo", "Jodge", "Joffrey", "Jojen",
                "Jommo", "Jon", "Jonnel", "Jonos", "Jonothor", "Jorah",
                "Joramun", "Jorgen", "Jorquen", "Jory", "Joseran", "Joseth",
                "Josmyn", "Joss", "Josua", "Joth", "Joy", "Jurne", "Jyck",
                "Kaeth", "Karl", "Karlon", "Karyl", "Kedge", "Kedry",
                "Kemmett", "Kenned", "Kennos", "Ketter", "Kevan", "Khal",
                "Khorane", "Kirby", "Kirth", "Koss", "Kraznys", "Kromm",
                "Kurleket", "Kurz", "Kyle", "Kym", "Lambert", "Lancel",
                "Larence", "Lark", "Lazy", "Lem", "Lenn", "Lennocks",
                "Lenwood", "Lenyl", "Leo", "Leobald", "Lester", "Lew", "Lewyn",
                "Lewys", "Leyton", "Lharys", "Lister", "Lomas", "Lommy",
                "Lomys", "Loras", "Lorcas", "Lord", "Loren", "Lorent",
                "Lorimer", "Lormelle", "Lorren", "Lothar", "Lothor",
                "Lucamore", "Lucan", "Lucantine", "Lucas", "Luceon", "Lucias",
                "Lucimore", "Lucion", "Luco", "Lucos", "Luke", "Lum", "Luthor",
                "Luwin", "Lyle", "Lyman", "Lymond", "Lyn", "Lync", "Lyonel",
                "Mace", "Mad", "Maegor", "Maekar", "Maelys", "Mag", "Mago",
                "Mallador", "Malleon", "Mallor", "Malwyn", "Mance", "Mandon",
                "Manfred", "Manfrey", "Manfryd", "Maric", "Marillion", "Mark",
                "Marlon", "Maron", "Marq", "Martyn", "Marwyn", "Maslyn",
                "Mathis", "Matt", "Matthar", "Matthos", "Maynard", "Mebble",
                "Medgar", "Medger", "Medwick", "Meizo", "Melaquin", "Meldred",
                "Mellario", "Melwyn", "Melwys", "Meribald", "Merlon", "Mern",
                "Mero", "Merrell", "Merrett", "Merrit", "Meryn", "Michael",
                "Mikken", "Mohor", "Mollander", "Mollos", "Moon", "Mord",
                "Mordane", "Moreo", "Morgan", "Morgarth", "Morgil", "Moribald",
                "Moro", "Morosh", "Morrec", "Mors", "Mortimer", "Morton",
                "Moryn", "Mudge", "Mullin", "Munda", "Murch", "Murenmure",
                "Mycah", "Mychel", "Myles", "Nage", "Naggle", "Narbert", "Ned",
                "Nestor", "Night", "Noho", "Norbert", "Norjen", "Normund",
                "Norne", "Norren", "Notch", "Nute", "Nymos", "Oberyn", "Ocley",
                "Ogo", "Old", "Ollidor", "Ollo", "Olymer", "Olyvar", "Omer",
                "Ondrew", "Orbelo", "Orbert", "Orell", "Orivel", "Orland",
                "Ormond", "Oro", "Orton", "Orys", "Osbert", "Osmund", "Osmynd",
                "Osric", "Ossifer", "Ossy", "Oswell", "Othell", "Otho",
                "Othor", "Otter", "Otto", "Ottomore", "Ottyn", "Owen",
                "Parmen", "Patchface", "Pate", "Patrek", "Paxter", "Pearse",
                "Perestan", "Perros", "Perwyn", "Peter", "Petyr", "Philip",
                "Plummer", "Podrick", "Polliver", "Pono", "Porther",
                "Portifer", "Poxy", "Praed", "Prendahl", "Preston", "Puckens",
                "Pudding", "Puddingfoot", "Pycelle", "Pylos", "Pypar", "Qalen",
                "Qarl", "Qarlton", "Qarro", "Qhored", "Qos", "Qotho",
                "Quaithe", "Quaro", "Quellon", "Quent", "Quenten", "Quentin",
                "Quenton", "Quentyn", "Quincy", "Quort", "Qyburn", "Qyle",
                "Rafe", "Rafford", "Ragnor", "Ragwyle", "Rakharo", "Ralf",
                "Ramsay", "Randyll", "Rast", "Rat", "Rattleshirt", "Rawney",
                "Raymar", "Raymond", "Raymun", "Raymund", "Raynald", "Raynard",
                "Red", "Redtusk", "Reek", "Regenard", "Renly", "Reynard",
                "Reysen", "Rhaegar", "Rhaego", "Rhogoro", "Ricasso", "Richard",
                "Rickard", "Rickon", "Rigney", "Rob", "Robar", "Robb",
                "Robert", "Robett", "Robin", "Robyn", "Rodrik", "Rodwell",
                "Roger", "Roland", "Rolder", "Rolfe", "Rollam", "Rolland",
                "Rolley", "Rolph", "Romny", "Ronald", "Ronel", "Ronnel",
                "Ronnet", "Roone", "Roose", "Rorge", "Roro", "Roryn", "Rowena",
                "Royce", "Rudge", "Rufus", "Runceford", "Runcel", "Rupert",
                "Rus", "Russell", "Ryam", "Rycherd", "Ryger", "Ryk", "Ryman",
                "Rymolf", "Ryon", "Salladhor", "Salloreon", "Sam", "Samwell",
                "Sand", "Sandor", "Sargon", "Satin", "Sawane", "Sawwood",
                "Sebaston", "Sedgekins", "Selmond", "Selwyn", "Serwyn",
                "Shadd", "Shadrich", "Shagga", "Shagwell", "Sherrit", "Sigfry",
                "Sigfryd", "Sigorn", "Sigrin", "Simon", "Skittrick", "Skyte",
                "Sleepy", "Smiling", "Softfoot", "Spotted", "Squint",
                "Stafford", "Stannis", "Steffarion", "Steffon", "Stevron",
                "Stiv", "Stone", "Stonehand", "Stygg", "Styr", "Sumner",
                "Sylas", "Symon", "Symond", "Syrio", "Talbert", "Tallad",
                "Tanton", "Tarle", "Temmo", "Ternesio", "Terrance", "Terrence",
                "Terro", "Theo", "Theobald", "Theodan", "Theodore", "Theomar",
                "Theomore", "Theon", "Thomax", "Thoren", "Thormor", "Thoros",
                "Three", "Tickler", "Tim", "Timeon", "Timett", "Timon",
                "Timoth", "Tion", "Titus", "Tobbot", "Tobho", "Todder",
                "Todric", "Toefinger", "Tom", "Tomard", "Tommard", "Tommen",
                "TomToo", "Toregg", "Tormund", "Torrek", "Torren", "Torrhen",
                "Torwold", "Torwynd", "Tothmure", "Trebor", "Tregar",
                "Tremond", "Tristan", "Tristifer", "Tristimun", "Triston",
                "Trystane", "Tuffleberry", "Tumberjon", "Turnip", "Turquin",
                "Tybolt", "Tygett", "Tymor", "Tyrek", "Tyrion", "Tytos",
                "Tywin", "Ulf", "Uller", "Ulrick", "Ulwyck", "Umfred", "Urek",
                "Urras", "Urrigon", "Urron", "Urzen", "Utherydes", "Uthor",
                "Vaellyn", "Varamyr", "Vardis", "Vargo", "Varly", "Varys",
                "Vayon", "Vickon", "Victarion", "Victor", "Viserys",
                "Vortimer", "Vylarr", "Vyman", "Walder", "Waldon", "Walgrave",
                "Wallace", "Wallen", "Walton", "Waltyr", "Warren", "Warryn",
                "Wat", "Watt", "Watty", "Waymar", "Wayn", "Weeper", "Weese",
                "Wendamyr", "Wendel", "Wendell", "Werlag", "Wex", "Whalen",
                "Wilbert", "Will", "Willam", "Willamen", "Willas", "Willem",
                "William", "Willifer", "Willis", "Willit", "Willum", "Wolmer",
                "Wulfe", "Wyl", "Wylis", "Wyman", "Wynton", "Ygon", "Yohn",
                "Yoren", "Yorko", "Yormwell", "Zachery", "Zarabelo", "Zollo"],
        "last" : ["Adarys", "Allyrion", "Ambrose", "Antaryon", "Arryn",
                "Ashford", "Axe", "Baelish", "Ball", "Banefort", "Bar",
                "Baratheon", "Beesbury", "Belmore", "Bettley", "Blackbar",
                "Blackberry", "Blackfyre", "Blackmont", "Blackthumb",
                "Blacktyde", "Blackwood", "Blount", "Boggs", "Boil", "Bolling",
                "Bolton", "Borrell", "Botley", "Boy", "Bracken", "Brax",
                "Broom", "Browntooth", "Brune", "Bulwer", "Bushy",
                "Butterwell", "Byrch", "Bywater", "Cafferen", "Caron",
                "Cassel", "Caswell", "Celtigar", "Cerwyn", "Charlton",
                "Chelsted", "Chester", "Chyttering", "Clegane", "Clifton",
                "Cockshaw", "Codd", "Coldwater", "Cole", "Condon", "Conklyn",
                "Connington", "cont", "Cook", "Corbray", "Costayne", "Cox",
                "Crabb", "Crakehall", "Crane", "Crowkiller", "Cupps", "Cuy",
                "Dalt", "Darklyn", "Darry", "Dayne", "Deem", "Dick",
                "Dimittis", "Dondarrion", "Drogo", "Drumm", "Dunstable",
                "Dustin", "Egen", "Estermont", "Estren", "Farman", "Farring",
                "Farrow", "Farwynd", "Fell", "Flatnose", "Flint", "Florent",
                "Flowers", "Foote", "Forel", "Fossoway", "Fowler", "Freeborn",
                "Frey", "Gardener", "Gargalen", "Gimpknee", "Glover",
                "Goodbrook", "Goodbrother", "Gower", "Grafton", "Grandison",
                "Greenfield", "Greenhands", "Greenhill", "Grell", "Grey",
                "Greyiron", "Greyjoy", "Grimm", "Grove", "Haigh", "Harclay",
                "Hardyng", "Harlaw", "Hasty", "Heddle", "Hetherspoon",
                "Hewett", "Hightower", "Hill", "Hoare", "Hoat", "Hornwood",
                "Horpe", "Hotah", "Humble", "Hunt", "Hunter", "Huntsman", "II",
                "III", "Inchfield", "Ironfoot", "IV", "Jack", "Jast",
                "Jordayne", "Karstark", "Kenning", "Kettleblack", "King",
                "Knight", "Lannister", "Leek", "Lefford", "Leo", "Leygood",
                "Liddle", "Locke", "Long", "Longbough", "Longthorpe",
                "Lonmouth", "Lophand", "Lorch", "Lothston", "Lusty",
                "Lychester", "Lydden", "Lynderly", "Mage", "Mahr", "Mallister",
                "Manderly", "Manwoody", "Mar", "Marbrand", "Marsh", "Martell",
                "Meadows", "Merlyn", "Merryweather", "Mertyns", "mo", "Mollen",
                "Moore", "Mooton", "Mopatis", "Moreland", "Mormont",
                "Morrigen", "Mott", "Mudd", "Mullendore", "Myre", "na",
                "Naharis", "Nayland", "Norcross", "Norrey", "Norridge", "Noye",
                "Oakheart", "Oarsman", "of", "Ormollen", "Osgrey", "Otherys",
                "Paege", "Pate", "Payne", "Peake", "Peckledon", "Penny",
                "Penrose", "Pie", "Pimm", "Piper", "Plumm", "Poole", "Potter",
                "Pox", "Prestayn", "Prester", "Pyke", "Qorgyle", "Quaynis",
                "Quickbow", "Rayder", "Redfort", "Redwyne", "Reed", "Reyne",
                "Rhysling", "Risley", "Rivers", "Roote", "Rowan", "Royce",
                "Ruttiger", "Ryger", "Ryn", "Ryswell", "Saan", "Saltcliffe",
                "Sand", "Santagar", "Sarsfield", "Sathmantes", "Sawyer",
                "Seaworth", "Selmy", "Serry", "Sharp", "Shett", "Sixskins",
                "Slynt", "Smallwood", "Snakes", "Snow", "Sparr", "Sphynx",
                "Spicer", "Stackspear", "Staedmon", "Stark", "Stilwood",
                "Stone", "Stonehouse", "Stonetree", "Stoops", "Storm", "Stout",
                "Suggs", "Sunderland", "Swann", "Swyft", "Tallhart",
                "Targaryen", "Tarly", "Tarth", "Tattersalt", "Tawney",
                "Templeton", "Tendyris", "Terys", "the", "Thorne", "Thumbs",
                "Tollett", "Torrent", "Toyne", "Trant", "Tully", "Tumitis",
                "Turnberry", "Tym", "Tyrell", "Uffering", "Uhoris", "Uller",
                "Umber", "Underleaf", "Vaith", "Vance", "Varner", "Vikary",
                "Volentin", "Volmark", "Votar", "Votyris", "Vypren", "Vyrwel",
                "Wagstaff", "Walder", "Watch", "Waters", "Waxley", "Wayn",
                "Waynwood", "Weaver", "Webber", "Wells", "Westerling", "Whent",
                "Willum", "Wode", "Woodwright", "Worm", "Wull", "Wylde",
                "Wynch", "Wythers", "XII", "Yarwyck", ""]},}
