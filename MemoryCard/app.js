class GameResetOption {
    /**
     * 
     */

    #elementCreated; #btnContainer; #resetBtn; #fetchResetBtn;

    constructor() {
        this.#elementCreated = null;
        this.#btnContainer = document.createElement("div");
        this.#resetBtn = document.createElement("button");
        this.#fetchResetBtn = this.#resetBtn;
    }

    setUp() {
        if(this.#elementCreated !== null) return;

        this.#btnContainer.setAttribute("class", "btnContainer");
        this.#resetBtn.setAttribute("class", "design toggleHide");
        this.#resetBtn.innerHTML = "Restart";

        this.#btnContainer.appendChild(this.#resetBtn);
        document.body.insertBefore(this.#btnContainer, document.body.childNodes[2]);

        this.#fetchResetBtn = this.#resetBtn;
        this.#elementCreated = true;
    }

    display() {
        this.#fetchResetBtn.classList.replace("toggleHide", "toggleVisible");
    }

    hide() {
        this.#fetchResetBtn.classList.replace("toggleVisible", "toggleHide")
    }

    fetchRBtn() {
        return this.#fetchResetBtn;
    }
}

class GameShuffleProcess {
    /**
     * 
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
        this.#fruitsProperties;
        this.#cardsContent;;
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
     * 
     */

    #cards; #cardsSwitch; #cardsActive; #selectedCard; #didPlayerWin;

    constructor() {
        this.#cards = document.querySelectorAll(".carte");
        this.#cardsSwitch = document.querySelectorAll(".double-face");
        this.#cardsActive = 0;
        this.#selectedCard = null;
        this.#didPlayerWin = false;
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
                window.alert(`You won after ${GameTime.fetchTime()} seconds`);

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
     * 
     */

    #elapsedTime; #dateOrigin; #isStopped; #timerProcess;

    constructor () {
        this.#elapsedTime = null;
        this.#dateOrigin = null;
        this.#isStopped = null;
        this.#timerProcess = null;
    }

    setUp() {
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
    }

    fetchTime() {
        return this.#elapsedTime;
    }
}

function StartGameBoard(string) {
    if(string === "launch") GameReset.setUp();
    GameShuffle.setUp();
    GameGameplay.setRandomCardsPosition(GameShuffle.fetchCards());
    GameTime.setUp();
}

const GameReset = new GameResetOption();
const GameShuffle = new GameShuffleProcess();
const GameGameplay = new GameCore();
const GameTime = new GameTimer();
StartGameBoard("launch");