// Hotel class
class Hotel {
    constructor(scene) {
        this.scene = scene;
        this.rooms = [];
    }
    
    createHotel() {
        this.createFloor1();
        this.createFloor2();
        this.createFloor3();
        this.createConnections();
    }
    
    createFloor1() {
        const floorY = 0;
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = floorY;
        ground.receiveShadow = true;
        this.scene.add(ground);
        
        this.createRoom('Lobby', 0, floorY, 0, 30, 8, 0x8B7355);
        this.createRoom('Reception', -15, floorY, 0, 12, 6, 0xA0826D);
        this.createRoom('Security Room', 15, floorY, 0, 10, 6, 0x2F4F4F);
        this.createRoom('Restaurant', 0, floorY, 15, 20, 10, 0xD4A574);
        this.createRoom('Kitchen', 0, floorY, -15, 15, 8, 0xCCCCCC);
    }
    
    createFloor2() {
        const floorY = 10;
        const floorGeometry = new THREE.PlaneGeometry(100, 100);
        const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = floorY;
        floor.receiveShadow = true;
        this.scene.add(floor);
        
        this.createRoom('Guest Room 1', -20, floorY, -10, 6, 4, 0xDEB887);
        this.createRoom('Guest Room 2', -20, floorY, 0, 6, 4, 0xDEB887);
        this.createRoom('Guest Room 3', -20, floorY, 10, 6, 4, 0xDEB887);
        this.createRoom('Laundry', 0, floorY, -15, 12, 6, 0xE6E6FA);
        this.createRoom('Storage', 20, floorY, 0, 10, 8, 0x696969);
    }
    
    createFloor3() {
        const floorY = 20;
        const floorGeometry = new THREE.PlaneGeometry(100, 100);
        const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = floorY;
        floor.receiveShadow = true;
        this.scene.add(floor);
        
        this.createRoom('Gym', -15, floorY, -10, 15, 8, 0xF5DEB3);
        this.createRoom('Pool Area', 10, floorY, -10, 20, 8, 0x4682B4);
        this.createRoom('Arcade', -10, floorY, 10, 12, 6, 0xFF6347);
        this.createRoom('Meeting Room', 15, floorY, 10, 12, 6, 0xF0E68C);
    }
    
    createRoom(name, x, y, z, width, depth, color) {
        const geometry = new THREE.BoxGeometry(width, 6, depth);
        const material = new THREE.MeshStandardMaterial({ color: color });
        const room = new THREE.Mesh(geometry, material);
        room.position.set(x, y + 3, z);
        room.castShadow = true;
        room.receiveShadow = true;
        room.userData.roomName = name;
        this.scene.add(room);
        this.createWalls(x, y, z, width, depth);
    }
    
    createWalls(x, y, z, width, depth) {
        const wallHeight = 6;
        const wallThickness = 0.2;
        
        const frontWall = new THREE.Mesh(
            new THREE.BoxGeometry(width, wallHeight, wallThickness),
            new THREE.MeshStandardMaterial({ color: 0x888888 })
        );
        frontWall.position.set(x, y + 3, z + depth / 2);
        frontWall.castShadow = true;
        this.scene.add(frontWall);
        
        const backWall = new THREE.Mesh(
            new THREE.BoxGeometry(width, wallHeight, wallThickness),
            new THREE.MeshStandardMaterial({ color: 0x888888 })
        );
        backWall.position.set(x, y + 3, z - depth / 2);
        backWall.castShadow = true;
        this.scene.add(backWall);
        
        const leftWall = new THREE.Mesh(
            new THREE.BoxGeometry(wallThickness, wallHeight, depth),
            new THREE.MeshStandardMaterial({ color: 0x888888 })
        );
        leftWall.position.set(x - width / 2, y + 3, z);
        leftWall.castShadow = true;
        this.scene.add(leftWall);
        
        const rightWall = new THREE.Mesh(
            new THREE.BoxGeometry(wallThickness, wallHeight, depth),
            new THREE.MeshStandardMaterial({ color: 0x888888 })
        );
        rightWall.position.set(x + width / 2, y + 3, z);
        rightWall.castShadow = true;
        this.scene.add(rightWall);
    }
    
