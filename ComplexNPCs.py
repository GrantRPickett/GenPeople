# -*- coding: utf-8 -*-
"""
Created on Thu Nov 13 13:46:40 2014

@author: Grant
"""
import json

def main():
    #Turn data scraps into n people

    #build_topic()
    
    
    #Create inform code based on the people
    
    #read in complete people json
    with open('testOut.json') as f:
        data = f.read()
        jsondata = json.loads(data)
    #
    inform = "ComplexNPCs by Grant Pickett begins here.\n"
    inform += '"Contains the ComplexNPCs created by the ComplexNPCGenerator and controlling methods. Requires Conversation Rules by Eric Eve."\n'

    inform += "Include Conversation Rules by Eric Eve.\n"
    
    inform += "Instead of asking someone about something:\n"
    inform += "follow the unknown quizzing rule of the noun.\n"
    inform += "Instead of telling someone about something:\n"
    inform += "follow the unknown informing rule of the noun.\n"
    inform += "Clothing is a kind of thing.  Clothing is wearable.\n"
    #loop through people translating to inform code
    i = 0;
    for person in jsondata["people"]:
        cNPCi = "ComplexNPC"+str(i) #uniqueId
        fullname = person["name"]["first"] +" "+person["name"]["last"]
        tableList = [] #used by table of tables
        tableTypes = [] #used by table of tables
        inform += cNPCi+" is a person.\n"
        inform += "The printed name of "+cNPCi+' is "' + person["name"]["first"] +" "+person["name"]["last"]+'".\n'
        inform += 'Understand "'+ fullname + '" and "'+ person["name"]["first"] +'" as '+cNPCi+".\n"
        inform += 'The description is "'+ person["description"]+ '".\n'
        inform += 'The quizzing table is the Table of '+cNPCi +' Answers.\n'
        inform += 'The informing table is the Table of '+cNPCi +' Remarks.\n'
        inform += 'The unknown quizzing rule is the '+cNPCi +' default-quiz-response rule.\n'
        inform += 'The unknown informing rule is the '+cNPCi +' default-inform-response rule.\n'
        inform += 'This is the '+cNPCi +' default-quiz-response rule:\n'
        inform += 'show the next response from the Table of '+cNPCi +' Default Quiz Responses.\n'
        inform += 'This is the '+cNPCi +' default-inform-response rule:\n'
        inform += 'show the next response from the Table of '+cNPCi +' Default Inform Responses.\n'

        inform += '\nTable of '+cNPCi +' Answers\n'
        inform += 'subject	response rule	response table	suggest\n'
        inform +=  cNPCi +'\t '+cNPCi +' ask-self rule\t    --\t    1\n'
        for line in person["answers"]:
            inform += line["subject"] +"\t -- \tTable of "+ cNPCi +" "+line["subject"]+" \t"+str(line["suggest"])+"\n"
            
        inform += '\nTable of '+cNPCi +' Remarks\n'
        inform += 'subject	response rule	response table	suggest\n'
        inform +=  cNPCi +'\t	'+cNPCi +' tell-self rule \t  -- \t -1\n'
        for line in person["remarks"]:
            inform += line["subject"] +"\t -- \tTable of "+ cNPCi +" "+line["subject"]+" \t"+line["suggest"]+"\n"

        inform += '\nTable of '+cNPCi +' Default Quiz Responses\nresponse\n'
        tableList.append('Table of '+cNPCi +' Default Quiz Responses')
        tableTypes.append("stop-list")        
        for line in person["default-ask"]:        
            inform += '"'+line["text"]+'"\n'
 
        inform += '\nTable of '+cNPCi +' Default Inform Responses\nresponse\n'
        tableList.append('Table of '+cNPCi +' Default Inform Responses')
        tableTypes.append("stop-list")  
        for line in person["default-tell"]:        
            inform += '"'+line["text"]+'"\n'
        inform += '\n'
        inform += 'This is the '+cNPCi +' ask-self rule:\n'
        inform += 'say "I am feeling well today, thanks for asking."\n'
        inform += 'This is the '+cNPCi +' tell-self rule:\n'
        inform += 'say "I know about myself already."\n'
        inform += 'After saying hello to '+cNPCi +':\n'
        inform += 'say "' +person["greeting"] +'";\n'
        inform += "if the greeting type is explicit, follow the standard list suggested topics rule.\n"
        inform += 'After saying goodbye to '+cNPCi+' when the farewell type is explicit:\n'
        inform += 'say "' +person["farewell"] +'"\n'
        
        #subject tables
        for subject in person["subjects"]:
            familiar = ""                
            if(subject["familiar"]):
                familiar = 'familiar '
            inform += "\n"+subject["subject"]+" is a "+ familiar + "subject.\n"
            inform += '\nTable of '+cNPCi + " " +subject["subject"]+"\nresponse\n"
                            
            tableList.append('Table of '+cNPCi + " " +subject["subject"])
            tableTypes.append(subject["list type"])  
            for line in subject["lines"]:
                inform +='"' +line['text']                    
                for newTopic in line["topics"]:
                    inform += "[reveal " + newTopic["topic"]+ "]"
                    inform += "[inform " + newTopic["topic"]+ " to "+ newTopic["suggest"]+"]"                        
                    inform += "[quiz " + newTopic["topic"]+ " to "+ newTopic["suggest"]+"]"
                inform +='"\n'
        #table of table types (cont)
        inform +='\nTable of Table Types (continued)\ntabname	index \t tabtype\n'
        for tab, tabtype in zip(tableList, tableTypes):
            inform+= tab + "\t 0 \t" +tabtype+"\n"
        #extra items
        
        i+=1   
    #end loop of people
    inform += "\nComplexNPCs ends here."
    print inform
    f = open("ComplexNPCs.i7x","w+");
    f.write(inform);
if __name__ == "__main__":
    main()