export class ObjectiveManager {
    constructor() {
        this.objectives = [];
        this.completedObjectives = 0;
        
        this.objectiveTypes = [
            'Repair Generator',
            'Restore Security Network',
            'Recover Hotel Records',
            'Investigate VIP Suites',
            'Collect Keycards',
            'Repair Elevators',
            'Restore Server Systems',
            'Send Emergency Broadcast',
            'Unlock Exit Systems'
        ];
        
        this.objectiveLocations = [
            'Basement',
            'Security Room',
            'Server Room',
            'VIP Suite',
            'Maintenance Area',
            'Communications Room',
            'Emergency Exit',
            'Control Room'
        ];
    }
    
    generateRandomObjectives() {
        const numObjectives = 3;
        this.objectives = [];
        
        for (let i = 0; i < numObjectives; i++) {
            const objectiveType = this.objectiveTypes[Math.floor(Math.random() * this.objectiveTypes.length)];
            const location = this.objectiveLocations[Math.floor(Math.random() * this.objectiveLocations.length)];
            
            this.objectives.push({
                id: i,
                name: objectiveType,
                location: location,
                completed: false,
                progress: 0
            });
        }
    }
    
    checkCompletion(playerPosition) {
        for (let objective of this.objectives) {
            if (!objective.completed) {
                objective.progress = Math.min(100, objective.progress + 0.5);
                if (objective.progress >= 100) {
                    objective.completed = true;
                    this.completedObjectives++;
                }
            }
        }
    }
    
    getObjectivesList() {
        return this.objectives.map(obj => 
            `${obj.completed ? '✓' : '○'} ${obj.name} (${obj.location}) ${Math.floor(obj.progress)}%`
        ).join('\n');
    }
}