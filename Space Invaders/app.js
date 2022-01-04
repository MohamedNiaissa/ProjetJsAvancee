class GridPatern {

    constructor() {
        this.mov = 0;
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
        this.patern.forEach(index => {
            gridCase[index + this.mov].removeChild(gridCase[index + this.mov].firstChild);
        })

        this.mov++;
        this.handleEnemiesPatern();
    }
}

const initGrid = new GridPatern();
initGrid.createGrid();


async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loop() {
    await sleep(2000);
    initGrid.handleMovementPatern();
    loop();
}

loop();