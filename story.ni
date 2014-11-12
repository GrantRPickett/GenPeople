"The Traveller"

Include Conversation Rules by Eric Eve.

Instead of asking someone about something:
follow the unknown quizzing rule of the noun.

Instead of telling someone about something:
follow the unknown informing rule of the noun.

GenPerson1 is a person.
The printed name of GenPerson1 is "Gilwood Frey".
Understand "Gilwood Frey" and "Gilwood" as GenPerson1.

The description is "This person is fat. This person is disfigured in some way. This person is sick. This person is a dwarf. This person is stocky. This person is creative. This individual seems kindly. This person has a reputation for getting the job done. They appear to be wearing very plain clothing.  A brown cloth or burlap tunic, a pair of worn grey pantaloons, and a faded red felt cap."

The quizzing table is the Table of GenPerson1 Answers.

The informing table is the Table of GenPerson1 Remarks. 

The unknown quizzing rule is the GenPerson1 default-quiz-response rule.

The unknown informing rule is the GenPerson1 default-inform-response rule.

Understand "man" as GenPerson1.

Clothing is a kind of thing.  Clothing is wearable.
A tunic is clothing. The description is "A basic piece of clothing normally made from cloth or burlap." Gilwood Frey is wearing a tunic.
A cap is clothing. The description is "A basic piece of headware made from felt and dyed a plain color." Gilwood Frey is wearing a cap.

After saying hello to GenPerson1:
say "'Hello there!' you say.[paragraph break]Gilwood Frey says 'Hello, good day to you.' They politely respond. They look slightly annoyed to have been addressed by someone of common birth.";
if the greeting type is explicit, follow the standard list suggested topics rule.

After saying goodbye to Gilwood Frey when the farewell type is explicit:
say "'Goodbye' you say.[paragraph break]'Goodbye,' they state plainly and continue on their way."

Table of GenPerson1 Answers
subject	response rule	response table	suggest
GenPerson1	GenPerson1 ask-self rule	--	1
childhood	--	Table of GenPerson1 Childhood	8
adulthood	--	Table of GenPerson1 Adulthood	5
home	--	Table of GenPerson1 Home	-1

Table of GenPerson1 Remarks
subject	response rule	response table	suggest
GenPerson1	GenPerson1 tell-self rule	--	-1

This is the GenPerson1 ask-self rule:
say "I am feeling well today, thanks for asking."

This is the GenPerson1 tell-self rule:
say "I know about myself already."

Table of GenPerson1 Childhood
response
"I was born in 4365 to a commoner family. When I was born it was noticed that I was remarkably sick for my age."
"I hail from The Stormlands.[reveal home][quiz home to 5]"
"My father was a commoner like myself and didn't have much time for his children. In addition my mother loved my father very much and as a result I became soft spoken."
"My parents loved that I was very creative as a young boy."
"Growing up, I was always very kind."
"I developed a habit of being kind very early. I am still kind to this day."
"I had the good fortune to be a very creative child."
"Much to my parents dismay, I became a very kind child."

Table of GenPerson1 Adulthood
response
"As I grew up, I took on more responsibility and prepared to enter the world."
"When I was finally an adult I became a farmer. I have been a farmer ever since, for better or worse."
"As an adult I had the good fortune to experience was married to the love of my life. I am incredibly happy with my marriage. I found that life wasn't very different afterwards."
"I was blessed to become very kind later in life. I don't know if it was my family who taught me, or if it was just something I picked up."

Table of GenPerson1 Home
response
"My family is sworn to Lord Will. Have you heard of him? [convnode Lord-node]"
"My family has worked and farmed the land around Stonehelm in the Stormlands for generations."
"My father was a seargant in the army of the stormlord many years ago."
"We have a decently fertile plot of land that provides all that we need to survive."
"It is a quiet life but I wouldn't have it any other way."

This is the GenPerson1 default-quiz-response rule:
show the next response from the Table of GenPerson1 Default Quiz Responses.

This is the GenPerson1 default-inform-response rule:
show the next response from the Table of GenPerson1 Default Inform Responses.

Table of GenPerson1 Default Quiz Responses
response
"The person you are speaking to seems momentarily lost in thought, and apparently fails to hear your question."
"'We'll discuss that some other time,' they tell you."
"The traveller mutters something under his breath, which you fail to catch."
"The traveller looks annoyed by your question, for some reason, and declines to answer."

Table of GenPerson1 Default Inform Responses
response
"'Indeed,' the traveller remarks."
"You see a frown in evident impatience at your irrelevant remarks."

Table of Table Types (continued)
tabname	index	tabtype
Table of GenPerson1 Default Quiz Responses	0	shuffled-list
Table of GenPerson1 Default Inform Responses	0	shuffled-list
Table of GenPerson1 Childhood	0	stop-list
Table of GenPerson1 Home	0	shuffled-list
Table of GenPerson1 Adulthood	0	stop-list

childhood is a familiar subject.
adulthood is a familiar subject.
home is a subject.

The Lord rules is a rulebook.

The Lord-node is a Conversation Node. 

The suggestions are "say yes or no". 

The node rule is the Lord rules.

A Lord rule when saying no:
say "'No,' you confess.

'That's fine,' the traveller laughes, 'Guess he's not as famous as he thinks he is.'[convnode null-node]";
rule succeeds.

A Lord rule when saying yes:
say "'Yes, I've heard of that Lord's deeds.' you reply.

'Great!' the traveller laughes. 'Guess he is as famous as he thinks he is.'[convnode null-node]";
rule succeeds.

The last Lord rule:
say "'Never mind that,' the traveller says. 'I have a bet to settle. I asked you whether you know my Lord. Do you?'";
rule succeeds.

GenPerson1 is in the Great Hall.

The Great Hall is a Room. "The strong morning sunlight filters in through the unglazed windows overlooking the Upper City and the Temple compound."
