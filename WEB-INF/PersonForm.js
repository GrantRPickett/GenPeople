var person = {};
person.timeline = []
var DB = GOTDB
console.log(DB)
var runReqs = function(person, pick, eventType) {
	var meetsReqs = true
	if("requires" in pick) {
		for(req in pick.requires) {
			for(type in pick.requires[req]) {
				if (type =="is") {
					if(pick.requires[req][type].constructor === Array) {
						for(idx in pick.requires[req][type]) {
							if(pick.requires[req][type][idx] != person[req] && person[req] != "[Random]") {
								meetsReqs = false
								break;
							}
						}
					} else {
						if(pick.requires[req][type] != person[req] && person[req] != "[Random]") {
							meetsReqs = false
							break;
						}
					}
				} else if (type =="not") {
					if(pick.requires[req][type].constructor === Array) {
						for(idx in pick.requires[req][type]) {
							if(pick.requires[req][type][idx] == person[req] && person[req] != "[Random]") {
								meetsReqs = false
								break;
							}
						}
					} else {
						if(pick.requires[req][type] == person[req] && person[req] != "[Random]") {
							meetsReqs = false
							break;
						}
					}
				} else if (type =="under") {
					if(pick.requires[req][type] < person[req] && person[req] != "[Random]") {
						meetsReqs = false
						break;
					}
				} else if (type =="above") {
					if(pick.requires[req][type] < person[req] && person[req] != "[Random]") {
						meetsReqs = false
						break;
					}
				} else {
					meetsReqs = false
					break;
				}
			}
			
			if(!meetsReqs) {
				break;
			}
		}
	}
	console.log("dup?")
	for(i in person.timeline) {
		console.log("timeline: " + person.timeline[i]["event"]+ " pick " + pick["event"])
		if(person.timeline[i]["event"] === pick["event"]) {
			meetsReqs = false
			console.log("dup!")
		}
	}
	if(meetsReqs) {
		if("effect" in pick) {
			applyEffect(person, pick)
		}
		return pick
	} else 
		return eventType(person)
};
var applyEffect = function(person, pick) {
	console.log("effect: " + JSON.stringify(pick["effect"]))
	for(eff in pick.effect) {
		var start = person[eff]
		var str = pick.effect[eff]
		var type = ["+", "-",
		            "=", "$" ].indexOf(str[0]) 
		            console.log(type)
		            if (type == 0) {
		            	person[eff] = Number(person[eff])+Number(str.slice(1))
		            	if(person[eff] > 100) {
		            		person[eff] = 100
		            	} else if (person[eff] < 0) {
		            		person[eff] = 0
		            	}
		            } else if (type == 1) {
		            	person[eff]  = Number(person[eff])-Number(str.slice(1))
		            	if(person[eff] > 100) {
		            		person[eff] = 100
		            	} else if(person[eff] < 0) {
		            		person[eff] = 0
		            	}
		            } else if (type == 2) {
		            	person[eff] = str.slice(1)
		            } else if (type == 3) {
		            	person[eff] = str.slice(1)
		            }
		var end = person[eff]
		var line
		if(start < 25 && end > 25) {
			person.timeline.push({"event":"More "+eff, "era": pick.era, "line":"I became more " + eff + " in my " + pick.era.toLowerCase()+" years."})
		} else if (start < 75 && end > 75) {
			person.timeline.push({"event":"More "+eff, "era": pick.era, "line":"I became more " + eff + " in my " + pick.era.toLowerCase()+" years."})
		} else if (start > 25 && end < 25) {
			person.timeline.push({"event":"Less "+eff, "era": pick.era, "line":"I became less " + eff + " in my " + pick.era.toLowerCase()+" years."})
		} else if (start > 75 && end < 75) {
			person.timeline.push({"event":"Less "+eff, "era": pick.era, "line":"I became less " + eff + " in my " + pick.era.toLowerCase()+" years."})
		}
		console.log(eff+ person[eff])
	};
};
var chEvent = function(person) {
	var events = DB.childEvents
	var pick = events[Math.floor(Math.random() * events.length)]
	pick.era = "Child"
		return runReqs(person, pick, chEvent)
};
var adEvent = function(person) {
	var events = DB.adoleEvents
	var pick = events[Math.floor(Math.random() * events.length)]
	pick.era = "Adolescent"
		return runReqs(person, pick, adEvent)
};
var yaEvent = function(person) {
	var events = DB.yngAdEvents
	var pick = events[Math.floor(Math.random() * events.length)]
	pick.era = "Young Adult"
		return runReqs(person, pick, yaEvent)
};
var maEvent = function(person) {
	var events = DB.midAdEvents
	var pick = events[Math.floor(Math.random() * events.length)]
	pick.era = "Mid-Adult"
		return runReqs(person, pick, maEvent)
};
var elEvent = function(person) {
	var events = DB.elderEvents
	var pick = events[Math.floor(Math.random() * events.length)]
	pick.era = "Elder"
		return runReqs(person, pick, elEvent)
};
var addEvents = function(person) {
	if(person.region == "[Random]") 
		person.region = DB.regions[Math.floor(Math.random() * DB.regions.length)]
	if(person.social == "[Random]") 
		person.social = DB.classes[Math.floor(Math.random() * DB.classes.length)]
	person.timeline.push(chEvent(person))
	if(person.age != "Child") {
		person.timeline.push(adEvent(person));
		person.timeline.push(adEvent(person));
	}
	else return
	if(person.age != "Adolescent") {
		person.timeline.push(yaEvent(person));
		person.timeline.push(yaEvent(person));
	}
	else return
	if(person.job == "[Random]") {
		person.job = DB.jobs[Math.floor(Math.random() * DB.jobs.length)]
	}
	if(person.age != "Young Adult"){
		person.timeline.push(maEvent(person));
		person.timeline.push(maEvent(person));
	}
	else return
	if(person.age != "Middle-age Adult") {
		person.timeline.push(elEvent(person));
		person.timeline.push(elEvent(person));
	}
	else return
}
var rand = ["[Random]"]
var formObj = function() {
	$("form > div").remove();
	$('form').jsonForm(
			{"schema" : {
				"firstName" : {
					"title" : "First Name",
					"type" : "string",
					"default" : "[Random]"
				},
				"lastName" : {
					"title" : "Last Name",
					"type" : "string",
					"default" : "[Random]"
				},
				"social" : {
					"title" : "Social Class",
					"type" : "string",
					"enum" : rand.concat(DB.classes)
				},
				"region" : {
					"title" : "Region",
					"type" : "string",
					"enum" : rand.concat(DB.regions)
				},
				"job" : {
					"title" : "Job",
					"type" : "string",
					"enum" : rand.concat(DB.jobs)
				},
				"age" : {
					"title" : "Age Category",
					"type" : "string",
					"enum" : rand.concat(DB.ages)
				},
				"variance" : {
					"title" : "variance",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},
				"perceptive" : {
					"title" : "perceptive",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},
				"creative" : {
					"title" : "creative",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},
				"inteligent" : {
					"title" : "inteligent",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},
				"organized" : {
					"title" : "organized",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},
				"diligent" : {
					"title" : "diligent",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},
				"reliable" : {
					"title" : "reliable",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},
				"energetic" : {
					"title" : "energetic",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},
				"assertive" : {
					"title" : "assertive",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},
				"popular" : {
					"title" : "popular",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},
				"gentle" : {
					"title" : "gentle",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},
				"trusting" : {
					"title" : "trusting",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},
				"generous" : {
					"title" : "generous",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},
				"content" : {
					"title" : "content",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},
				"emotional" : {
					"title" : "emotional",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},	"brave" : {
					"title" : "brave",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},"well-dressed" : {
					"title" : "well-dressed",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},
				"tall" : {
					"title" : "tall",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},"large" : {
					"title" : "large",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},"hairy" : {
					"title" : "hairy",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},"bearded" : {
					"title" : "bearded",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},"dirty" : {
					"title" : "dirty",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},"sick" : {
					"title" : "sick",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},"agile" : {
					"title" : "agile",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},"beautiful" : {
					"title" : "beautiful",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},"muscular" : {
					"title" : "muscular",
					"minimum" : 0,
					"type" : "range",
					"maximum" : 100
				},
				"hair color" : {
					"title" : "hair color",
					"type" : "string",
					"enum" : rand.concat(DB["hair colors"])
				},"eye color" : {
					"title" : "eye color",
					"type" : "string",
					"enum" : rand.concat(DB["eye colors"])
				},"injury" : {
					"title" : "injury",
					"type" : "string",
					"enum" : rand.concat(DB.injuries)
				},
				"childTone" : {
					"title" : "Childhood",
					"type" : "string",
					"enum" : [ "[Random]", "Positive", "Negative"]
				},
				"adoleTone" : {
					"title" : "Adolescence",
					"type" : "string",
					"enum" : [ "[Random]", "Positive", "Negative"]
				},
				"yngAdTone" : {
					"title" : "Young Adulthood",
					"type" : "string",
					"enum" : [ "[Random]", "Positive", "Negative"]
				},
				"midAdTone" : {
					"title" : "Mid-Life",
					"type" : "string",
					"enum" : [ "[Random]", "Positive", "Negative"]
				},
				"elderTone" : {
					"title" : "Elder Years",
					"type" : "string",
					"enum" : [ "[Random]", "Positive", "Negative"]
				},
				"world" : {
					"title" : "World",
					"type" : "string",
					"enum" : [ "Game of Thrones"]
				}
			},
			"value" : {
				"firstName" : person.firstName,
				"lastName" : person.lastName,
				"job": person.job,
				"region":person.region,
				"age": person.age,
				"social": person.social,
				"childTone" : person.childTone,
				"adoleTone": person.adoleTone,
				"yngAdTone" : person.yngAdTone,
				"midAdTone": person.midAdTone,
				"elderTone":person.elderTone,
				"injury" : person.injury,
				"eye color":person["eye color"],
				"hair color": person["hair color"]
			},
			"form" : 
				[
				 "world",
				 {
					 "type" : "fieldset",
					 "title" : "Basics",
					 "expandable" : true,
					 "items" : ["firstName", "lastName", "age",
					            "job", "region", "social" ]
				 },
				 {
					 "type" : "fieldset",
					 "title" : "Traits",
					 "expandable" : true,
					 "items" : [{
						 "key" : "variance",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 }, {
						 "key" : "large",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 },{
						 "key" : "tall",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 },{
						 "key" : "hairy",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 }, {
						 "key" : "bearded",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 },{
						 "key" : "sick",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 }, {
						 "key" : "dirty",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 }, {
						 "key" : "well-dressed",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 }, {
						 "key" : "agile",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 }, {
						 "key" : "muscular",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 },{
						 "key" : "beautiful",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 },
					 "hair color","eye color","injury", 
					 {
						 "key" : "perceptive",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 },{
						 "key" : "creative",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 },{
						 "key" : "inteligent",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 }, {
						 "key" : "organized",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 },{
						 "key" : "diligent",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 },{
						 "key" : "reliable",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 }, {
						 "key" : "energetic",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 } , {
						 "key" : "assertive",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 }, {
						 "key" : "popular",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 },{
						 "key" : "gentle",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 },{
						 "key" : "trusting",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 },{
						 "key" : "generous",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 },{
						 "key" : "content",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 }, {
						 "key" : "emotional",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt) }
					 },{
						 "key" : "brave",
						 "description" : "50",
						 "onChange" : function(evt) {func(evt)}
					 } ]
				 }, {
					 "type" : "fieldset",
					 "title" : "Eras",
					 "expandable" : true,
					 "items" : [ "childTone", "adoleTone", "yngAdTone",
					             "midAdTone", "elderTone" ]
				 }, {
					 "type" : "actions",
					 "items" : [ {
						 "type" : "submit",
						 "title" : "Save"
					 } ]
				 } ],
				 "onSubmit" : function(errors, values) {
					 if (errors) {
						 $('#res').html('<p>I beg your pardon?</p>');
						 console.log(errors)
					 } else {
						 applyVariance(values)
						 person = values
						 if(person.firstName == null) 
							 person.firstName = DB.names.first[Math.floor(Math.random() * DB.names.first.length)]
						 if(person.lastName == null) 
							 person.lastName = DB.names.last[Math.floor(Math.random() * DB.names.last.length)]
						 if(person.age == "[Random]") 
							 person.age = DB.ages[Math.floor(Math.random() * DB.ages.length)]
						 console.log(person)
						 person.marriage = "none"
						 person.timeline = []
						 addEvents(person)
						 eventStr = cleanPrintEvents(person)
						 $('#res').html(
								 '<p>Hello ' + person.firstName + " "
								 + person.lastName 
								 + ", "+person.age + " "+person.social+" "+
								 ((["Young Adult", "Middle-age Adult",
								    "Elder" ].indexOf(person.age) > -1)? person.job + " ":" person")
								    + " from " + person.region
								    + "<br>Timeline: " +eventStr +'</p>'

								    + "<br>Inform code below:<br>");
						$("#inform").html(printInform(person));
					 }
				 },
				 "onBeforeRender" : function(data, node) {
					 // Set the template to be rendered for this node.
					 data.myVal = "Hey, thanks for reading!";
				 }
			})
};
var func = function(evt) {
	var value = $(evt.target).val();
	person.age = value
	$(evt.target.nextSibling).html(
			value.toString())
};
var personId = function(person) {
	var id = "", val;
	for (trait in person) {
		val = person[trait]
		if(!$.isNumeric(val)) {
			continue;
		}
		id+=val
	};
	console.log(id)
	return id
};
var applyVariance = function(values) {
	for (trait in values) {
		org = values[trait]
		if(trait == "variance") {
			continue;
		}
		if(!$.isNumeric(org)) {
			continue;
		}
		rand = Math.floor(Math.random()*values["variance"]);
		sign = (Math.floor(Math.random()*2) == 0)? -1 : 1;

		temp = (org-sign*rand);
		if (temp > 100) temp = 100
		else if (temp < 0) temp =0
		values[trait] = temp;
	};
};
var printInform = function(person) {
	inform = 
		'NPCAgency by Grant Pickett begins here.<br>' +
		'"id = '+ personId(person)+'"<br>'+
		'Include Conversation Rules by Eric Eve.<br>'+
		'Instead of asking someone about something:<br>'+
		'follow the unknown quizzing rule of the noun.<br>'+
		'Instead of telling someone about something:<br>'+
		'follow the unknown informing rule of the noun.<br>'+
		'Clothing is a kind of thing. Clothing is wearable.<br>'+
		'<br>ComplexNPC0 is a person.<br>' +
		'The printed name of ComplexNPC0 is "' + person.firstName + " " + person.lastName + '".<br>'+
		'Understand "'+person.firstName  +" "+person.lastName +'" and "' + person.firstName +'" as ComplexNPC0. <br>'+
		'The description is ' +formDescription(person)+ ".<br>"+
		'The quizzing table is the Table of ComplexNPC0 Answers.<br>'+
		'The informing table is the Table of ComplexNPC0 Remarks.<br>'+
		'The unknown quizzing rule is the ComplexNPC0 default-quiz-response rule. <br>'+
		'The unknown informing rule is the ComplexNPC0 default-inform-response rule. <br>'+
		'This is the ComplexNPC0 default-quiz-response rule: <br>'+
		'show the next response from the Table of ComplexNPC0 Default Quiz Responses. <br>'+
		'This is the ComplexNPC0 default-inform-response rule: <br>'+
		'show the next response from the Table of ComplexNPC0 Default Inform Responses. <br>' +
		'<br>Table of ComplexNPC0 Remarks<br>' +
		'subject&Tab;response rule&Tab;response&Tab;table&Tab;suggest<br>' +
		'ComplexNPC0&Tab;ComplexNPC0 tell-self rule&Tab;--&Tab;-1<br><br>'+

		'Table of ComplexNPC0 Default Quiz Responses<br>'+
		'response<br>'+
		'"The traveller looks annoyed by your question, for some reason, and declines to answer."<br><br>'+

		'Table of ComplexNPC0 Default Inform Responses<br>'+
		'response<br>'+
		'"Sounds Interesting"<br><br>'+
		formSubjectTable(person) +"<br>"+
		'This is the ComplexNPC0 ask-self rule:<br>'+
		'say "I am feeling well today, thanks for asking."<br>'+
		'This is the ComplexNPC0 tell-self rule:<br>'+
		'say "I know about myself already."<br>'+

		'<br>Table of ComplexNPC0 Answers <br>' +
		'subject	&Tab;response rule	&Tab;response table	&Tab;suggest <br>' +
		'ComplexNPC0	&Tab;ComplexNPC0 ask-self rule	&Tab;--	&Tab;1<br>' +
		'home&Tab;--&Tab;Table of ComplexNPC0 home&Tab;9<br>' +
		'class&Tab;--&Tab;Table of ComplexNPC0 class&Tab;9<br>'+
		formSubjectRef(person) +
		'<br>Table of Table Types (continued)<br>'+
		'tabname&Tab;index&Tab;tabtype<br>'+
		'Table of ComplexNPC0 Default Quiz Responses&Tab;0&Tab;stop-list<br>'+
		'Table of ComplexNPC0 Default Inform Responses&Tab;0&Tab;stop-list<br>'+
		formSubjectTableTypes(person)+ '<br>'+
		'After saying hello to ComplexNPC0:<br>'+
		'say "Greetings";<br>'+
		'if the greeting type is explicit, follow the standard list suggested topics rule.<br>'+
		'After saying goodbye to ComplexNPC0 when the farewell type is explicit:<br>'+
		'say "Farewell".<br>NPCAgency ends here.';
		
		return inform
};
var cleanPrintEvents= function(person) {
	var str = "<br>"
		for (item in person.timeline) {
			str += person.timeline[item]["era"] +": "+person.timeline[item]["event"] + "<br>"
		}
	return str
};
var formDescription = function(person) {
	str = "";
	for (val in person) {
		if($.isNumeric(person[val])) {
			if(val == "variance") {
				continue;
			}
			if(person[val] > 75) {
				str += "This person is " + val +". "
			}
			if(person[val] < 25) {
				str += "This person is not " + val +". "
			}
		}
		else {
			if(val == "timeline" || val.indexOf("Tone") > -1) {
				continue;
			}
			console.log("val" + val)
			if("hair color" == val) {
				if(person["hair color"] == "[Random]")
				person[val] = 	DB["hair colors"][Math.floor(Math.random() * DB["hair colors"].length)]
			} else if ("eye color" == val) {
				if(person["eye color"] == "[Random]")
				person[val] = DB["eye colors"][Math.floor(Math.random() * DB["eye colors"].length)]
			} else if ("injury" == val) {
				if(person.injury == "[Random]")
				person[val]= DB["injuries"][Math.floor(Math.random() * DB["injuries"].length)]
			}
			if (person[val] == "none" || person[val] == "[Random]") {
				continue;
			}
			str+= val.charAt(0).toUpperCase() + val.slice(1) + " is "+ person[val] +". "
		}
	}
	return '"'+ str +'"'
};
var formSubjectRef = function(person) {
	var str = 'childhood&Tab;--&Tab;Table of ComplexNPC0 childhood&Tab;9<br>';
	var child = [],
	adole = [],
	yngAd = [],
	midAd = [],
	elder = [];
	for (event in person.timeline) {
		console.log(event)
		if(person.timeline[event]["era"] == "Child") {
			child.push(person.timeline[event])
		} else if (person.timeline[event]["era"] == "Adolescent") {
			adole.push(person.timeline[event])
		} else if (person.timeline[event]["era"] == "Young Adult") {
			yngAd.push(person.timeline[event])
		} else if (person.timeline[event]["era"] == "Mid-Adult") {
			midAd.push(person.timeline[event])
		} else if (person.timeline[event]["era"] == "Elder") {
			elder.push(person.timeline[event])
		}
	}
	if(person.job && person.job != "[Random]") 
		str +='job&Tab;--&Tab;Table of ComplexNPC0 job&Tab;9<br>'
	if(adole.length >0) 
		str +='adolescence&Tab;--&Tab;Table of ComplexNPC0 adolescence&Tab;9<br>';
	if(yngAd.length >0) 
		str +='young adulthood&Tab;--&Tab;Table of ComplexNPC0 young adulthood&Tab;9<br>';
	if(midAd.length >0) 
		str +='mid-life&Tab;--&Tab;Table of ComplexNPC0 mid-life&Tab;9<br>';
	if(elder.length >0) 
		str +='elder years&Tab;--&Tab;Table of ComplexNPC0 elder years&Tab;9<br>';
	return str
};
var formSubjectTable = function(person) {
	var child = [],
	adole = [],
	yngAd = [],
	midAd = [],
	elder = []
	for (event in person.timeline) {
		console.log(event)
		if(person.timeline[event]["era"] == "Child") {
			child.push(person.timeline[event])
		} else if (person.timeline[event]["era"] == "Adolescent") {
			adole.push(person.timeline[event])
		} else if (person.timeline[event]["era"] == "Young Adult") {
			yngAd.push(person.timeline[event])
		} else if (person.timeline[event]["era"] == "Mid-Adult") {
			midAd.push(person.timeline[event])
		} else if (person.timeline[event]["era"] == "Elder") {
			elder.push(person.timeline[event])
		}
	}
	var str = '<br>class is a familiar subject.<br>'+ 
	'<br>Table of ComplexNPC0 class<br>'+
	'response<br>'
	str+='"I was born in '+ (280 -Math.floor(Math.random()
			*(DB.ages.indexOf(person.age)+1)*15))
			+' to a '+ person.social +' family."<br>';

	if(person.job && person.job != "[Random]") {
		str += '<br>job is a familiar subject.<br>'+ 
		'<br>Table of ComplexNPC0 job<br>'+
		'response<br>'+
		'"I am a ' + person.job+'."<br>'
	}
	str+='<br>home is a familiar subject.<br>'+ 
	'<br>Table of ComplexNPC0 home<br>'+
	'response<br>'+
	'"I am from '+ DB["cities"][Math.floor(Math.random() * DB["cities"].length)]+person.region+ '"<br>'+
	'"'+DB.regionLines[person.region] + '"<br>'+
	'<br>childhood is a familiar subject.<br>'+ 
	'<br>Table of ComplexNPC0 childhood<br>'+
	'response<br>'
	for (event in child) {
		str+='"'+child[event]["line"]+'"<br>'
	}
	if(adole.length >0) {
		str+='<br>adolescence is a familiar subject.<br>'+ 
		'<br>Table of ComplexNPC0 adolescence<br>'+
		'response<br>'
	}
	for (event in adole) {
		str+='"'+adole[event]["line"]+'"<br>'
	}
	if(yngAd.length >0) {
		str+='<br>young adulthood is a familiar subject.<br>'+
		'<br>Table of ComplexNPC0 young adulthood<br>'+
		'response<br>'
	}
	for (event in yngAd) {
		str+='"'+yngAd[event]["line"]+'"<br>'
	}
	if(midAd.length >0) {
		str+='<br>mid-life is a familiar subject.<br>'+
		'<br>Table of ComplexNPC0 mid-life<br>'+
		'response<br>'
	}
	for (event in midAd) {
		str+='"'+midAd[event]["line"]+'"<br>'
	}
	if(elder.length >0) {
		str+='<br>elder years is a familiar subject.<br>'+ 
		'<br>Table of ComplexNPC0 elder years<br>'+
	'response<br>'}
	for (event in elder) {
		str+='"'+elder[event]["line"]+'"<br>'
	}
	return str
};
var formSubjectTableTypes = function(person){
	var str = "";
	start = "Table of ComplexNPC0 ";
	str += start + "class"+"&Tab;0&Tab;stop-list<br>"
	str += start + "home"+"&Tab;0&Tab;stop-list<br>"
	str += start + "childhood"+"&Tab;0&Tab;stop-list<br>"
	
	var child = [],
	adole = [],
	yngAd = [],
	midAd = [],
	elder = [];
	for (event in person.timeline) {
		console.log(event)
		if(person.timeline[event]["era"] == "Child") {
			child.push(person.timeline[event])
		} else if (person.timeline[event]["era"] == "Adolescent") {
			adole.push(person.timeline[event])
		} else if (person.timeline[event]["era"] == "Young Adult") {
			yngAd.push(person.timeline[event])
		} else if (person.timeline[event]["era"] == "Mid-Adult") {
			midAd.push(person.timeline[event])
		} else if (person.timeline[event]["era"] == "Elder") {
			elder.push(person.timeline[event])
		}
	}
	if(person.job&& person.job != "[Random]") 
		str += start + "job"+"&Tab;0&Tab;stop-list<br>"
	if(adole.length >0) 
		str += start + "adolescence"+"&Tab;0&Tab;stop-list<br>"
	if(yngAd.length >0) 
		str += start + "young adulthood"+"&Tab;0&Tab;stop-list<br>"
	if(midAd.length >0) 
		str += start + "mid-life"+"&Tab;0&Tab;stop-list<br>"
	if(elder.length >0) 
		str += start + "elder years"+"&Tab;0&Tab;stop-list<br>"
	return str
};
formObj()
var filename = ""
// Load a JSON document
	FileReaderJS.setupInput(document.getElementById('loadDocument'), {
		readAsDefault : 'Text',
		on : {
			load : function(event, file) {
				json =event.target.result
				person = JSON && JSON.parse(json) || $.parseJSON(json);
				formObj();
			}
		}
	});
// Save a JSON document
document.getElementById('saveDocument').onclick = function() {
	var json = JSON.stringify(person)
	var blob = new Blob([ json ], {
		type : 'application/json;charset=utf-8'
	});
	if (filename) {
		saveAs(blob, filename);
	} else {
		saveAs(blob, 'document.json');
	}
};
document.getElementById('saveInform').onclick = function() {
	var inform = $('#inform').html().replace(/<br\s*\/?>/ig, "\r\n")
	if(inform.length <= 0) return
	var blob = new Blob([ inform ], {
		type : 'text/plain;charset=utf-8'
	});
	if (filename) {
		saveAs(blob, filename);
	} else {
		saveAs(blob, 'document.i7x');
	}
};