const row = document.querySelector(".row");
const layOut = document.querySelector(".layOut");
const imgLayOut = document.querySelector(".imgLayOut img");
const iconLeft = document.querySelector(".iconLeft");
const iconX = document.querySelector(".iconX");
const iconRight = document.querySelector(".iconRight");
let data = [];
let currentIndex = 0;

const myHttp = new XMLHttpRequest();
myHttp.open("GET", "https://api.themoviedb.org/3/trending/all/day?api_key=c9fac173689f5f01ba1b0420f66d7093");
myHttp.send();
myHttp.addEventListener("readystatechange", () => {
  if (myHttp.readyState === 4 && myHttp.status === 200) {
    data = JSON.parse(myHttp.response).results;
    displayData();
  }
});

function displayData() {
  const cartona = data.map((item, index) => `
    <div class="col-md-4">
      <div class="myCard position-relative" data-index="${index}">
        <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt=""/>
        <div class="imgDesc bg-dark text-white text-center">
          <h3>${item.title}</h3>
          <p>${item.overview.slice(0, 110)}...</p>
        </div>
      </div>
    </div>`).join('');

  row.innerHTML = cartona;

  document.querySelectorAll(".myCard").forEach(card => {
    card.addEventListener("click", e => {
      layOut.classList.replace("d-none", "d-flex");
      imgLayOut.src = e.currentTarget.querySelector("img").src;
      currentIndex = parseInt(e.currentTarget.getAttribute("data-index"));
    });
  });
}

iconX.addEventListener("click", () => {
  layOut.classList.replace("d-flex", "d-none");
});

iconRight.addEventListener("click", nextImage);
iconLeft.addEventListener("click", previousImage);

function nextImage() {
  currentIndex = (currentIndex + 1) % data.length;
  imgLayOut.src = `https://image.tmdb.org/t/p/w500${data[currentIndex].poster_path}`;
}

function previousImage() {
  currentIndex = (currentIndex - 1 + data.length) % data.length;
  imgLayOut.src = `https://image.tmdb.org/t/p/w500${data[currentIndex].poster_path}`;
}

document.addEventListener("keydown", e => {
  if (e.code === "ArrowRight") {
    nextImage();
  } else if (e.code === "ArrowLeft") {
    previousImage();
  } else if (e.code === "Escape") {
    layOut.classList.replace("d-flex", "d-none");
  }
});

layOut.addEventListener("click", e => {
  if (!document.querySelector(".imgLayOut").contains(e.target)) {
    layOut.classList.replace("d-flex", "d-none");
  }
});
