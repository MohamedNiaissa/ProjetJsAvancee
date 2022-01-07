/**
* The following program contains a source code for a game called MemoryCard.
* It's a simple one player game that will lightly test your short-term memory.
* The game is composed of 12 cards on a 4x3 grid.
* The player is able to return 2 cards before they're validated or flipped over.
* Once the player validate every cards, the game end with the time displayed as a result.
* The player is then asked to submit his/her name to the leaderboard, and reset the game.
*/

class GameResetOption {
    /**
     * The following class will set-up all the elements needed for the menu.
     * We added the ability to toggle the visibility of the menu depending on the state of the game.
     * We also added a way to get some specific elements outside of the class.
     * 
     *@property {HTMLDivElement} gameBoard => Fetch the main div containing the game and the menu message.
     *@property {HTMLDivElement} menu => Create a div that will contain the congrats message, the leaderboard menu and the reset menu.
     *@property {HTMLParagraphElement} congratsMsg => Create a paragraph congratulating the player for winning with the time elapsed.
     *@property {HTMLDivElement} userDiv => Create a div that will contain the user message, the username input and the submit button to create a cell.
     *@property {HTMLParagraphElement} userMsg => Create a paragraph asking the player to enter his/her username.
     *@property {HTMLInputElement} username => Create a username input that be used to set up the cell username of the leaderboard div score.
     *@property {HTMLButtonElement} submitBtn => Create a button submitting the username input value to the cell username.
     *@property {HTMLDivElement} actionDiv => Create a div that will contain a question asking for an action and the reset button.
     *@property {HTMLParagraphElement} nextActionMsg => Create a paragraph asking for the next action.
     *@property {HTMLButtonElement} resetBtn => Create a button submitting a reset of the whole game to its origin, beside the leaderboard.
     *@property {boolean} elementsCreated => Define when all of the elements above are implemented to the HTML.
     *
     *@method setUp() => Create a document fragment that will calculate each elements and add them to the gameBoard node.
     *@method display() => Based on the argument, hide or display the menu message based on the state of the game.
     */

    #gameBoard; #menu; #congratsMsg; #userDiv; #userMsg; #username; #submitBtn; #actionDiv; #nextActionMsg; #resetBtn; #elementsCreated;    

    constructor() {
        this.#gameBoard     = document.getElementById("game");
        this.#menu          = document.createElement("div");
        this.#congratsMsg   = document.createElement("p");
        this.#userDiv       = document.createElement("div");
        this.#userMsg       = document.createElement("p");
        this.#username      = document.createElement("input");    
        this.#submitBtn     = document.createElement("button");
        this.#actionDiv     = document.createElement("div");
        this.#nextActionMsg = document.createElement("p");
        this.#resetBtn      = document.createElement("button");

        this.#elementsCreated = false;
    }

