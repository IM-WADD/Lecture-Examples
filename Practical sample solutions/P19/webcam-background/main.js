const canvas = document.getElementById("canvas");
const video = document.getElementById("webcam");
const ctx = canvas.getContext("2d", {willReadFrequently: true});
const videoStatusText = document.getElementById("status");
const backgroundStatusText = document.getElementById("bg-status");
const backgroundToggle = document.getElementById("background-toggle");

let videoIsPlaying = false;
let backgroundOn = true;


const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
const segmenterConfig = {
  runtime: 'mediapipe', 
  solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation',
  modelType: 'general'
}

function setup() {
    bodySegmentation.createSegmenter(model, segmenterConfig)
        .then(function (segmenter) {
            segment(segmenter);
        });
    
}

function segment(segmenter) {
    if (backgroundOn) {
        segmenter.segmentPeople(video)
            .then(function (people) {
                const foreground = {r: 0, g: 0, b: 0, a: 0};
                const background = {r: 0, g: 255, b: 0, a: 255};
                bodySegmentation.toBinaryMask(people, foreground, background)
                    .then(function (maskImage) {
                        drawImageWithoutBackground(video, maskImage);
                        if (videoIsPlaying) {
                            setTimeout(function () {
                                segment(segmenter)
                            }, 15);
                        }
                    });
            });
    } else {
        ctx.drawImage(video, 0, 0);
        setTimeout(function () {
            segment(segmenter);
        }, 15);
    }
}

function isPixelGreen (r, g, b, a) {
    return r === 0 && g === 255 && b === 0 && a === 255;
}


function drawImageWithoutBackground(image, maskData) {
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const imagePixels = imageData.data;
    const maskPixels = maskData.data;
    for (let i = 0; i < maskPixels.length; i+=4) {
        if (isPixelGreen(maskPixels[i], maskPixels[i+1], maskPixels[i+2], maskPixels[i+3])) {
            imagePixels[i+3] = 0; // make the image pixel transparent
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

video.addEventListener("play", function () {
    videoIsPlaying = true;
    videoStatusText.innerText = "ON";
    backgroundToggle.removeAttribute("disabled");
    setup();
})

video.addEventListener("pause", function () {
    videoIsPlaying = false;
    videoStatusText.innerText = "OFF";
    backgroundToggle.disabled = true;
});

video.addEventListener("loadedmetadata", function () {
    video.play(); 
});

document.getElementById("video-toggle").addEventListener("click", function () {
    if (videoIsPlaying) {
        video.pause();
    } else {
        video.play();
    }
});

backgroundToggle.addEventListener("click", function () {
    backgroundOn = !backgroundOn;
    if (backgroundOn) {
        backgroundStatusText.innerHTML = "ON";
    } else {
        backgroundStatusText.innerHTML = "OFF" ;
    }
})

document.getElementById("change-image").addEventListener("change", function (event) {
    if (event.target.files[0]) {
        const reader  = new FileReader();
        reader.addEventListener("loadend", function () {
            canvas.style.backgroundImage = `url('${reader.result}')`; 
        })
        reader.readAsDataURL(event.target.files[0]);
    }
})

navigator.mediaDevices
    .getUserMedia({
        audio: false,
        video: { width: canvas.width, height: canvas.height }
    })
    .then(function (mediaStream) {
        video.srcObject = mediaStream;
    })
    .catch(function (err) {
        console.error("Something went wrong with the webcam", err);
    });
