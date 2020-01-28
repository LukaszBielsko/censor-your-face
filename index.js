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


const detectFace = async () => {
  const faces = await faceDetector.detect(video)
  faces.forEach(drawFace)
  // ask browser for next animation frame, then fire off detect
  requestAnimationFrame(detectFace)
}


const drawFace = (face) => {
  ctx.clearRect(0,0, canvas.width, canvas.height)
  const {width, height, top, left} =  face.boundingBox

  // eye location
  // const {landmarks} = face
  // console.log(landmarks[0].locations[0].x)
  // console.log(face)
  // console.log({width, height, top, left})
  
  ctx.fillStyle = 'yellow';
  ctx.fillRect(left, top, width + 30, height + 30);
}


displayVideo().then(detectFace)