    setUp() {
        if(this.#elementsCreated !== false) return;

        let count = 0;
        const elements = [this.#menu,this.#congratsMsg,this.#userDiv,this.#userMsg,this.#username,this.#submitBtn,this.#actionDiv,this.#nextActionMsg,this.#resetBtn];
        const elClasses = ["menu hidden","congratsMsg hidden","userDiv hidden","userMsg","usernameInput","submitBtn","actionDiv hidden","nextActionMsg","resetBtn"];

        var documentFragment = document.createDocumentFragment();
        documentFragment.appendChild(this.#menu);

        this.#menu.append(this.#congratsMsg, this.#userDiv, this.#actionDiv);
        this.#userDiv.append(this.#userMsg, this.#username, this.#submitBtn);
        this.#actionDiv.append(this.#nextActionMsg, this.#resetBtn);
        this.#userMsg.innerHTML = "Please enter your username : ";
        this.#submitBtn.innerHTML = "Submit";
        this.#nextActionMsg.innerHTML = "Would you like to restart ? ";
        this.#resetBtn.innerHTML = "Restart";

        elements.forEach(el => { el.setAttribute("class", elClasses[count++]); })
        this.#username.setAttribute("maxlength", "20");

        this.#gameBoard.appendChild(documentFragment);
        this.#elementsCreated = true;
    }

    display(prop) {
        let addClass, removeClass;
        prop === "visible" ? (addClass = "visible", removeClass = "hidden" ) 
                           : (addClass = "hidden", removeClass = "visible");

        this.#menu.classList.replace(removeClass, addClass);
        this.#actionDiv.classList.replace(removeClass, addClass);
        this.#userDiv.classList.replace(removeClass, addClass);
        this.#congratsMsg.classList.replace(removeClass, addClass);
    }

    fetchMenuElement() {
        const elements = {
            "congratsMsg": this.#congratsMsg, 
            "username": this.#username, 
            "submitBtn": this.#submitBtn, 
            "resetBtn": this.#resetBtn
        }

        return elements;
    }
}

class GameShuffleProcess {
    /**
     * The following class will set-up a shuffled random theme array based on the ressources at disposal.
     * Once this array is done being processed, we added a way to extract it from the class.
     * Its use will be to create a pseudo-random game board in the next class.
     * 
     *@property {collection} cardsContent => Create an array of Object Card that will be shuffled later on.
     *@property {Object} fruitsProperties => Define each and every fruits ressources with their names and icons.
     *@property {Object} plantsProperties => Define each and every plants ressources with their names and icons.
     */

    #cardsContent;
    #fruitsProperties = [
        { name: "banana",  icon : "./ressources/banana.svg",  }, 
        { name: "apple",   icon : "./ressources/apple.svg",   }, 
        { name: "brocoli", icon : "./ressources/brocoli.svg", }, 
        { name: "cherry",  icon : "./ressources/cherry.svg",  }, 
        { name: "pepper",  icon : "./ressources/pepper.svg",  }, 
        { name: "straw",   icon : "./ressources/straw.svg",   },
    ]

    #plantsProperties = [
        { name: "lotus",         icon : "./ressources/lotus.png",         },
        { name: "rose",          icon : "./ressources/rose.png",          },
        { name: "cactus",        icon : "./ressources/cactus.png",        },
        { name: "cherryBlossom", icon : "./ressources/cherryflower.png",  },
        { name: "sunflower",     icon : "./ressources/sunflower.png",     },
        { name: "lavender",      icon : "./ressources/lavender.png",      },
    ]

    constructor() {
        this.#cardsContent;
        this.#fruitsProperties;
        this.#plantsProperties;
    }

    setUp() {
        const index = (Math.random()>0.5)? 1 : 0;
        const theme = [this.#plantsProperties, this.#fruitsProperties][index];
        this.#cardsContent = [];

        theme.forEach(el => {
            for(let dbl = 0; dbl < 2; dbl++) {
                this.#cardsContent.push(new this.#Card(el.name, el.icon));
            }
        });

        this.#arrayShuffle(this.#cardsContent);
    }

    #arrayShuffle(cards) {
        return cards.sort(() => 0.6 - Math.random())
    }

    #Card = function(name, icon) {
        this.name = name;
        this.icon = icon;
    }

    fetchCards() {
        return this.#cardsContent;
    }
}

class GameCore {
    /**
     * The following class is the main core of the game.
     * We start by redefining the attributes of each cards with a pseudo-random pattern from the Shufffle Class.
     * Once this process is done, we finally add the events on each of these cards so we can access the hidden content.
     * We added a limit of 2 actives cards on the board, to avoid spamming and unwanted errors.
     * These 2 actives cards are also compared, if they're equal they stay on the board, otherwise the program flip them again.
     * Finally, once each cards are flipped over and actives, the game end with a message and the apparition of the game menu.
     * 
     *@property {HTMLDivElement} cards => Store each and every parents HTMLDivElement, in other words each cards.
     *@property {HTMLDivElement} cardsSwitch => Store each and every HTMLDivElement toggling the flip between card cover and content.
     *@property {HTMLDivElement} selectedCard => Store the previous flipped card waiting to be compared.
     *@property {integer} cardsActive => The number of cards flipped over which are likely to flip again.
     *
     *@method handleCardEvent() => Each click will flip over a card, only two cards can be flipped before being compared.
     * If the cards are not similar, they're flipped over. If they are we check if all the cards are flipped over, if so we call the menu method.
     *@method showMenuIfGameEnded => Set up 3 events, the username input, the username submit button and the reset button. Also setting the congrats message.
     */

    #cards; #cardsSwitch; #selectedCard; #cardsActive;

