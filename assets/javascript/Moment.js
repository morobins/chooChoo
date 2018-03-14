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
  firstTime = $("#time-input").val().trim();
  frequency = parseInt($("#frequency-input").val().trim());

  console.log(train, destination, firstTime, frequency);

  // Code for handling the push
  database.ref().push({
    train: train,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  $("#train-input").val('');
  $("#destination-input").val('');
  $("#time-input").val('');
  $("#frequency-input").val('');
 

});

database.ref().on("child_added", function (childSnapshot) {

  var firstTime = childSnapshot.val().firstTime;
  var train = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  

  //put time in military time
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

    //Get number of min until next train 
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    //get time of next train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("h:mm a");
  console.log("ARRIVAL TIME: " + nextTrain);


  var tbody = $('#train-data')
  var tr = $("<tr>");
  var tdTrain = $("<td>").text(train);
  var tdDestination = $("<td>").text(destination);
  var tdFrequency = $("<td>").text(frequency);
  var tdNext = $("<td>").text(nextTrain);
  var tdMinutes = $("<td>").text(tMinutesTillTrain);

  tr.append(tdTrain, tdDestination, tdFrequency, tdNext, tdMinutes);

  tbody.append(tr);

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});