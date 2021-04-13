const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

//gets the user collection and returnsan array of records
exports.getuser = functions.https.onRequest((request, response) => {

	// 1. Connect to our Firestore database
	cors(request, response, () => {

		let myData = [];
		return admin.firestore().collection('users').get().then((snapshot) => {

			if (snapshot.empty) {
				console.log('No matching documents');
				response.send(myData);
				return;
			}
			snapshot.forEach((doc) => {
				let docObj = {};
				docObj.id = doc.id;
				myData.push(Object.assign(docObj, doc.data()));
			});

			// 2. Send data back to client
			response.send(myData);
		});
	})
});

//sends a user record to the database
exports.createuser = functions.https.onRequest((request, response) => {

	console.log("Request body", request.body);
	cors(request, response, () => {
		// your function body here - use the provided req and res from cors





		admin.firestore().collection('users').add(request.body).then(()=>{
			response.send("Saved in the database");
		});
	})

});
