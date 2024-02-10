document.addEventListener('DOMContentLoaded', function() {
    const words = ['hangman', 'javascript', 'programming', 'computer', 'internet', 'game'];
    let chosenWord = '';
    let wordState = [];
    let incorrectGuesses = 0;
    let timerInterval;
    let timerSeconds = 60; // Timer set to 60 seconds
  
    const wordContainer = document.getElementById('word-container');
    const alphabetContainer = document.getElementById('alphabet-container');
    const resetBtn = document.getElementById('reset-btn');
    const hintBtn = document.getElementById('hint-btn');
    const resultModal = document.getElementById('result-modal');
    const resultMessage = document.getElementById('result-message');
    const playAgainBtn = document.getElementById('play-again-btn');
    const timerContainer = document.getElementById('timer-container');
    const timerSpan = document.getElementById('timer');
  
    function resetGame() {
      chosenWord = words[Math.floor(Math.random() * words.length)];
      wordState = new Array(chosenWord.length).fill('_');
      incorrectGuesses = 0;
      timerSeconds = 60; // Reset timer to 60 seconds
      clearInterval(timerInterval);
      startTimer();
      renderWord();
      renderAlphabet();
      resultModal.style.display = 'none';
      hintBtn.disabled = false; // Enable hint button on reset
    }
  
    function renderWord() {
      wordContainer.innerHTML = wordState.join(' ');
    }
  
    function renderAlphabet() {
      alphabetContainer.innerHTML = '';
      for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const btn = document.createElement('button');
        btn.textContent = letter;
        btn.classList.add('alphabet-btn');
        btn.addEventListener('click', function() {
          checkGuess(letter);
        });
        alphabetContainer.appendChild(btn);
      }
    }
  
    function checkGuess(letter) {
      let found = false;
      for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === letter.toLowerCase()) {
          wordState[i] = letter.toLowerCase();
          found = true;
        }
      }
      if (!found) {
        incorrectGuesses++;
      }
      renderWord();
      checkGameStatus();
    }
  
    function checkGameStatus() {
      if (wordState.join('') === chosenWord) {
        endGame('win');
      } else if (incorrectGuesses >= 6 || timerSeconds <= 0) {
        endGame('lose');
      }
    }
  
    function endGame(result) {
      clearInterval(timerInterval);
      resultMessage.textContent = result === 'win' ? 'Congratulations! You guessed the word: ' + chosenWord : 'Sorry! You lost. The word was: ' + chosenWord;
      resultModal.style.display = 'block';
    }
  
    function startTimer() {
      timerInterval = setInterval(function() {
        timerSeconds--;
        timerSpan.textContent = timerSeconds;
        if (timerSeconds <= 0) {
          clearInterval(timerInterval);
          checkGameStatus();
        }
      }, 1000);
    }
  
    resetBtn.addEventListener('click', resetGame);
  
    playAgainBtn.addEventListener('click', function() {
      resultModal.style.display = 'none';
      resetGame();
    });
  
    hintBtn.addEventListener('click', function() {
      const hiddenLetterIndex = wordState.indexOf('_');
      if (hiddenLetterIndex !== -1) {
        wordState[hiddenLetterIndex] = chosenWord[hiddenLetterIndex];
        renderWord();
        hintBtn.disabled = true;
      }
    });
  
    // Start the game
    resetGame();
  });
  