    createConnections() {
        this.createStaircase(0, 0, 30);
        this.createStaircase(0, 10, 30);
        this.createElevatorShaft(-30, 0, 0);
    }
    
    createStaircase(x, startY, z) {
        const steps = 10;
        const stepWidth = 2;
        const stepHeight = 1;
        
        for (let i = 0; i < steps; i++) {
            const step = new THREE.Mesh(
                new THREE.BoxGeometry(stepWidth, stepHeight, stepWidth),
                new THREE.MeshStandardMaterial({ color: 0x666666 })
            );
            step.position.set(x, startY + (i * stepHeight) + 0.5, z + (i * stepWidth));
            step.castShadow = true;
            step.receiveShadow = true;
            this.scene.add(step);
        }
    }
    
    createElevatorShaft(x, y, z) {
        const shaftGeometry = new THREE.BoxGeometry(3, 50, 3);
        const shaftMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
        const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
        shaft.position.set(x, y + 25, z);
        shaft.castShadow = true;
        shaft.receiveShadow = true;
        this.scene.add(shaft);
    }
}

// Player class
class Player {
    constructor(camera, controls) {
        this.camera = camera;
        this.controls = controls;
        this.health = 100;
        this.flashlightBattery = 100;
        this.flashlightEnabled = false;
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
            if (e.key === 'F' || e.key === 'f') this.toggleFlashlight();
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }
    
    createFlashlight() {
        const flashlightLight = new THREE.SpotLight(0xffff99, 1, 100, Math.PI / 4, 0.5, 2);
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

// Enemy class
class Enemy {
    constructor(name, type, scene) {
        this.name = name;
        this.type = type;
        this.scene = scene;
        this.position = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.speed = 3;
        this.visionRange = 30;
        this.detectionRange = 50;
        this.patrolPoints = [];
        this.currentPatrolIndex = 0;
        this.isChasing = false;
        this.mesh = this.createMesh();
    }
    
    createMesh() {
        const group = new THREE.Group();
        
        // Body
        const bodyGeometry = new THREE.CapsuleGeometry(0.5, 1.5, 4, 8);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: this.getColorByType() });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.castShadow = true;
        body.receiveShadow = true;
        group.add(body);
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.4, 8, 8);
        const headMaterial = new THREE.MeshStandardMaterial({ color: 0xfdbcb4 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.2;
        head.castShadow = true;
        group.add(head);
        
        // Character-specific features
        this.addCharacterFeatures(group);
        
        // Eyes
        const eyeGeometry = new THREE.SphereGeometry(0.08, 8, 8);
        const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.12, 1.35, 0.35);
        group.add(leftEye);
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.12, 1.35, 0.35);
        group.add(rightEye);
        
