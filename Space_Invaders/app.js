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

    handlePlayerPatern(){
        const gridCase = document.querySelectorAll("#case");

        let playerShip = document.createElement('img');
        playerShip.setAttribute("src", "./ressources/vaisseau.png");
        

        let position = 59;
        gridCase[position].appendChild(playerShip);


        document.addEventListener("keyup",function(e){
            if(e.keyCode == 39){  //right
                
                if(position !== 48 && position !== 55 && position && position !== 62){
                    position++;

                    playerShip.remove()
                    gridCase[position].appendChild(playerShip);
                }
                }else if(e.keyCode == 37 ){  //left
                    if(position !== 42 && position !== 49 && position && position !== 56){
                        position--;
                        playerShip.remove()
                        gridCase[position].appendChild(playerShip);        

                    }else{position}
              
                }else if(e.keyCode ==  38){ //up
                    if(position > 48){
                        position-=7;
                        playerShip.remove()
                        gridCase[position].appendChild(playerShip);
                    }
                }else if(e.keyCode == 40){ //down
                    
                    if(position < 56){
                        position+=7;
                        playerShip.remove()
                        gridCase[position].appendChild(playerShip);
                    }
                }
        })

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

        // console.log("-----------------")
        this.patern.forEach(index => {
            if(this.newRow) this.sideReached = null;
            else if([6,13,20,27,34,41,48,55].indexOf(index + this.mov) != -1) this.sideReached = "right";
            else if([0,7,14,21,28,35,42,49].indexOf(index + this.mov) != -1)  this.sideReached = "left";
            gridCase[index + this.mov].removeChild(gridCase[index + this.mov].firstChild);
        })

        this.newRow = false;
        this.handleNextDirection();

        this.patern.forEach(index => {
            // console.log(index + this.mov)
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
initGrid.handlePlayerPatern();

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let k = 0; 
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
