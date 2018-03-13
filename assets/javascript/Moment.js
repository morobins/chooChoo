var config = {
  apiKey: "AIzaSyDr6KgwjXN8Ly9mC-h6FwQ51rqPEKq5AeI",
  authDomain: "monique-class-activities.firebaseapp.com",
  databaseURL: "https://monique-class-activities.firebaseio.com",
  projectId: "monique-class-activities",
  storageBucket: "monique-class-activities.appspot.com",
  messagingSenderId: "325232752750"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values

// Capture Button Click
$("#submit-form").on("click", function (event) {
  event.preventDefault();

  // Grabbed values from text boxes
  train = $("#train-input").val().trim();
  destination = $("#destination-input").val().trim();
  time = $("#time-input").val().trim();
  frequency = parseInt($("#frequency-input").val().trim());

  console.log(train, destination, time, frequency);

  // Code for handling the push
  database.ref().push({
    train: train,
    destination: destination,
    time: time,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});

// Firebase watcher + initial loader + order/limit HINT: .on("child_added"
database.ref().on("child_added", function (childSnapshot) {

  var train = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  //get time of next train
  var nextArrival = moment()
  //Get number of min until next train 
  var minAway = moment().diff(moment(date), "months");
 
  // var totalRate = parseInt(months) * parseInt(rate);

  // storing the snapshot.val() in a variable for convenience
  // var sv = snapshot.val();
  var tbody = $('#train-data')
  var tr = $("<tr>");
  var tdTrain = $("<td>").text(name);
  var tdDestination = $("<td>").text(role);
  var tdFrequency = $("<td>").text(frequency);
  var tdNext = $("<td>").text(nextArrival);
  var tdMinutes = $("<td>").text(minAway);

  tr.append(tdTrain, tdDestination, tdFrequency, tdNext, tdMinutes);

  tbody.append(tr);


  // // Console.loging the last user's data
  // console.log(Snapshot.val().name);
  // console.log(Snapshot.val().role);
  // console.log(Snapshot.val().date);
  // console.log(Snapshot.val().rate);

  // // Change the HTML to reflect
  // $("#name-display").text(Snapshot.val().name);
  // $("#role-display").text(Snapshot.val().role);
  // $("#date-display").text(Snapshot.val().date);
  // $("#rate-display").text(Snapshot.val().rate);

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


