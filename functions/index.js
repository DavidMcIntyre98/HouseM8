const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

//authorizes a users Firebase ID token
exports.authorizedendpoint = functions.https.onRequest((request, response) => {
	// 1. Receive comment data in here from user POST request
	// 2. Connect to our Firestore database
	cors(request, response, () => {

		console.log('Check if request is authorized with Firebase ID token');
		if ((!request.headers.authorization || !request.headers.authorization.startsWith('Bearer '))){
			console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
			'Make sure you authorize your request by providing the following HTTP header:',
			'Authorization: Bearer <Firebase ID Token>');
		response.status(403).send('Unauthorized');
		return;
	}

	let idToken;
	if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')){
		console.log('Found "Authorization" header');
		// Read the ID Token from the Authorization header.
		idToken = request.headers.authorization.split('Bearer ')[1];
	} else {
		// No cookie
		response.status(403).send('Unauthorized');
		return;
	}

	try {
		const decodedIdToken = admin.auth().verifyIdToken(idToken).then((token) => {
			console.log('ID Token correctly decoded',token);
			// Use token.uid to get documents belonging to a user
			let myComments = [];
			admin.firestore().collection('comments').where('uid', '==', token.uid).get().then((snapshot) => {

				if(snapshot.empty) {
					console.log('No matching documents.');
					response.send('No data');
					return;
				}

				snapshot.forEach(doc => {
					let docObj = {};
					docObj.id = doc.isEqual;
					myComments.push(Object.assign(docObj, doc.data()));
				});

				// 2. Send data back to client
				response.send(myComments);
			})
		});
	} catch(error) {
		console.error('Error while verifying Firebase Id token:',error);
		response.status(403).send('Unauthorized');
		return;
	}
	});
});

exports.postcomments = functions.https.onRequest((request, response) => {
    // 1. Receive comment data in here from user POST request
    // 2. Connect to our Firestore database
    cors(request, response, () => {

        const currentTime = admin.firestore.Timestamp.now();
        request.body.timestamp = currentTime;

        return admin.firestore().collection('comments').add(request.body).then((snapshot) => {
            response.send("Saved in the database");
        });
    });
});

exports.getcomments = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
        // 1. Connect to our Firestore database
        let myData = [];
        admin.firestore().collection('comments').orderBy("timestamp").get().then((snapshot) => {

            if (snapshot.empty) {
                console.log('No matching documents.');
                response.send('No data ');
                return;
            }

            snapshot.forEach(doc => {
                let docObj = {};
                docObj.id = doc.id;
                myData.push(Object.assign(docObj, doc.data()));
            });

            // 2. Send data back to client
            response.send(myData);
        })
    });
});
exports.updatecomment = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        // function body here - use the provided req and res from cors
        admin.firestore().collection("comments").doc(request.query.id).update(request.body).then(function() 	{
            response.send("Document successfully updated!");
        })
    });
});

exports.deletecomment = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        // your function body here - use the provided req and res from cors
        admin.firestore().collection("comments").doc(request.query.id).delete().then(function() 	{
            response.send("Document successfully deleted!");
        })
    });
});





exports.createprofile = functions.https.onRequest((request, response) => {
	// 1. Receive comment data in here from user POST request
	// 2. Connect to our Firestore database
	cors(request, response, () => {

		const currentTime = admin.firestore.Timestamp.now();
		request.body.timestamp = currentTime;

		return admin.firestore().collection('userprofile').add(request.body).then((snapshot) => {
			response.send("Saved in the database");
		});
	});
});

exports.createLprofile = functions.https.onRequest((request, response) => {
	// 1. Receive comment data in here from user POST request
	// 2. Connect to our Firestore database
	cors(request, response,  ()=> {

		const currentTime = admin.firestore.Timestamp.now();
		request.body.timestamp = currentTime;

		return admin.firestore().collection('Landlordprofile').add(request.body).then((snapshot) => {
			response.send("Saved in the database");
		});
	});
});


