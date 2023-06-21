// 1. player can make a game move
// 2. new round
// 3. start new game
// 4. toggle menu

// Your users should be able to:

// Play the game either solo vs the computer or multiplayer against another person
// Bonus 1: Save the game state in the browser so that it’s preserved if the player refreshes their browser
// Bonus 2: Instead of having the computer randomly make their moves, try making it clever, so it’s proactive in blocking your moves and trying to win
// Expected behaviour
// You can choose to make the default screen either the new game menu or the solo player game board. Note that we're using the solo player game board for the design screenshot, so if you choose the new game menu it won't match up in the design comparison slider. This isn't a big deal, but is something worth considering.
// On the new game screen, whichever mark isn't selected for the first player is automatically assigned to the second player when the game is started.
// The first turn of the first round is always played by whoever is playing as X. For every following round, the first turn alternates between O and X.
//     After a round, if the player chooses to quit the game, they should be taken back to the new game menu.
//     If the restart icon in the top right is clicked, the "Restart game?" modal should show and allow the player to reset the game or cancel and continue to play.

const App = {
    el: {
        newGame: {
            btnX: document.getElementById('btn-x'),
            btnO: document.getElementById('btn-o'),
            btnNewGameVsCPU: document.getElementById('btn-new-game-vs-cpu'),
            btnNewGameVsPlayer: document.getElementById('btn-new-game-vs-player')
        }
    }
}

function toggleSilverButton() {
    App.el.newGame.btnX.classList.toggle('btn-secondary-silver');
    App.el.newGame.btnO.classList.toggle('btn-secondary-silver');
}

App.el.newGame.btnX.addEventListener('click', toggleSilverButton);
App.el.newGame.btnO.addEventListener('click', toggleSilverButton);