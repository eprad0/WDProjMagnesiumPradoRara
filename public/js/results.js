document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const score = parseInt(params.get("score"), 10);

  const godNameEl = document.getElementById("godName");
  const godDescEl = document.getElementById("godDesc");
  const scoreTextEl = document.getElementById("scoreText");
  const godImgEl = document.getElementById("godImg");

  if (isNaN(score)) {
    godNameEl.textContent = "Unknown";
    godDescEl.textContent = "No score received.";
    return;
  }

  let god = "";
  let desc = "";
  let img = "";

  if (score <= 700) {
    god = "Ares";
    desc = "Bold, competitive, and fearless.";
    img = "../../assets/gods/ares.png";
  }
  else if (score <= 1000) {
    god = "Athena";
    desc = "Wise, strategic, and analytical.";
    img = "../../assets/gods/athena.png";
  }
  else if (score <= 1300) {
    god = "Zeus";
    desc = "Confident, commanding, natural leader.";
    img = "../../assets/gods/zeus.png";
  }
  else {
    god = "Apollo";
    desc = "Creative, expressive, and imaginative.";
    img = "../../assets/gods/apollo.png";
  }

  godNameEl.textContent = god;
  godDescEl.textContent = desc;
  scoreTextEl.textContent = `Score: ${score}`;
  godImgEl.src = img;

});
