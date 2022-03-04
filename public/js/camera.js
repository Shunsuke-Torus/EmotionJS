const cc_test = document.getElementById("cc_test");
const video = document.getElementById("video");
const stop = document.getElementById("stop");

function camera_on(){
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    })
    .then(function(stream){
        document.getElementById("video").srcObject = stream;
    })
    .catch(function(err){
        //error
        console.error("mediaDevice.getUserMedia() error:",error);
        return;
    });
}

function camera_off(){
    let stream = document.getElementById("video").srcObject;
    let tracks = stream.getTracks();
    tracks.forEach(track => {
        track.stop();
    });
    document.getElementById("video").srcObject = null;
}

