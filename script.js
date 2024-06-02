console.log("Welcome to JamFlow");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('Music/Anuv Jain - HUSN (Official Video)_2.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItemPlay'));

let songs = [
    {songName: "Husn", filePath: "Music/Anuv Jain - HUSN (Official Video)_2.mp3", coverPath: "Resources/Husn.jpg"},
    {songName: "The Last Dance", filePath: "Music/The Last Dance (Original Motion Picture Soundtrack).mp3", coverPath: "Resources/LastD.jpg"},
    {songName: "Nagumo", filePath: "Music/Nagumo Video Song Hridayam Pranav Darshana Kalyani Hesham Arvind VenugopalTyagarajaMerryland.mp3", coverPath: "Resources/Nagumo.jpg"},
    {songName: "Channa Mereya", filePath: "Music/Channa Mereya Full Video - ADHMRanbir Kapoor, AnushkaArijit SinghPritamKaran Johar.mp3", coverPath: "Resources/Channa.jpg"},
    {songName: "Not Ramaiya", filePath: "Music/Jawan- Not Ramaiya Vastavaiya Extended Version (Hindi)- Shah Rukh Khan -Atlee -Anirudh -Nayanthara.mp3", coverPath: "Resources/Ram.jpg"}
];

songItems.forEach((element, i) => { 
    element.addEventListener('click', (e) => { 
        songIndex = parseInt(e.target.getAttribute('data-index'));
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => { 
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length; // Loop back to the start after the last song
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Loop to the end after the first song
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
