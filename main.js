objects = [];

function setup(){
    canvas = createCanvas(650, 400);
    canvas.position(300, 250);

    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(video, gotReslut);
}

function gotReslut(error, results){
    if(error){
        console.error();
    }

    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 650, 430);

    if(status != false){
        for(i=0; i<objects.length; i++){
            confidence = Math.floor(objects[i].confidence/100);
            name = objects[i].label;
            text(objects[i].label, objects[i].x+15, objects[i].y+15);
            fill('#000000');
            document.getElementById("status").innerHTML = "Status = Objects Detected.";
            noFill();
            stroke('#FF0000')
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].height);
        }
    }
}

if(objectDetector.detect() != person){
    document.getElementById("objects_how_many").innerHTML = "Warning! Baby not detected!"
}
