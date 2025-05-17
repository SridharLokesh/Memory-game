document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        { name: '😊', img: '😊' }, { name: '❤️', img: '❤️' },
        { name: '🦋', img: '🦋' }, { name: '🍬', img: '🍬' },
        { name: '🏀', img: '🏀' }, { name: '🍕', img: '🍕' },
        { name: '🎄', img: '🎄' }, { name: '🍉', img: '🍉' },
        { name: '😊', img: '😊' }, { name: '❤️', img: '❤️' },
        { name: '🦋', img: '🦋' }, { name: '🍬', img: '🍬' },
        { name: '🏀', img: '🏀' }, { name: '🍕', img: '🍕' },
        { name: '🎄', img: '🎄' }, { name: '🍉', img: '🍉' }
    ];

    const gameBoard = document.getElementById('gameBoard');
    const restartBtn = document.getElementById('restartBtn');
    const flipSound = new Audio('sound/light-flip.mp3');

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.id = 'message';
    messageDiv.style.marginTop = '15px';
    messageDiv.style.fontSize = '20px';
    messageDiv.style.fontWeight = 'bold';
    messageDiv.style.color = 'green';
    gameBoard.insertAdjacentElement('afterend', messageDiv);

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchesFound = 0;

    function shuffleCards() {
        cardsArray.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffleCards();
        gameBoard.innerHTML = '';
        messageDiv.textContent = '';
        matchesFound = 0;

        cardsArray.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.name = card.name;

            const frontFace = document.createElement('div');
            frontFace.classList.add('front');
            frontFace.textContent = card.img;

            const backFace = document.createElement('div');
            backFace.classList.add('back');

            cardElement.appendChild(frontFace);
            cardElement.appendChild(backFace);
            gameBoard.appendChild(cardElement);

            cardElement.addEventListener('click', flipCard);
        });
    }

    function flipCard() {
        if (lockBoard || this === firstCard || this.classList.contains('matched')) return;

        flipSound.currentTime = 0;
         flipSound.play();

        this.classList.add('flipped');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.name === secondCard.dataset.name;

        if (isMatch) {
            handleMatch();
        } else {
            unflipCards();
        }
    }

    function handleMatch() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');

        matchesFound++;
        resetBoard();

        if (matchesFound === cardsArray.length / 2) {
            setTimeout(() => {
                messageDiv.textContent = '🎉 Congratulations! You found all matches!';
            }, 600);
        }
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function restartGame() {
        createBoard();
    }

    restartBtn.addEventListener('click', restartGame);

    // Initialize the game
    createBoard();
});
