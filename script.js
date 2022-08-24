const audio = document.querySelector('audio');
const image = document.querySelector('img')
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const runningTime = document.getElementById('current-time');
const totalTime = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
const progressContainer = document.getElementById('progress-container')
const progressDark = document.getElementById('progress')

let isPlaying = false;

const songs = [
  {
    name : 'Circle Of Love',
    artist : 'Rudy Mancuso',
    source : "music/Circle Of Love Rudy Mancuso.mp3",
    albumart : "img/circle.png",
  },
  {
    name : "Hollywood's Bleeding",
    artist : 'Post Malone',
    source : "music/Hollywood's Bleeding.mp3",
    albumart : "img/post.webp",
  },
  {
    name : 'Midnight City',
    artist : 'M83',
    source : "music/Midnight City.mp3",
    albumart : "img/m83.jpg",
  },
  {
    name : 'Stressed Out',
    artist : 'Twenty One Pilots',
    source : "music/Stressed Out.mp3",
    albumart : "img/twenty.png",
  },
  {
    name : 'Violet City(Instrumental)',
    artist : 'Mansionair',
    source : "music/Mansionair - Violet City Instrumental [FIFA 19].mp3",
    albumart : "img/violet.jpg",
  },
]

function playTrack(){
  audio.play()
  play.classList.replace('fa-play', 'fa-pause');
  play.setAttribute('title', 'pause')
  isPlaying = true;
}

function pauseTrack(){
  audio.pause();
  play.classList.replace('fa-pause', 'fa-play');
  play.setAttribute('title', 'play')
  isPlaying = false;  
}

play.addEventListener('click', function(){
  (isPlaying ? pauseTrack() : playTrack())
});



let songIndex = 0;
function loadSong(file){
  title.textContent = file.name;
  artist.textContent = file.artist;
  image.src = file.albumart;
  audio.src = file.source;
}

function nextSong(){
  songIndex++;
  if (songIndex > songs.length - 1){
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playTrack();

};

function prevSong(){
  songIndex--;
  if (songIndex < 0){
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex]);
  playTrack();
};

// Current Time and duration
function getTheCurrentTime(WhatsTheTime){
  if (isPlaying) {
    const {duration, currentTime} = WhatsTheTime.srcElement;
    const progressedTimeinPercent = (currentTime/duration) * 100
    progressDark.style.width = `${progressedTimeinPercent}%`

    //running
    let runningMinutes = Math.floor(currentTime / 60)
    let runningSeconds = Math.floor(currentTime % 60)
    if (runningSeconds < 10){
      runningSeconds = `0${runningSeconds}`
    } 
    runningTime.textContent = `0${runningMinutes}:${runningSeconds}`

    //duration
    let durationMinutes = Math.floor(duration/60)
    let durationSeconds = Math.round(duration % 60)
    if (durationSeconds < 10){
      durationSeconds = `0${durationSeconds}`
    } 
    // to avoid showing NaN
    if (durationSeconds){
      totalTime.textContent = `0${durationMinutes}:${durationSeconds}`
    }
  }
}

function seekTo(e){
  console.log(e)
  const width = this.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX/width)*audio.duration
}

//event listeners
next.addEventListener('click', nextSong)
prev.addEventListener('click', prevSong)   
audio.addEventListener('timeupdate', getTheCurrentTime)
audio.addEventListener('ended', nextSong)
progressContainer.addEventListener('click', seekTo)
