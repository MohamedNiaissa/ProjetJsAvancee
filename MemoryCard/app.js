/**
* The following program contains a source code for a game called MemoryCard.
* It's a simple one player game that will lightly test your short-term memory.
* The game is composed of 12 cards on a 4x3 grid.
* The player is able to return 2 cards before they're validated or flipped over.
* Once the player validate every cards, the game end with the time displayed as a result.
*/

class GameResetOption {
    /**
     * The following class will set-up the two elements needed for the reset option.
     * We added the ability to toggle the visibility of the button depending on the state of the game.
     * We also added a way to get the HTMLButtonElement outside of the class.
     * 
     *@property {boolean} elementsCreated => Define when the div and the button are added to the HTML.
     *@property {HTMLDivElement} msgContainer => Create a div that will contain a a paragraph and a button.
     *@property {HTMLButtonElement} resetBtn => Create a button with the purpose of resetting the game board.
     *@property {HTMLButtonElement} fetchResetBtn => Used to store the button so we can do things with it later on.
     */

    #elementsCreated; #getGameBoard; #msgContainer; #resetBtn; #winPara; #fetchWinPara; #fetchResetBtn;

    constructor() {
        this.#elementsCreated = false;
        this.#getGameBoard = document.getElementById("game");
        this.#msgContainer = document.createElement("div");
        this.#resetBtn = document.createElement("button");
        this.#winPara = document.createElement("p");
        this.#fetchWinPara = null;
        this.#fetchResetBtn = null;
    }

    setUp() {
        if(this.#elementsCreated !== false) return;

        this.#msgContainer.setAttribute("class", "msgContainer");
        this.#resetBtn.setAttribute("class", "Rbtn hidden");
        this.#winPara.setAttribute("class", "Wpara hidden")
        this.#resetBtn.innerHTML = "Restart";

        this.#msgContainer.appendChild(this.#winPara);
        this.#msgContainer.appendChild(this.#resetBtn);
        this.#getGameBoard.appendChild(this.#msgContainer);

        this.#fetchWinPara = this.#winPara;
        this.#fetchResetBtn = this.#resetBtn;
        this.#elementsCreated = true;
    }

    display() {
        this.#msgContainer.setAttribute("style", "box-shadow: 0 0 0 20px rgba(0, 0, 0, 0.219)");
        this.#fetchWinPara.classList.replace("hidden", "visible");
        this.#fetchResetBtn.classList.replace("hidden", "visible");
    }

    hide() {
        this.#msgContainer.removeAttribute("style");
        this.#fetchWinPara.classList.replace("visible", "hidden");
        this.#fetchResetBtn.classList.replace("visible", "hidden");
    }

    fetchRBtn() {
        return this.#fetchResetBtn;
    }

    fetchWinPara() {
        return this.#fetchWinPara;
    }
}

class GameShuffleProcess {
    /**
     * The following class will set-up a shuffled array based on the ressources at disposal.
     * Once this array is done being processed, we added a way to extract it from the class.
     * Its use will be to create a pseudo-random game board in the next class.
     * 
     *@property {collection} cardsContent => Create an array of Object Card that will be shuffled later on.
     *@property {Object} fruitsProperties => Define each and every ressources with its name and icon.
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

    constructor() {
        this.#cardsContent;
        this.#fruitsProperties;
    }

    setUp() {
        this.#cardsContent = [];
        this.#fruitsProperties.forEach(fruit => {
            for(let dbl = 0; dbl < 2; dbl++) {
                this.#cardsContent.push(new this.#Card(fruit.name, fruit.icon));
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
     * We start by reattributing the attributes of each cards with a pseudo-random pattern from the Shufffle Class.
     * Once this process is done, we finally add the events on each of these cards so we can access the hidden content.
     * We added a limit of 2 actives cards on the board, to avoid spamming and unwanted errors.
     * These 2 actives cards are also compared, if they're equal they stay on the board, otherwise the program flip them again.
     * Finally, once each cards are flipped over and actives, the game end with a message and the apparition of the reset button.
     * 
     *@property {HTMLDivElement} cards => Store each and every parents HTMLDivElement, in other words each cards.
     *@property {HTMLDivElement} cardsSwitch => Store each and every HTMLDivElement toggling the flip between card cover and content.
     *@property {HTMLDivElement} selectedCard => Used to store the previous flipped card waiting to be compared.
     *@property {integer} cardsActive => The number of cards flipped over which are likely to flip again.
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
                            thisClass.#verifyIfGameEnded();
                        }
                    }
                }
            });
        })
    }

    #verifyIfGameEnded() {
        const thisClass = this;

        if([...thisClass.#cardsSwitch].every(div => {return div.classList.contains("active")})) {

            setTimeout(function() {

                GameReset.fetchWinPara().innerHTML = (
                    `Congratulation, you finished the CardGame in ${GameTime.fetchTime()} seconds ! <br/>` +
                    `If you want to start a new game, please click on the reset button.`
                )
                GameReset.display();
                GameTime.reset();

                GameReset.fetchRBtn().addEventListener("click", function() {
                    
                    thisClass.#cardsSwitch.forEach(card => { card.classList.remove("active"); })
                    GameReset.hide();
                    StartGameBoard(null);
                })
            }, 1000);
        }
    }
}

class GameTimer {
    /**
     * The following class will set-up a timer and update it when the state of the game is still ongoing.
     * We added a way to reset/stop this timer when the state of the game is finished.
     * To be the most precize with the ms, we used Date.now().
     * We also added a way to get the elapsed time between the end of the game and its start.
     * 
     *@property {integer} elapsedTime => Update the time elapsed between the origin and the call.
     *@property {Date} dateOrigin => Set-Up the origin time when the game start anew.
     *@property {boolean} isStopped => Toggle the timer to on or off based on the state of the game.
     *@property {*} timerProcess => Used to trigger the timer process.
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

function StartGameBoard(state) {
    /**
     * The following function will set-up the whole game in differents but required aspect so an user can start playing.
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
StartGameBoard("launch");