exports.getrooms = functions.https.onRequest((request, response) => {
	console.log('here');
	cors(request, response, () => {
		console.log("this should be the uid of the user:"+request.body);
		var recieved = request.body;
		let myData = [];
		var price;
		var city;
		let Useenarray =[];
		return admin.firestore().collection('userprofile').where("uid","==",recieved).get().then((snapshot) => {

			if (snapshot.empty) {
				console.log('No matching documents111');
				response.send('No data in database');
				return;
			}

			snapshot.forEach((doc) => {
				price = parseInt(doc.data()["price"]);
				city = doc.data()["city"];
			
		
				console.log('now here2');
		return admin.firestore().collection('Useen').where("tid","==",recieved).get().then((snapshot) => {		

			if (snapshot.empty) {
				console.log('No matching documents222');
				
				
			}
			snapshot.forEach((doc) => {
				lid = (doc.data()["lid"]);
				Useenarray.push(lid);
			

			});
			
			console.log('now here');
			
				return admin.firestore().collection('Landlordprofile').where("price","<=",price).get().then((snapshot) => {
							//.where("lid","not-in",Useenarray)
					if (snapshot.empty) {
						console.log('No matching documents333');
						response.send(myData);
						return;
					}
					snapshot.forEach((doc) => {
						console.log("city"+city);
						if (doc.data()["city"]==city)
						{
						console.log("city match")
						
							if (!Useenarray.includes(doc.data()["uid"]))
							{
								console.log("not seen")
								console.log("adding"+doc.data()["uid"]);
							let docObj = {};
							docObj.id = doc.id;
							myData.push(Object.assign(docObj, doc.data()));

							}

						}		
						
					});
					console.log("Sending "+ myData);
					response.send(myData);
						console.log("123");
						//var city = (doc.data()["city"]);
						//console.log("city"+city);
						/*return admin.firestore().collection('Landlordprofile').where("city","==",city).get().then((snapshot) => {
						
							if (snapshot.empty) {
								console.log('No matching documents333');
								response.send(myData);
								return;
							}
							snapshot.forEach((doc) => {
								console.log("Is match"+doc.data()["uid"])
							if (!Useenarray.includes(doc.data()["uid"]))
						{
							console.log("adding"+doc.data()["uid"]);
							let docObj = {};
							docObj.id = doc.id;
							myData.push(Object.assign(docObj, doc.data()));
							

						}
						else
						console.log("has seen"+doc.data()["uid"]);
					});
					console.log("Sending "+ myData);
					response.send(myData);
						console.log("123");
					});
					
				});*/

					
					
					//console.log("Sending "+ myData);
					//response.send(myData);

				


			

			//});

		});
	});
});
});
});
});

/*exports.gettenants = functions.https.onRequest((request, response) => {
	console.log('here');
	cors(request, response, () => {
		var recieved = request.body;
		//recieved=toString(recieved);
		console.log("tenant uid"+recieved);
		let myData = [];
		var price;
		var city;
		let Lseenarray =[];
		return admin.firestore().collection('Landlordprofile').where("uid","==",recieved).get().then((snapshot) => {

			if (snapshot.empty) {
				console.log('No matching documents111');
				response.send('No data in database');
				return;
			}

			snapshot.forEach((doc) => {
				price = parseInt(doc.data()["price"]);
				city = doc.data()["city"];



		return admin.firestore().collection('Lseen').where("lid","==",recieved).get().then((snapshot) => {		

			if (snapshot.empty) {
				console.log('No matching documents222');
				response.send('No data in database');
				
			}
			snapshot.forEach((doc) => {
				uid = (doc.data()["uid"]);
				Lseenarray.push(uid);
			

			});
		
			console.log('now here');
				return admin.firestore().collection('userprofile').where("price",">=",price).where("city","==",city).get().then((snapshot) => {
							//.where("lid","not-in",Useenarray)
					if (snapshot.empty) {
						console.log('No matching documents333');
						response.send(myData);
						return;
					}
					snapshot.forEach((doc) => {
						if (!Lseenarray.includes(doc.data()["uid"]))
						{
							console.log("adding"+doc.data()["uid"]);
							let docObj = {};
							docObj.id = doc.id;
							myData.push(Object.assign(docObj, doc.data()));
							

						}
						else
						console.log("has seen"+doc.data()["uid"]);
						
						
					});

					console.log(doc.data()["price"]);
					

					response.send(myData);

				});


			

			});

		});
	});
});
});*/

