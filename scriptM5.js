const albumCover = document.getElementById("albumCover");
const disc = document.getElementById("disc");

const audio = document.getElementById("audio");

const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");

const instruction = document.getElementById("instruction");

const lyricsContainer = document.getElementById("lyricsContainer");
const placeholder = document.getElementById("placeholder");

const progress = document.getElementById("progress");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");

// LYRICS WITH TIMESTAMPS
// Format: [seconds, "lyrics"]

const lyrics = [
    [18, "I text a postcard sent to you"],
    [22, "Did it go through?"],
    [25, "Sending all my love to you"],

    [30, "You are the moonlight of my life"],
    [34, "Every night"],
    [37, "Giving all my love to you"],

    [43, "My beating heart belongs to you"],
    [48, "I walked for miles 'til I found you"],
    [53, "I'm here to honour you"],
    [58, "If I lose everything in the fire"],
    [64, "I'm sending all my love to you"],

    [70, "With every breath that I am worth"],
    [75, "Here on Earth"],
    [79, "I'm sending all my love to you"],

    [86, "So if you dare to second-guess"],
    [90, "You can rest"],
    [94, "Assured that all my love's for you"],

    [100, "My beating heart belongs to you"],
    [105, "I walked for miles 'til I found you"],
    [110, "I'm here to honour you"],
    [115, "If I lose everything in the fire"],
    [121, "I'm sending all my love to you"],

    [128, "My beating heart belongs to you"],
    [133, "I walked for miles 'til I found you"],
    [138, "I'm here to honour you"],
    [143, "If I lose everything in the fire"],
    [150, "Did I ever make it through?"]
];

// CREATE LYRIC ELEMENTS

const lyricElements = [];

lyrics.forEach((item, index) => {

    const line = document.createElement("p");

    line.classList.add("lyric-line");
    line.textContent = item[1];

    lyricsContainer.appendChild(line);

    lyricElements.push(line);

});

// FORMAT TIME

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return minutes + ":" +
        String(remainingSeconds).padStart(2, "0");
}

// OPEN ALBUM AND PLAY MUSIC

async function startMusic() {

    albumCover.classList.add("open");

    try {

        await audio.play();

        disc.classList.add("spinning");

        instruction.textContent = "Now Playing ♪";

    } catch (error) {

        instruction.textContent =
            "Unable to play music. Check your music file.";

    }
}

// CLICK ALBUM COVER

albumCover.addEventListener("click", startMusic);

// PLAY BUTTON

playButton.addEventListener("click", async () => {

    albumCover.classList.add("open");

    if (audio.paused) {
        await startMusic();
    }

});

// PAUSE BUTTON

pauseButton.addEventListener("click", () => {

    audio.pause();

});

// MUSIC PLAYING EVENT

audio.addEventListener("play", () => {

    disc.classList.add("spinning");
    instruction.textContent = "Now Playing ♪";

});

// MUSIC PAUSED EVENT

audio.addEventListener("pause", () => {

    disc.classList.remove("spinning");

    if (!audio.ended) {
        instruction.textContent = "Music Paused";
    }

});

// UPDATE LYRICS BASED ON MUSIC TIME

audio.addEventListener("timeupdate", () => {

    const currentTime = audio.currentTime;

    let activeIndex = -1;

    // Find the current lyric

    lyrics.forEach((item, index) => {

        if (currentTime >= item[0]) {
            activeIndex = index;
        }

    });

    // Update each lyric

    lyricElements.forEach((line, index) => {

        line.classList.remove("active", "visible");

        if (index <= activeIndex) {
            line.classList.add("visible");
        }

    });

    // Highlight current lyric

    if (activeIndex >= 0) {

        const activeLine = lyricElements[activeIndex];

        activeLine.classList.add("active");

        // Automatically scroll to current lyric

        activeLine.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

    // Update progress bar

    if (audio.duration) {

        progress.value =
            (currentTime / audio.duration) * 100;

    }

    currentTimeDisplay.textContent = formatTime(currentTime);

});

// UPDATE SONG DURATION

audio.addEventListener("loadedmetadata", () => {

    durationDisplay.textContent =
        formatTime(audio.duration);

});

// SEEK MUSIC USING PROGRESS BAR

progress.addEventListener("input", () => {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;

    }

});

// WHEN SONG ENDS

audio.addEventListener("ended", () => {

    disc.classList.remove("spinning");

    albumCover.classList.remove("open");

    instruction.textContent = "Song Finished ♡";

});