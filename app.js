"use strict";

const songsList = [
    {
        artist: "Adele",
        song: "Turning Tables",
        coverImage: "./images/adele.jpg",
        url: "./music/Turning Tables.mp3",
    },
    {
        artist: "50 Cent",
        song: "In Da Club",
        coverImage: "./images/50 Cent.jpg",
        url: "./music/In Da Club.mp3",
    },
    {
        artist: "Michael Jackson",
        song: "Bad",
        coverImage: "./images/Michael Jackson.jpg",
        url: "./music/Bad.m4a",
    },
];

const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon music-player__icon music-player__icon--play"
viewBox="0 0 512 512">
<title>Play</title>
<path
  d="M133 440a35.37 35.37 0 01-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0135.77.45l247.85 148.36a36 36 0 010 61l-247.89 148.4A35.5 35.5 0 01133 440z" />
</svg>`;
const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon music-player__icon music-player__icon--pause" viewBox="0 0 512 512"><title>Pause</title><path d="M208 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16zM352 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16z"/></svg>`;

// Selectors
const mainImage = document.querySelector(".music-player__image");
const previous = document.querySelector(".music-player__previous");
const play = document.querySelector(".music-player__play");
const next = document.querySelector(".music-player__next");
const mainSong = document.querySelector(".music-player__song");
const mainArtist = document.querySelector(".music-player__artist");
const audio = document.querySelector("audio");

/* This variable represents the song that will be loaded onto the music player when the app loads,
   and it is also used to keep track of the current song that is currently loaded onto the music player
*/
let currentSongIndex = randomNumberGenerator(0, songsList.length - 1);

// Helper functions and event handlers

// This function returns a random number between lowerBound (inclusive) and upperBound (inclusive)
function randomNumberGenerator(lowerBound, upperBound) {
    return Math.floor(
        Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
}

// This function loads the song onto the music player
function loadSong() {
    audio.src = songsList[currentSongIndex].url;
    mainImage.src = songsList[currentSongIndex].coverImage;
    mainSong.innerText = songsList[currentSongIndex].song;
    mainArtist.innerText = songsList[currentSongIndex].artist;
}

// This function plays the song
function playSong() {
    const playOrPauseIcon = document.querySelector(
        ".music-player__play .music-player__icon"
    );

    play.classList.remove("music-player__play--pause");
    play.classList.add("music-player__play--play");
    playOrPauseIcon.remove();
    play.insertAdjacentHTML("afterbegin", pauseIcon);
    audio.play();
}

// This function pauses the song
function pauseSong() {
    const playOrPauseIcon = document.querySelector(
        ".music-player__play .music-player__icon"
    );

    play.classList.remove("music-player__play--play");
    play.classList.add("music-player__play--pause");
    playOrPauseIcon.remove();
    play.insertAdjacentHTML("afterbegin", playIcon);
    audio.pause();
}

// Event listeners

// Load a random song onto the music player when the app has loaded
window.addEventListener("load", () => {
    play.insertAdjacentHTML("afterbegin", playIcon);
    loadSong();
});

// Play or pause the song
play.addEventListener("click", () => {
    const isPlaying = play.classList.contains("music-player__play--play");
    isPlaying ? pauseSong() : playSong();
});

// Load and play the next song
next.addEventListener("click", () => {
    if (currentSongIndex === songsList.length - 1) {
        currentSongIndex = 0;
        loadSong();
    } else {
        currentSongIndex++;
        loadSong();
    }

    playSong();
});

// Load and play the previous song
previous.addEventListener("click", () => {
    if (currentSongIndex === 0) {
        currentSongIndex = songsList.length - 1;
        loadSong();
    } else {
        currentSongIndex--;
        loadSong();
    }

    playSong();
});
