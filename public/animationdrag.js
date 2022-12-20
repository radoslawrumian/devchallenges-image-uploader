const droparena = document.getElementById("droparena");
const box = document.getElementById("box");
const image1 = document.getElementById("image1");
const textinside = document.getElementById("textinside");
const rect = document.getElementById("rect");

droparena.addEventListener("dragover", async (ev) => {
  ev.preventDefault();
  console.log("dragnieto");
});

droparena.addEventListener("dragleave", async (ev) => {
  ev.preventDefault();
  console.log("opuszczono");
  // image1.style.display = "inline-block";
  box.style.maxHeight = "225px";

  setTimeout(() => {
    box.style.height = "225px";
    rect.style.height = "404px"

    image1.style.maxHeight = "88px";

    setTimeout(() => {
      image1.style.display = "inline-block";
      textinside.style.opacity = "100%";
      textinside.innerHTML = "Drag & Drop your image here";

      image1.style.opacity = "100%";
    }, 300);
  }, 300);

  textinside.style.opacity = "0";
});

droparena.addEventListener("dragenter", async (ev) => {
  ev.preventDefault();
  console.log("wprowadzono");

  image1.style.opacity = "0";
  setTimeout(() => {
    box.style.height = "97px";
    rect.style.height = "278px";

    image1.style.maxHeight = "0px";
    textinside.innerHTML = "Drop your image here";

    setTimeout(() => {
      image1.style.display = "none";
      textinside.style.opacity = "100%";
    }, 300);
  }, 300);

  textinside.style.opacity = "0";
});
