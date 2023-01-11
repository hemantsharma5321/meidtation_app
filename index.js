console.log("jai sri krishna");
const app =(() => {
  
  const song = document.querySelector(".song");
  const video = document.querySelector("video");
  const outline = document.querySelector(".moving-outline circle");
  const play = document.querySelector(".play");

  const sounds = document.querySelectorAll(".sound-picker button");
  const timerbtn=document.querySelectorAll(".time-select button");
  const timeDisplay = document.querySelector(".time-display");
  

  let outlineLength = outline.getTotalLength();
  console.log(outlineLength);

  let temptime=600;
  
// pick defferent sound and effect
sounds.forEach((sound)=>{
  sound.addEventListener("click",function(){
    song.src=`${this.getAttribute('data-sound')}`;
    video.src=`${this.getAttribute('data-video')}`;
    checkPlaying(song);
  })
})

  // play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });


  const checkPlaying=(song)=>{
    if(song.paused){
        song.play();
        video.play();
        play.src = "./svg/pause.svg";
        
         
    }else{
        song.pause();
        video.pause();
        play.src="./svg/play.svg";
    }
  }

  // select-timer
  timerbtn.forEach((button)=>{
    button.addEventListener("click", (e)=>{
      temptime=e.target.getAttribute("data-time");
      timeDisplay.textContent=`${temptime /60} ${temptime % 60}`;
      song.currentTime=0;
      song.pause();
      play.src="./svg/play.svg";
    })
  })
  

  
  song.ontimeupdate=function (){
    let currentTime=song.currentTime;
    let elapsed=temptime-currentTime;
    let secound=Math.floor(elapsed % 60);
    let minute=Math.floor(elapsed/60);

    //animate the circle

    let progress=outlineLength-(currentTime/temptime)* outlineLength;
    outline.style.strokeDashoffset=progress;
    timeDisplay.textContent=`${Math.floor(elapsed /60)} : ${Math.floor(elapsed % 60)}`;

    if(currentTime >=temptime){
      song.pause();
      video.pause();
      song.currentTime=0;
      play.src="./svg/play.svg";
    }
  }

  
  
})();




