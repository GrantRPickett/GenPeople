ComplexNPCs by Grant Pickett begins here.
"Contains the ComplexNPCs created by the ComplexNPCGenerator and controlling methods. Requires Conversation Rules by Eric Eve."
Include Conversation Rules by Eric Eve.
Instead of asking someone about something:
follow the unknown quizzing rule of the noun.
Instead of telling someone about something:
follow the unknown informing rule of the noun.
Clothing is a kind of thing.  Clothing is wearable.
ComplexNPC0 is a person.
The printed name of ComplexNPC0 is "Roland Farwynd".
Understand "Roland Farwynd" and "Roland" as ComplexNPC0.
The description is "This person is hairy. This person has long hair. This person likes money. This person is warm.".
The quizzing table is the Table of ComplexNPC0 Answers.
The informing table is the Table of ComplexNPC0 Remarks.
The unknown quizzing rule is the ComplexNPC0 default-quiz-response rule.
The unknown informing rule is the ComplexNPC0 default-inform-response rule.
This is the ComplexNPC0 default-quiz-response rule:
show the next response from the Table of ComplexNPC0 Default Quiz Responses.
This is the ComplexNPC0 default-inform-response rule:
show the next response from the Table of ComplexNPC0 Default Inform Responses.

Table of ComplexNPC0 Answers
subject	response rule	response table	suggest
ComplexNPC0	 ComplexNPC0 ask-self rule	    --	    1
home	 -- 	Table of ComplexNPC0 home 	2
livelihood	 -- 	Table of ComplexNPC0 livelihood 	2
childhood	 -- 	Table of ComplexNPC0 childhood 	1

Table of ComplexNPC0 Remarks
subject	response rule	response table	suggest
ComplexNPC0		ComplexNPC0 tell-self rule 	  -- 	 -1

Table of ComplexNPC0 Default Quiz Responses
response
"The traveller looks annoyed by your question, for some reason, and declines to answer."

Table of ComplexNPC0 Default Inform Responses
response
"Sounds Interesting"

This is the ComplexNPC0 ask-self rule:
say "I am feeling well today, thanks for asking."
This is the ComplexNPC0 tell-self rule:
say "I know about myself already."
After saying hello to ComplexNPC0:
say "hello";
if the greeting type is explicit, follow the standard list suggested topics rule.
After saying goodbye to ComplexNPC0 when the farewell type is explicit:
say "goodbye"

home is a familiar subject.

Table of ComplexNPC0 home
response
"I am from The Westerlands[reveal home][inform home to 3][quiz home to 3]"
"My family serves Lord Mormont"

livelihood is a familiar subject.

Table of ComplexNPC0 livelihood
response
"I am a fisherman."
"I am a commoner."

childhood is a familiar subject.

Table of ComplexNPC0 childhood
response
"I was born in 4387 to a commoner family.[reveal childhood][inform childhood to 3][quiz childhood to 3]"

Table of Table Types (continued)
tabname	index 	 tabtype
Table of ComplexNPC0 Default Quiz Responses	 0 	stop-list
Table of ComplexNPC0 Default Inform Responses	 0 	stop-list
Table of ComplexNPC0 home	 0 	stop-list
Table of ComplexNPC0 livelihood	 0 	stop-list
Table of ComplexNPC0 childhood	 0 	stop-list

ComplexNPCs ends here.