exports.like = functions.https.onRequest((request, response) => {
    // 1. Receive comment data in here from user POST request
    // 2. Connect to our Firestore database
    cors(request, response, () => {

        
			console.log("full"+request.body);
			var recieved = request.body;
			var tid = request.body.tid;
			var lid = request.body.lid;
			console.log("tid1:"+tid);
			console.log("lid1:"+lid);
			//var hello = JSON.parse(request.body);
			//tid =console.log("hiii"+hello.tid);
			//lid =console.log("hiii"+hello.lid);
			//tid ="HEY";
			//lid ="BYE";
			
			return admin.firestore().collection('likes').where("lid","==",lid).where("tid","==",tid).get().then((snapshot) => {
				console.log("what is problem");
				if (snapshot.empty) {
					console.log('adding like');
					return admin.firestore().collection('likes').add(recieved).then((snapshot) => {
						console.log("bbb"+request.body);
						response.send(false);
				});
			}
			else
			{
				console.log("now here")
				return admin.firestore().collection('matches').add(request.body).then((snapshot) => {
					response.send("true");
				});
			}



				
			
			

        
    });
});
});

exports.useen = functions.https.onRequest((request, response) => {
    //stores the uid of already viewed profiles
    cors(request, response, () => {

        

        return admin.firestore().collection('Useen').add(request.body).then((snapshot) => {
            response.send("Saved in the database");
        });
    });
});

exports.lseen = functions.https.onRequest((request, response) => {
    //stores the uid of already viewed profiles
    cors(request, response, () => {

        

        return admin.firestore().collection('Lseen').add(request.body).then((snapshot) => {
            response.send("Saved in the database");
        });
    });
});

exports.checktype = functions.https.onRequest((request, response) => {
    //stores the uid of already viewed profiles
    cors(request, response, () => {

		var recieved = request.body;
		console.log(recieved);
		
		
        return admin.firestore().collection('userprofile').where("uid","==",recieved).get().then((snapshot) => {

			if (snapshot.empty) {
				console.log('No matching documents777');
				response.send("landlord");
				return;
			}

			else 
			{console.log("sending 1");
				response.send("tenant");}

        });
    });
});

exports.image_data = functions.https.onRequest((request, response) => {
    // 1. Receive comment data in here from user POST request
    // 2. Connect to our Firestore database
    cors(request, response, () => {

        const currentTime = admin.firestore.Timestamp.now();
        request.body.timestamp = currentTime;
        
        return admin.firestore().collection('imageData').add(request.body).then((snapshot) => {
            response.send("Saved in the database");
        });
    });
});



exports.gettenants = functions.https.onRequest((request, response) => {
	console.log('here');
	cors(request, response, () => {
		console.log("this should be the uid of the user:"+request.body);
		var recieved = request.body;
		let myData = [];
		var price;
		var city;
		let Useenarray =[];
		return admin.firestore().collection('Landlordprofile').where("uid","==",recieved).get().then((snapshot) => {

			if (snapshot.empty) {
				console.log('No matching documents111');
				response.send('No data in database');
				return;
			}

			snapshot.forEach((doc) => {
				price = parseInt(doc.data()["price"]);
				city = doc.data()["city"];
			
		
				console.log('now here2');
		return admin.firestore().collection('Useen').where("tid","==",recieved).get().then((snapshot) => {		

			if (snapshot.empty) {
				console.log('No matching documents222');
				
				
			}
			snapshot.forEach((doc) => {
				lid = (doc.data()["lid"]);
				Useenarray.push(lid);
			

			});
			
			console.log('now here');
			
				return admin.firestore().collection('userprofile').where("price",">=",price).get().then((snapshot) => {
							//.where("lid","not-in",Useenarray)
					if (snapshot.empty) {
						console.log('No matching documents333');
						response.send(myData);
						return;
					}
					snapshot.forEach((doc) => {
						console.log("city"+city);
						if (doc.data()["city"]==city)
						{
						console.log("city match")
						
							if (!Useenarray.includes(doc.data()["uid"]))
							{
								console.log("not seen")
								console.log("adding"+doc.data()["uid"]);
							let docObj = {};
							docObj.id = doc.id;
							myData.push(Object.assign(docObj, doc.data()));

							}

						}		
						
					});
					console.log("Sending "+ myData);
					response.send(myData);
						console.log("123");
					

		});
	});
});
});
});
});

