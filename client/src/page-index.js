import { Etoile } from "../src/sprite/Etoile.js"
import { signin } from './sirius-api';
let bouleList = [];
window.addEventListener("load", () => {
    document.querySelector("form").onsubmit = function () {
        return signin(this);
    }
    tick();

});

const tick = () => {
    let chance = Math.floor(Math.random() * 300);
    if (chance == 1) {
        let boule = new Etoile();
        bouleList.push(boule);
    }

    bouleList.forEach(element => {
        element.tick();
    });

    for (let i = 0; i < bouleList.length; i++) {
        let alive = bouleList[i].tick();
        if (!alive) {
            bouleList.splice(i, 1);
            i--;
        }
    }

    window.requestAnimationFrame(tick);
}







