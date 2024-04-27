import movieData from "./movie.mjs";
const BiggestDiv = document.createElement("div");
const div = document.createElement("div");
const flex = document.createElement("div");
const leftButton = document.createElement("img");
const rightButton = document.createElement("img");
rightButton.src = "/back.png";
rightButton.className = "size2";
rightButton.classList.add("reverse");
let currentTranslateX = 0;
leftButton.src = "/back.png";
leftButton.className = "size";
div.style.width = "80%";
div.style.overflowX = "hidden";
div.style.overflowY = "hidden";
flex.className = "flex";
div.appendChild(flex);
BiggestDiv.className = "biggestdiv";
BiggestDiv.appendChild(leftButton);
BiggestDiv.appendChild(div);
BiggestDiv.appendChild(rightButton);
document.body.appendChild(BiggestDiv); // <body><div class="flex"></div></body>

function createBackButton() {
  const backbutton = document.createElement("img");
  backbutton.src = "/back.png";
  backbutton.className = "backbutton";
  return backbutton;
}

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "explainbar";
  return overlay;
}

function createInfrom() {
  const inform = document.createElement("div");
  inform.className = "show";
  inform.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  return inform;
}

function CreatePoster(data) {
  const newDiv = document.createElement("div"); //newDiv: <div></div>
  const Poster = `<img class="margin" src="${data.large_cover_image}" width="150px" height="200px"/>`;
  newDiv.innerHTML = Poster; // newDiv : <div><img src="someImage.png" width="94px" height="132px"/></div>
  newDiv.classList.add("newDiv");
  newDiv.addEventListener("click", () => {
    const overlay = createOverlay();
    const backbutton = createBackButton();
    const inform = createInfrom();
    const BigDiv = document.createElement("div");
    const Poster = document.createElement("img");
    const imgDiv = document.createElement("div");
    const element = document.createElement("div");
    const title = document.createElement("h3");
    const year = document.createElement("h5");
    const genres = document.createElement("h5");
    const rate = document.createElement("h5");

    title.innerText = data.title;
    genres.innerText = "개요:" + data.genres + "" + data.runtime;
    year.innerHTML =
      "개봉:" +
      data.year +
      " " +
      "<img src='https://icons.iconarchive.com/icons/ph03nyx/super-mario/256/Star-icon.png' width='10px' height='10px'/>" +
      "  " +
      data.rating;
    rate.innerText = data.rating;
    Poster.src = data.large_cover_image;
    Poster.style.width = "200px";
    Poster.style.height = "300px";
    BigDiv.appendChild(imgDiv);
    imgDiv.appendChild(Poster);
    imgDiv.appendChild(element);
    element.appendChild(title);
    element.appendChild(genres);
    element.appendChild(year);
    BigDiv.className = "omen";
    imgDiv.className = "img1";
    element.className = "title1";
    inform.appendChild(backbutton);
    inform.appendChild(BigDiv);
    overlay.appendChild(inform);
    document.body.appendChild(overlay);
    inform.addEventListener("animationend", () => {
      if (inform.className === "hide") document.body.removeChild(overlay);
    });

    const hideModal = () => {
      inform.className = "hide";
    };

    backbutton.addEventListener("click", hideModal);
    overlay.addEventListener("click", hideModal);
  });
  newDiv.addEventListener("mouseenter", () => {
    newDiv.classList.remove("hoverhide");
    newDiv.classList.add("hovershow");
  });
  newDiv.addEventListener("mouseleave", () => {
    newDiv.classList.remove("hovershow");
    newDiv.classList.add("hoverhide");
  });
  return newDiv;
}
for (let a = 0; a < movieData.length; a++) {
  const div = CreatePoster(movieData[a]);
  flex.appendChild(div);
}
leftButton.addEventListener("click", () => {
  const element = div.getClientRects();
  if (currentTranslateX + element[0].width <= 0) {
    currentTranslateX += element[0].width;
    console.log(currentTranslateX);
    flex.style.transform = `translateX(${currentTranslateX}px)`;
  }
});
rightButton.addEventListener("click", () => {
  const element = div.getClientRects();
  const flexElement = flex.scrollWidth;

  if (-(currentTranslateX - element[0].width) < flexElement) {
    currentTranslateX -= element[0].width;
    flex.style.transform = `translateX(${currentTranslateX}px)`;
  }
});
