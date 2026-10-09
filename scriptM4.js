const cover = document.getElementById("cover");
const music = document.getElementById("music");

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const pageStatus = document.getElementById("pageStatus");
const instruction = document.getElementById("instruction");
const musicStatus = document.getElementById("musicStatus");

const sheets = [
    document.getElementById("sheet1"),
    document.getElementById("sheet2"),
    document.getElementById("sheet3"),
    document.getElementById("sheet4")
].filter(Boolean);

let opened = false;
let page = 0;
let busy = false;

function refresh() {
    previousButton.disabled = !opened || page === 0;
    nextButton.disabled = !opened || page >= sheets.length * 2;

    pageStatus.textContent = !opened
        ? "Cover"
        : page >= sheets.length * 2
            ? "The End ♡"
            : `Page ${page + 1} of ${sheets.length * 2}`;

    sheets.forEach((sheet, i) => {
        sheet.style.zIndex = sheet.classList.contains("flipped")
            ? i + 1
            : sheets.length - i + 1;
    });
}

cover.addEventListener("click", async () => {
    if (opened || busy) return;

    opened = true;
    busy = true;
    cover.classList.add("open");

    instruction.textContent = "Our story, one page at a time 💙";

    music.play()
        .then(() => {
            musicStatus.textContent = "♫ Now playing our song";
        })
        .catch(() => {
            musicStatus.textContent = "Check your music file.";
        });

    refresh();

    setTimeout(() => {
        busy = false;
    }, 1100);
});

nextButton.addEventListener("click", () => {
    if (!opened || busy || page >= sheets.length * 2) return;

    busy = true;

    const index = Math.floor(page / 2);
    sheets[index].classList.add("flipped");
    page++;

    refresh();

    setTimeout(() => {
        busy = false;
    }, 950);
});

previousButton.addEventListener("click", () => {
    if (!opened || busy || page <= 0) return;

    busy = true;

    page--;

    const index = Math.floor(page / 2);
    sheets[index].classList.remove("flipped");

    refresh();

    setTimeout(() => {
        busy = false;
    }, 950);
});

refresh();