document.addEventListener('DOMContentLoaded', function() {
    // Отримання елементів DOM
    const userNameElement = document.getElementById('user-name');
    const userScoreElement = document.getElementById('user-score');
    const computerScoreElement = document.getElementById('computer-score');
    const roundsLeftElement = document.getElementById('rounds-left');
    const generateButton = document.getElementById('generate-button');

    // Встановлення імені користувача
    let userName = prompt("Enter your name:", "User");
    userNameElement.textContent = userName ? userName : "User";

    let userScore = 0;
    let computerScore = 0;
    let roundsLeft = 3;

    // Карткова колода
    const cards = [
        { name: '6C', value: 6 },
        { name: '7C', value: 7 },
        { name: '8C', value: 8 },
        { name: '9C', value: 9 },
        { name: '10C', value: 10 },
        { name: 'JC', value: 2 },
        { name: 'QC', value: 3 },
        { name: 'KC', value: 4 },
        { name: 'AC', value: 11 }
    ];

    // Генерація випадкової картки
    function getRandomCard() {
        const card = cards[Math.floor(Math.random() * cards.length)];
        return card;
    }

    // Обрахунок очок та виведення карт
    function updateScores() {
    const userHandElement = document.getElementById('user-hand');
    const computerHandElement = document.getElementById('computer-hand');

    const userCard = getRandomCard();
    const computerCard = getRandomCard();

    userScore += userCard.value;
    computerScore += computerCard.value;

    addCardToHand(userHandElement, userCard);
    addCardToHand(computerHandElement, computerCard);

    // Відображення сумарної кількості очок
    userScoreElement.textContent = 'Score: ' + userScore;
    computerScoreElement.textContent = 'Score: ' + computerScore;
}
    // Перевірка переможця після трьох раундів
    function checkWinner() {
        if (roundsLeft === 0) {
            const winner = userScore === computerScore ? "Draw" : (userScore > computerScore ? userName : 'Computer');
			setTimeout(function() {
            alert(winner + ' won!');
            resetGame();
			}, 1000);
        }
    }
    // Скидання гри
    function resetGame() {
    userScore = 0;
    computerScore = 0;
    roundsLeft = 3;
    userScoreElement.textContent = 'Score: ' + userScore;
    computerScoreElement.textContent = 'Score: ' + computerScore;
    roundsLeftElement.textContent = roundsLeft + ' moves left';
    document.getElementById('user-hand').innerHTML = '';
    document.getElementById('computer-hand').innerHTML = '';
}
    generateButton.addEventListener('click', function() {
        if (roundsLeft > 0) {
            roundsLeft--;
            roundsLeftElement.textContent = roundsLeft + ' moves left';
            updateScores();
            checkWinner();
        }
    });
    resetGame(); // Початковий запуск гри
});
// Функція для додавання картинки карти до контейнера
function addCardToHand(handElement, card) {
    // Якщо вже є картка, замініть її зображення
    let cardImage = handElement.querySelector('.card');
    if (cardImage) {
        cardImage.src = 'D:/UNIVER/2_kurs/Frontend/lr9/Clubs/' + card.name + '.svg';
    } else {
        // Якщо картки немає, створіть нову
        cardImage = document.createElement('img');
        cardImage.src = 'Clubs/' + card.name + '.svg';
        cardImage.classList.add('card');
        handElement.appendChild(cardImage);
    }
}