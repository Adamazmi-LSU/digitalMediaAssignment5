let startContext, samples, sampler, button1, button2, button3, button4;
let delTimeSlider, feedbackSlider, distSlider, wetSlider, chorusSlider, phaserSlider;

let rev = new Tone.Reverb(5).toDestination();
let dist = new Tone.Distortion(0).connect(rev);
let del = new Tone.FeedbackDelay(0, 0).connect(dist);
let chorus = new Tone.Chorus(4, 2.5, 0.5).connect(del);
let phaser = new Tone.Phaser({ frequency: 0.5, octaves: 3, baseFrequency: 350 }).connect(chorus);

del.wet.value = 0.5;

function preload() {
  samples = new Tone.Players({
    astral: "media/astral.mp3",
    downfall: "media/downfall.mp3",
    guitar: "media/relaxing-guitar-loop.mp3",
    ocean: "media/stab.mp3"
  }).connect(phaser);
}

function setup() {
  createCanvas(400, 400);
  startContext = createButton("Start Audio Context");
  startContext.position(0, 0);
  startContext.mousePressed(startAudioContext);

  button1 = createButton("Play astral Sample");
  button1.position(10, 30);
  button1.mousePressed(() => { samples.player("astral").start(); });

  button2 = createButton("Play downfall Sample");
  button2.position(200, 30);
  button2.mousePressed(() => { samples.player("downfall").start(); });
  
  button3 = createButton("Play guitar Sample");
  button3.position(10, 60);
  button3.mousePressed(() => { samples.player("guitar").start(); });
  
  button4 = createButton("Play Ocean Sample");
  button4.position(200, 60);
  button4.mousePressed(() => { samples.player("ocean").start(); });

  delTimeSlider = createSlider(0, 1, 0, 0.01);
  delTimeSlider.position(10, 100);
  delTimeSlider.input(() => { del.delayTime.value = delTimeSlider.value(); });

  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(200, 100);
  feedbackSlider.input(() => { del.feedback.value = feedbackSlider.value(); });

  distSlider = createSlider(0, 10, 0, 0.01);
  distSlider.position(10, 200);
  distSlider.input(() => { dist.distortion = distSlider.value(); });

  wetSlider = createSlider(0, 1, 0, 0.01);
  wetSlider.position(200, 200);
  wetSlider.input(() => { rev.wet.value = wetSlider.value(); });
  
  chorusSlider = createSlider(0, 10, 0, 0.1);
  chorusSlider.position(10, 300);
  chorusSlider.input(() => { chorus.frequency.value = chorusSlider.value(); });
  
  phaserSlider = createSlider(0, 10, 0, 0.1);
  phaserSlider.position(200, 300);
  phaserSlider.input(() => { phaser.frequency.value = phaserSlider.value(); });
}

function draw() {
  background(220);
  text("Delay Time: " + delTimeSlider.value(), 15, 90);
  text("Feedback Amount: " + feedbackSlider.value(), 205, 90);
  text("Distortion Amount: " + distSlider.value(), 15, 190);
  text("Reverb Wet Amount: " + wetSlider.value(), 205, 190);
  text("Chorus Frequency: " + chorusSlider.value(), 15, 290);
  text("Phaser Frequency: " + phaserSlider.value(), 205, 290);
}

function startAudioContext() {
  if (Tone.context.state !== 'running') {
    Tone.start();
    console.log("Audio Context Started");
  } else {
    console.log("Audio Context is already running");
  }
}
