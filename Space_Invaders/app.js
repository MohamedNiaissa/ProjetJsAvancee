class GridPatern {

    constructor() {
        this.mov = 0;
        this.movBullet = 0;
        this.sideReached = null;
        this.newRow = false;
        this.gameOver = false;
        this.disableAttack = true;
        this.clonemov = 0;
        this.listeposBullet = [];
        this.listeposEnnemyShip = [];
        this.boolEnnemies = false;
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
                    }
              
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
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
   
    async moveBullet(position){
        const gridCase = document.querySelectorAll("#case");
        let positionSheep = position +7;
        

        this.disableAttack = false;
        //console.log("position = " + positionSheep);

        if(positionSheep <= 62 && positionSheep >=56){

            for(var i = 0;i<8;i++){
                let divbullet = gridCase[position-7*i].appendChild(document.createElement('div'));
                let valuePosBullet = this.compareBulletToEnnemies2(position-7*i);
                this.listeposBullet.push(valuePosBullet)

               
                divbullet.setAttribute('style',' width: 10px;height: 10px;border-radius: 20px;background: green;');   
                await sleep(700/7); // boucle parcouru 7 fois donc on divise par 7
                divbullet.remove() 
            }

            
        }else if(positionSheep <=55 && positionSheep >= 49 ){

            for(var i = 0;i<7;i++){

                let divbullet = gridCase[position-7*i].appendChild(document.createElement('div'));
                let valuePosBullet = this.compareBulletToEnnemies2(position-7*i);
                this.listeposBullet.push(valuePosBullet)
                divbullet.setAttribute('style',' width: 10px;height: 10px;border-radius: 20px;background: green;');   
                await sleep(700/7);
                divbullet.remove()     
            }

        }else if(positionSheep <= 48 && positionSheep >= 42){

            for(var i = 0;i<6;i++){
                let divbullet = gridCase[position-7*i].appendChild(document.createElement('div'));
                let valuePosBullet = this.compareBulletToEnnemies2(position-7*i);
                this.listeposBullet.push(valuePosBullet)
                divbullet.setAttribute('style',' width: 10px;height: 10px;border-radius: 20px;background: green;');   
                await sleep(700/7);
                divbullet.remove()     
            }

        }
        
        await sleep(300)  // Compensation avec les precedents await pour obtenir 1 sec
        this.disableAttack = true;

        // this.disableAttack = false;
 
    
    }

  
    playerAttack(positionShip){

        let movBullet =  positionShip-7;
            // console.log(positionShip)

            // console.log('movBullet = ' + movBullet)
           
            this.moveBullet(movBullet)
    }

    getPosition(){
        let position = 59;
        let self = this;
        document.addEventListener("keyup",function(e){
            if(e.keyCode == 39){  //right
                if(position !== 48 && position !== 55 && position && position !== 62){
                    position++;
                }
            }else if(e.keyCode == 37 ){  //left
                if(position !== 42 && position !== 49 && position && position !== 56){
                    position--;
                }
            }else if(e.keyCode ==  38){ //up
                if(position > 48){
                    position-=7;
                }
            }else if(e.keyCode == 40){ //down
                if(position < 56){
                    position+=7;
                }
            }

            else if(e.keyCode == 32 && self.disableAttack ){
                self.playerAttack(position)
            }
                
        });  
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
        if(this.sideReached === null){ 
            this.clonemov++;
            // console.log(this.mov)
            this.compareBulletToEnnemies(this.mov);

            return this.mov++;}
        if(this.sideReached === "right"){   
            this.boolEnnemies = "true"          
            // console.log('r ' +this.mov)
            this.clonemov--;
            this.compareBulletToEnnemies(this.mov);

            return this.mov--;}
        if(this.sideReached === "left") {        
            this.boolEnnemies = "false"          

            // console.log(this.mov)
            this.clonemov+=7;
            this.compareBulletToEnnemies(this.mov);

            this.newRow = true; return this.mov += 7; }

    }

    compareBulletToEnnemies2(mooveShipEnnemie){

        // console.log("position bullet = "+(mooveShipEnnemie))

        return mooveShipEnnemie;
    

    }

   async  compareBulletToEnnemies(mooveShipEnnemie,e){
        // console.log("mooveShipEnnemie = " + this.compareBulletToEnnemies2())

        const gridCase = document.querySelectorAll("#case");

        let positionBullet = this.compareBulletToEnnemies2()

        this.listeposEnnemyShip.length = 0;

        
        this.patern.forEach(i => {
            // console.log("position ennemie = "+(i+mooveShipEnnemie))
            if(!(i+mooveShipEnnemie === NaN)){this.listeposEnnemyShip.push(i+mooveShipEnnemie)}

            // console.log("return positionBullet " + positionBullet)
        })

        // console.log("listeEnnemy "+ this.listeposEnnemyShip)
        let tabPosBullet = this.listeposBullet;
        let tabPosEnnemies = this.listeposEnnemyShip;
        let booltouch = false;
 
        console.log('b' +tabPosBullet) 
        console.log('e'+tabPosEnnemies)
        for(let i=this.listeposEnnemyShip.length-1;i>=0;i++){
            for(let v=this.tabPosBullet-1;v>=0;v--){
                if(isNaN(tabPosEnnemies[i])){
                    await sleep(2000)
                }
                console.log("posE = " + "indice = " +i+" valeur = "+ tabPosEnnemies[i]);
                console.log("posB = " + "indice = " +v+" valeur = "+ tabPosBullet[v]);
                if(tabPosEnnemies[i]==tabPosBullet[v]){
                    console.log("Pareiiiiiiiiillllllllllllllll, BRAVOOOOOOOOOO")
                    break;
                }
            }
            break;

        } 
        tabPosBullet.length =0;


        return this.listeposEnnemyShip
                   
    }


    compareBothPositions(pos1,pos2){
       
    }

}

const initGrid = new GridPatern();
initGrid.createGrid();
initGrid.handlePlayerPatern();
initGrid.getPosition();

// let bullet = initGrid.compareBulletToEnnemies();
// initGrid.compareBothPositions(initGrid.compareBulletToEnnemies(),initGrid.compareBulletToEnnemies2())
// initGrid.compareBulletToEnnemies2();
// console.log("bullet = " + bullet)


async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let k = 0; 
async function loop() {
    await sleep(1300);
    initGrid.handleMovementPatern();
    if(initGrid.gameOver) {
        window.alert("Game over !");
        return 0;
    }
    loop();
} 

loop();