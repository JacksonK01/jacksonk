import Pokemon from "./api/Pokemon.js";

const url = 'https://pokeapi.co/api/v2/pokemon/';
let loading = false;

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

textField.addEventListener("focus", () => {
    textField.value = "";
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

    fetch(url + newPokemon).then(response => {
        if (!response.ok) {
            document.getElementById("pokemon-display-text").textContent = `HTTP error! status: ${response.status}`;
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        currentPokemon = new Pokemon(data);
        reloadDisplay();
    }).catch(error => {
        console.error('Error:', error);
    }).finally(() => loading = false);
}

function doesPokemonExistDexNum(dexNum) {
    return 0 < dexNum && dexNum <= 1025;
}

function nextPokemon() {
    if (!currentPokemon) {
        setNewPokemon(1)
        return;
    }

    let nextNum = currentPokemon.dexNum + 1;
    if (!doesPokemonExistDexNum(nextNum)) {
        nextNum = 1;
    }
    setNewPokemon(nextNum);
}

function prevPokemon() {
    if (!currentPokemon) {
        setNewPokemon(1)
        return;
    }

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
