var firebaseConfig = {
    apiKey: "AIzaSyA2yzgjQvIyIiZ8vz7tpN7yfgv5Ybb8hM0",
    authDomain: "trainschedule-6aea6.firebaseapp.com",
    databaseURL: "https://trainschedule-6aea6.firebaseio.com",
    projectId: "trainschedule-6aea6",
    storageBucket: "trainschedule-6aea6.appspot.com",
    messagingSenderId: "150118835526",
    appId: "1:150118835526:web:2e717a44ba0af2ea2a7147",
    measurementId: "G-9RVT738WX0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();
  console.log(database);

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#dest-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm -  military time").format("LT");
  var trainFreq = $("#freq-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    dest: trainDest,
    start: firstTrain,
    freq: trainFreq
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.start);
  console.log(newTrain.freq);

//   alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#first-train-input").val("");
  $("#freq-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().freq;

  // Employee Info
  console.log(trainName);
  console.log(trainDest);
  console.log(firstTrain);
  console.log(trainFreq);


  var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  console.log(firstTrainConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % trainFreq;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = trainFreq - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("LT");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain)
   
    // $("<td>").text(trainFreq)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);


});

  