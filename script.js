'use strict';
const playersList = document.getElementsByClassName('player');
const imageEl = document.getElementsByClassName('dice')[0];
let isPlaying = true;
const generateRandomRoll = () => {
  const randomNumber = Math.floor(Math.random() * 6 + 1);
  return randomNumber;
};
const accumulateCurrentScore = (rollResult) => {
  const activePlayer = document.getElementsByClassName('player--active')[0];
  const currentScore = activePlayer.querySelector('.current-score');
  currentScore.textContent = Number(currentScore.textContent) + rollResult;
};
const switchPlayer = () => {
  if (isPlaying) {
    accumulateTotalScore();
  }
  if (isPlaying) {
    for (let player of playersList) {
      player.classList.toggle('player--active');
    }
  }
};
const displayDiceRoll = () => {
  if (isPlaying) {
    const rollResult = generateRandomRoll();
    if (imageEl.classList.contains('hidden')) {
      imageEl.classList.remove('hidden');
    }
    imageEl.src = `./images/dice-${rollResult}.png`;
    accumulateCurrentScore(rollResult);
    if (rollResult === 1) {
      const activePlayer = document.getElementsByClassName('player--active')[0];
      activePlayer.querySelector('.current-score').textContent = 0;
      switchPlayer();
    }
  }
};
const setActivePlayer = (number) => {
  for (let player of playersList) {
    player.classList.remove('player--winner');
    if (player.classList.contains('player--active')) {
      player.classList.remove('player--active');
    }
    if (player.classList.contains(`player--${number}`)) {
      player.classList.add('player--active');
    }
  }
};
const resetGame = () => {
  setActivePlayer(0);
  setScore(0);
  isPlaying = true;
  if (!imageEl.classList.contains('hidden')) {
    imageEl.classList.add('hidden');
  }
};
const setScore = (number) => {
  const totalScores = document.querySelectorAll('.score');
  const currentScores = document.querySelectorAll('.current-score');
  for (let totalScore of totalScores) {
    totalScore.textContent = `${number}`;
  }
  for (let currentScore of currentScores) {
    currentScore.textContent = `${number}`;
  }
};
const accumulateTotalScore = () => {
  const activePlayer = document.querySelector('.player--active');
  const currentScore = activePlayer.querySelector('.current-score');
  const totalScore = activePlayer.querySelector('.score');
  const resultTotalScore =
    Number(totalScore.textContent) + Number(currentScore.textContent);
  totalScore.textContent = resultTotalScore;
  currentScore.textContent = 0;
  if (resultTotalScore >= 100) {
    activePlayer.classList.replace('player--active', 'player--winner');
    isPlaying = false;
  }
};
document.querySelector('.btn--roll').addEventListener('click', displayDiceRoll);
document.querySelector('.btn--hold').addEventListener('click', switchPlayer);
document.querySelector('.btn--new').addEventListener('click', resetGame);