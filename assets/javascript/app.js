 // Initialize Firebase
 //==================================================================
  var config = {
    apiKey: "AIzaSyAoJtpwZjJvp-Mv-N3TFd_mnJ1oWt0ZC0g",
    authDomain: "train-scheduler-284e2.firebaseapp.com",
    databaseURL: "https://train-scheduler-284e2.firebaseio.com",
    storageBucket: "train-scheduler-284e2.appspot.com",
    messagingSenderId: "574726004360"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//Events
//==================================================================
  $("#add-train-btn").on("click", function(event) {
  	event.preventDefault();

  	//Grabs user input 
  	var trainName = $("#train-name").val().trim();
  	var destName = $("#destination").val().trim();
  	var firstTrainTime = $("#train-time").val().trim();
  	var freqTime = $("#frequency").val().trim();

  	

  //Creates a local "temporary" object for holding train data
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
  console.log("----------------------");

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


//firebase event for pulling train row objects properties and their values, will then use to cal next arrival and minutes away
//==================================================================
database.ref().on("child_added", function(childSnapshot, preChildKey) {

	console.log(childSnapshot.val());

	//Store everthing into a variable.
  	var trainName = childSnapshot.val().name;
  	var destName = childSnapshot.val().destination;
  	var freqTime = childSnapshot.val().frequency;
  	var firstTrainTime = childSnapshot.val().firstDeparture;

 //formatting and calculation of next arrival and minutes remaining, to append to document
 //---------------------------------------------------------------------------------------
  	var FconvertedTime = moment(firstTrainTime, "hh:mm").subtract(1, "years");
  		console.log(FconvertedTime);
  	
  	//created variable to hold current time
  	var currentTime = moment();
 		console.log("Current time: " + moment(currentTime).format("hh:mm"));

 	//created variable to find the difference between the current time and 
	var diffTime = moment().diff(moment(FconvertedTime), "minutes");
		console.log("Difference in Time: " + diffTime);

	//created variable to find the remainder between the the var diffTime and the frequency of train, to use var below
	var remainder = diffTime % freqTime;
  		console.log(remainder);

  	//created variable to find the difference between the frequency of trains and the var remainder
  	var tMinTillArrival = freqTime - remainder;
  		console.log("Minutes till train" + tMinTillArrival);

  	//created variable to find the next avaiable train by taking the minutes remaining and adding it to the current time.
  	var nextTrain = moment().add(tMinTillArrival, "minutes");
  		console.log("Arrival TIME: " + moment(nextTrain).format("hh:mm A"));

  	//created variable to format the next train to show in military time, hh:mm (15:00) compared to hh:mm (3:00pm)
  	var conNextTrain = moment(nextTrain).format("hh:mm A");

  	//Train Info
  	console.log(trainName);
  	console.log(destName);
	console.log(firstTrainTime);
	console.log(freqTime);
	console.log("----------------------");


  // Add each train's data into the table, using values from firebase and using calculations from above
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destName + "</td><td>" +
  freqTime + "</td><td>" + conNextTrain + "</td><td>" + tMinTillArrival +"</td></tr>");
































})