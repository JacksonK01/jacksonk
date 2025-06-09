class Pokemon {
    constructor(data) {
        this.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        this.dexNum = data.id;
        this.sprite = data.sprites.front_default;
    }
}

export default Pokemon