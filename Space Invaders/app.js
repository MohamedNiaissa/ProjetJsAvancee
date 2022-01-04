class GridPatern {

    constructor() {
        this.mov = 0;
        this.boolAvance = true; 
        this.boolLeft = true;
        this.boolRightt = true;


    }


    patern = [1,2,3,4,5,8,9,10,11,12,16,18];

    createGrid() {
        const container = document.querySelector('.grille');
        container.setAttribute("class", "grille container");

        const row = 9;
        const col = 7


        for(let i = 0; i < row*col; i++) {              //Create the cases
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
                    }else{
                        position = position
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

    handleMovementPaternRight() {
        const gridCase = document.querySelectorAll("#case");
        this.patern.forEach(index => {
            gridCase[index + this.mov].removeChild(gridCase[index + this.mov].firstChild);

        })
        if(this.boolRight) {
            this.mov+=8;
            console.log("a driote")
            this.boolRight = false;
        }
        
        this.mov++
        this.handleEnemiesPatern();
    }

    handleMovementPaternLeft() {
        const gridCase = document.querySelectorAll("#case");
        this.patern.forEach(index => {
            gridCase[index + this.mov].removeChild(gridCase[index + this.mov].firstChild);
        })
        if(this.boolLeft) {
            this.mov+=8;
            this.boolLeft = false;
        }
        
        this.mov--
        this.handleEnemiesPatern();
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
    await sleep(2000);
    if(k<1){
        initGrid.handleMovementPaternRight();
    }else{
        initGrid.handleMovementPaternLeft();
        k=0
    }
    k++;
    loop();
}

loop();