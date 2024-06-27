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



