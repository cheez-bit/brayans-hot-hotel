export class HUD {
    constructor(player, objectives, enemies) {
        this.player = player;
        this.objectives = objectives;
        this.enemies = enemies;
        
        this.radarCanvas = document.getElementById('radar');
        this.radarCtx = this.radarCanvas.getContext('2d');
    }
    
    update(player, objectives, enemies) {
        document.getElementById('flashlight-battery').textContent = 
            `🔦 Battery: ${Math.floor(player.flashlightBattery)}%`;
        
        document.getElementById('objectives-list').textContent = objectives.getObjectivesList();
        
        document.getElementById('health').textContent = Math.floor(player.health);
        
        const y = player.camera.position.y;
        let floor = 1;
        let location = 'Unknown';
        
        if (y < 5) floor = 1;
        else if (y < 15) floor = 2;
        else floor = 3;
        
        if (Math.abs(player.camera.position.x) < 20 && Math.abs(player.camera.position.z) < 20) {
            location = 'Lobby';
        } else if (player.camera.position.x < -10) {
            location = 'West Wing';
        } else if (player.camera.position.x > 10) {
            location = 'East Wing';
        }
        
        document.getElementById('current-floor').textContent = floor;
        document.getElementById('current-location').textContent = location;
        
        this.drawRadar(player.camera.position, enemies.enemies);
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