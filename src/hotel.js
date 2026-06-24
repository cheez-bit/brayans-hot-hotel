import * as THREE from 'https://cdn.jsdelivr.net/npm/three@r128/build/three.module.js';

export class Hotel {
    constructor(scene) {
        this.scene = scene;
        this.rooms = [];
        this.floors = [];
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