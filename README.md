# Frontend Mentor - Rock, Paper, Scissors solution

This is a solution to the [Rock, Paper, Scissors challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- Play Rock, Paper, Scissors against the computer
- Maintain the state of the score after refreshing the browser _(optional)_
- **Bonus**: Play Rock, Paper, Scissors, Lizard, Spock against the computer _(optional)_

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Take a look](https://your-solution-url.com)
- Live Site URL: [Take a look](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox

## Code Details

### JavaScript Functionality

- **Show/Hide Rules:** The rules can be toggled by clicking the rules button, which will show an overlay with the game rules. Clicking outside the rules or on the close icon will hide the overlay.
- **Set Initial Score:** The game keeps track of the score using `localStorage` to persist the score even after refreshing the browser.
- **Start Game:** Event listeners are attached to each game button (rock, paper, scissors, lizard, spock) to initiate the game when clicked.
- **Display Choices:** When a game button is clicked, the player's choice is displayed alongside a rotating animation that simulates the computer's choice being randomly selected.
- **Determine Winner:** The game logic determines the winner based on the player's choice and the computer's final choice, updating the score accordingly.
- **Play Again:** After a game round, a play again button is displayed, allowing the user to restart the game.

## Author

- Website - [Abdulaziz omran](https://abdulaziz-m895.github.io/Portfolio/)
- Frontend Mentor - [@abdulaziz-M895](https://www.frontendmentor.io/profile/abdulaziz-M895)
- LinkedIn - [@abdulaziz-omran](https://www.linkedin.com/in/abdulaziz-omran/)
