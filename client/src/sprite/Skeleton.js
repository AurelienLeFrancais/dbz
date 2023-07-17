import { TiledImage } from "../sprite/TiledImage.js";
import { leftArrowOn } from "../page-game.js";
import { rightArrowOn } from "../page-game.js";
import { downArrowOn } from "../page-game.js";
import { nbrToucheBas } from "../page-game.js";
import { bougeGoku } from "../page-game.js";
import { attaqueSG } from "../page-game.js";


export class Skeleton {
	constructor() {
		let columnCount = 5
		let rowCount = 4;
		let refreshDelay = 100;
		let loop = true;
		let scale = 2.0;
		this.node = document.createElement("div");
		document.querySelector("#b").append(this.node);
		this.tiledImage = new TiledImage("img/sangokuComplet.png", columnCount, rowCount, refreshDelay, loop, scale, this.node);
		this.bloquePersonnageenX = true;
		this.tiledImage.changeMinMaxInterval(0, 5);
		this.x = 300;
		this.y = 400;
		this.resultat = 1;
		this.sangokuWalk = true;
		this.attakSG = attaqueSG;
	}

	attak1() {
		if (this.bloquePersonnageenX) {
			this.tiledImage.changeRow(1);
			this.sound = new Audio();
			this.sound.src = 'mus/attak1.wav';
			this.sound.play();
		}
	}

	attak2() {
		this.tiledImage.changeRow(2)
		this.sound = new Audio();
		this.sound.src = 'mus/goku-1.wav';
		this.sound.play();
	}

	attak3() {
		this.tiledImage.changeRow(3)
		this.attakSG = true;
		this.sound = new Audio();
		this.sound.src = 'mus/sg.wav';
		this.sound.play();
	}

	tick() {
		this.resultat = nbrToucheBas % 2
		this.attakSG = attaqueSG;
		if (downArrowOn) {
			if (this.resultat == 1) {
				this.bloquePersonnageenX = true;
				this.sangokuWalk = false;
			}
			else if (this.resultat == 0) {
				this.bloquePersonnageenX = false;
				this.tiledImage.changeRow(0)
				this.sangokuWalk = true;
			}
		}

		if (rightArrowOn) {
			this.tiledImage.setFlipped(false);
			this.x += 5;
		}

		if (leftArrowOn) {
			this.tiledImage.setFlipped(true);
			this.x -= 5;
		}

		if (!leftArrowOn && !rightArrowOn) {
			this.x += 0;
			this.tiledImage.setPaused(true);
			if (attaqueSG) {
				this.tiledImage.setPaused(false);
			}
		}
		else {
			this.tiledImage.setPaused(false);
		}
		if (bougeGoku) {
			this.tiledImage.setPaused(false);
		}
		this.tiledImage.tick(this.x, this.y);
	}

}