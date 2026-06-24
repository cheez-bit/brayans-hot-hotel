import * as THREE from 'https://cdn.jsdelivr.net/npm/three@r128/build/three.module.js';
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@r128/examples/jsm/controls/PointerLockControls.js';
import { Hotel } from './hotel.js';
import { Player } from './player.js';
import { EnemyManager } from './enemies.js';
import { ObjectiveManager } from './objectives.js';
import { HUD } from './hud.js';

export class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a2e);
        this.scene.fog = new THREE.Fog(0x1a1a2e, 100, 500);
        
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 1.6, 0);
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;
        document.body.appendChild(this.renderer.domElement);
        
        this.controls = new PointerLockControls(this.camera, document.body);
        this.scene.add(this.controls.getObject());
        
        this.setupLights();
        this.setupEvents();
        
        this.hotel = null;
        this.player = null;
        this.enemies = null;
        this.objectives = null;
        this.hud = null;
        this.gameActive = false;
    }
    
    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 50, 50);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
    }
    
    setupEvents() {
        window.addEventListener('resize', () => this.onWindowResize());
        document.addEventListener('click', () => this.controls.lock());
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    init() {
        this.hotel = new Hotel(this.scene);
        this.hotel.createHotel();
        
        this.player = new Player(this.camera, this.controls, this.scene);
        this.player.setPosition(15, 1.6, 0);
        
        this.objectives = new ObjectiveManager();
        this.objectives.generateRandomObjectives();
        
        this.enemies = new EnemyManager(this.scene, this.hotel, this.player);
        this.enemies.createEnemies();
        
        this.hud = new HUD(this.player, this.objectives, this.enemies);
        
        this.gameActive = true;
        this.animate();
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (!this.gameActive) return;
        
        const deltaTime = 1 / 60;
        
        this.player.update(deltaTime);
        this.enemies.update(deltaTime, this.player.getPosition());
        this.hud.update(this.player, this.objectives, this.enemies);
        this.checkEnemyCollisions();
        this.objectives.checkCompletion(this.player.getPosition());
        
        this.renderer.render(this.scene, this.camera);
    }
    
    checkEnemyCollisions() {
        const playerPos = this.player.getPosition();
        for (let enemy of this.enemies.enemies) {
            const distance = playerPos.distanceTo(enemy.position);
            if (distance < 2) {
                this.player.takeDamage(10);
                if (this.player.health <= 0) {
                    this.gameOver();
                }
            }
        }
    }
    
    gameOver() {
        this.gameActive = false;
        alert('Game Over! You were caught.');
        location.reload();
    }
}