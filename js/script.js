const container = document.querySelector(".container"),
musicImg = container.querySelector(".img-area img"),
musicName = container.querySelector(".song-details .name"),
musicArtist = container.querySelector(".song-details .artist"),
mainAudio = container.querySelector("#main-audio"),

playpauseBtn = container.querySelector(".play-pause"),
nextBtn = container.querySelector("#next"),
prevBtn = container.querySelector("#prev"),

progressArea = container.querySelector(".progress-area"),
progressBar = container.querySelector(".progress-bar"),

musicList = container.querySelector(".musiclist"),
moreMusicBtn = container.querySelector("#more-music"),
closemoreMusic = container.querySelector("#close");


let musicIndex=1;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
})

//loadmusic Function
function loadMusic(indexNumb){
    musicName.innerText=allMusic[indexNumb - 1].name;
    musicArtist.innerText=allMusic[indexNumb - 1].artist;
    musicImg.src=`images/${allMusic[indexNumb - 1].img}.webp`;
    mainAudio.src=`songs/${allMusic[indexNumb - 1].src}.mp3`;
}

//playMusic Function
function playMusic(){
    container.classList.add("paused");
    playpauseBtn.querySelector("i").innerText="pause";

    mainAudio.play();
}

//pauseMusic Function
function pauseMusic(){
    container.classList.add("paused");
    playpauseBtn.querySelector("i").innerText="play_arrow";

    mainAudio.pause();
}


//play and pause ka event
playpauseBtn.addEventListener("click", ()=>{
    const isMusicPaused=container.classList.contains("paused");

    isMusicPaused ? pauseMusic() : playMusic();

})


// nextMusic function
function nextMusic() {
    musicIndex++;
    musicIndex>allMusic.length ? musicIndex=1 : musicIndex=musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

// next music ka event
nextBtn.addEventListener("click", () => {
    nextMusic();
});

// prevMusic function
function prevMusic() {
    musicIndex--;
    musicIndex<1 ? musicIndex=allMusic.length : musicIndex=musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

// prev music ka event
prevBtn.addEventListener("click", () => {
    prevMusic();
});

//loop, repeat, shuffle
const repeatBtn=container.querySelector("#repeat-plist");

repeatBtn.addEventListener("click", () => {
    let getText=repeatBtn.innerText; 
    switch (getText) {

        case "repeat":
            repeatBtn.innerText="repeat_one";
            repeatBtn.setAttribute("title", "song looped");
            break;

        case "repeat_one":
            repeatBtn.innerText="shuffle";
            repeatBtn.setAttribute("title", "shuffled");
            break;

        case "shuffle":
            repeatBtn.innerText="repeat";
            repeatBtn.setAttribute("title", "playlist looped");
            break;

    }

});

//musiclist
moreMusicBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});

closemoreMusic.addEventListener("click", () => {
    moreMusicBtn.click();
});


 // update progressbar width according to music current time
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime; //getting playing song currenttime
    const duration = e.target.duration; //getting playing total song duration
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;



    let musicCurrentTime = container.querySelector(".current-time"),
        musicDuration = container.querySelector(".max-duration");
    mainAudio.addEventListener("loadeddata", () => {

        //  update song total duration
        let mainAdDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if (totalSec < 10) { //if sec is less than 10 then add 0 before it
            totalSec = `0${totalSec}`;
        }

        musicDuration.innerText = `${totalMin}:${totalSec}`;

    });

    //update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) { 
        currentSec = `0${currentSec}`;
    }

    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;

});

// update playing song current width onaccording to the progress bar width

progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth; //getting width of progress bar
    let clickedOffsetX = e.offsetX; //getting offset x value
    let songDuration = mainAudio.duration; //getting song total duration

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();

});

// what to do after song ended
mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText; //getting this tag innerText
    switch (getText) {
        case "repeat":
            nextMusic(); //calling nect music function
            break;
        case "repeat_one":
            mainAudio.currentTime = 0; //setting audio current time to 0
            loadMusic(musicIndex); //calling load music function with argument, in the argument there is a  index of current song
            playMusic(); //calling playMusic Function
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } while (musicIndex == randIndex); //thi loop run until the next random number won't be the same of current musicIndex
            musicIndex = randIndex; //passing randomIndex to musicIndex
            loadMusic(musicIndex);
            playMusic();
            playingSong();
            break;
    }
});





// play particular song from the list on click of li tag

const allLiTags = ulTag.querySelectorAll("li");
function playingSong() {
    for (let j = 0; j < allLiTags.length; j++) {
   let audioTag = allLiTags[j].querySelector(".audio-duration");
        // let remove playing class from all other li expect the last one which is clicked
        if(allLiTags[j].classList.contains("playing")){
            allLiTags[j].classList.remove("playing");
        //  let's get that audio duration value and pass to .audio-duration innertext
        let adDuration = audioTag.getAttribute("t-duration");
        audioTag.innerText = adDuration;
        }
    
        // if there is an li tag which li index is equal to musicIndex
        // then this music is playing now and we'll style it
    
        if(allLiTags[j].getAttribute("li-index") == musicIndex){
            allLiTags[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }
    
        // adding on click attribute in all li tags
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}

// lets play song on click li 
function clicked(element){

    // getting li index of particular clicked li tag
    let getLiIndex = element.getAttribute("li-index");
    musicIndex =  getLiIndex; //passing that liindex to musicIndex
    loadMusic(musicIndex);
    playMusic(); 
    playingSong();
   
}



