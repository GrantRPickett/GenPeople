# -*- coding: utf-8 -*-
"""
Created on Fri Nov 14 15:13:31 2014

@author: Grant
"""
import json
import random
import re

def main():
    #Turn data scraps into n people
    with open('source.json') as f:
        data = f.read()
        source = json.loads(data)
        
    #import existing people and persist them        
    with open('people.json', 'w+') as f:
        data = f.read()
        if(len(data) > 0):
            di = json.loads(data)
        else:
            di = {}
        
    i = 0;
    if(len(di) == 0):
        di["people"] = []
        
    #loop to add new generated people
    di["people"].append({})
    
    person = di["people"][i];
    person["detailList"] = []
    person["name"] = {}
    person["name"]["first"] = selectRandObj(source["names"]["first"])
    person["name"]["last"] = selectRandObj(source["names"]["last"])
    person["correlations"] =[]
    person["exclusions"] = []
    person["home"] = selectProbObj(source["homes"])
    person["profession"] = selectProbObj(source["jobs"])
    person["subjects"] = []
    person["answers"] = setupAnswer(person["subjects"])
    person["remarks"] = setupAnswer(person["subjects"])
    person["default-ask"] = [{
                    "text": "The traveller looks annoyed by your question, for some reason, and declines to answer.",
                    "topics": []}]
    person["default-tell"] = [{
                    "text": "Sounds Interesting",
                    "topics": []}]
    #{"Child Death"},{"Death of Spouse"},{"War"},{"Injury"},{"Death"},{"Financial Ruin"}
    # {"GoodMarriage"},{"BadMarriage"},    {"NeutralMarriage"},    {"EarlyMarriage"},    {"ForcedMarriage"},    {"LateMarriage"}
    person["greeting"] = "hello"#greetingLine(person, source)
    person["farewell"] = "goodbye"#farewellLine(person, source)
    #create subjects person will know about
    person["class"] = addRandObjwithExclusions(source["classes"], [], \
       person["correlations"], person["exclusions"],"class",True)
    person["physical"] = []
    for v in range(2):
        person["physical"] .append(addRandObjwithExclusions(source["physical"], person["physical"],\
        person["correlations"],person["exclusions"],"physical", False))
    person["social"] = []
    person["mental"] = []
    for v in range(2):
        person["mental"].append(addRandObjwithExclusions(source["mental"], person["mental"], \
        person["correlations"],person["exclusions"],"mental",False))
    person["events"] = []
    person["events"].append(addRandObjwithExclusions(source["childEvents"], person["events"], \
        person["correlations"],person["exclusions"],"childEvents",False))
    person["lord"] = {}
    person["lord"]["first"] = selectRandObj(source["names"]["first"])
    person["lord"]["last"] = selectRandObj(source["names"]["last"])
    
    person["description"] = createDescription(person, ["physical","mental"])
    #fill subject tables
    #createSubject(person, source)
    
    #fix the hardcoded subjects to be also imported
    homeSubject = {"subject": "home","lines": [{"text": "I am from "+person["home"]["location"],
                    "topics": [{"topic": "home","suggest": "3"}], "node": ""},{
                    "text": "My family serves Lord "+person["lord"]["last"],
                    "topics": [],"node": ""}],"list type":"stop-list","familiar": True}
    person["subjects"].append(homeSubject)
    
    
    jobSubject = {"subject": "livelihood","lines": [{"text": "I am a "+person["profession"]["detail"]+".",
                    "topics":[],"node": ""},{
                    "text": "I am a "+person["class"]["detail"] +".",
                    "topics": [],"node": ""}],"list type": "stop-list","familiar": True}
    person["subjects"].append(jobSubject)
    
    childhoodSubject = createSubject(source, "childhood", person)
    
    person["subjects"].append(childhoodSubject)   
    
    #createLine(person, source, subject)
    #add subjects to answers/remarks
    for subject in person["subjects"]:
        if(subject["familiar"]):
            temp = {}
            temp["subject"] = subject["subject"]
            temp["suggest"] = len(subject["lines"])
            person["answers"].append(temp)
    i+=1
    #endloop

    with open('testOut.json', 'w+') as outfile:
        json.dump(di, outfile, indent=2, sort_keys=True)

