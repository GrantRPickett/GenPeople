var person = {};
var people = [];
var personCount = 0
person.timeline = []
var DB = GOTDB
console.log(DB)
Date.prototype.getDOY = function() {
var onejan = new Date(this.getFullYear(),0,1)
return Math.ceil((this - onejan) / 86400000)
}
var d = new Date()
num = d.getDOY()*86400 + d.getHours()*60*60 + d.getMinutes()*60 +d.getSeconds()
hex = num.toString(16)
ctx.fillStyle = "rgba("+hex+")"
var runReqs =
function(person, pick, eventType) {
    var meetsReqs = true
    if ("requires" in pick) {
        for (req in pick.requires) {
            for (type in pick.requires[req]) {
                if (type == "is") {
                    if (pick.requires[req][type].constructor === Array) {
                        for (idx in pick.requires[req][type]) {
                            if (pick.requires[req][type][idx] != person[req]
                            && person[req] != "[Random]") {
                                meetsReqs = false
                                break;
                            }
                        }
                    } else {
                        if (pick.requires[req][type] != person[req]
                        && person[req] != "[Random]") {
                            meetsReqs = false
                            break;
                        }
                    }
                } else if (type == "not") {
                    if (pick.requires[req][type].constructor === Array) {
                        for (idx in pick.requires[req][type]) {
                            if (pick.requires[req][type][idx] == person[req]
                            && person[req] != "[Random]") {
                                meetsReqs = false
                                break;
                            }
                        }
                    } else {
                        if (pick.requires[req][type] == person[req]
                        && person[req] != "[Random]") {
                            meetsReqs = false
                            break;
                        }
                    }
                } else if (type == "under") {
                    if (pick.requires[req][type] < person[req]
                    && person[req] != "[Random]") {
                        meetsReqs = false
                        break;
                    }
                } else if (type == "above") {
                    if (pick.requires[req][type] < person[req]
                    && person[req] != "[Random]") {
                        meetsReqs = false
                        break;
                    }
                } else {
                    meetsReqs = false
                    break;
                }
            }
            if (!meetsReqs) {
                break;
            }
        }
    }
    console.log("dup?")
    for (i in person.timeline) {
        console.log("timeline: " + person.timeline[i]["event"] + " pick "
        + pick["event"])
        if (person.timeline[i]["event"] === pick["event"]) {
            meetsReqs = false
            console.log("dup!")
        }
    }
    if (meetsReqs) {
        if ("effect" in pick) {
            applyEffect(person, pick)
        }
        return pick
    } else return eventType(person)
};
var applyEffect =
function(person, pick) {
    console.log("effect: " + JSON.stringify(pick["effect"]))
    for (eff in pick.effect) {
        var start = person[eff]
        var str = pick.effect[eff]
        var type = ["+", "-", "=", "$"].indexOf(str[0])
        console.log(type)
        if (type == 0) {
            person[eff] = Number(person[eff]) + Number(str.slice(1))
            if (person[eff] > 100) {
                person[eff] = 100
            } else if (person[eff] < 0) {
                person[eff] = 0
            }
        } else if (type == 1) {
            person[eff] = Number(person[eff]) - Number(str.slice(1))
            if (person[eff] > 100) {
                person[eff] = 100
            } else if (person[eff] < 0) {
                person[eff] = 0
            }
        } else if (type == 2) {
            person[eff] = str.slice(1)
        } else if (type == 3) {
            person[eff] = str.slice(1)
        }
        var end = person[eff]
        var line
        if (start < 25 && end > 25) {
            person.timeline.push({
                "event":"More " + eff,
                "era":pick.era,
                "line":"I became more " + eff + " in my "
                + pick.era.toLowerCase() + " years."})
        } else if (start < 75 && end > 75) {
            person.timeline.push({
                "event":"More " + eff,
                "era":pick.era,
                "line":"I became more " + eff + " in my "
                + pick.era.toLowerCase() + " years."})
        } else if (start > 25 && end < 25) {
            person.timeline.push({
                "event":"Less " + eff,
                "era":pick.era,
                "line":"I became less " + eff + " in my "
                + pick.era.toLowerCase() + " years."})
        } else if (start > 75 && end < 75) {
            person.timeline.push({
                "event":"Less " + eff,
                "era":pick.era,
                "line":"I became less " + eff + " in my "
                + pick.era.toLowerCase() + " years."})
        }
        console.log(eff + person[eff])
    };
};
var chEvent = function(person) {
    var events = DB.childEvents
    var pick = events[Math.floor(Math.random() * events.length)]
    pick.era = "childhood"
    return runReqs(person, pick, chEvent)
};
var adEvent = function(person) {
    var events = DB.adoleEvents
    var pick = events[Math.floor(Math.random() * events.length)]
    pick.era = "adolescent"
    return runReqs(person, pick, adEvent)
};
var yaEvent = function(person) {
    var events = DB.yngAdEvents
    var pick = events[Math.floor(Math.random() * events.length)]
    pick.era = "young adult"
    return runReqs(person, pick, yaEvent)
};
var maEvent = function(person) {
    var events = DB.midAdEvents
    var pick = events[Math.floor(Math.random() * events.length)]
    pick.era = "mid-life"
    return runReqs(person, pick, maEvent)
};
var elEvent = function(person) {
    var events = DB.elderEvents
    var pick = events[Math.floor(Math.random() * events.length)]
    pick.era = "elder years"
    return runReqs(person, pick, elEvent)
};
var addEvents =
function(person) {
    if (person.region == "[Random]" || person.region == null)
        person.region =
        DB.regions[Math.floor(Math.random() * DB.regions.length)]
    if (person.region != "North of the Wall") addHouse(person)
    if (person.social == "[Random]")
        person.social =
        DB.classes[Math.floor(Math.random() * DB.classes.length)]
    person.timeline.push(chEvent(person))
    person.timeline.push(chEvent(person))
    if (person.age != "childhood") {
        person.timeline.push(adEvent(person));
        person.timeline.push(adEvent(person));
        person.timeline.push(adEvent(person));
    } else return


    if (person.age != "adolescent") {
        person.timeline.push(yaEvent(person));
        person.timeline.push(yaEvent(person));
        person.timeline.push(yaEvent(person));
    } else return;
    if (person.job == "[Random]") {
        person.job = DB.jobs[Math.floor(Math.random() * DB.jobs.length)]
    }
    if (person.age != "young adult") {
        person.timeline.push(maEvent(person));
        person.timeline.push(maEvent(person));
        person.timeline.push(maEvent(person));
    } else return;
    if (person.age != "mid-life") {
        person.timeline.push(elEvent(person));
        person.timeline.push(elEvent(person));
        person.timeline.push(elEvent(person));
    } else return;
}
var rand = ["[Random]"];
var formObj =
function() {
    hackObj = $.extend({}, {"num":personCount});
    formIdx = hackObj.num
    console.log("FORMOBJ!" + formIdx)
    // $("form > div").remove();
    $('#form')
    .jsonForm(
    {
        "schema":{
            "RandomPeople":{"type":'string', "title":'RandomPeople'},
            "people":{
                "type":"array",
                "items":{
                    "type":"object",
                    "title":"Person",
                    "properties":{
                        "firstName":{"title":"First Name", "type":"string"},
                        "lastName":{"title":"Last Name", "type":"string"},
                        "social":{"title":"Social Class", "type":"string",
                            "enum":rand.concat(DB.classes)},
                        "region":{"title":"Region", "type":"string",
                            "enum":rand.concat(DB.regions)},
                        "job":{"title":"Job", "type":"string",
                            "enum":rand.concat(DB.jobs)},
                        "age":{"title":"Age Category", "type":"string",
                            "enum":rand.concat(DB.ages)},
                        "variance":{"title":"variance", "minimum":0,
                            "type":"range", "maximum":100},
                        "perceptive":{"title":"perceptive", "minimum":0,
                            "type":"range", "maximum":100},
                        "creative":{"title":"creative", "minimum":0,
                            "type":"range", "maximum":100},
                        "intelligent":{"title":"inteligent", "minimum":0,
                            "type":"range", "maximum":100},
                        "organized":{"title":"organized", "minimum":0,
                            "type":"range", "maximum":100},
                        "diligent":{"title":"diligent", "minimum":0,
                            "type":"range", "maximum":100},
                        "reliable":{"title":"reliable", "minimum":0,
                            "type":"range", "maximum":100},
                        "energetic":{"title":"energetic", "minimum":0,
                            "type":"range", "maximum":100},
                        "assertive":{"title":"assertive", "minimum":0,
                            "type":"range", "maximum":100},
                        "popular":{"title":"popular", "minimum":0,
                            "type":"range", "maximum":100},
                        "gentle":{"title":"gentle", "minimum":0,
                            "type":"range", "maximum":100},
                        "trusting":{"title":"trusting", "minimum":0,
                            "type":"range", "maximum":100},
                        "generous":{"title":"generous", "minimum":0,
                            "type":"range", "maximum":100},
                        "content":{"title":"content", "minimum":0,
                            "type":"range", "maximum":100},
                        "emotional":{"title":"emotional", "minimum":0,
                            "type":"range", "maximum":100},
                        "brave":{"title":"brave", "minimum":0, "type":"range",
                            "maximum":100},
                        "tall":{"title":"tall", "minimum":0, "type":"range",
                            "maximum":100},
                        "large":{"title":"large", "minimum":0, "type":"range",
                            "maximum":100},
                        "hairy":{"title":"hairy", "minimum":0, "type":"range",
                            "maximum":100},
                        "dirty":{"title":"dirty", "minimum":0, "type":"range",
                            "maximum":100},
                        "sick":{"title":"sick", "minimum":0, "type":"range",
                            "maximum":100},
                        "agile":{"title":"agile", "minimum":0, "type":"range",
                            "maximum":100},
                        "beautiful":{"title":"beautiful", "minimum":0,
                            "type":"range", "maximum":100},
                        "muscular":{"title":"muscular", "minimum":0,
                            "type":"range", "maximum":100},
                        "hair color":{"title":"hair color", "type":"string",
                            "enum":rand.concat(DB["hair colors"])},
                        "eye color":{"title":"eye color", "type":"string",
                            "enum":rand.concat(DB["eye colors"])},
                        "injury":{"title":"injury", "type":"string",
                            "enum":rand.concat(DB.injuries)},
                        "childTone":{"title":"Childhood", "type":"string",
                            "enum":["[Random]", "Positive", "Negative"]},
                        "adoleTone":{"title":"Adolescence", "type":"string",
                            "enum":["[Random]", "Positive", "Negative"]},
                        "yngAdTone":{"title":"Young Adulthood",
                            "type":"string",
                            "enum":["[Random]", "Positive", "Negative"]},
                        "midAdTone":{"title":"Mid-Life", "type":"string",
                            "enum":["[Random]", "Positive", "Negative"]},
                        "elderTone":{"title":"Elder Years", "type":"string",
                            "enum":["[Random]", "Positive", "Negative"]}}}}},
        // "value":{"people[].firstName":person.firstName,
        // "lastName":person.lastName,
        // "people[].job":person.job, "region":person.region, "age":person.age,
        // "people[].social":person.social, "childTone":person.childTone,
        // "people[].adoleTone":person.adoleTone, "yngAdTone":person.yngAdTone,
        // "people[].midAdTone":person.midAdTone, "elderTone":person.elderTone,
        // "people[].injury":person.injury, "eye color":person["eye color"],
        // "people[].hair color":person["hair color"]},
        "form":[
            "RandomPeople",
            {
                "type":"tabarray",
                "items":{
                    "type":"section",
                    "items":[
                        {
                            "type":"fieldset",
                            "title":"Basics",
                            "expandable":true,
                            "items":["people[].firstName", "people[].lastName",
                                "people[].age", "people[].job",
                                "people[].region", "people[].social"]},
                        {
                            "type":"fieldset",
                            "title":"Traits",
                            "expandable":true,
                            "items":[
                                {"key":"people[].variance", "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].large", "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].tall", "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].hairy", "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].sick", "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].dirty", "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].agile", "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].muscular", "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].beautiful",
                                    "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                "people[].hair color",
                                "people[].eye color",
                                "people[].injury",
                                {"key":"people[].perceptive",
                                    "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].creative", "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].intelligent",
                                    "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].organized",
                                    "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].diligent", "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].reliable", "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].energetic",
                                    "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].assertive",
                                    "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].popular", "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].gentle", "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].trusting", "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].generous", "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].content", "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].emotional",
                                    "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }},
                                {"key":"people[].brave", "description":"50",
                                    "onChange":function(evt) {
                                        func(evt)
                                    }}]},
                        {
                            "type":"fieldset",
                            "title":"Eras",
                            "expandable":true,
                            "items":["people[].childTone",
                                "people[].adoleTone", "people[].yngAdTone",
                                "people[].midAdTone", "people[].elderTone"]}]}},
            {"type":"actions", "items":[{"type":"submit", "title":"Save"}]}],
        "onSubmitValid":function(values) {
            console.log(JSON.stringify(values))
            people = values["people"]
            var int = values["RandomPeople"]
            console.log("INT: " + int)
            for (var i = 0; i < int; i++) {
                console.log("Loop: ");
                people.push(jQuery.extend(true, {}, DB.samplePerson))
            }
            for (idx in people) {
                person = people[idx]
                applyVariance(person)
                person.index = idx
                person.plot = []
                if (person.gender == null) {
                    person.gender =
                    DB.gender[Math.floor(Math.random() * DB.gender.length)]
                }
                if (person.firstName == null)
                    if (person.gender == "male") {
                        person.firstName =
                        DB.names.male[Math.floor(Math.random()
                        * DB.names.male.length)]
                    } else {
                        person.firstName =
                        DB.names.female[Math.floor(Math.random()
                        * DB.names.female.length)]
                    }
                if (person.lastName == null)
                    person.lastName =
                    DB.names.last[Math.floor(Math.random()
                    * DB.names.last.length)]
                if (person.age == "[Random]")
                    person.age =
                    DB.ages[Math.floor(Math.random() * DB.ages.length)]
                console.log(person)
                person.marriage = "none"
                person.timeline = []
                addEvents(person);
                eventStr = cleanPrintEvents(person)
            }
            $('#res')
            .html(
            '<p>Hello '
            + person.firstName
            + " "
            + person.lastName
            + ", "
            + person.age
            + " "
            + person.social
            + " "
            + person.gender
            + " "
            + ((["young adult", "mid-life", "elder years"].indexOf(person.age) > -1)
            ? person.job : "person") + " from " + person.region
            + "<br>Timeline: " + eventStr + '</p>'
            + "<br>Inform code below:<br>");
            // fillPlot();
            $("#inform").html(printInform(people))
        }})
};
var weightedSelect = function(items, n) {
    "Used for weighted random selection, data much be in the form [Prob, Val...]"
    total = 0.0;
    i = 0
    results = []
    // overcomplicated in case of future exclusion logic being in third+
    // location of item array
    for (w in items) {
        total += items[i]["selectWeight"] | 1
        i += 1
    }
    i = 0
    w = items[i]["selectWeight"] | 1
    v = items[i]
    while (n > 0) {
        x = total * (random.random())
        while (x > w) {
            x -= w
            i += 1
            w = items[i]["selectWeight"] | 1
            v = items[i]
        }
        i = 0
        results.push(v)
        n -= 1
    }
    return results
};
var doCorrelations = function(person, age) {
    for (var i = 0; i < person.corr.age.length; i++) {
        if (random.random() <= person.corr.age[item].chance) {
            addItem(person, person.corr.age[item], "timeline")
        }
    }
};
var addItem = function(person, item, location) {
    person.location.push(item)
    if (item.corr) {
        for (var i = 0; i < item.corr.length; i++) {
            for (var j = 0; j < item.corr[i].length; i++) {
                person.corr[i].push(item.corr[i][j])
            }
        }
    }
};
var addHouse =
function(person) {
    console.log(person.region)
    person.house =
    DB.houses[person.region][Math.floor(Math.random()
    * DB.houses[person.region].length)]
};
var func = function(evt) {
    var value = $(evt.target).val();
    person.age = value
    $(evt.target.nextSibling).html(value.toString())
};
var personId = function(person) {
    var id = "", val;
    for (trait in person) {
        val = person[trait]
        if (!$.isNumeric(val)) {
            continue;
        }
        id += val
    };
    console.log(id)
    return id
};
var applyVariance = function(values) {
    for (trait in values) {
        org = values[trait]
        if (trait == "variance") {
            continue;
        }
        if (!$.isNumeric(org)) {
            continue;
        }
        var rand = Math.floor(Math.random() * values["variance"]);
        var sign = (Math.floor(Math.random() * 2) == 0) ? -1 : 1;
        var temp = (org - sign * rand);
        if (temp > 100) temp = 100
        else if (temp < 0) temp = 0
        values[trait] = temp;
    };
};
var printInform =
function(people) {
    inform =
    'NPCAgency by Grant Pickett begins here.<br><br>'
    + 'Include Conversation Rules by Eric Eve.<br>'
    + 'Instead of asking someone about something:<br>'
    + 'follow the unknown quizzing rule of the noun.<br>'
    + 'Instead of telling someone about something:<br>'
    + 'follow the unknown informing rule of the noun.<br>'
    + 'Clothing is a kind of thing. Clothing is wearable.<br>'
    + 'childhood is a familiar subject.<br>'
    + 'adolescence is a familiar subject.<br>'
    + 'young adulthood is a familiar subject.<br>'
    + 'mid-life is a familiar subject.<br>'
    + 'elder years is a familiar subject.<br>'
    + 'home is a familiar subject.<br>' + 'others is a familiar subject.<br>'
    + 'job is a familiar subject.<br>'
    for (per in people) {
        person = people[per]
        person.mood = DB.moods[Math.floor(Math.random() * DB.moods.length)]
        console.log("inform loop:" + JSON.stringify(people[per]))
        inform +=
        '<br>ComplexNPC'
        + person.index
        + ' is a '
        + person.gender
        + ' person.<br>'
        + 'The printed name of ComplexNPC'
        + person.index
        + ' is "'
        + person.firstName
        + " "
        + person.lastName
        + '".<br>'
        + 'Understand "'
        + person.firstName
        + " "
        + person.lastName
        + '" and "'
        + person.firstName
        + '" as ComplexNPC'
        + person.index
        + '. <br>'
        + 'The description is '
        + parse(person, formDescription(person))
        + ".<br>"
        + 'The quizzing table is the Table of ComplexNPC'
        + person.index
        + ' Answers.<br>'
        + 'The informing table is the Table of ComplexNPC'
        + person.index
        + ' Remarks.<br>'
        + 'The unknown quizzing rule is the ComplexNPC'
        + person.index
        + ' default-quiz-response rule. <br>'
        + 'The unknown informing rule is the ComplexNPC'
        + person.index
        + ' default-inform-response rule. <br>'
        + 'This is the ComplexNPC'
        + person.index
        + ' default-quiz-response rule: <br>'
        + 'show the next response from the Table of ComplexNPC'
        + person.index
        + ' Default Quiz Responses. <br>'
        + 'This is the ComplexNPC'
        + person.index
        + ' default-inform-response rule: <br>'
        + 'show the next response from the Table of ComplexNPC'
        + person.index
        + ' Default Inform Responses. <br>'
        + '<br>Table of ComplexNPC'
        + person.index
        + ' Remarks<br>'
        + 'subject&Tab;response rule&Tab;response&Tab;table&Tab;suggest<br>'
        + 'ComplexNPC'
        + person.index
        + '&Tab;ComplexNPC'
        + person.index
        + ' tell-self rule&Tab;--&Tab;-1<br><br>'
        + 'Table of ComplexNPC'
        + person.index
        + ' Default Quiz Responses<br>'
        + 'response<br>'
        + '"'
        + person.firstName
        + ' looks annoyed by your question, for some reason, and declines to answer."<br><br>'
        + 'This is the ComplexNPC'
        + person.index
        + ' ask-self rule:<br>'
        + 'say "I am feeling '
        + person.mood
        + ' today, thanks for asking."<br>'
        + 'This is the ComplexNPC'
        + person.index
        + ' tell-self rule:<br>'
        + 'say "I know about myself already."<br>'
        + formSubjects(person)
        + "<br>"
        + '<br>'
        + 'After saying hello to ComplexNPC'
        + person.index
        + ' :<br>'
        + 'say "'
        + addGreeting(person)
        + '";<br>'// addGreeting
        + 'if the greeting type is explicit, follow the standard list suggested topics rule.<br>'
        + 'After saying goodbye to ComplexNPC' + person.index
        + ' when the farewell type is explicit:<br>' + 'say "Farewell".<br>';
    }
    inform += 'NPCAgency ends here.';
    return inform
};
var addGreeting =
function(person) {
    return DB.greetings[Math.floor(Math.random() * DB.greetings.length)]
    + " I'm " + person.firstName + ". "
    + DB.greetings2[Math.floor(Math.random() * DB.greetings2.length)];
};
var cleanPrintEvents =
function(person) {
    var str = "<br>"
    for (item in person.timeline) {
        str +=
        person.timeline[item]["era"] + ": " + person.timeline[item]["event"]
        + "<br>"
    }
    return str
};
var formSubjects =
function(person) {
    var ageIndex = DB.ages.indexOf(person.age)
    var child = [], adole = [], yngAd = [], midAd = [], elder = [];
    for (event in person.timeline) {
        if (person.timeline[event]["era"] == "childhood") {
            child.push(person.timeline[event])
        } else if (person.timeline[event]["era"] == "adolescent") {
            adole.push(person.timeline[event])
        } else if (person.timeline[event]["era"] == "young adult") {
            yngAd.push(person.timeline[event])
        } else if (person.timeline[event]["era"] == "mid-life") {
            midAd.push(person.timeline[event])
        } else if (person.timeline[event]["era"] == "elder years") {
            elder.push(person.timeline[event])
        }
    }
    others = ""
    start = "Table of ComplexNPC" + person.index + " ";
    inform =
    '<br><br>Table of ComplexNPC' + person.index
    + ' Default Inform Responses<br>' + 'response<br>'
    + '"Sounds Interesting."<br><br>'
    if (person.job && person.job != "[Random]") {
        inform +=
        '<br>Table of ComplexNPC'
        + person.index
        + ' job<br>'
        + 'response<br>'
        + parse(person, '"I am a {get() job}."<br>'
        + '"That is about it.[quiz job to -1]"<br>')
    }
    if (people.length > 1) {
        inform +=
        '<br><br>Table of ComplexNPC' + person.index + ' others<br>'
        + 'response<br>' + fillOthers(person)
        + '"That is about it.[quiz others to -1]"<br>'
    }
    /*
     * if(person.plot) { inform +='<br>plot is a familiar subject.<br>' + '<br>Table
     * of ComplexNPC' + person.index + ' plot<br>' + 'response<br>' +
     * fillPlotLines(person) + '<br>' }
     */
    inform +=
    '<br>life is a familiar subject.<br>' + '<br>Table of ComplexNPC'
    + person.index + ' life<br>' + 'response<br>'
    + '"You can ask me about different times in my life.[convnode CNPC'
    + person.index + '-life-node]"<br>'
    inform +=
    '<br><br>Table of ComplexNPC' + person.index + ' home<br>' + 'response<br>'
    + '"I am from '
    + DB["cities"][Math.floor(Math.random() * DB["cities"].length)]
    + person.region + '"<br>'
    if (person.region != "North of the Wall") {
        inform +=
        '"I live in the lands of the ' + person.house.rank + ' House '
        + person.house.name + '"<br>'
        inform += '"Our sigil is ' + person.house.sigil + '"<br>'
    }
    inform += '"' + DB.regionLines[person.region] + '[quiz home to -1]"<br>'
    inform +=
    '<br>Table of ComplexNPC' + person.index + ' childhood<br>'
    + 'response<br>'
    inform +=
    '"I was born in '
    + (280 - Math.floor(Math.random() * (DB.ages.indexOf(person.age) + 1) * 15))
    + ' to a ' + person.social + ' family."<br>';
    for (event in child) {
        inform += '"' + parse(person, child[event]["line"]) + '"<br>'
    }
    if (child.length > 0)
        inform += '"That is about it.[quiz childhood to -1]"<br>'
    if (adole.length > 0) {
        inform +=
        '<br><br>Table of ComplexNPC' + person.index + ' adolescence<br>'
        + 'response<br>'
        others += ", adolescence,"
    }
    for (event in adole) {
        inform += '"' + parse(person, adole[event]["line"]) + '"<br>'
    }
    if (adole.length > 0)
        inform += '"That is about it.[quiz adolescence to -1]"<br>'
    if (yngAd.length > 0) {
        person.hobby =
        DB["hobbies"][Math.floor(Math.random() * DB["hobbies"].length)]
        inform +=
        '<br><br>Table of ComplexNPC' + person.index + ' young adulthood<br>'
        + 'response<br>' + '"I became interested in ' + person.hobby + '."<br>'
        others += " young adulthood,"
    }
    for (event in yngAd) {
        inform += '"' + parse(person, yngAd[event]["line"]) + '"<br>'
    }
    if (yngAd.length > 0)
        inform += '"That is about it.[quiz young adulthood to -1]"<br>'
    if (midAd.length > 0) {
        inform +=
        '<br><br>Table of ComplexNPC' + person.index + ' mid-life<br>'
        + 'response<br>'
        others += " mid-life,"
    }
    for (event in midAd) {
        inform += '"' + parse(person, midAd[event]["line"]) + '"<br>'
    }
    if (midAd.length > 0)
        inform += '"That is about it.[quiz mid-life to -1]"<br>'
    if (elder.length > 0) {
        inform +=
        '<br><br>Table of ComplexNPC' + person.index + ' elder years<br>'
        + 'response<br>'
        others += " elder years,"
    }
    for (event in elder) {
        inform += '"' + parse(person, elder[event]["line"]) + '"<br>'
    }
    if (elder.length > 0)
        inform += '"That is about it.[quiz elder years to -1]"<br>'
        /* console.log("PLOT" +person.plot.nodes[0]) */
        /*
         * for(node in person.plot.nodes){ if(person.plot.nodes[node]) {
         * inform+= buildNode(person, person.plot.nodes[node]) } }
         */
    inform +=
    '<br><br>Table of ComplexNPC' + person.index + ' Answers <br>'
    + 'subject    &Tab;response rule  &Tab;response table &Tab;suggest <br>'
    + 'ComplexNPC' + person.index + ' &Tab;ComplexNPC' + person.index
    + ' ask-self rule   &Tab;-- &Tab;1<br>'
    + 'home&Tab;--&Tab;Table of ComplexNPC' + person.index + ' home&Tab;9<br>'
    if (people.length > 1) {
        inform +=
        'others&Tab;--&Tab;Table of ComplexNPC' + person.index
        + ' others&Tab;9<br>'
    }
    /*
     * if(person.plot){ inform+= 'plot&Tab;--&Tab;Table of ComplexNPC' +
     * person.index+ ' plot&Tab;9<br>' }
     */
    inform +=
    'life&Tab;--&Tab;Table of ComplexNPC' + person.index + ' life&Tab;9<br>'
    inform +=
    'childhood&Tab;--&Tab;Table of ComplexNPC' + person.index
    + ' childhood&Tab;9<br>';
    if (person.job && person.job != "[Random]")
        inform +=
        'job&Tab;--&Tab;Table of ComplexNPC' + person.index + ' job&Tab;9<br>'
    if (adole.length > 0)
        inform +=
        'adolescence&Tab;--&Tab;Table of ComplexNPC' + person.index
        + ' adolescence&Tab;9<br>';
    if (yngAd.length > 0)
        inform +=
        'young adulthood&Tab;--&Tab;Table of ComplexNPC' + person.index
        + ' young adulthood&Tab;9<br>';
    if (midAd.length > 0)
        inform +=
        'mid-life&Tab;--&Tab;Table of ComplexNPC' + person.index
        + ' mid-life&Tab;9<br>';
    if (elder.length > 0)
        inform +=
        'elder years&Tab;--&Tab;Table of ComplexNPC' + person.index
        + ' elder years&Tab;9<br>';
    inform +=
    '<br><br>Table of Table Types (continued)<br>'
    + 'tabname&Tab;index&Tab;tabtype<br>' + 'Table of ComplexNPC'
    + person.index + ' Default Quiz Responses&Tab;0&Tab;stop-list<br>'
    + 'Table of ComplexNPC' + person.index
    + ' Default Inform Responses&Tab;0&Tab;stop-list<br>'
    + 'Table of ComplexNPC' + person.index + ' life&Tab;0&Tab;stop-list<br>'
    + start + "childhood" + "&Tab;0&Tab;stop-list<br>"
    /*
     * if (person.plot) inform += start + "plot" + "&Tab;0&Tab;stop-list<br>"
     */
    inform += start + "home" + "&Tab;0&Tab;stop-list<br>"
    if (person.job && person.job != "[Random]")
        inform += start + "job" + "&Tab;0&Tab;stop-list<br>"
    if (adole.length > 0)
        inform += start + "adolescence" + "&Tab;0&Tab;stop-list<br>"
    if (yngAd.length > 0)
        inform += start + "young adulthood" + "&Tab;0&Tab;stop-list<br>"
    if (midAd.length > 0)
        inform += start + "mid-life" + "&Tab;0&Tab;stop-list<br>"
    if (elder.length > 0)
        inform += start + "elder years" + "&Tab;0&Tab;stop-list<br>"
    if (people.length > 1)
        inform += start + "others" + "&Tab;0&Tab;stop-list<br>"
    inform +=
    '<br>The CNPC'
    + person.index
    + '-life-node-r is a rulebook.'
    + 'The CNPC'
    + person.index
    + '-life-node is a Conversation Node. The suggestions are "say childhood'
    + others + ' or are you asking in general?" The node rule is the CNPC'
    + person.index + '-life-node-r rules.<br>'
    +'node-termination for The CNPC'
    + person.index
    + '-life-node when going:<br>'
    + 'say "[convnode null-node]".<br>'
    +'node-termination for The CNPC'
    + person.index
    + '-life-node when saying goodbye to someone:<br>'
    +'say "[convnode null-node]".<br>'
    inform +=
    '<br>A CNPC' + person.index
    + '-life-node-r rule when the topic understood matches "childhood": <br>'
    + 'show the next response from the Table of ComplexNPC'
    + person.index + ' childhood;<br>'
    + 'say "[convnode null-node]";<br>' + 'rule succeeds.<br>'
    if (adole.length > 0) {
        inform +=
            '<br>A CNPC' + person.index
            + '-life-node-r rule when the topic understood matches "adolescence": <br>'
            + 'show the next response from the Table of ComplexNPC'
            + person.index + ' adolescence;<br>'
            + 'say "[convnode null-node]";<br>' + 'rule succeeds.<br>'
    }
    if (yngAd.length > 0) {
        inform +=
            '<br>A CNPC' + person.index
            + '-life-node-r rule when the topic understood matches "young adulthood": <br>'
            + 'show the next response from the Table of ComplexNPC'
            + person.index + ' young adulthood;<br>'
            + 'say "[convnode null-node]";<br>' + 'rule succeeds.<br>'
    }
    if (midAd.length > 0) {
        inform +=
           ' <br>A CNPC' + person.index
            + '-life-node-r rule when the topic understood matches "mid-life": <br>'
            + 'show the next response from the Table of ComplexNPC'
            + person.index + ' mid-life;<br>'
            + 'say "[convnode null-node]";<br>' + 'rule succeeds.<br>'
    }
    if (elder.length > 0) {
        inform +=
        '<br>A CNPC' + person.index
        + '-life-node-r rule when the topic understood matches "elder years": <br>'
        + 'show the next response from the Table of ComplexNPC'
        + person.index + ' elder years;<br>'
        + 'say "[convnode null-node]";<br>' + 'rule succeeds.<br>'
    }
    person.mood = DB.moods[Math.floor(Math.random() * DB.moods.length)]
    inform += 'The last CNPC' + person.index
    + '-life-node-r rule:<br>' + 'say "In general? I would say I feel '
    + person.mood + '";<br> say "[convnode null-node]";' + 'rule succeeds.<br>'
    return inform;
}
var buildNode =
function(person, node) {
    console.log("NODE" + node.name)
    nodeName = "ComplexNPC" + person.index + node.name
    inform =
    "<br>The " + nodeName + "-r is a rulebook. The " + nodeName
    + " is a Conversation Node. " + 'The suggestions are "' + node.suggestion
    + '". ' + "The node rule is the " + nodeName + "-r rules. "
    if(node.closed) {
        inform+="Default response for " +nodeName+":"
            'say "Do not try to change the subject!"'
        // needs improvement
    }
    else {
        inform+='node-termination for The CNPC'
        + person.index
        + '-life-node when going:<br>'
        + 'say "[convnode null-node]".<br>'
        +'node-termination for The CNPC'
        + person.index
        + '-life-node when saying goodbye to someone:<br>'
        +'say "[convnode null-node]".<br>'
    }
    for(branch in node.branches.topics){
        inform +=
            '<br>A CNPC' + person.index
            + '-life-node-r rule when the topic understood matches "' + node.branches.topics[branch] + '":'
            + 'show the next response from the Table of ComplexNPC'
            + person.index +" "+node.branches[branch] +';<br>'
            if(node.branches.nodes[branch]){
                inform+= 'say "[convnode '+ node.branches.nodes[branch].name+']";<br>' + 'rule succeeds.<br>'
            }else {
                inform+= 'say "[convnode null-node]";<br>' + 'rule succeeds.<br>'
            }
    }
    "The last " + nodeName + "-r rule: " + 'say "What?"; ' + "rule succeeds. "
    return inform
};
var parse =
function(person, line) {
    console.log("Parse " + line)
    var regex = /{.+?}/, repl = ""
    var group = regex.exec(line);
    if (group != null) {
        method = group[0].split(' ')
        if (method[0] == "{rand()") {
            repl =
            str(random.randrange(int(method[1]), int(method[2].slice(0, -1))))
        }
        if (method[0] == "{get()") {
            method.shift()
            code = "person"
            method[method.length - 1] = method[method.length - 1].slice(0, -1)
            for (word in method) {
                code += '["' + method[word] + '"]'
            }
            console.log("Parse get code " + code)
            repl = eval(code)
            console.log("Parse get replacement " + repl)
        }
        line = line.replace(regex, repl)
    }
    console.log("Parse End" + line)
    return line;
};
var fillOthers =
function(person) {
    var str = ""
    usedTraits = []
    for (per in people) {
        if (people[per].index != person.index) {
            for (i = 0; i < 3; i++) {
                keys = Object.keys(people[per])
                randKey = keys[Math.floor(Math.random() * keys.length)]
                var trait = people[per][randKey]
                console.log("TTT:" + randKey + trait)
                if (DB.mentalTraits.indexOf(randKey) > -1) {
                    if (usedTraits.indexOf(randKey) == -1) {
                        var not =
                        (trait > 75) ? "" : (trait < 25) ? "not " : "somewhat "
                        str +=
                        '"' + people[per].firstName + " is " + not + randKey
                        + '"<br>'
                        usedTraits.push(randKey)
                    }
                }
            }
        }
        usedTraits = []
    }
    return str
};
var fillPlot =
function() {
    startP = people[0]
    console.log(people.length)
    if (people.length == 1) {
        console.log("solot")
        startP.plot =
        DB["solo-plots"][Math.floor(Math.random() * DB["solo-plots"].length)]
    } else {
        console.log("multiplot" + people[1])
        startP.plot =
        DB["multi-plots"][Math.floor(Math.random() * DB["multi-plots"].length)]
        otherP = people[1]
        otherP.plot = startP.plot.other
    }
};
var fillPlotLines = function(person) {
    inform = ""
    for (line in person.plot.lines) {
        parseLine = parse(person, person.plot.lines[line])
        inform += '"' + parseLine + '"<br>'
    }
    return inform
};
var formDescription =
function(person) {
    str =
    "This person is wearing " + DB.clothes[person.job] + " "
    + DB.clothes[person.social] + " ";
    for (val in person) {
        if (DB.physicalTraits.indexOf(val) > -1) {
            if (val == "variance") {
                continue;
            }
            if (person[val] > 75) {
                str += "This person is " + val + ". "
            }
            if (person[val] < 25) {
                str += "This person is not " + val + ". "
            }
        }
    }
    return '"' + str + '"'
};
formObj()
var filename = ""
// Load a JSON document
FileReaderJS.setupInput(document.getElementById('loadDocument'), {
    readAsDefault:'Text', on:{load:function(event, file) {
        json = event.target.result
        person = JSON && JSON.parse(json) || $.parseJSON(json);
        formObj();
    }}});
// Save a JSON document
document.getElementById('saveDocument').onclick = function() {
    var json = JSON.stringify(people)
    var blob = new Blob([json], {type:'application/json;charset=utf-8'});
    if (filename) {
        saveAs(blob, filename);
    } else {
        saveAs(blob, 'document.json');
    }
};
document.getElementById('saveInform').onclick = function() {
    var inform = $('#inform').html().replace(/<br\s*\/?>/ig, "\r\n")
    if (inform.length <= 0) return
    var blob = new Blob([inform], {type:'text/plain;charset=utf-8'});
    if (filename) {
        saveAs(blob, filename);
    } else {
        saveAs(blob, 'document.i7x');
    }
};