const video = document.querySelector('.webcam')

const canvas = document.querySelector('.video')
const ctx = canvas.getContext('2d')

const face = document.querySelector('.face')
const faceCtx = canvas.getContext('2d')

const faceDetector = new FaceDetector()


const displayVideo = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1000, height: 600}
  })

  // assign video source 
  video.srcObject = stream
  await video.play()

  // size canvas and face canvas the same as video 
  canvas.height = video.videoHeight
  canvas.width = video.videoWidth
  face.height = video.videoHeight
  face.width = video.videoWidth
}


const faceDetect = async () => {
  const faces = await faceDetector.detect(video)
  console.log(faces.length)
  // ask browser for next animation frame, then fire off detect
  requestAnimationFrame(faceDetect)
}

displayVideo().then(faceDetect)