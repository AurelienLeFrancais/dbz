import { explosion } from "../page-game.js"
import { XpositionMechant } from "../page-game.js";

export class Explosion {
    constructor() {
        this.parent = document.getElementById("b")
        this.node = document.createElement("div");
        this.y = 1
        this.posY = 550;
        this.posX = XpositionMechant + 55;
        this.sound = new Audio();
        this.sound.src = 'mus/DeathFlash.wav';

        if (explosion) {
            this.node.classList.add("explosion");
            this.parent.append(this.node);
            this.sound.play();
        }

    }

    tick() {
        this.posY -= this.y;
        if (this.posY > 100) {
            this.node.style.left = this.posX + "px";
            this.node.style.top = this.posY + "px";
            return true;
        }

        else {
            this.node.remove();
            return false;
        }
    }

}