import { createApp } from 'vue';
import App from './App.vue';
import { gameListLoop, joinSiriusGame, signout, registerLobbyCallbacks } from './sirius-api';
let root;
window.addEventListener("load", () => {
    const app = createApp(App)
    root = app.mount("#game-list")
    registerLobbyCallbacks(listUpdate, playerInfo);
    gameListLoop();
    document.querySelector("#signout").onclick = signout;
});


/**
 * Liste des parties du jeu. Cette fonction est appelée automatiquement à chaque 4 secondes environ.
 * Vous devrez modifier cette fonction afin d'utiliser Vue au lieu de manipuler le DOM directement.
 *
 * Chaque partie contient plusieurs informations (ex : level, name, id, etc)
 * @param {*} list de parties
 */

const listUpdate = (list) => {
    list.forEach(game => {
        root.addGame(game);
    });
}

/**
 * Fonction automatiquement appelée 1 fois, permettant d'avoir des informations sur votre personnage
 * @param {*} data du joueur (sa classe, son nom, son niveau, etc)
 */
const playerInfo = data => {
    document.querySelector("#hero").innerHTML = data.username + "(lvl : " + data.level + ", points à dépenser : " + (parseInt(data.unspent_points) + parseInt(data.unspent_skills)) + ")";
    console.log(data);
}


