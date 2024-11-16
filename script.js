const squares = document.querySelectorAll('.square');
const colorDisplay = document.getElementById('color-display');
const resetButton = document.getElementById('reset');
const messageDisplay = document.getElementById('message');
const modeButtons = document.querySelectorAll('.mode');

let numSquares = 6;
let colors = [];
let pickedColor;

const init = () => {
  modeButtons.forEach(btn => btn.addEventListener('click', handleModeChange));
  squares.forEach(square => square.addEventListener('click', handleSquareClick));
  resetButton.addEventListener('click', reset);
  reset();
}

const handleModeChange = (event) => {
  modeButtons.forEach(btn => btn.classList.remove('selected'));
  event.target.classList.add('selected');
  numSquares = event.target.textContent === 'Easy' ? 3 : 6;
  reset();
}

const handleSquareClick = (event) => {
  const clickedColor = event.target.style.backgroundColor;
  if (clickedColor === pickedColor) {
    messageDisplay.textContent = 'Correct!';
    resetButton.textContent = 'Play Again?';
    changeColors(pickedColor);
  } else {
    event.target.style.backgroundColor = '#232323';
    messageDisplay.textContent = 'Try Again';
  }
}

const reset = () => {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = 'New Colors';
  messageDisplay.textContent = '';
  squares.forEach((square, i) => {
    if (colors[i]) {
      square.style.display = 'block';
      square.style.backgroundColor = colors[i];
    } else {
      square.style.display = 'none';
    }
  });
}

const changeColors = (color) => {
  squares.forEach(square => square.style.backgroundColor = color);
}

const pickColor = () => colors[Math.floor(Math.random() * colors.length)];

const generateRandomColors = (num) => Array.from({ length: num }, () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
});

init();