def addCorrelations(source, cor):
    i=0
    if(len(dest)> 0):
        for item in dest:
            incl.append(dest[i]["detail"])
            i+=1
            
    #get relevant exclusions
    i=0    
    if(len(exclusions)> 0):
        for exItem in exclusions:
            if(exItem and exItem["category"] == tableName):        
                exc.append(exclusions[i]["detail"])
                i+=1
    for link in cor:
        if (random.random()<cor["selectWeight"]):
            code = "person"
            for piece in cor["path"]:
                code += '["'+piece+'"]'
            toAdd = eval(code)
            if ((toAdd["detail"] in exc) or (toAdd["detail"] in incl)) :
                continue     
            if 'exclusions' in toAdd:
                for newExItem in toAdd["exclusions"]:
                    exclusions.append(newExItem)
            if 'correlations' in toAdd: 
                for newCorItem in toAdd["correlations"]:
                    correlations.append(newCorItem)

def createDescription(person, traitTables):
    des = ""
    i=0
    for table in traitTables :
        for trait in person[traitTables[i]]:
            des += trait["description"]+ ". "
        i+=1
    return des[:-1] 

def selectProbObj(whichArray):
  for i in weighted_sample(whichArray, 1):
      return(i)

def selectRandObj(whichArray):
    return random.choice(whichArray)
    
def addRandObjwithExclusions(fromWhich, dest, correlations, exclusions, tableName, weights):
    """Exclusions are reciprocal"""
    exc = []
    incl = []
    i = 0
    #get curent list to prevent repeats
    if(len(dest)> 0):
        for item in dest:
            incl.append(dest[i]["detail"])
            i+=1
            
    #get relevant exclusions
    i=0    
    if(len(exclusions)> 0):
        for exItem in exclusions:
            if(exItem and exItem["category"] == tableName):        
                exc.append(exclusions[i]["detail"])
                i+=1

    for attempt in range(1000):
        if(weights):
            toAdd = selectProbObj(fromWhich)
        else:
            toAdd = selectRandObj(fromWhich)
        if ((toAdd["detail"] in exc) or (toAdd["detail"] in incl)) :
            continue     
        if 'exclusions' in toAdd:
            for newExItem in toAdd["exclusions"]:
                exclusions.append(newExItem)
        if 'correlations' in toAdd: 
            for newCorItem in toAdd["correlations"]:
                correlations.append(newCorItem)
        break
    return toAdd
            
    
def createLine(source, lineType):
    """Generate an Line object which contains a text and optionally topics."""
    line = {}
    line["text"] = ""
    line["topics"] = [] #createTopic()
    line["node"] = "" #from source
    var = "as" #to be deleted
    i = 0;
    for topic in var:  #?? from source
        line["topics"].append({})
        #line["topics"][i]["topic"] = ?? from source
        #line["topics"][i]["suggest"] = ?? from source
        i+=1
    return line
    
def createSubject(source, subjectName, person):
    """Generate an Subject object which contains a subject \
    lines array, list type and familiar boolean."""
    for sub in source["subjects"]:
        if (sub["subject"] == subjectName):
            return parseLines(source, person, sub)
            
def parseLines(source, person, subject):
    lines = subject["lines"]
    p = re.compile('\{.+?}')
    for line in lines:
        found = p.findall(str(line["text"]))
        for var in found:
            method = var.split(' ')
            replace = "OOPS"
            if (method[0] == "{rand()"):
                replace =str(random.randrange(int(method[1]), int(method[2][:-1])))
            if (method[0] == "{get()"):
                method.pop(0)
                code = "person"
                method[-1] = method[-1][:-1]
                for word in method:
                    code += '["'+word+'"]'
                replace = eval(code)
            line["text"] = p.sub(replace, line["text"], count=1)
    return subject
    
def setupAnswer(table):
    "Generate an TableRef object which contains a topic and suggest count = table length."
    answers = []
    for topic in table:
        tableRef = {}
        tableRef["subject"] =topic["subject"]
        tableRef["suggest"] =len(topic["lines"])
        answers.append(tableRef)        
    return answers

def weighted_sample(items, n):
    """Used for weighted random selection, data much be in the form [Prob, Val...]"""
    total = 0.0;
    i = 0
    # overcomplicated in case of future exclusion logic being in third+ location of item array
    for w in items:
        total += items[i]["selectWeight"]
        i+=1
    i = 0
    w = items[i]["selectWeight"]
    v = items[i]
    while n:
        x = total * (1 - random.random() ** (1.0 / n))
        total -= x
        while x > w:
            x -= w
            i += 1
            w = items[i]["selectWeight"]
            v = items[i]
        w -= x
        yield v
        n -= 1
    
if __name__ == "__main__":
    main()