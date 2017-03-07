  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAoJtpwZjJvp-Mv-N3TFd_mnJ1oWt0ZC0g",
    authDomain: "train-scheduler-284e2.firebaseapp.com",
    databaseURL: "https://train-scheduler-284e2.firebaseio.com",
    storageBucket: "train-scheduler-284e2.appspot.com",
    messagingSenderId: "574726004360"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //Initial values

  $("#add-train-btn").on("click", function(event) {
  	event.preventDefault();

  	//Grabs user input 
  	var trainName = $("#train-name").val().trim();
  	var destName = $("#destination").val().trim();
  	var firstTrainTime = $("#train-time").val().trim();
  	var freqTime = $("#frequency").val().trim();

  //Creates a local "temporary" object for holding employee data
  var newRow = {
  	name: trainName,
  	destination: destName,
  	firstDeparture: firstTrainTime,
  	frequency: freqTime
  };

  //Uploads new train row to the database
  database.ref().push(newRow);

  //Logs all new info to console
  console.log(newRow.name);
  console.log(newRow.destination);
  console.log(newRow.firstDeparture);
  console.log(newRow.frequency);

  //Alert
  alert("Train successfully added"); //maybe use a modal instead

  //Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#train-time").val("");
  $("#frequency").val("");

  //Prevent moving to new page
  return false;
});

//firebase event for adding trains to the database
database.ref().on("child_added", function(childSnapshot, preChildKey) {

	console.log(childSnapshot.val());

	//Store everthing into a variable.
  	var trainName = childSnapshot.val().name;
  	var destName = childSnapshot.val().destination;
  	var firstTrainTime = childSnapshot.val().firstDeparture;
  	var freqTime = childSnapshot.val().frequency;

  	//Train Info
  	console.log(trainName);
  	console.log(destName);
	console.log(firstTrainTime);
	console.log(freqTime);

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  // var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  // console.log(empMonths);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destName + "</td><td>" +
  freqTime + "</td><td>" + firstTrainTime + "</td></tr>");
































})