    constructor() {
        this.#cards = document.querySelectorAll(".carte");
        this.#cardsSwitch = document.querySelectorAll(".double-face");
        this.#selectedCard = null;
        this.#cardsActive = 0;
    }

    setRandomCardsPosition(cardsContent) {
        let atIndex = 0;

        cardsContent.forEach(fruit => {
            this.#cards[atIndex].setAttribute("data-attr", fruit.name);
            this.#cardsSwitch[atIndex].childNodes[1].childNodes[1].setAttribute("src", fruit.icon);
            atIndex++;
        })

        this.#handleCardEvent();
    }

    #handleCardEvent() {
        const thisClass = this;
        thisClass.#cardsSwitch.forEach(div => {

            div.addEventListener("click", function() {
                const thisNode = this;

                if(!thisNode.getAttribute("class").includes("active") && thisClass.#cardsActive < 2) {

                    thisNode.classList.add("active");
                    thisClass.#cardsActive++;

                    if(thisClass.#selectedCard === null) thisClass.#selectedCard = thisNode;
                    else {
                        if(thisClass.#selectedCard.parentNode.getAttribute("data-attr") !== thisNode.parentNode.getAttribute("data-attr")) {
                            setTimeout( function() {
                                thisClass.#selectedCard.classList.remove("active");
                                thisNode.classList.remove("active");
                                thisClass.#selectedCard = null;
                                thisClass.#cardsActive = 0;
                            }, 1000);
                        } else {
                            thisClass.#selectedCard = null;
                            thisClass.#cardsActive = 0;

                            if([...thisClass.#cardsSwitch].every(div => {return div.classList.contains("active")})) thisClass.#showMenuIfGameEnded();
                        }
                    }
                }
            });
        })
    }

    #showMenuIfGameEnded() {
        const thisClass = this;
        const time = GameTime.fetchTime();
        const menuElements = GameReset.fetchMenuElement();

        setTimeout(function() {

            function createUsernameCell() {
                console.log(GameLB.fetchUsername())
                GameLB.addScore(time, GameLB.fetchUsername());
                requestAnimationFrame(() => { GameLB.fetchNewDiv().classList.add("slideFromLeft"); })
                GameLB.sortScore();
                GameLB.wasScoreAdded(true);
            }

            menuElements.congratsMsg.innerHTML = `Congratulation, you finished the Memory Card Game ${time} in seconds ! <br/><br/>`;
            GameReset.display("visible");
            GameTime.reset();

            menuElements.username.addEventListener("keyup", (e) => { GameLB.setUsername(e.target.value); })
            menuElements.submitBtn.addEventListener("click", createUsernameCell);

            menuElements.resetBtn.addEventListener("click", function() {
                
                thisClass.#cardsSwitch.forEach(card => { card.classList.remove("active"); })
                menuElements.username.value = "";
                menuElements.submitBtn.removeEventListener("click", createUsernameCell);

                if(GameLB.fetchWasScoreAdded() === false) {
                    GameLB.addScore(time, "Unknown");
                    GameLB.fetchNewDiv().classList.add("slideFromLeft");
                    GameLB.sortScore();
                    GameLB.wasScoreAdded(true);
                }
                
                GameReset.display("hidden");
                GameLB.wasScoreAdded(false);
                StartGameBoard(null);
            }, {once : true})
        }, 1000);
    }
}

class GameTimer {
    /**
     * The following class will set-up a timer and update it when the state of the game is still ongoing.
     * We added a way to reset/stop this timer when the state of the game is finished.
     * To be the most precize with the ms, we used Date.now().
     * We also added a way to get the elapsed time between the end of the game and its start.
     * 
     *@property {integer} elapsedTime => Update the time elapsed between the origin and the method call.
     *@property {Date} dateOrigin => Set-Up the origin time when the game start anew.
     *@property {boolean} isStopped => Toggle the timer to on or off based on the state of the game.
     *@property {*} timerProcess => Used to trigger the timer process.
     *
     *@method runningTimer() => Recursive method for the timer cancelling itself at each iteration.
     */

    #elapsedTime; #dateOrigin; #isStopped; #timerProcess;

    constructor () {
        this.#elapsedTime = null;
        this.#dateOrigin = null;
        this.#isStopped = null;
        this.#timerProcess = null;
    }

