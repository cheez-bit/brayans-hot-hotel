import * as THREE from 'https://cdn.jsdelivr.net/npm/three@r128/build/three.module.js';
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@r128/examples/jsm/controls/PointerLockControls.js';
import { Game } from './game.js';

let game;

function startGame() {
    document.getElementById('menu').style.display = 'none';
    game = new Game();
    game.init();
}

function showInstructions() {
    const instructionsDiv = document.getElementById('instructions');
    instructionsDiv.style.display = instructionsDiv.style.display === 'none' ? 'block' : 'none';
}

window.startGame = startGame;
window.showInstructions = showInstructions;