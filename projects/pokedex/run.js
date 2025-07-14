import Pokemon from "./api/Pokemon.js";

const url = 'https://pokeapi.co/api/v2/pokemon/';
let loading = false;
let isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

let currentPokemon;

setNewPokemon(1);

document.getElementById("previous").addEventListener("click", () => {
    prevPokemon();
});

document.getElementById("next").addEventListener("click", () => {
    nextPokemon();
});

document.getElementById("confirm").addEventListener("click", () => {
    confirmPokemon();
});

const textField = document.getElementById("text-field");

let isStartingMessage = true;
textField.addEventListener("focus", () => {
    if(isStartingMessage || !isMobile) {
        textField.value = "";
        isStartingMessage = false;
    }
})

function reloadDisplay() {
    if (!currentPokemon) return;
    document.getElementById("display-image").src = currentPokemon.sprite;
    document.getElementById("pokemon-display-text").textContent = currentPokemon.name;
    document.getElementById("pokemon-display-number").textContent = currentPokemon.dexNum;

    const type1El = document.getElementById("type1");
    const type2El = document.getElementById("type2");

    type1El.textContent = currentPokemon.type1;
    type1El.className = `type-badge type-${currentPokemon.type1}`;

    if (currentPokemon.type2) {
        type2El.textContent = currentPokemon.type2;
        type2El.className = `type-badge type-${currentPokemon.type2}`;
        type2El.style.display = "inline-block";
    } else {
        type2El.textContent = "";
        type2El.className = "type-badge";
        type2El.style.display = "none";
    }
}

function setNewPokemon(newPokemon) {
    if (loading) return;

    loading = true;

    const timeout = 5000; //5 seconds
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    fetch(url + newPokemon, { signal: controller.signal })
        .then(response => {
            clearTimeout(timer);
            if (!response.ok) {
                document.getElementById("pokemon-display-text").textContent =
                    `HTTP error! status: ${response.status}`;
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            currentPokemon = new Pokemon(data);
            reloadDisplay();
        })
        .catch(error => {
            if (error.name === 'AbortError') {
                document.getElementById("pokemon-display-text").textContent =
                    "Request timed out. Please check your internet connection or firewall.";
            } else {
                document.getElementById("pokemon-display-text").textContent =
                    "Failed to load Pokémon. Please check your network or try again later.";
                console.error('Fetch error:', error);
            }
        })
        .finally(() => loading = false);
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
    let text = document.getElementById("text-field").value.trim().toLowerCase()

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