    setUp() {
        if(this.#dateOrigin !== null) return;

        this.#dateOrigin = Date.now();
        this.#isStopped = false;
        this.#runningTimer();
    }

    #runningTimer() {
        this.#elapsedTime = Math.round((Date.now() - this.#dateOrigin)/1000);

        cancelAnimationFrame(this.#timerProcess);
        this.#isStopped ? null : this.#timerProcess = requestAnimationFrame(() => this.#runningTimer());
    }

    reset() {
        this.#isStopped = true;
        this.#timerProcess = null;
        this.#dateOrigin = null;
    }

    fetchTime() {
        return this.#elapsedTime;
    }
}

class GameLeaderboard {
    /**
     * The following class will set-up a cell in the score leaderboard with a name and the elapsed time.
     * We added a way to add a cell to the score leaderboard in the first place.
     * Then we added a way to sort the score if one of them got a quicker run.
     * Once a score is submitted, the button will cease to function to avoid spamming.
     * 
     *@property {HTMLDivElement} scoreTab => The div element where all the score cells are created.
     *@property {HTMLDivElement} newCell => Store the new score cell to be used outside the class.
     *@property {string} username => The name of the player, if submitted.
     *@property {boolean} wasScoreAdded => If a score was added, this value will deactivate the event on the submit button.
     *
     *@method addScore() => Add a cell to the score leaderboard.
     *@method sortScore() => Sort all the cells inside the score leaderboard so it goes from quickest to slowest.
     *@method wasScoreAdded() => Toggle the boolean to true when a score is added, to false when the reset happen.
     */

    #scoreTab; #newCell; #username; #wasScoreAdded;

    constructor() {
        this.#scoreTab = document.getElementById("lbScore");
        this.#newCell = null;
        this.#username = null;
        this.#wasScoreAdded = false;
    }

    addScore(time, name) {
        const newScoreCell = document.createElement("div");
        const score = document.createElement("p");
        this.#newCell = newScoreCell;

        newScoreCell.setAttribute("class", "cell");
        newScoreCell.accessKey = time;
        score.innerHTML = `${name} : ${time} seconds.`;

        newScoreCell.appendChild(score);
        this.#scoreTab.appendChild(newScoreCell);
    }

    sortScore() {
        const allCells = this.#scoreTab.children;
        
        let clone = Array.from(allCells);
        let sortedScore = [];

        var documentFragment = document.createDocumentFragment();

        for(let index = 0; index < allCells.length; index++) {
            let smallesttime;
            let counter = 0;

            clone.forEach(el => {
                counter++ === 0 ? smallesttime = parseInt(el.accessKey) : null;
                (parseInt(el.accessKey) <= smallesttime) ? smallesttime = parseInt(el.accessKey) : null;
            })

            for(let index = 0; index < allCells.length; index++) {
                if(parseInt(allCells[index].accessKey) === smallesttime) {
                    sortedScore.push(allCells[index]);
                    clone = clone.filter(item => item !== allCells[index]);
                    break;
                }
            }
        }

        sortedScore.forEach(el => { documentFragment.appendChild(el); })
        this.#scoreTab.appendChild(documentFragment);
    }

    wasScoreAdded(boolean) {
        boolean ? this.#wasScoreAdded = true : this.#wasScoreAdded = false;
        this.#username = null;
    }

    setUsername(username) {
        this.#username = username;
    }

    fetchNewDiv() {
        return this.#newCell;
    }

    fetchUsername() {
        return this.#username;
    }

    fetchWasScoreAdded() {
        return this.#wasScoreAdded;
    }
}

function StartGameBoard(state) {
    /**
     * The following function will set-up the whole game in differents but required aspects so an user can start playing.
     *@param {string} state => This variable will be used to differentiate a reset from the first launch.
     */

    if(state === "launch") GameReset.setUp();
    GameShuffle.setUp();
    GameGameplay.setRandomCardsPosition(GameShuffle.fetchCards());
    GameTime.setUp();
}

const GameReset = new GameResetOption();
const GameShuffle = new GameShuffleProcess();
const GameGameplay = new GameCore();
const GameTime = new GameTimer();
const GameLB = new GameLeaderboard();
StartGameBoard("launch");