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