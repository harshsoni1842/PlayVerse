let cardsArray = [
    {
        'name': 'CSS',
        'img': 'css_logo.png',
    },
    {
        'name': 'HTML',
        'img': 'https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png',
    },
    {
        'name': 'C++',
        'img': 'https://www.logotypes101.com/logos/145/C7936155E49F67441E09AA8EA4CA9C96/c.png',
    },
    {
        'name': 'JS',
        'img': 'https://www.freepnglogos.com/uploads/javascript-png/png-javascript-badge-picture-8.png',
    },
    {
        'name': 'Sql',
        'img': 'https://e7.pngegg.com/pngimages/170/924/png-clipart-microsoft-sql-server-microsoft-azure-sql-database-microsoft-text-logo.png',
    },
    {
        'name': 'Python',
        'img': 'https://www.devacademy.es/wp-content/uploads/2018/10/python-logo-1024x1024.png',
    },
    {
        'name': 'jquery',
        'img': 'http://pluspng.com/img-png/jquery-logo-png--800.gif',
    },
    {
        'name': 'react',
        'img': 'https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png',
    },

];
const parentDiv = document.querySelector('#card-section');
const gameCards = cardsArray.concat(cardsArray);

let shuffleCards = gameCards.sort(() => 0.5 - Math.random());

const resetButton= document.querySelector('#reset');                   //to reset the game on clicking new match
// resetButton.addEventListener('click',()=>{
//  shuffleCards= [...shuffleCards].sort(() => 10 - Math.random());
// // console.log("%cLog on Line: 43. Function: shuffleCards\n", "color: yellow", shuffleCards)
//         let card_selected = document.querySelectorAll('.card_match');
//     card_selected.forEach(element => {
//         element.classList.remove('card_match')
//         // matchCount++;
//     });

    
//  })
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

     if(currCard.parentNode.classList.contains('card_match'))return false                //  if the card is already matched then can't click again
    if (currCard.parentNode.classList.contains('card_selected')) return false;
console.log("%cLog on Line: 61. Selected: currCard\n", "color: yellow", currCard)
   
    clickCount++;
    if (clickCount < 3) {
        if (clickCount === 1) {
            firstCard = currCard.parentNode.dataset.name;
            currCard.parentNode.classList.add('card_selected')                 //select the first cardd when the clickcount is 1
        }
       
        else {
            secondCard = currCard.parentNode.dataset.name;
            currCard.parentNode.classList.add('card_selected')               //select the second card when the clickcount is 2
// console.log("%cLog on Line: 75. Selected: currCard\n", "color: yellow", currCard.parentNode)
        }
        
        if (firstCard != '' && secondCard != '') {
            if (firstCard === secondCard) {

                setTimeout(() => {                        //match the card and then reset affter a delay
                    card_matchss()
                    resetGame()
                }, 800);
            }
            else {
                setTimeout(() => {                          //reset the card after a delay 
                    resetGame();
                }, 800)
            }
        }
    }
})





const resetGame = () => {                                          //reset the count 
    clickCount = 0;
    firstCard = '';
    secondCard = '';
    let card_selected = document.querySelectorAll('.card_selected');
    card_selected.forEach(element => {
        element.classList.remove('card_selected')                   //remove the selected card
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

