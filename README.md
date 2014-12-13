GenPeople
=========
To walkthrough the creation process begin by running importer.py in the same folder as the provided source.json file.

If already there testOut.json will be overwritten.
If not already there testOut.json will be created.

You can run importer multiple times to see various single people.

Mutliple and stored people is possible but not enabled at this time.

To translate the person to inform run ComplexNPC.py in the same folder as testOut.json.
This will overwrite or create ComplexNPCs.i7x.

In order to test the ComplexNPCs.i7x in inform:

File->Install Extension
 Select the ComplexNPCs.i7x file

Make sure Conversation Rules by Eric Eve is also installed.

In the editor:
```inform7
"Example" by sample author.  

Include ComplexNPCs by Grant Pickett

ComplexNPC0 is in the room.
```

Push the Go button.
The translation should succeed and the story should display:
```inform7
room
You can see Henk Cook here.
```

Henk Cook will be replaced with the generated character's name.

Talk to the character by typing:
greet  
ask about home (x2)  
ask about livilihood (x2)  
look at him  
