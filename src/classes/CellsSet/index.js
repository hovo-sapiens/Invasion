export class CellsSet {
    constructor() {
        this.map = new Map();
    }

    _getKey(obj) {
        return `${obj.cell},${obj.row}`;
    }

    add(obj) {
        const key = this._getKey(obj);
        if (!this.map.has(key)) {
            this.map.set(key, obj);
        }
    }

    values() {
        return Array.from(this.map.values());
    }
}