exports.lgetmatches = functions.https.onRequest((request, response) => {
	console.log('here');
	cors(request, response, () => {
		var recieved = request.body;
		var stuid;
		console.log("bing" + request.body);
		var myData =[];
		return admin.firestore().collection('matches').get().then((snapshot) => {

			
			if (snapshot.empty) {
				console.log('No matching documents333');
				response.send(myData);
				return;
			}
			snapshot.forEach((doc) => {
				console.log("this"+doc.data()["lid"]);
				console.log("should = This"+recieved);

				if  (doc.data()["lid"] == recieved){
					console.log("here.1");
					stuid = doc.data()["tid"];

				return admin.firestore().collection('userprofile').get().then((snapshot) => {
					if (snapshot.empty) {
						console.log('No matching documents444');
						response.send(myData);
						return;
					}
					snapshot.forEach((doc) => {
						if(stuid==uid){
								console.log("here.2");
						let docObj = {};
                		docObj.id = doc.id;
                		myData.push(Object.assign(docObj, doc.data()));
						
						}});});


					}
				});
				

					response.send(myData);
				
			});
			});
				
				









		});





exports.lgetmatches2 = functions.https.onRequest((request, response) => {
	console.log('here');
	
	cors(request, response, () => {
		console.log('hero');
		var recieved = request.body;
		console.log("rec"+recieved);
		console.log('hero1');
		var myData =[];
		return admin.firestore().collection('matches').where("lid","==",recieved).get().then((snapshot) => {
			
			if (snapshot.empty) {
				console.log('No matching documents333');
				response.send(myData);
				return;
			}
			var myString ="";
			 snapshot.forEach((doc) => {
				console.log("hero2");
				var uid= (doc.data()["tid"]);
					 
				console.log("doc data"+doc.data()["tid"]);

				 return admin.firestore().collection('userprofile').where("uid","==",uid).get().then((snapshot) => {
					if (snapshot.empty) {
						console.log('No matching documents444');
						response.send(myData);
						return;
					}
					snapshot.forEach((doc) => {
						console.log("har har");
						//var uid= (doc.data()["uid"]);
						let docObj = {};
                		docObj.id = doc.id;
						
                		myData.push(Object.assign(docObj, doc.data()));
						myString +=Object.assign(docObj, doc.data());
						console.log(myData);
						console.log("myString:"+myString);

					});
				
					response.send(myData);
					console.log("aggg"+myData);
					myString +=myData;
			});
			
			
			});
			console.log("ooooh"+myData);
			//response.send(myData);
				console.log("argggg")
				
			








		});
	});
});

exports.lgetmatches3 = functions.https.onRequest((request, response) => {
	console.log('here');
	
	cors(request, response, () => {
		console.log('hero');
		var recieved = request.body;
		console.log("rec"+recieved);
		console.log('hero1');
		var myData =[];
		var tidarray=[];
		 admin.firestore().collection('matches').where("lid","==",recieved).get().then((snapshot) => {
			
			if (snapshot.empty) {
				console.log('No matching documents333');
				response.send(myData);
				return;
			}
			
			 snapshot.forEach((doc) => {
				
				var uid= (doc.data()["tid"]);
					 tidarray.push(uid);
				console.log("pushing to tidarray:"+doc.data()["tid"]);
			 });
			 
			
			

				  admin.firestore().collection('userprofile').where("uid","in",tidarray).get().then((snapshot) => {
					if (snapshot.empty) {
						console.log('No matching documents444');
						response.send(myData);
						return;
					}
					snapshot.forEach((doc) => {
						console.log("har har");
						//var uid= (doc.data()["uid"]);
						let docObj = {};
                		docObj.id = doc.id;
						
                		myData.push(Object.assign(docObj, doc.data()));
						
						

					});
					response.send(myData);
					
			});
		
			
			
			});
			
			
				
			








		});
	});


