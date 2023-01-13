// letters
let gameLetters = document.querySelector(".game-letters");
let letters = "abcdefghijklmnopqrstuvwxyz+".toUpperCase();
let lettersArr = Array.from(letters);
let word = document.querySelector("div.info span");
let gameGuess = document.querySelector(".game-guess");
let hangMan = document.querySelector(".game-hangman");
let wrong = document.getElementById("wrong");
let death = document.getElementById("death");
let success = document.getElementById("success");
let successful = document.getElementById("successful");

lettersArr.forEach((letter) => {
  // li
  let li = document.createElement("li");
  // letter
  let textli = document.createTextNode(letter);
  // appending
  li.appendChild(textli);
  gameLetters.appendChild(li);
});

// Creating Category
let category = {
  movies: [
    "home alone",
    "one piece",
    "spongebob",
    "naruto",
    "adventure time",
    "teen titans",
  ],
  people: [
    "Albert Einstein",
    "Elon Musk",
    "will smith",
    "angelina jolie",
    "michael jackson",
    "justin bieber",
    "mark zuckerberg",
    "mohamed salah",
  ],
  countries: [
    "Egypt",
    "Syria",
    "palestine",
    "USA",
    "saudi arabia",
    "turkey",
    "tunisie",
  ],
  programing: [
    "php",
    "javascript",
    "c++",
    "perl",
    "python",
    "typescript",
    "java",
  ],
};

let keysName = Object.keys(category); // [movies , people , programing , countries]
let nameofKeys = Math.floor(Math.random() * keysName.length); // 0-3
let valueofkeys = Math.floor(
  Math.random() * category[keysName[nameofKeys]].length
);

word.textContent = keysName[nameofKeys];

let valueArr = category[keysName[nameofKeys]][valueofkeys];
let valueArry = [...valueArr.toUpperCase()];

valueArr.split("").forEach((letter) => {
  let span = document.createElement("span");
  gameGuess.appendChild(span);
  if (letter == " ") {
    span.classList.add("has-space");
  }
});

let allLi = document.querySelectorAll("li");
let wrongs = 0;

allLi.forEach((li) => {
  li.onclick = () => {
    let static = false;

    let spans = document.querySelectorAll(".game-guess span");
    li.classList.add("clicked");
    valueArry.forEach((ele, index) => {
      if (ele == li.textContent) {
        spans[index].textContent = li.textContent;
        spans[index].classList.add("yes");
        static = true;
        success.play();
        let allYes = document.querySelectorAll(".yes");
        if (allYes.length == valueArry.length) {
          let div2 = document.createElement("div");
          div2.textContent = `You win the number of attempts: ${wrongs}`;
          div2.className = "successful";
          document.body.appendChild(div2);
          successful.play();
          setTimeout(() => {
            let btn = document.createElement("p");
            let text = document.createTextNode("Play Again");
            btn.appendChild(text);
            div2.appendChild(btn);
            btn.onclick = () => {
              window.location.reload();
            };
          });
        }
      }
    });
    if (static == false) {
      wrongs++;
      hangMan.classList.add(`wrong-${wrongs}`);
      wrong.play();
      if (wrongs == 8) {
        endGame();
      }
    }
  };
});

function endGame() {
  death.play();
  let div = document.createElement("div");
  let textDiv = document.createTextNode(`Game Over, Your Word Is ${valueArr}`);
  div.className = "popup";
  div.appendChild(textDiv);
  document.body.appendChild(div);
  setTimeout(() => {
    let btnGame = document.createElement("span");
    let btnText = document.createTextNode("Try Again");
    btnGame.appendChild(btnText);
    div.appendChild(btnGame);
    btnGame.onclick = () => {
      window.location.reload();
    };
  }, 2000);
  let allLis = document.querySelector("ul");
  allLis.className = "finish";
}
