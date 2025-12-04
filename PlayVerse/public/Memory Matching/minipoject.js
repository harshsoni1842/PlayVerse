let cardsArray = [
    {
        'name': 'CSS',
        'img': './image/css_logo.png',
    },
    {
        'name': 'HTML',
        'img': './image/HTML5_logo.png',
    },
    {
        'name': 'C++',
        'img': './image/c++_logo.png',
    },
    {
        'name': 'JS',
        'img': './image/js_logo.png',
    },
    {
        'name': 'Sql',
        'img': './image/sql_logo.png',
    },
    {
        'name': 'Python',
        'img': './image/python_logo.png',
    },
    {
        'name': 'jquery',
        'img': './image/jquery_logo.png',
    },
    {
        'name': 'react',
        'img': './image/react_logo.png',
    },

];
const parentDiv = document.querySelector('#card-section');
const gameCards = cardsArray.concat(cardsArray);

let shuffleCards = gameCards.sort(() => 0.5 - Math.random());

const resetButton= document.querySelector('#reset');
resetButton.addEventListener('click', () => {
shuffleCards = gameCards.sort(() => 0.5 - Math.random());

    // 2. Remove all existing cards from DOM
    parentDiv.innerHTML = '';

    // 3. Recreate cards based on shuffled order

    shuffleCards.forEach(card => {

        const childDiv = document.createElement('div');
        childDiv.classList.add('card');
        childDiv.dataset.name = card.name;

        const front_view = document.createElement('div');
        front_view.classList.add('front_div');

        const back_view = document.createElement('div');
        back_view.classList.add('back_div');
        back_view.style.backgroundImage = `url(${card.img})`;

        childDiv.appendChild(front_view);
        childDiv.appendChild(back_view);
        parentDiv.appendChild(childDiv);
    });

    // 4. Remove previous matches
    let card_selected = document.querySelectorAll('.card_match');
    card_selected.forEach(element => element.classList.remove('card_match'));

    // 5. Reset counters
    resetGame();
});
let clickCount = 0;
let firstCard = '';
let secondCard = '';
const card_matchss = () => {
    let card_selected = document.querySelectorAll('.card_selected');
    card_selected.forEach(element => {
        element.classList.add('card_match')
        // matchCount++;
    });
}

parentDiv.addEventListener('click', (Event) => {
    let currCard = Event.target;
    if (currCard.id === 'card-section') return false;                //if click on the the parentdiv then return 

     if(currCard.parentNode.classList.contains('card_match'))return false //  if the card is already matched then can't click again
    if (currCard.parentNode.classList.contains('card_selected')) return false;
console.log("%cLog on Line: 61. Selected: currCard\n", "color: yellow", currCard)
   
    clickCount++;
    if (clickCount < 3) {
        if (clickCount === 1) {
            firstCard = currCard.parentNode.dataset.name;
            currCard.parentNode.classList.add('card_selected') //select the first cardd when the clickcount is 1
        }
       
        else {
            secondCard = currCard.parentNode.dataset.name;
            currCard.parentNode.classList.add('card_selected') //select the second card when the clickcount is 2
// console.log("%cLog on Line: 75. Selected: currCard\n", "color: yellow", currCard.parentNode)
        }
        
        if (firstCard != '' && secondCard != '') {
            if (firstCard === secondCard) {

                setTimeout(() => { //match the card and then reset affter a delay
                    card_matchss()
                    resetGame()
                }, 800);
            }
            else {
                setTimeout(() => {//reset the card after a delay 
                    resetGame();
                }, 800)
            }
        }
    }
})





const resetGame = () => { //reset the count 
    clickCount = 0;
    firstCard = '';
    secondCard = '';
    let card_selected = document.querySelectorAll('.card_selected');
    card_selected.forEach(element => {
        element.classList.remove('card_selected')//remove the selected card
    });
}

for (let i = 0; i < shuffleCards.length; i++) {
    const childDiv = document.createElement('div');
    childDiv.classList.add('card');
    childDiv.dataset.name = shuffleCards[i].name;

    const front_view = document.createElement('div')
    front_view.classList.add('front_div')

    const back_view = document.createElement('div')
    back_view.classList.add('back_div');

    back_view.style.backgroundImage = `url(${shuffleCards[i].img})`;


    parentDiv.appendChild(childDiv)

    childDiv.appendChild(front_view)
    childDiv.appendChild(back_view)
}

