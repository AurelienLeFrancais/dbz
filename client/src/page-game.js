import { registerGameCallbacks, gameLoop } from './sirius-api';
import { Skeleton } from "./sprite/Skeleton.js"
import { Mechant } from "./sprite/Mechant.js"
import { BouleFeu } from './sprite/BouleFeu.js';
import { Explosion } from './sprite/Explosion.js'
let spriteList = [];
let spriteListMechant = [];
let spriteListBouleFeu = [];
let spriteListExplosion = [];
let skel;
let mechant;
let partieLost;
let partieWin;
export let XpositionMechant;
let XpositionBouleDeFeu;
export let explosion = false;
export let faitApparaitre = true
export let bouleFeuTire = false;
let bouleFeu;
export let XpositionSkeleton;
export let leftArrowOn = false;
export let rightArrowOn = false;
export let downArrowOn = false;
export let bougeGoku = false;
export let nbrToucheBas = 1;
let explo;
let attaque;
let bloqtouche = false;
export let attaqueSG;
let musique;
let startMusic = false;
let peutTirer = true;

window.addEventListener("load", () => {
    let nodeAttack1 = document.querySelector("#attack-1");
    let nodeAttack2 = document.querySelector("#attack-2");
    let nodeAttack3 = document.querySelector("#attack-3");
    partieLost = document.querySelector("#game-lost");
    partieWin = document.querySelector("#game-win");
    registerGameCallbacks(gameUpdate, gameOverCallback, attackCallback, nodeAttack1, nodeAttack2, nodeAttack3);
    gameLoop();
    skel = new Skeleton()
    spriteList.push(skel);
    musique = new Audio();
    musique.src = 'mus/musique.wav';
    tick();
})


/**
 * Fonction appelée automatiquement lorsque vous attaquez.
 *
 * @param {*} skill utilisé
 */
const attackCallback = skill => {
    if (skill.name == "Normal") {
        skel.attak1();
        bougeGoku = true;
        attaque = true;
    }
    else if (skill.name == "Special1") {
        if (peutTirer) {
            skel.attak2();
            bouleFeuTire = true;
            bouleFeu = new BouleFeu()
            spriteListBouleFeu.push(bouleFeu);
            bougeGoku = true;
            attaque = true;
            bloqtouche = true;
        }
    }
    else if (skill.name == "Special2") {
        skel.attak3();
        attaque = true;
        attaqueSG = true;
        bloqtouche = true;
    }

}

document.addEventListener("keydown", e => {
    if (e.key == "ArrowDown") {
        nbrToucheBas++;
        downArrowOn = true;
    }
    if (e.key == "ArrowRight") {
        if (!bloqtouche) {
            rightArrowOn = true;
            startMusic = true;
            peutTirer = true;
        }

    }
    else if (e.key == "ArrowLeft") {
        if (!bloqtouche) {
            leftArrowOn = true;
            peutTirer = false;
        }
    }
});

document.addEventListener("keyup", e => {
    if (e.key == "ArrowRight") rightArrowOn = false;
    else if (e.key == "ArrowLeft") leftArrowOn = false;
    if (e.key == "ArrowDown") {
        nbrToucheBas++;
        bouleFeuTire = false;
        bougeGoku = false;
        attaque = false;
        attaqueSG = false;
        bloqtouche = false;
    }

})


/**
 * Fonction appelée automatiquement lorsque la partie se termine. Vous devez afficher un message à l'écran,
 * puis faire en sorte que le joueur puisse retourner à la page lobby.html
 * @param {*} msg de fin de partie
 */
const gameOverCallback = msg => {//if gamelostfound on va faire...
    console.log(msg);
    /*faire apparaitre div avec message de fin */
    if (msg == "GAME_NOT_FOUND_LOST") {/*Si je perd ******/
        musique.src = "";
        musique.src = 'mus/musiqueLost.wav';
        partieLost.style.display = "block";
        document.addEventListener("keydown", e => {
            if (e.key == "ArrowDown") {
                document.location.href = "./lobby.html";  
            }
        })
    }
    else if (msg == "GAME_NOT_FOUND_WIN") {
        musique.src = "";
        musique.src = 'mus/musiqueWin.wav';
        partieWin.style.display = "block";
        document.addEventListener("keydown", e => {
            if (e.key == "ArrowDown") {
                document.location.href = "./lobby.html";
            }
        })
    }
}

/**
 * Fonction appelée automatiquement à chaque 2 secondes, qui inclut les informations de la partie en cours
 * @param {*} game : information de la partie (si game.attacked est à true, c'est que l'ennemi vient d'attaquer)
 * @param {*} player : information du joueur
 * @param {*} otherPlayers : information sur les autres joueurs présent dans la partie
 */
const gameUpdate = (game, player, otherPlayers) => {/*est appele environ 1fois / seconde -> donc mise a jour a lieu 1 fois par seconde environ */
    document.querySelector("#enemy-life").innerHTML = "Monsters Life : " + game.hp + "/" + game.max_hp;
    document.querySelector("#your-life").innerHTML = "Goku Life : " + player.hp + "/" + player.max_hp;
    if (player.hp >= 40 && player.hp > 30) {
        document.querySelector("#your-life").style.background = "#66FF00";
    }
    else if (player.hp <= 30 && player.hp > 20) {
        document.querySelector("#your-life").style.background = "#66FF99";
    }
    else if (player.hp <= 20 && player.hp > 10) {
        document.querySelector("#your-life").style.background = "#FFFF33";
    }
    else if (player.hp <= 10) {
        document.querySelector("#your-life").style.background = "#CC3300";
    }

    if (game.attacked == true) {
        mechant = new Mechant()
        spriteListMechant.push(mechant);
    }

}

const tick = () => {
    if (startMusic) {
        musique.play();
    }
    XpositionSkeleton = skel.x; 
    spriteListMechant.forEach(element => {
        faitApparaitre = true;
        explosion = false;
        XpositionMechant = element.getX();
        if (XpositionMechant - XpositionSkeleton < 10) {
            if (attaque) {
                faitApparaitre = false;
                explosion = true
                explo = new Explosion();
                spriteListExplosion.push(explo);
                XpositionMechant = 1000;
            }
        }

        if (XpositionMechant < -10) {
            faitApparaitre = false;
        }

    });

    spriteListBouleFeu.forEach(element => {
        faitApparaitre = true
        XpositionBouleDeFeu = element.getPositionBouleFeuX();
        if (XpositionMechant - XpositionBouleDeFeu < -60) {
            faitApparaitre = false;
            explosion = true;
            explo = new Explosion();
            spriteListExplosion.push(explo);
            XpositionMechant = 2000;
        }

        if (XpositionBouleDeFeu > 1500) { 
            faitApparaitre = false; 
        }
    })

    if (explosion) {
        spriteListExplosion.forEach(element => {
            element.tick()
        });
    }

    for (let i = 0; i < spriteList.length; i++) {
        spriteList[i].tick();
    }

    for (let i = 0; i < spriteListMechant.length; i++) {
        let alive = spriteListMechant[i].tick();
        if (!alive) {
            spriteListMechant.splice(i, 1);
            i--;
        }
    }

    for (let i = 0; i < spriteListBouleFeu.length; i++) {
        let alive = spriteListBouleFeu[i].tick();

        if (!alive) {
            spriteListBouleFeu.splice(i, 1);
            i--;
        }
    }

    for (let i = 0; i < spriteListExplosion.length; i++) {
        let alive = spriteListExplosion[i].tick();
        if (!alive) {
            spriteListExplosion.splice(i, 1);
            i--;
        }
    }

    window.requestAnimationFrame(tick);

}






