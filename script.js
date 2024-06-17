document.addEventListener('DOMContentLoaded', function () {
    const API_URL = 'https://clientes.api.greenborn.com.ar/public-random-word?c=1&l=5';
    let targetWord = '';
  
    // Elementos del DOM
    const wordDisplay = document.getElementById('wordDisplay');
    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const guessesDisplay = document.getElementById('guessesDisplay');
    const message = document.getElementById('message');
  
    // Inicializa el juego
    async function initializeGame() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Error al obtener la palabra');
        }
        const data = await response.json();
        targetWord = data[0].toUpperCase();
        console.log('Palabra objetivo:', targetWord); 
        renderWord();
      } catch (error) {
        console.error('Error obteniendo palabra:', error);
      }
    }
  
    // Randeriza la palabra de destino como guiones bajos
    function renderWord() {
      wordDisplay.textContent = targetWord.replace(/[A-Z]/g, '_');
    }
  
    // Maneja el envío del formulario
    function handleGuess(event) {
      event.preventDefault();
      const guess = guessInput.value.trim().toUpperCase();
      if (guess.length !== 5 || !/^[A-Z]+$/.test(guess)) {
        showMessage('Por favor ingresa una palabra de 5 letras utilizando letras de (A-Z).');
        return;
      }
      checkGuess(guess);
    }
  
    // Compara la palabra ingresada con la palabra a adivinar
    function checkGuess(guess) {
      if (guess === targetWord) {
        showMessage(`Felicidades! Adivinaste la palabra "${targetWord}" correctamente.`);
        disableInput();
      } else {
        showGuess(guess);
      }
      guessInput.value = '';
    }
  
    // Muestra las palabras ingresadas
    function showGuess(guess) {
      const div = document.createElement('div');
      div.textContent = guess;
      guessesDisplay.appendChild(div);
    }
  
    // Muestra un mensaje en el ára de mensajes
    function showMessage(msg) {
      message.textContent = msg;
      setTimeout(() => {
        message.textContent = '';
      }, 3000); // Limpia el mensaje después de 3 segundos
    }
  
    // Deshabilita el campo input y el botón adibinar
    function disableInput() {
      guessInput.disabled = true;
      guessButton.disabled = true;
    }
  
    // Event Listener
    guessButton.addEventListener('click', handleGuess);
    initializeGame();
  });
  