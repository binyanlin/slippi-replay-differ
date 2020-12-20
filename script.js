const { default: SlippiGame } = require('@slippi/slippi-js');

// Toggle how many desyncs to show in console
let desyncDisplayCount = 15;

// Compare desync function
const compare = (gamename1, gamename2) => {
  
  const game1 = new SlippiGame(gamename1.toString());
  const game2 = new SlippiGame(gamename2.toString());
  
  const settings1 = game1.getSettings();
  const settings2 = game2.getSettings();
  
  const metadata1 = game1.getMetadata();
  const metadata2 = game2.getMetadata();

  const playerCount1 = Object.keys(metadata1.players).length;
  const playerCount2 = Object.keys(metadata2.players).length;

  //Compare if same stage, if not return
  if (settings1.stageId !== settings2.stageId) {
    console.log("Stage mismatch");
    return;
  }
  //Compare if same amount of players, if not return
  if (playerCount1 !== playerCount2) {
    console.log("Player count mismatch");
    return;
  }

  const frames1 = game1.getFrames();
  const frames2 = game2.getFrames();

  const lastFrameGame1 = game1.getMetadata().lastFrame;
  const lastFrameGame2 = game2.getMetadata().lastFrame;
  const maxFrame = Math.min(lastFrameGame1, lastFrameGame2);

  console.log(`Comparing the two games up to frame ${maxFrame}...`);
  let totalDesync = 0;
  let firstDesync;
  for (let i = 0; i < maxFrame; i++) {

    let frameLog = `Frame ${i}: `;
    let display = {};
    let desync = false;

    for (let j = 0; j < playerCount1; j++) {
      Object.keys(frames1[i].players[j].pre).forEach((key) => {
        // if (key === "physicalRTrigger" || key === "physicalLTrigger") {
        //   let game1trigger = (frames1[i].players[j].pre[key])*255.0;
        //   let game2trigger = (frames2[i].players[j].pre[key])*255.0;
        //   frames1[i].players[j].pre[key] = game1trigger;
        //   frames2[i].players[j].pre[key] = game2trigger;
        //   if (game1trigger <= 42 && game2trigger <= 42) {
        //     return;
        //   }
        // }
        if (key === "physicalRTrigger" || key === "physicalLTrigger") {
          return;
        }
        if (frames1[i].players[j].pre[key] !== frames2[i].players[j].pre[key]) {
          desync = true;
          display[key] = [frames1[i].players[j].pre[key], frames2[i].players[j].pre[key]];
        }
      });
      
      if (desync) {
        console.log(frameLog);
        console.log(`port ${j+1}`);
        console.log(display);
      }
    }
    if (desync) {
      totalDesync++;
      if (totalDesync === 1) {
        firstDesync = i;
      }
    }
    if (totalDesync > desyncDisplayCount) {
      let minutes = Math.floor((28800 - firstDesync) / 3600);
      let seconds = Math.floor(60 - (firstDesync % 3600) / 60);
      let milliseconds = Math.ceil(((60 - (firstDesync % 3600) / 60) - seconds) * 100);   

      console.log(`First desync on frame: ${firstDesync}`);
      console.log(`Game timer: ${minutes}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`);
      return; 
    }
  }
}

let gameFields = process.argv.slice(2);

if (gameFields.length < 2 || gameFields.length > 3) {
  console.log("You must give two full game file names in the format 'gamename1.slp' 'gamename2.slp'");
  return;
}

if (gameFields.length === 3) {
  desyncDisplayCount = gameFields[2];
  compare(gameFields[0], gameFields[1]);
}

if (gameFields.length == 2) {
  compare(gameFields[0], gameFields[1]);
}
