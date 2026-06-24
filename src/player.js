import * as THREE from 'https://cdn.jsdelivr.net/npm/three@r128/build/three.module.js';

export class Player {
    constructor(camera, controls, scene) {
        this.camera = camera;
        this.controls = controls;
        this.scene = scene;
        
        this.health = 100;
        this.flashlightBattery = 100;
        this.flashlightEnabled = false;
        this.inventory = [];
        
        this.velocity = new THREE.Vector3();
        this.isGrounded = false;
        this.canJump = true;
        
        this.moveSpeed = 5;
        this.sprintSpeed = 10;
        this.crouchSpeed = 2.5;
        this.currentSpeed = this.moveSpeed;
        
        this.keys = {};
        this.setupInputs();
        this.createFlashlight();
    }
    
    setupInputs() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            
            if (e.key === 'F' || e.key === 'f') {
                this.toggleFlashlight();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }
    
    createFlashlight() {
        const flashlightLight = new THREE.SpotLight(0xffff99, 1, 100, Math.PI / 4, 0.5, 2);
        flashlightLight.position.set(0, 0, 0);
        this.camera.add(flashlightLight);
        this.flashlightLight = flashlightLight;
        this.flashlightLight.intensity = 0;
    }
    
    toggleFlashlight() {
        if (this.flashlightBattery > 0) {
            this.flashlightEnabled = !this.flashlightEnabled;
        }
    }
    
    update(deltaTime) {
        const moveVector = new THREE.Vector3();
        
        if (this.keys['w']) moveVector.z -= 1;
        if (this.keys['s']) moveVector.z += 1;
        if (this.keys['a']) moveVector.x -= 1;
        if (this.keys['d']) moveVector.x += 1;
        
        if (this.keys['shift']) {
            this.currentSpeed = this.sprintSpeed;
            this.flashlightBattery = Math.max(0, this.flashlightBattery - deltaTime * 5);
        } else if (this.keys['control']) {
            this.currentSpeed = this.crouchSpeed;
        } else {
            this.currentSpeed = this.moveSpeed;
        }
        
        if (moveVector.length() > 0) {
            moveVector.normalize();
            moveVector.applyQuaternion(this.camera.quaternion);
            moveVector.y = 0;
            moveVector.multiplyScalar(this.currentSpeed * deltaTime);
            this.camera.position.add(moveVector);
        }
        
        if (this.flashlightEnabled) {
            this.flashlightLight.intensity = 1;
            this.flashlightBattery = Math.max(0, this.flashlightBattery - deltaTime * 2);
        } else {
            this.flashlightLight.intensity = 0;
        }
        
        if (!this.flashlightEnabled && this.flashlightBattery < 100) {
            this.flashlightBattery = Math.min(100, this.flashlightBattery + deltaTime * 1);
        }
    }
    
    setPosition(x, y, z) {
        this.camera.position.set(x, y, z);
    }
    
    getPosition() {
        return this.camera.position.clone();
    }
    
    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
    }
}