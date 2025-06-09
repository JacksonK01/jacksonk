import Pokemon from "./api/Pokemon.js";

const url = 'https://pokeapi.co/api/v2/pokemon/';

let currentPokemon;

async function init() {
    try {
        //REMOVE THIS SO YOU CAN REMOVE ASYNC WRAPPER
        const response = await fetch('./cachedpokemon/ditto.json');
        const dittoData = await response.json();

        setNewPokemon(1);

        // currentPokemon = new Pokemon(dittoData)
        // reloadDisplay()

        document.getElementById("previous").addEventListener("click", () => {
            prevPokemon();
        });

        document.getElementById("next").addEventListener("click", () => {
            nextPokemon();
        });

        document.getElementById("confirm").addEventListener("click", () => {
            confirmPokemon();
        });

    } catch (error) {
        console.error("Initialization error:", error);
    }
}

init();  // call the async function to start

function reloadDisplay() {
    if (!currentPokemon) return;
    document.getElementById("display-image").src = currentPokemon.sprite;
    document.getElementById("pokemon-display-text").textContent = currentPokemon.name;
    document.getElementById("pokemon-display-number").textContent = currentPokemon.dexNum;
}

function setNewPokemon(newPokemon) {
    fetch(url + newPokemon).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        currentPokemon = new Pokemon(data);
        reloadDisplay();
    }).catch(error => {
        console.error('Error:', error);
    });
}

function doesPokemonExistDexNum(dexNum) {
    return 0 < dexNum && dexNum <= 1025;
}

function nextPokemon() {
    if (!currentPokemon) return;
    let nextNum = currentPokemon.dexNum + 1;
    if (!doesPokemonExistDexNum(nextNum)) {
        nextNum = 1;
    }
    setNewPokemon(nextNum);
}

function prevPokemon() {
    if (!currentPokemon) return;
    let prevNum = currentPokemon.dexNum - 1;
    if (!doesPokemonExistDexNum(prevNum)) {
        prevNum = 1025;
    }
    setNewPokemon(prevNum);
}

function confirmPokemon() {
    let text = document.getElementById("text-field").value.toLowerCase()

    let possibleNum = parseInt(text)
    if(!isNaN(possibleNum)) {
        if(!doesPokemonExistDexNum(possibleNum)) {
            return;
        }
        setNewPokemon(possibleNum)
        return;
    }

    setNewPokemon(text)
}
