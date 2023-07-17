import { TiledImage } from "../sprite/TiledImage.js";
import { faitApparaitre } from "../page-game.js";
import { XpositionSkeleton } from "../page-game.js";

export class BouleFeu {
	constructor() {
		let columnCount = 1
		let rowCount = 1;
		let refreshDelay = 75;/*75 */ /*plus jaugmente, + le personage ralenti ses mouvement */
		let loop = true;
		let scale = 1.0;/*taille du personnage */
		this.node = document.createElement("div");
		document.querySelector("#b").append(this.node);
		this.tiledImageBouleFeu = new TiledImage("img/feeu.png", columnCount, rowCount, refreshDelay, loop, scale, this.node);
		this.bloquePersonnageenX = true;
		this.tiledImageBouleFeu.changeMinMaxInterval(0, 5);
		this.x = XpositionSkeleton + 100;
		this.y = 470;
	}

	tick() {
		if (faitApparaitre) {/*si on fait apparaitre la boule */
			this.x += 15;
			this.tiledImageBouleFeu.tick(this.x, this.y);
			return true
		}

		if (!faitApparaitre) {
			this.node.remove();
			return false;
		}

	}
	getPositionBouleFeuX() {
		return this.x;
	}
}