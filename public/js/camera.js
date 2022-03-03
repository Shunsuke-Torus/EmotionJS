const cc_test = document.getElementById("cc_test");
const ll_video = document.getElementById("ll_video");
const stop = document.getElementById("stop");

function camera_on(){
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    })
    .then(function(stream){
        document.getElementById("ll_video").srcObject = stream;
    })
    .catch(function(err){
        //error
        console.error("mediaDevice.getUserMedia() error:",error);
        return;
    });
}

function camera_off(){
    let stream = document.getElementById("ll_video").srcObject;
    let tracks = stream.getTracks();
    tracks.forEach(track => {
        track.stop();
    });
    document.getElementById("ll_video").srcObject = null;
}

