class FruitsCardInit {
    constructor() {
        this.allFruitsCard = [];
    }

    allFruits = [
        { name: "banana",  img : "./ressources/apple.svg",   }, 
        { name: "apple",   img : "./ressources/banana.svg",  }, 
        { name: "brocoli", img : "./ressources/brocoli.svg", }, 
        { name: "cherry",  img : "./ressources/cherry.svg",  }, 
        { name: "pepper",  img : "./ressources/pepper.svg",  }, 
        { name: "straw",   img : "./ressources/straw.svg",   },
    ]

    Card = function(name, img) {
        this.name = name;
        this.img = img;
    }
    
    quickShuffle(array) {
        return array.sort(() => 0.6 - Math.random())
    }
    
    init() {
        this.allFruits.forEach(el => {
            for(let clone = 0; clone < 2; clone++) {
                this.allFruitsCard.push(new this.Card(el.name, el.img));
            }
        });

        this.quickShuffle(this.allFruitsCard);
    }
}

const fetchAllCardHolder = document.querySelectorAll(".carte");
const fetchAllCardSwitch = document.querySelectorAll(".double-face");

class GameCardInit {
    constructor() {
        this.att = 0;
        this.card = null;
        this.numberActive = 0;
        this.gameDone = null;
    }

    handleAttribution(array) {
        array.forEach(el => {
            fetchAllCardHolder[this.att].setAttribute("data-attr", el.name);
            fetchAllCardHolder[this.att].childNodes[1].childNodes[1].childNodes[1].setAttribute("src", el.img);
            this.att++;
        })

        this.handleCardEvent();
    }

   handleCardEvent() {

        fetchAllCardSwitch.forEach(el => {
            const self = this;

            el.addEventListener("click", function() {

                if(!this.getAttribute("class").includes("active") && self.numberActive < 2) {
                    this.setAttribute("class", "double-face active");
                    self.numberActive++;

                    if(self.card === null) self.card = this;
                    else if(self.card !== null) {
                        if(self.card.parentNode.getAttribute("data-attr") !== this.parentNode.getAttribute("data-attr")) {
                            const node = this;
                            setTimeout( function() {
                                self.card.setAttribute("class", "double-face");
                                node.setAttribute("class", "double-face");
                                self.card = null;
                                self.numberActive = 0;
                            }, 1000);
                        } else {
                            self.card = null;
                            self.numberActive = 0;
                        }
                    }

                    self.verifyIfGameEnded();
                }
            });
        })
    }

    verifyIfGameEnded() {
        let isGameFinished = true;

        fetchAllCardSwitch.forEach(el => {
            !el.getAttribute("class").includes("active") ? isGameFinished = false : null;
        })

        if(isGameFinished) window.alert("You won !")
    }
}

const b = new FruitsCardInit();
b.init();

const c = new GameCardInit();
c.handleAttribution(b.allFruitsCard);