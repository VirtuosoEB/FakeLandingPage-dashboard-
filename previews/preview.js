let colors = JSON.parse(localStorage.getItem("heroColors")) || {
  background: "#0B1B2B",
  title: "#f5f5dc",
  slogan: "#f5f5dc",
  cts: "#00aeef"
}

localStorage.setItem("heroColors", JSON.stringify(colors))


document.body.style.backgroundColor = colors.background;

let title = document.getElementById("title");
title.style.color = colors.title;

let slogan = document.getElementById("slogan");
slogan.style.color = colors.slogan;

let cts = document.getElementById("cts");
cts.style.backgroundColor = colors.cts