exports.getmatches2 = functions.https.onRequest((request, response) => {
	console.log('here');
	
	cors(request, response, () => {
		console.log('hero');
		var recieved = request.body;
		console.log("rec"+recieved);
		console.log('hero1');
		var myData =[];
		return admin.firestore().collection('matches').where("tid","==",recieved).get().then((snapshot) => {
			
			if (snapshot.empty) {
				console.log('No matching documents333');
				response.send(myData);
				return;
			}
			var myString ="";
			 snapshot.forEach((doc) => {
				console.log("hero2");
				var uid= (doc.data()["lid"]);
					 
				console.log("doc data"+doc.data()["lid"]);

				 return admin.firestore().collection('Landlordprofile').where("uid","==",uid).get().then((snapshot) => {
					if (snapshot.empty) {
						console.log('No matching documents444');
						response.send(myData);
						return;
					}
					snapshot.forEach((doc) => {
						console.log("har har");
						//var uid= (doc.data()["uid"]);
						let docObj = {};
                		docObj.id = doc.id;
						
                		myData.push(Object.assign(docObj, doc.data()));
						myString +=Object.assign(docObj, doc.data());
						console.log(myData);
						console.log("myString:"+myString);

					});
				
					response.send(myData);
					console.log("aggg"+myData);
					myString +=myData;
			});
			
			
			});
			console.log("ooooh"+myData);
			//response.send(myData);
				console.log("argggg")
				
			








		});
	});
});


exports.getmatches3 = functions.https.onRequest((request, response) => {
	console.log('here');
	
	cors(request, response, () => {
		console.log('hero');
		var recieved = request.body;
		console.log("rec"+recieved);
		console.log('hero1');
		var myData =[];
		var tidarray=[];
		 admin.firestore().collection('matches').where("tid","==",recieved).get().then((snapshot) => {
			
			if (snapshot.empty) {
				console.log('No matching documents333');
				response.send(myData);
				return;
			}
			
			 snapshot.forEach((doc) => {
				
				var uid= (doc.data()["lid"]);
					 tidarray.push(uid);
				console.log("pushing to tidarray:"+doc.data()["lid"]);
			 });
			 
			
			

				  admin.firestore().collection('Landlordprofile').where("uid","in",tidarray).get().then((snapshot) => {
					if (snapshot.empty) {
						console.log('No matching documents444');
						response.send(myData);
						return;
					}
					snapshot.forEach((doc) => {
						console.log("har har");
						//var uid= (doc.data()["uid"]);
						let docObj = {};
                		docObj.id = doc.id;
						
                		myData.push(Object.assign(docObj, doc.data()));
						
						

					});
					response.send(myData);
					
			});
		
			
			
			});
			
			
				
			








		});
	});

	exports.updatechat = functions.https.onRequest((request, response) => {
		cors(request, response, () => {
			// function body here - use the provided req and res from cors
			admin.firestore().collection("matches").doc(request.query.id).update(request.body).then(function() 	{
				response.send("Document successfully updated!");
			})
		});
	});

	exports.getchat = functions.https.onRequest((request, response) => {
		cors(request, response, () => {
			// function body here - use the provided req and res from cors
			recieved =request.body;
			lid = recieved.lid;
			tid = recieved.tid;
			var myData =[];
			admin.firestore().collection("matches").where("lid","=",lid).where("tid","=",tid).get().then((snapshot) =>	{
				if (snapshot.empty) {
					console.log('No matching documents444');
					response.send(myData);
					return;
				}
					snapshot.forEach((doc) => {
						let docObj = {};
                		docObj.id = doc.id;
						
                		myData.push(Object.assign(docObj, doc.data()));
						response.send(myData);

			});
		});
	});
});



	
	
	exports.getmatchid = functions.https.onRequest((request, response) => {
		cors(request, response, () => {
			recieved =request.body;
			tid =recieved.tid;
			lid =recieved.lid;
	admin.firestore().collection('matches').where("tid","==",tid).where("lid","==",lid).get().then((snapshot) => {
		if (snapshot.empty) {
			console.log('No matching documents444');
			response.send(myData);
			return;
		}
		snapshot.forEach((doc) => {
			response.send(doc.id);
		});
	});
});
});