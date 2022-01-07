
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class GridPatern {
    

    constructor() {
        this.mov = 0;
        this.movBullet = 0;
        this.sideReached = null;
        this.newRow = false;
        this.gameOver = false;
        this.disableAttack = true;
        this.listeposBullet = [];
        this.listeposEnnemyShip = [];
        this.boolEnnemies = false;
        this.score = 0;
        this.collision = false;
        this.posPlayerShip=[];
        this.looseaudio = new Audio('/Projet/Space_Invaders/ressources/gameover.wav');
        this.ambiance = new Audio("/Projet/Space_Invaders/ressources/ambiance.mp3")
        this.shoot = new Audio("/Projet/Space_Invaders/ressources/blaster.mp3")
    }

    initGame(){
        /**
         * init the game with the creation of the grid and all the function we need to start
         */
        this.ambiance.play();
        const initGrid = new GridPatern();
        initGrid.createGrid();
        initGrid.handlePlayerPatern();
        initGrid.getPosition();
        let bullet = initGrid.compareBulletToEnnemies();    
        
        this.looseLine(initGrid)   
    }
 
    looseLine(initGrid) {
        /**
         * param: initgrid : the instance which was create at the beginning in initGame
         * return : check if the ennemyShips remain is on the same line as the player, if so then the game stop
         */
        let self = this
        async function loop() {
         await sleep(500);
         initGrid.handleMovementPatern();

         if(initGrid.gameOver) {
            self.looseaudio.play(); 
            await sleep(10)
            let score = document.querySelector('#score')
            let scoretxt = score.innerHTML 
            if(scoretxt == "Score :"){
                window.alert("Game over ! (the ennemyship reach your line)\nYour score is "+ "0");
            }else{
                window.alert("Game over ! (the ennemyship reach your line)\n"+scoretxt);
            }
            let contenu = document.querySelector('.contenu')
            contenu.remove()
            let fin = document.querySelector('.fin')
            fin.style.display = "inline"
            let btn1 = document.querySelector('#button1') 
            let btn2 = document.querySelector('#button2') 
            btn1.addEventListener('click',function(){window.location.reload()})
            btn2.addEventListener('click',function(){alert('See you soon !'); window.open("/Projet/index.html","_self");})  // _self -> open the window in the same tab

         }
            loop();
     } 
        loop(); 
 }

    
    pattern = [1,2,3,4,5,8,9,10,11,12,16,18];

    createGrid() {
        /**
         * return: creation of the gridcase
         */
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

        /**
         * handle the movement of the player, with different conditions depending on the key pressed
         */
        const gridCase = document.querySelectorAll("#case");

        let playerShip = document.createElement('img');
        playerShip.setAttribute("src", "./ressources/vaisseau.png");
        
        let position = 59;
        gridCase[position].appendChild(playerShip);

        document.addEventListener("keyup",function(e){
            if(e.keyCode == 39){  //right
                
                if(position !== 48 && position !== 55  && position !== 62){
                    position++;
                    playerShip.remove()
                    gridCase[position].appendChild(playerShip);
                }
                }else if(e.keyCode == 37 ){  //left
                    if(position !== 42 && position !== 49 && position !== 56){
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
        /**
         * Allow us to use the function async mov later
         */
        return new Promise(resolve => setTimeout(resolve, ms));
    }
   
    async moveBullet(position){
        /**
         * based on the current position of the spaceship player , the bullet will firs appear just one line upper than the player's postion 
         * and continue while the bullet hasn't reach the top
         */

        const gridCase = document.querySelectorAll("#case");
        let positionSheep = position + 7; //dans fonction playerAttack la position est celle de la balle i.e position-7,donc compensationif
        

        this.disableAttack = false;

        if(positionSheep <= 62 && positionSheep >=56){
            let max = 8;

            for(var i = 0;i<max;i++){
                       
                let divbullet = gridCase[position-7*i].appendChild(document.createElement('div'));   // -7*i car i bouge de 7 en 7 jusqu'en haut
                let valuePosBullet = this.getMooveShipEnnemy(position-7*i);
                this.listeposBullet.push(valuePosBullet)
                divbullet.setAttribute('style',' width: 10px;height: 10px;border-radius: 20px;background: white;');   
                await sleep(700/7); // boucle parcouru 7 fois donc on divise par 7
                divbullet.remove() 
            }

            
        }else if(positionSheep <=55 && positionSheep >= 49 ){
            let max = 7;


            for(var i = 0;i<max;i++){

                let divbullet = gridCase[position-7*i].appendChild(document.createElement('div'));
                let valuePosBullet = this.getMooveShipEnnemy(position-7*i);
                this.listeposBullet.push(valuePosBullet)
                divbullet.setAttribute('style',' width: 10px;height: 10px;border-radius: 20px;background: white;');   
                await sleep(700/7);
                divbullet.remove()     
            }

        }else if(positionSheep <= 48 && positionSheep >= 42){
            let max = 6;

            for(var i = 0;i<max;i++){
                let divbullet = gridCase[position-7*i].appendChild(document.createElement('div'));
                let valuePosBullet = this.getMooveShipEnnemy(position-7*i);
                this.listeposBullet.push(valuePosBullet)
                divbullet.setAttribute('style',' width: 10px;height: 10px;border-radius: 20px;background: white;');   
                await sleep(700/7);
                divbullet.remove()     
            }

        }
        
        await sleep(300)  // Compensation avec les precedents await pour obtenir 1 sec
        this.disableAttack = true;    
    }

  
    playerAttack(positionShip){
        /**
         * call the function moveBullet in order to see the bullet 
         */
        let movBullet =  positionShip-7;  
        this.moveBullet(movBullet)
    }


    async comparePosPlayerAndEnnemies(mooveShipEnnemie,posPlayer){
        /**
         * param:
         * mooveShipEnnemie: list with the ennemies position
         * posPlayer : the current position of the player 
         * Allow us to check if there is a collision between the player and the ennemies, each element of the list of ennemies position is compare to the player's position,
         *  if so the game is stop,
         * 
         */

        if(posPlayer != undefined && mooveShipEnnemie.length !=0){
            for(var i =0;i<mooveShipEnnemie.length;i++){
                if(mooveShipEnnemie[i] == posPlayer){
                    this.endGame();        
                }
            }
        }
       
    }

    async endGame(){
        /**
         * Allow us to end the game, another page is created with the option of playAgain or not 
         */
        this.looseaudio.play()
        await sleep(5)
        alert('Game Over ! (Collision with the ennemyShip)\nYour score is '+this.score);
        let contenu = document.querySelector('.contenu')
        contenu.remove()
        let fin = document.querySelector('.fin')
        fin.style.display = "inline"
        let btn1 = document.querySelector('#button1') 
        let btn2 = document.querySelector('#button2') 
        btn1.addEventListener('click',function(){window.location.reload()})
        btn2.addEventListener('click',function(){alert('See you soon !'); window.open("/Projet/index.html","_self");})  // _self -> open the window in the same tab
    }


    getPosition(){
        /**
         * Each time a key is pressed, the position is push in the list posPlayerShip, if there is already one or several values in there the list is clean first and then the player's position is add
         */
        let position = 59;
        let self = this;
        document.addEventListener("keyup",function(e){
            if(e.keyCode == 39){  //right
                if(position !== 48 && position !== 55  && position !== 62){
                    position++;
                    if(self.posPlayerShip.length == 0){
                        self.posPlayerShip.push(position)
                    }else{
                        for(var i=0;i<self.posPlayerShip.length;i++){
                            self.posPlayerShip.splice(self.posPlayerShip[i],1)
                        }
                        self.posPlayerShip.push(position)
                    }
                }
            }else if(e.keyCode == 37 ){  //left
                if(position !== 42 && position !== 49 && position !== 56){
                    position--;
                    if(self.posPlayerShip.length == 0){
                        self.posPlayerShip.push(position)
                    }else{
                        for(var i=0;i<self.posPlayerShip.length;i++){
                            self.posPlayerShip.splice(self.posPlayerShip[i],1)
                        }
                        self.posPlayerShip.push(position)
                    }
                }
            }else if(e.keyCode ==  38){ //up
                if(position > 48){
                    position-=7;
                    if(self.posPlayerShip.length == 0){
                        self.posPlayerShip.push(position)
                    }else{
                        for(var i=0;i<self.posPlayerShip.length;i++){
                            self.posPlayerShip.splice(self.posPlayerShip[i],1)
                        }
                        self.posPlayerShip.push(position)
                    }
                }
            }else if(e.keyCode == 40){ //down
                if(position < 56){
                    position+=7;
                    if(self.posPlayerShip.length == 0){
                        self.posPlayerShip.push(position)
                    }else{
                        for(var i=0;i<self.posPlayerShip.length;i++){
                            self.posPlayerShip.splice(self.posPlayerShip[i],1)
                        }
                        self.posPlayerShip.push(position)
                    }

                }
            }

            else if(e.keyCode == 32 && self.disableAttack ){
                self.shoot.play();
                self.playerAttack(position)
            }            
            

        });  
    }


    handleEnemiesPatern() {
        /**
         * create the ennemies image at their respective positions
         */
        const gridCase = document.querySelectorAll("#case");
        this.pattern.forEach(index => {
            let enemyShip = document.createElement('img');
            enemyShip.setAttribute("src", "./ressources/ennemies.png");
            gridCase[index + this.mov].appendChild(enemyShip);
        })
    }

    
    handleMovementPatern() {
        /**
         * The movement of the ennemies is controll by checking if they have reach the right side, if so the ennemies move to the left,if they have reach the left side, if so the ennemies go down and if they haven't reach any side then they move to the left or the right depending of the former position
         */
        const gridCase = document.querySelectorAll("#case");
        this.pattern.forEach(index => {
            if(this.newRow) this.sideReached = null;
            else if([6,13,20,27,34,41,48,55].indexOf(index + this.mov) != -1) this.sideReached = "right";
            else if([0,7,14,21,28,35,42,49].indexOf(index + this.mov) != -1)  this.sideReached = "left";
            gridCase[index + this.mov].removeChild(gridCase[index + this.mov].firstChild);
        })

        this.newRow = false;
        this.handleNextDirection();

        this.pattern.forEach(index => {
            if(index + this.mov > 55) return this.gameOver = true;
        })
        this.handleEnemiesPatern();
    }

    handleNextDirection() {
        if(this.sideReached === null){ 
         
            this.compareBulletToEnnemies(this.mov);

            return this.mov++;}
        if(this.sideReached === "right"){   
            this.boolEnnemies = "true"          
            this.compareBulletToEnnemies(this.mov);

            return this.mov--;}
        if(this.sideReached === "left") {        
            this.boolEnnemies = "false"          

            this.compareBulletToEnnemies(this.mov);

            this.newRow = true; return this.mov += 7; }

    }

    getMooveShipEnnemy(mooveShipEnnemie){
        /**
         * param: moovShipEnnemie: position of the ennemy
         * return: get the position of the ennemy
         */
        return mooveShipEnnemie;    
    }

    getListPosShipEnnemies(mooveShipEnnemie){
        this.listeposEnnemyShip.length = 0;

        this.pattern.forEach(i => {
            if(!(i+mooveShipEnnemie === NaN)){this.listeposEnnemyShip.push(i+mooveShipEnnemie)}

        })

        this.comparePosPlayerAndEnnemies(this.listeposEnnemyShip,this.posPlayerShip[this.posPlayerShip.length-1])   // On fait l'appel ici pour recuperer la liste des ennemies
        return this.listeposEnnemyShip;

    }


    winGame(){
        /**
         * Check if the pattern list is empty , if it's the case then the player have won
         */
        if(this.pattern.length ==0){
            alert('You win\nYour score is '+this.score)
            let contenu = document.querySelector('.contenu')
            contenu.remove()
            let fin = document.querySelector('.fin')
            fin.style.display = "inline"
            let btn1 = document.querySelector('#button1') 
            let btn2 = document.querySelector('#button2') 
            btn1.addEventListener('click',function(){ window.location.reload()})
            btn2.addEventListener('click',function(){alert('See you soon !'); window.open("/Projet/index.html","_self");})  // _self -> open the window in the same tab
        }

    }

    scorePlayer(){
        /**
         * Refresh the score written in the page, each time the player kill an enemy
         */
        let score = document.querySelector("#score");
        score.innerHTML = "Score : " + this.score;
    }

   async  compareBulletToEnnemies(mooveShipEnnemie){
       /**
        * param: mooveShipEnnemie : position of the ennemies at every moment
        * Each element of the ennemies position and the bullet's position are compared one another, if there is a same value between those list then the ennemy is touched by the bullet
        */

        const gridCase = document.querySelectorAll("#case");

        this.getListPosShipEnnemies(mooveShipEnnemie); // permet de rentrer les valeurs dans le tabPosEnnemies (push des elements)


        let tabPosBullet = this.listeposBullet;
        let tabPosEnnemies = this.listeposEnnemyShip;
        let element = false;
    
        if(tabPosBullet.length !=0 && tabPosEnnemies !=0){
            element = true;
        }else{
            element = false;
        }

        let sortBoucle = false; 
        if(element){            
            for (let i=tabPosEnnemies.length-1 ;i>=0;i--){
                for(let b =0; b<tabPosBullet.length;b++){
                    if(tabPosEnnemies[i] == tabPosBullet[b]){
                        sortBoucle = true;
                        gridCase[tabPosBullet[b]].style.background = 'red';
                        this.pattern.splice(this.pattern.indexOf(tabPosBullet[b]-this.mov),1)
                        await sleep(500)
                        gridCase[tabPosBullet[b]].style.background = 'none';
                        this.score++
                        this.scorePlayer();
                        this.winGame()
                    } 
                 if(sortBoucle){break}
                }
                if(sortBoucle){break}
            }

        }
        tabPosBullet.length =0; // reset le tableau a 0              
    }
}

let game = true;
let grid = new GridPatern();
grid.initGame()
 
    
   



