Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_img" src="'+data_uri+'">';
    })
}
console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/WvjCd0oj3/model.json",modelLoaded);
function modelLoaded(){
    console.log("Model loaded");
}

prediction = "";

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = to_Speak ;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("capture_img");
    classifier.classify(img, gotResult)
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        gesture = results[0].label;
        to_Speak = "";
        if(gesture == "Victory")
        {
            to_Speak = "That was a marvelous victory";
            document.getElementById("update_gesture").innerHTML = "&#9996;";
            
        }
        else if(gesture == "Amazing")
        {
            to_Speak = "This is looking amazing";
            document.getElementById("update_gesture").innerHTML = "&#128076;";
        }
        else if(gesture == "Best")
        {
            to_Speak = "All the best";
            document.getElementById("update_gesture").innerHTML = "&#128077;";
        }
        speak();
    }
}