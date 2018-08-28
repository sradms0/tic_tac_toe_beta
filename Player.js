class Player {
    constructor(number, symbol, playerType='human') {
        this.symbol = symbol;
        this.type = playerType;
        this.number = number;
        this.marks = new Set();
    }

    set name(name) {
        this._name = name;
        if (name === '') {
            this._name = 'Player ' + this.number;
        }
    }

    set turn(turn) {
        this._turn = false;
        if (turn.toLowerCase() === 'on') this._turn = true;
    }

    set type(type) {
        this._type = type;
        if (type !== 'human') this._type = 'ai';
    }

    get turn() {
        return this._turn;
    }

    get name() {
        return this._name;
    }

    get type() {
        return this._type;
    }

    removeMark(loc) {
        this.marks.forEach(i => {
            if (i.loc === loc) this.marks.delete(i);
        })
    }

    addMark(coords) {
        this.marks.add(coords);
    }

    clone() {
        const copy =  new Player(
            this.number, this.symbol, this.type);

        // copy mark set
        copy.marks = new Set(this.marks);
        return copy;
    }
}

module.exports = Player;
