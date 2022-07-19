function setup() {
  canvas = createCanvas(250, 250);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet',modelLoaded)
}

function modelLoaded(){
  console.log('model has loaded.')
}

function draw(){
  image(video,0,0,250,250)
  setTimeout(function(){
    classifier.classify(video,gotResult)
  },5000)
 
}
var previousResult= ' '

function gotResult(error, results){
if (error) {
  console.error(error)
  
}else{
if ((results[0].confidence>0.5)&&(previousResult != results[0].label)) {
  console.log(results)
  previousResult = results[0].label
  document.getElementById('span1').innerHTML=results[0].label
  document.getElementById('span2').innerHTML=results[0].confidence.toFixed(3)
  var synth=window.speechSynthesis
  speak_data= 'Object detected is '+results[0].label
  var utterThis=new SpeechSynthesisUtterance(speak_data)
  synth.speak(utterThis)
}

}
}