        group.position.copy(this.position);
        this.scene.add(group);
        return group;
    }
    
    addCharacterFeatures(group) {
        if (this.type === 'technician') {
            // ABHI - Technician (glasses)
            const glassGeometry = new THREE.BoxGeometry(0.35, 0.15, 0.05);
            const glassMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
            const leftGlass = new THREE.Mesh(glassGeometry, glassMaterial);
            leftGlass.position.set(-0.15, 1.35, 0.38);
            group.add(leftGlass);
            const rightGlass = new THREE.Mesh(glassGeometry, glassMaterial);
            rightGlass.position.set(0.15, 1.35, 0.38);
            group.add(rightGlass);
        } else if (this.type === 'broadcaster') {
            // ASMITA - Broadcaster (female hair/features)
            const hairGeometry = new THREE.SphereGeometry(0.45, 8, 8);
            const hairMaterial = new THREE.MeshStandardMaterial({ color: 0x3d2817 });
            const hair = new THREE.Mesh(hairGeometry, hairMaterial);
            hair.position.y = 1.4;
            group.add(hair);
        } else if (this.type === 'trickster') {
            // SRI - Trickster (distinctive hat/style)
            const hatGeometry = new THREE.ConeGeometry(0.5, 0.3, 8);
            const hatMaterial = new THREE.MeshStandardMaterial({ color: 0x4a4a4a });
            const hat = new THREE.Mesh(hatGeometry, hatMaterial);
            hat.position.y = 1.65;
            group.add(hat);
        } else if (this.type === 'pursuer') {
            // BRAYAN - Pursuer (intimidating)
            const maskGeometry = new THREE.BoxGeometry(0.8, 0.5, 0.2);
            const maskMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
            const mask = new THREE.Mesh(maskGeometry, maskMaterial);
            mask.position.set(0, 1.2, 0.35);
            group.add(mask);
        }
    }
    
    getColorByType() {
        switch(this.type) {
            case 'technician': return 0x4169E1;   // ABHI - Blue
            case 'broadcaster': return 0xFF8C00;  // ASMITA - Orange
            case 'trickster': return 0x9932CC;    // SRI - Purple
            case 'pursuer': return 0x8B0000;      // BRAYAN - Dark Red
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
        if (this.patrolPoints.length === 0) this.patrolPoints = this.generatePatrolPoints();
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

// Objective Manager
class ObjectiveManager {
    constructor() {
        this.objectives = [];
        this.objectiveTypes = ['Repair Generator', 'Restore Security Network', 'Recover Hotel Records', 
                              'Investigate VIP Suites', 'Collect Keycards', 'Repair Elevators', 
                              'Restore Server Systems', 'Send Emergency Broadcast', 'Unlock Exit Systems'];
        this.objectiveLocations = ['Basement', 'Security Room', 'Server Room', 'VIP Suite', 
                                  'Maintenance Area', 'Communications Room', 'Emergency Exit', 'Control Room'];
    }
    
    generateRandomObjectives() {
        this.objectives = [];
        for (let i = 0; i < 3; i++) {
            const objectiveType = this.objectiveTypes[Math.floor(Math.random() * this.objectiveTypes.length)];
            const location = this.objectiveLocations[Math.floor(Math.random() * this.objectiveLocations.length)];
            this.objectives.push({
                id: i, name: objectiveType, location: location, completed: false, progress: 0
            });
        }
    }
    
    checkCompletion(playerPosition) {
        for (let objective of this.objectives) {
            if (!objective.completed) {
                objective.progress = Math.min(100, objective.progress + 0.5);
                if (objective.progress >= 100) {
                    objective.completed = true;
                }
            }
        }
    }
    
    getObjectivesList() {
        return this.objectives.map(obj => 
            `${obj.completed ? '✓' : '○'} ${obj.name}`
        ).join('\n');
    }
}

// HUD Manager
class HUD {
    constructor() {
        this.radarCanvas = document.getElementById('radar');
        this.radarCtx = this.radarCanvas ? this.radarCanvas.getContext('2d') : null;
    }
    
    update(player, objectives, enemies) {
        document.getElementById('flashlight-battery').textContent = 
            `🔦 Battery: ${Math.floor(player.flashlightBattery)}%`;
        document.getElementById('objectives-list').textContent = objectives.getObjectivesList();
        document.getElementById('health').textContent = Math.floor(player.health);
        
        const y = player.camera.position.y;
        let floor = 1;
        if (y < 5) floor = 1;
        else if (y < 15) floor = 2;
        else floor = 3;
        
        let location = 'Unknown';
        if (Math.abs(player.camera.position.x) < 20 && Math.abs(player.camera.position.z) < 20) location = 'Lobby';
        else if (player.camera.position.x < -10) location = 'West Wing';
        else if (player.camera.position.x > 10) location = 'East Wing';
        
        document.getElementById('current-floor').textContent = floor;
        document.getElementById('current-location').textContent = location;
        
        if (this.radarCtx) this.drawRadar(player.camera.position, enemies.enemies);
    }
    
    drawRadar(playerPos, enemies) {
        const width = this.radarCanvas.width;
        const height = this.radarCanvas.height;
        const scale = 0.3;
        
        this.radarCtx.fillStyle = 'rgba(0, 20, 0, 0.9)';
        this.radarCtx.fillRect(0, 0, width, height);
        
        this.radarCtx.strokeStyle = 'rgba(0, 255, 0, 0.2)';
        this.radarCtx.lineWidth = 0.5;
        for (let i = 0; i < width; i += 20) {
            this.radarCtx.beginPath();
            this.radarCtx.moveTo(i, 0);
            this.radarCtx.lineTo(i, height);
            this.radarCtx.stroke();
            this.radarCtx.beginPath();
            this.radarCtx.moveTo(0, i);
            this.radarCtx.lineTo(width, i);
            this.radarCtx.stroke();
        }
        
        for (let enemy of enemies) {
            const x = (enemy.position.x - playerPos.x) / scale + width / 2;
            const y = (enemy.position.z - playerPos.z) / scale + height / 2;
            if (x > 0 && x < width && y > 0 && y < height) {
                this.radarCtx.fillStyle = enemy.isChasing ? '#ff0000' : '#ffff00';
                this.radarCtx.beginPath();
                this.radarCtx.arc(x, y, 4, 0, Math.PI * 2);
                this.radarCtx.fill();
                this.radarCtx.fillStyle = '#00ff00';
                this.radarCtx.font = '10px monospace';
                this.radarCtx.fillText(enemy.name, x + 6, y);
            }
        }
        
        this.radarCtx.fillStyle = '#00ff00';
        this.radarCtx.beginPath();
        this.radarCtx.arc(width / 2, height / 2, 3, 0, Math.PI * 2);
        this.radarCtx.fill();
        
        this.radarCtx.strokeStyle = '#00ff00';
        this.radarCtx.lineWidth = 2;
        this.radarCtx.beginPath();
        this.radarCtx.moveTo(width / 2, height / 2);
        this.radarCtx.lineTo(width / 2, height / 2 - 20);
        this.radarCtx.stroke();
    }
}

// Enemy Manager
class EnemyManager {
    constructor(scene) {
        this.scene = scene;
        this.enemies = [];
    }
    
    createEnemies() {
        const abhi = new Enemy('Abhi', 'technician', this.scene);
        abhi.position.set(-20, 1, -20);
        this.enemies.push(abhi);
        
        const asmita = new Enemy('Asmita', 'broadcaster', this.scene);
        asmita.position.set(20, 1, -20);
        this.enemies.push(asmita);
        
        const sri = new Enemy('Sri', 'trickster', this.scene);
        sri.position.set(-20, 11, 20);
        this.enemies.push(sri);
        
        const brayan = new Enemy('Brayan', 'pursuer', this.scene);
        brayan.position.set(50, 1, 50);
        this.enemies.push(brayan);
    }
    
    update(deltaTime, playerPosition) {
        for (let enemy of this.enemies) {
            enemy.update(deltaTime, playerPosition);
        }
    }
}

// Main Game class
class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a2e);
        this.scene.fog = new THREE.Fog(0x1a1a2e, 100, 500);
        
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 1.6, 0);
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        document.body.insertBefore(this.renderer.domElement, document.getElementById('hud'));
        
        this.controls = new THREE.PointerLockControls(this.camera, document.body);
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
        try {
            this.hotel = new Hotel(this.scene);
            this.hotel.createHotel();
            this.player = new Player(this.camera, this.controls);
            this.player.setPosition(15, 1.6, 0);
            this.objectives = new ObjectiveManager();
            this.objectives.generateRandomObjectives();
            this.enemies = new EnemyManager(this.scene);
            this.enemies.createEnemies();
            this.hud = new HUD();
            this.gameActive = true;
            this.animate();
        } catch(e) {
            console.error('Game init error:', e);
            alert('Error: ' + e.message);
        }
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
                if (this.player.health <= 0) this.gameOver(enemy.name);
            }
        }
    }
    
    gameOver(enemyName) {
        this.gameActive = false;
        alert('💀 CAUGHT BY ' + enemyName.toUpperCase() + '!');
        location.reload();
    }
}

// Initialize on page load
let game = null;
document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    const instructBtn = document.getElementById('instructBtn');
    const menu = document.getElementById('menu');
    const instructions = document.getElementById('instructions');
    
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            menu.classList.add('hidden');
            game = new Game();
            game.init();
        });
    }
    
    if (instructBtn) {
        instructBtn.addEventListener('click', function() {
            instructions.style.display = instructions.style.display === 'none' ? 'block' : 'none';
        });
    }
});