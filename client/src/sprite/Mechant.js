import { TiledImage } from "./TiledImage.js";
import { faitApparaitre } from "../page-game.js";

export class Mechant {

    constructor() {
        let columnCount = 5
        let rowCount = 1;
        let refreshDelay = 100;
        let loop = true;
        let scale = 2.0;
        this.node = document.createElement("div");
        document.querySelector("#b").append(this.node);
        this.mechant1 = new TiledImage("img/cellMech.png", columnCount, rowCount, refreshDelay, loop, scale, this.node);
        this.mechant2 = new TiledImage("img/mechant2.png", columnCount, rowCount, refreshDelay, loop, scale, this.node);
        this.mechant3 = new TiledImage("img/mechant3.png", columnCount, rowCount, refreshDelay, loop, scale, this.node)
        this.nbr = 0;
        let noMechant = Math.floor(Math.random() * 3) + 1;
        if (noMechant == 1) {
            this.tiledImageBis = this.mechant1;
        }
        else if (noMechant == 2) {
            this.tiledImageBis = this.mechant2;
        }
        else if (noMechant == 3) {
            this.tiledImageBis = this.mechant3;
            this.nbr = 3;
        }
        this.tiledImageBis.changeRow(0);
        this.tiledImageBis.changeMinMaxInterval(0, 5);
        this.x = 1200;
        this.y = 400;
    }

    tick() {

        if (this.nbr == 3) {
            this.tiledImageBis.setFlipped(true);
        }

        if (faitApparaitre) {
            this.x -= 5;
            this.tiledImageBis.tick(this.x, this.y);
            return true;
        }
        if (!faitApparaitre) {
            this.node.remove();
            return false;
        }
        if (this.x < 0) {
            this.node.remove();
            return false;
        }

        return true;
    }

    getX() {
        return this.x
    }
}