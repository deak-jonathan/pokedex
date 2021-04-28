const btnPlay = document.querySelector(".round-play");
const btnBack = document.querySelector(".back");
const btnNext = document.querySelector(".next");
const lightOne = document.querySelector(".l-one");
const lightTwo = document.querySelector(".l-two");
const btnGetIt = document.querySelector("#btn-getit");
let allPokemon = [];
let tabEnd = [];

/**
 * button song
 */
btnBack.addEventListener("click", () => {
  play();
  lightOne.classList.add("animation-flash");
  lightTwo.classList.add("animation-flash");
  setTimeout(() => {
    lightOne.classList.remove("animation-flash");
  }, 500);
  setTimeout(() => {
    lightTwo.classList.remove("animation-flash");
  }, 500);
});
btnNext.addEventListener("click", () => {
  play();
  lightOne.classList.add("animation-flash");
  lightTwo.classList.add("animation-flash");
  setTimeout(() => {
    lightOne.classList.remove("animation-flash");
  }, 500);
  setTimeout(() => {
    lightTwo.classList.remove("animation-flash");
  }, 500);
});

function play() {
  let audio = document.querySelector(".btn-song");
  audio.play();
  audio.volume = 0.4;
}

/**
 * Music
 */
document.querySelector(".song").volume = 0.1;
document.querySelector(".pokedex-open").volume = 0.2;
function sonPokedex() {
  document.querySelector(".pokedex-open").setAttribute("autoplay", "");
}
sonPokedex();
/**
 * Button pop-UP
 */
btnGetIt.addEventListener("click", () => {
  document.querySelector(".pop-up").style.display = "none";
});

/**
 * Call API
 */
function fetchPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then((allPokemon) => {
      allPokemon.results.forEach((pokemon) => fetchPokemonFull(pokemon));
    });
}
fetchPokemon();
function fetchPokemonFull(pokemon) {
  let objPokemonFull = {};
  let url = pokemon.url;
  let namePoke = pokemon.name;

  fetch(url)
    .then((response) => response.json())
    .then((pokeData) => {
      objPokemonFull.pic = pokeData.sprites.front_default;
      objPokemonFull.type = pokeData.types[0].type.name;
      objPokemonFull.id = pokeData.id;
      objPokemonFull.weight = pokeData.weight;
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${namePoke}`)
        .then((response) => response.json())
        .then((pokeData) => {
          objPokemonFull.name = pokeData.names[4].name;
          objPokemonFull.color = pokeData.color.name;
          objPokemonFull.genera = pokeData.genera[7].genus;
          objPokemonFull.habitat = pokeData.habitat.name;
          allPokemon.push(objPokemonFull);
          console.log(allPokemon);
          let numPokemon = 0;
          let tabNamePokemon = [];
          if (allPokemon.length === 151) {
            tabEnd = allPokemon.sort((a, b) => {
              return a.id - b.id;
            });
            for (let i = 0; i < allPokemon.length; i++) {
              tabNamePokemon.push(allPokemon[i].name);
            }
            createPokemon(tabEnd, numPokemon);
            document
              .querySelector(".round-play")
              .addEventListener("click", () => {
                let message = new SpeechSynthesisUtterance(
                  tabNamePokemon[numPokemon]
                );
                message.lang = "fr-Fr";
                window.speechSynthesis.speak(message);
              });
            btnNext.addEventListener("click", () => {
              if (numPokemon === 150) {
                numPokemon -= 150;
              } else {
                numPokemon++;
              }
              createPokemon(tabEnd, numPokemon);
              setTimeout(() => {
                img.classList.add("tremble");
              }, 200);
              setTimeout(() => {
                img.classList.remove("tremble");
              }, 1200);
            });
            btnBack.addEventListener("click", () => {
              if (numPokemon === 0) {
                numPokemon += 150;
              } else {
                numPokemon--;
              }
              createPokemon(tabEnd, numPokemon);
              setTimeout(() => {
                img.classList.add("tremble");
              }, 200);
              setTimeout(() => {
                img.classList.remove("tremble");
              }, 1200);
            });
          }
        });
    });
}

// create Pokemon card
const img = document.querySelector(".img");
function createPokemon(tabPokemon, num) {
  const name = document.querySelector(".nom");
  const type = document.querySelector(".type");
  const poid = document.querySelector(".poid");
  const genus = document.querySelector(".genus");
  const localisation = document.querySelector(".localisation");
  const divImg = document.querySelector(".image-pokemon");
  img.src = tabPokemon[num].pic;
  img.style.width = "200px";
  const number = document.querySelector(".number-pokemon");
  number.innerText = `#${tabPokemon[num].id}`;
  name.innerText = `Name : ${tabPokemon[num].name}`;
  type.innerText = `Type : ${tabPokemon[num].type}`;
  poid.innerText = `Weight : ${tabPokemon[num].weight} kg`;
  genus.innerText = `Genus : ${tabPokemon[num].genera}`;
  localisation.innerText = `Localisation : ${tabPokemon[num].habitat}`;
  divImg.style.background = `${tabPokemon[num].color}`;
}
