let dict = ['BANANE', 'POMME', 'BONJOUR', 'TABLE', 'CHAISE', 'MAISON', 'ENJAMBER', 'TESTER', 'PARTICULE'];

let health;
let pickedNum;
let pickedWord;
let dispWord;

let winCounter = 0;

let replay = false;

console.log("Wins :", winCounter);

function popup() {
    var popup = document.getElementById("gamePopup");
    popup.classList.toggle("show");
}

function initGame() {
    health = 11;
    pickedNum = Math.floor(Math.random() * dict.length);
    pickedWord = dict[pickedNum];
    dispWord = Array(pickedWord.length).fill("_");

    document.getElementById("word").innerHTML = "<br>" + dispWord.join(" ");
    document.getElementById("health").innerHTML = health;
    console.log(pickedWord);

    const letters = Array.from(document.getElementsByClassName("letter-found"));

    letters.forEach(element => {
            element.classList.add("letter");
            element.classList.remove("letter-found");
    });
    
}

function letterClicked(clickedID) {

    let found = false;
    let victory = true;

    

    if(health >= 1 && document.getElementById(clickedID).classList.contains("letter")) {
        for(let i = 0; i < pickedWord.length; i++) {
            if(pickedWord[i] == clickedID) {
                dispWord[i] = clickedID;
                document.getElementById("word").innerHTML = "<br>" + dispWord.join(" ");
                found = true;
            } 
        }

        for(let j = 0; j < dispWord.length; j++) {
            if(dispWord[j] == "_") {
                victory = false;
            }
        }

        if(!found) {
            health--;
            document.getElementById("health").innerHTML = health;

            if(health == 0) {
                document.getElementById("popupPhrase").innerHTML = "Vous avez perdu, souhaitez vous rejouer ?"
                popup();
                document.getElementById("word").innerHTML = "<br>" + pickedWord;
            }
        }
            
        document.getElementById(clickedID).classList.add("letter-found");
        document.getElementById(clickedID).classList.remove("letter");
        

        if(victory) {
            winCounter++;
            document.getElementById("wins").innerHTML = "<b>Victoires consécutives : " + winCounter + "</b>";
            document.getElementById("popupPhrase").innerHTML = "Vous avez gagné, souhaitez vous rejouer ?"
            popup();
        }

    }
}

document.addEventListener('keypress', (event) => {

    var letter = event.key;
    var alpha = /[ a-zA-Z]/;
    if (alpha.test(letter)) {
        letterClicked(letter.toUpperCase());
    }

}, false);


function replayGame() {
    initGame();
    popup();
}

initGame();






