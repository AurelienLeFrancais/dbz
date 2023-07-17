export class Etoile {

    constructor() {
        this.parent = document.getElementById("t");
        this.node = document.createElement("div");
        this.positionX = Math.floor(Math.random() * ((this.parent.offsetWidth - 180) - 80 + 1) + 80);
        this.nodeDragon = document.createElement("div");
        this.positionY = 760;
        this.noBoule = Math.floor(Math.random() * 7) + 1;
        this.node.classList.add("boule_" + this.noBoule);
        this.node.style.left = this.positionX + "px";
        this.node.style.top = this.positionY + "px";
        this.nodeOpa = 1;
        this.opacity = 0.02;
        this.parent.append(this.node);
        this.y = 0;
        this.augmente = true;
        this.speedY = 2;
        this.opaciteDragn = 1;
        this.aClicker = false;

        this.node.onclick = () => {
            this.y -= 0.3;
            if (this.positionY > 400) {
                this.aClicker = true;
            }
        }
    }

    tick() {
        let alive = true;
        this.positionY -= this.speedY;
        this.node.style.top = this.positionY + "px";
        this.node.style.left = this.positionX + "px";

        if (this.aClicker) {
            this.nodeOpa -= this.opacity/*enleve lopacite de la boule */
            this.speedY -= this.y;
            this.node.style.opacity = this.nodeOpa;
        }

        if (this.positionY < 100 && this.aClicker) {
            this.afficherDragon();
        }

        if (this.positionY < -50) {
            this.opaciteDragn -= 0.01;
            this.nodeDragon.style.opacity = this.opaciteDragn;
            if (this.opaciteDragn <= 0) {
                alive = false;
                this.nodeDragon.remove();
                this.node.remove();
            }
        }
        return alive;
    }

    afficherDragon() {
        this.nodeDragon.classList.add("dragon");
        this.nodeDragon.style.top = 10 + "px";
        this.nodeDragon.style.left = this.positionX + "px";
        this.nodeDragon.style.opacity = 1;
        this.parent.append(this.nodeDragon);
    }

}

