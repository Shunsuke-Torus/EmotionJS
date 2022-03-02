
function main(){
    blob = copy_to_blob();
    transfer(blob);
}

function copy_to_blob(){
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let ll_video = document.getElementById("ll_video");
    canvas.width = ll_video.videoWidth ;
    canvas.height = ll_video.videoHeight;
    ctx.drawImage(ll_video, 0, 0);
    
    //canvas->jpg->blob
    let type = "image/jpeg";
    let data_url = canvas.toDataURL(type);
    let bin = atob(data_url.split(",")[1]);
    let buffer = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++){
        buffer[i] = bin.charCodeAt(i);
    }
    let blob = new Blob([buffer.buffer],{type:type});
    //error: {code: "InvalidImageSize", message: "Image size is too small."}の対処法
    //main.js L47->L50 content → bufferにする。
    //buffer以外の変数だと 「The ArrayBuffer instance referenced by the array.」->「any」になる
    return blob;
}

function transfer(blob){
    let subscriptionKey = "";

    let uriBase ="";

    // Request parameters.
    let params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes":
            "age,gender,headPose,smile,facialHair,glasses,emotion," +
            "hair,makeup,occlusion,accessories,blur,exposure,noise"
    };
    $.ajax({
        url: uriBase +"?"+$.param(params),
        // Request headers.
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
        processData: false,
        type: "POST",
        data: blob,
    })
    .done(function (data) {
        // Show formatted JSON on webpage.
        $("#responseText").val(JSON.stringify(data, null, 2));//responsejson
        line(data);
        emotion(data);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        // Display error message.
        let errorString = (errorThrown === "") ?
            "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ?
            "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                jQuery.parseJSON(jqXHR.responseText).message :
                jQuery.parseJSON(jqXHR.responseText).error.message;
        alert(errorString);
    });
}

function line(data_json){//複数人
    for(let i=0; i<data_json.length; i++){
        let faceRe =(data_json[i].faceRectangle);
        let top = JSON.stringify(faceRe.top);
        let left = JSON.stringify(faceRe.left);
        let width = JSON.stringify(faceRe.width);
        let height = JSON.stringify(faceRe.height);
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.strokeRect(left, top, width, height);
        ctx.fillStyle = "red";
        ctx.font = "bold 20px 'Arial'";
        ctx.fillText(i + 1,left - 15,top);
        canvas.src = canvas.toDataURL("image/png");
    }
}

function emotion(data_json){//1人
    let emotion_data =(data_json[0].faceAttributes.emotion);
    let anger = JSON.stringify(emotion_data.anger);
    let contempt = JSON.stringify(emotion_data.contempt);
    let disgust = JSON.stringify(emotion_data.disgust);
    let fear = JSON.stringify(emotion_data.fear);
    let happiness = JSON.stringify(emotion_data.happiness);
    let neutral = JSON.stringify(emotion_data.neutral);
    let sadness = JSON.stringify(emotion_data.sadness);
    let surprise = JSON.stringify(emotion_data.surprise);
    //複数回撮影するとcanvasに重ねて描画される。解決:canvasの初期化
    let canvas = document.getElementById("myChart");
    let ctx = document.getElementById("myChart").getContext("2d");
    let myChart = new Chart(ctx,{
        type: "pie",
        data: {
            labels: ["怒りanger", "軽蔑contempt", "嫌悪disgust", "恐れfear",
                        "幸せhappiness", "自然neutral","悲しみsadness","驚きsurprise"],    
            datasets: [{
                data: [anger, contempt,disgust,fear,
                        happiness,neutral,sadness,surprise]
            }]
        },
        options: {
            responsive:true,
            title:{
                display:true,
                text : "結果",
                fontSize:15
            },
            legend: {
                display:true,
                position: "bottom",
                fontSize:5,
                stepSize:5
            },
            plugins:{
                colorschemes:{
                    scheme: 'brewer.Paired12'
                }
            }

        }
    });
}