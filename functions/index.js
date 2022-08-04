const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.changeKing = functions.firestore
    .document("data/king")
    .onUpdate((change, context) => {
        const newValue = change.after.data();
        const previousValue = change.before.data();

        const diff = newValue.capturedAt._seconds - previousValue.capturedAt._seconds;

        previousValue.king.update({
            score: admin.firestore.FieldValue.increment(diff),
        });

        console.log(`'${newValue.king._path.segments[1]}' is the new king`);
        console.log(`The previous king, '${previousValue.king._path.segments[1]}',Z was on the hill for ${diff} seconds`);

        return diff;
    });