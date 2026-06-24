import * as THREE from 'https://cdn.jsdelivr.net/npm/three@r128/build/three.module.js';

export class Enemy {
    constructor(name, type, scene, hotel) {
        this.name = name;
        this.type = type;
        this.scene = scene;
        this.hotel = hotel;
        
        this.position = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.mesh = this.createMesh();
        
        this.speed = 3;
        this.visionRange = 30;
        this.detectionRange = 50;
        this.patrolPoints = [];
        this.currentPatrolIndex = 0;
        this.isChasing = false;
        this.health = 100;
    }
    
    createMesh() {
        const group = new THREE.Group();
        
        const bodyGeometry = new THREE.CapsuleGeometry(0.5, 1.5, 4, 8);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: this.getColorByType() });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.castShadow = true;
        body.receiveShadow = true;
        group.add(body);
        
        const headGeometry = new THREE.SphereGeometry(0.4, 8, 8);
        const headMaterial = new THREE.MeshStandardMaterial({ color: 0xfdbcb4 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.2;
        head.castShadow = true;
        group.add(head);
        
        const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.15, 1.35, 0.35);
        group.add(leftEye);
        
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.15, 1.35, 0.35);
        group.add(rightEye);
        
        group.position.copy(this.position);
        this.scene.add(group);
        
        return group;
    }
    
    getColorByType() {
        switch(this.type) {
            case 'technician': return 0x4169E1;
            case 'broadcaster': return 0xFF8C00;
            case 'trickster': return 0x9932CC;
            case 'pursuer': return 0x8B0000;
            default: return 0x808080;
        }
    }
    
    update(deltaTime, playerPosition) {
        const distanceToPlayer = this.position.distanceTo(playerPosition);
        
        if (distanceToPlayer < this.visionRange) {
            this.isChasing = true;
            this.chasePlayer(playerPosition, deltaTime);
        } else if (distanceToPlayer > this.detectionRange) {
            this.isChasing = false;
            this.patrol(deltaTime);
        } else if (this.isChasing) {
            this.chasePlayer(playerPosition, deltaTime);
        }
        
        this.mesh.position.copy(this.position);
    }
    
    chasePlayer(playerPosition, deltaTime) {
        const direction = playerPosition.clone().sub(this.position).normalize();
        this.velocity.copy(direction).multiplyScalar(this.speed * 1.5);
        this.position.add(this.velocity.clone().multiplyScalar(deltaTime));
    }
    
    patrol(deltaTime) {
        if (this.patrolPoints.length === 0) {
            this.patrolPoints = this.generatePatrolPoints();
        }
        
        const target = this.patrolPoints[this.currentPatrolIndex];
        const direction = target.clone().sub(this.position);
        
        if (direction.length() < 1) {
            this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolPoints.length;
        } else {
            direction.normalize();
            this.velocity.copy(direction).multiplyScalar(this.speed);
            this.position.add(this.velocity.clone().multiplyScalar(deltaTime));
        }
    }
    
    generatePatrolPoints() {
        const points = [];
        for (let i = 0; i < 5; i++) {
            points.push(new THREE.Vector3(
                (Math.random() - 0.5) * 60,
                Math.random() * 25,
                (Math.random() - 0.5) * 60
            ));
        }
        return points;
    }
}

export class EnemyManager {
    constructor(scene, hotel, player) {
        this.scene = scene;
        this.hotel = hotel;
        this.player = player;
        this.enemies = [];
    }
    
    createEnemies() {
        const abhi = new Enemy('Abhi', 'technician', this.scene, this.hotel);
        abhi.position.set(-20, 1, -20);
        this.enemies.push(abhi);
        
        const asmita = new Enemy('Asmita', 'broadcaster', this.scene, this.hotel);
        asmita.position.set(20, 1, -20);
        this.enemies.push(asmita);
        
        const sri = new Enemy('Sri', 'trickster', this.scene, this.hotel);
        sri.position.set(-20, 11, 20);
        this.enemies.push(sri);
        
        const brayan = new Enemy('Brayan', 'pursuer', this.scene, this.hotel);
        brayan.position.set(50, 1, 50);
        this.enemies.push(brayan);
    }
    
    update(deltaTime, playerPosition) {
        for (let enemy of this.enemies) {
            enemy.update(deltaTime, playerPosition);
        }
    }
}