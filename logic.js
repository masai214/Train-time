function time() {
    $('.time').html(moment().format('MMMM, D YYYY H:mm:ss'));
  }
  setInterval(time, 1000);
var firebaseConfig = {
    apiKey: "AIzaSyDaLO1yl48jW6H6S3JWI99Mf8-8HSMdEEM",
    authDomain: "train-time-6b630.firebaseapp.com",
    databaseURL: "https://train-time-6b630.firebaseio.com",
    projectId: "train-time-6b630",
    storageBucket: "",
    messagingSenderId: "136840642820",
    appId: "1:136840642820:web:6a4307542c9c8fc0"
  };
  
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  $("#submit-button").on("click", function(event) {
    event.preventDefault();
   
    var trains = $("#trains-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var startTime= moment($("#start-time-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var trainFrequency = $("#frequency-input").val().trim();
    
   
    var newTrain = {
      name: trains,
      destination: destination,
      startTime: startTime,
      frequency: trainFrequency
    };
   
    database.ref().push(newTrain);
   

    $("#trains-input").val("");
    $("#destination-input").val("");
    $("#start-time-input").val("");
    $("#frequency-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    
    var trains = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var startTime = childSnapshot.val().startTime;
    var trainFrequency = childSnapshot.val().frequency;
   
    console.log(trains);
    console.log(destination);
    console.log(startTime);
    console.log(trainFrequency);
    var tRemainder = moment().diff(moment.unix(startTime), "minutes") % trainFrequency;
    var tMinutes = trainFrequency - tRemainder;
    var tArrival = moment().add(tMinutes, "m").format("HH:mm");
   
    var newRow = $("<tr>").append(
      $("<td>").text(trains),
      $("<td>").text(destination),
      $("<td>").text(trainFrequency),
      $("<td>").text(tArrival),
      $("<td>").text(tMinutes)
    );
   
    $("#train-table > tbody").append(newRow);
  });