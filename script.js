const elementTags = document.getElementById("tags"),
  textarea = document.getElementById("textarea");

//AUTOFOCUS ON THE CHOICES WHEN LOADED WITH THE .FOCUS()-METHOD
textarea.focus();

//DOM LISTENS FOR KEY UP
textarea.addEventListener("keyup", (e) => {
  createTags(e.target.value);

  //WHEN ENTER KEY IS CLICKED
  if (e.key === "Enter") {
    setTimeout(() => {
      e.target.value = "";
    }, 10);

    randomSelect();
  }
});

function createTags(input) {
  //USING ..SPLIT TO SEPARATE CHOICES, AND .FILTER() TO SELECT THROUGH THE ARRAY, AND .TRIM() TO REMOVE WHITESPACES
  const tags = input
    .split(",")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim());

  //REMOVING WHATEVER IS IN THE ELEMENTTAGS
  elementTags.innerHTML = "";

  //LOOP THROUGH THE TAG ARRAY
  tags.forEach((tag) => {
    const elementTag = document.createElement(".span");
    elementTag.classList.add("tag");
    elementTag.innerText = tag;
    elementTags.appendChild(elementTag);
  });
}

//RANDOM SELECTOR FUNCTION
function randomSelect() {
  //NUMBER OF TIMES IT WILL HIGHLIGHT BEFORE REMOVE
  const times = 30;

  const interval = setInterval(() => {
    const randomTag = pickRandomTag();
    highlightTag(randomTag);

    setTimeout(() => {
      unHighlightTag(randomTag);
    }, 100);
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    setTimeout(() => {
      const randomTag = pickRandomTag();

      highlightTag(randomTag);
    }, 100);
  }, times * 100);
}

//RANDOM TAG FOR CHOICES
function pickRandomTag() {
  const tags = document.querySelectorAll(".tag");
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
  tag.classList.add("highlight");
}

function unHighlightTag(tag) {
  tag.classList.remove("highlight");
}
