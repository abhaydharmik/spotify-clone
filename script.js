console.log("Let's Write JavaScript");

async function getSongs() {
  let a = await fetch("http://127.0.0.1:4000/songs/");
  let response = await a.text();
  //   console.log(response);

  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");

  let songs = [];

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href);
    }
  }
  return songs;
}

async function main() {
  let songs = await getSongs();
  console.log(songs);

  // wait for user interaction before playing
  window.addEventListener("click", function playOnce() {
    var audio = new Audio(songs[0]);
    audio.play().catch((err) => {
      console.error("Playback failed:", err);
    });

    window.removeEventListener("click", playOnce); // remove listener after first play
  });
}

main();
