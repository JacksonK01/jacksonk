class Pokemon {
    constructor(data) {
        this.name = this.upperCaseFirstLetter(data.name);
        this.dexNum = data.id;
        this.sprite = data.sprites.front_default;
        this.type1 = this.upperCaseFirstLetter(data.types[0].type.name);

        let temp = data.types[1]
        if(temp !== undefined) {
            this.type2 = this.upperCaseFirstLetter(temp.type.name)
        } else {
            this.type2 = ""
        }
    }

    upperCaseFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
}

export default Pokemon