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
        return array.sort(() => 0.9 - Math.random())
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
console.log(fetchAllCardHolder);
console.log(fetchAllCardHolder[0].childNodes[1].childNodes[1].childNodes[1])

class GameCardInit {
    constructor() {
        this.att = 0;
    }

    handleAttribution(array) {
        array.forEach(el => {
            fetchAllCardHolder[this.att].setAttribute("data-attr", el.name);
            fetchAllCardHolder[this.att].childNodes[1].childNodes[1].childNodes[1].setAttribute("src", el.img);
            this.att++;
        })
    }
}

const b = new FruitsCardInit();
b.init();

const c = new GameCardInit();
c.handleAttribution(b.allFruitsCard);