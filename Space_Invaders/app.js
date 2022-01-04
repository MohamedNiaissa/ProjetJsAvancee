class GridPatern {

    constructor() {
        this.mov = 0;
        this.sideReached = null;
        this.newRow = false;
        this.gameOver = false;
    }

    patern = [1,2,3,4,5,8,9,10,11,12,16,18];

    createGrid() {
        const container = document.querySelector('.grille');
        container.setAttribute("class", "grille container");
        
        const row = 9;
        const col = 7
    
        for(let i = 0; i < row*col; i++) {
            let gridCase = document.createElement('div');
            gridCase.setAttribute("id", "case");
            container.appendChild(gridCase);
        }

        this.handleEnemiesPatern();
    }

    handleEnemiesPatern() {
        const gridCase = document.querySelectorAll("#case");
        this.patern.forEach(index => {
            let enemyShip = document.createElement('img');
            enemyShip.setAttribute("src", "./ressources/ennemies.png");
            gridCase[index + this.mov].appendChild(enemyShip);
        })
    }

    handleMovementPatern() {
        const gridCase = document.querySelectorAll("#case");

        console.log("-----------------")
        this.patern.forEach(index => {
            if(this.newRow) this.sideReached = null;
            else if([6,13,20,27,34,41,48,55].indexOf(index + this.mov) != -1) this.sideReached = "right";
            else if([0,7,14,21,28,35,42,49].indexOf(index + this.mov) != -1)  this.sideReached = "left";
            gridCase[index + this.mov].removeChild(gridCase[index + this.mov].firstChild);
        })

        this.newRow = false;
        this.handleNextDirection();

        this.patern.forEach(index => {
            console.log(index + this.mov)
            if(index + this.mov > 55) return this.gameOver = true;
        })

        this.handleEnemiesPatern();
    }

    handleNextDirection() {
        if(this.sideReached === null) return this.mov++;
        if(this.sideReached === "right") return this.mov--;
        if(this.sideReached === "left") { this.newRow = true; return this.mov += 7; }
    }
}

const initGrid = new GridPatern();
initGrid.createGrid();


async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loop() {
    await sleep(500);
    initGrid.handleMovementPatern();
    if(initGrid.gameOver) {
        window.alert("Game over !");
        return 0;
    }
    loop();
} 

loop();