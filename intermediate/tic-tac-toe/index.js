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

// currentPlayer: 1, //1 = X, 2 = O
const App = {
    el: {
        newGameWindow: document.querySelector('[data-id="new-game"]'),
        gameBoardWindow: document.querySelector('[data-id="game-board"]'),
        newGame: {
            btnX: document.getElementById('btn-x'),
            btnO: document.getElementById('btn-o'),
            btnNewGameVsCPU: document.getElementById('btn-new-game-vs-cpu'),
            btnNewGameVsPlayer: document.getElementById('btn-new-game-vs-player')
        },
        board: {
            btnRestart: document.querySelector('[data-id="btn-restart"]'),
            squares: document.querySelectorAll('[data-id="square"]')
        },
        modal: {
            popup: document.querySelector('[data-id="modal"]'),
            text: document.querySelector('[data-id="modal-text"]'),

            btnQuit: document.querySelector('[data-id="modal-btn-quit"]'),
            btnNext: document.querySelector('[data-id="modal-btn-next"]')
        }
    },

    state: {
        playMode: 1, //1 = single, 2 = multiplayer
        moves: [],
        currentGame: [],
        history: []
    },

    getGameStatus(moves) {
        const winningPatterns = [
            [1, 2, 3],
            [1, 5, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 5, 7],
            [3, 6, 9],
            [4, 5, 6],
            [7, 8, 9],
        ];

        const player1Moves = moves.filter(move => move.playerId === 1).map(move => +move.squareId);
        const player2Moves = moves.filter(move => move.playerId === 2).map(move => +move.squareId);

        let winner = null;
        winningPatterns.forEach(pattern => {
            const player1Wins = pattern.every(move => player1Moves.includes(move));
            const player2Wins = pattern.every(move => player2Moves.includes(move));

            if (player1Wins) winner = 1;
            if (player2Wins) winner = 2;
        })

        return {
            status: moves.length === 9 || winner !== null ? 'complete' : 'in-progress', //in-progress | complete,
            winner: winner //1 | 2 | null (tie)
        }
    },

    init: () => {
        App.registerEventListeners();
    },

    registerEventListeners() {
        App.el.newGame.btnX.addEventListener('click', toggleSilverButton);
        App.el.newGame.btnO.addEventListener('click', toggleSilverButton);
        App.el.newGame.btnNewGameVsCPU.addEventListener('click', () => {
            App.playMode = "single";
            newGame();
        });
        App.el.newGame.btnNewGameVsPlayer.addEventListener('click', () => {
            App.playMode = "multi";
            newGame();
        });

        // TODO
        App.el.board.btnRestart.addEventListener('click', () => console.log('restart game'));

        App.el.board.squares.forEach(square => {
            square.addEventListener('click', () => squareClicked(square));
        });

        App.el.modal.btnNext.addEventListener('click', nextRound);
        App.el.modal.btnQuit.addEventListener('click', quitGame);
    }
}

window.addEventListener('load', App.init());

function toggleSilverButton() {
    App.el.newGame.btnX.classList.toggle('btn-secondary-silver');
    App.el.newGame.btnO.classList.toggle('btn-secondary-silver');
    if (App.el.newGame.btnX.classList.contains('btn-secondary-silver')) {
        App.currentPlayer = "X";
    } else {
        App.currentPlayer = "O";
    }
}

function newGame() {
    console.log(`Player mode: ${App.playMode}`);
    App.el.newGameWindow.classList.toggle('hidden');
    App.el.gameBoardWindow.classList.toggle('hidden');
}

function squareClicked(square) {
    // Check if there is already a play, and if so => return early
    if (hasMove(+square.id)) return;

    // Determine which player icon to add to the square
    const lastMove = App.state.moves.at(-1);
    const currentPlayer = App.state.moves.length === 0 ? 1 : getOppositePlayer(lastMove.playerId);
    const img = document.createElement('img');
    if (currentPlayer === 1)
        img.src = "assets/icon-x.svg";
    else
        img.src = "assets/icon-o.svg";

    App.state.moves.push({
        squareId: +square.id,
        playerId: currentPlayer
    });

    img.classList.add("board-player-ico");
    square.replaceChildren(img);

    // Check if there is a winner or tie game
    const game = App.getGameStatus(App.state.moves);
    if (game.status === 'complete') {
        displayResult(game.winner);
    }
}

function getOppositePlayer(playerId) {
    return playerId === 1 ? 2 : 1;
}

function hasMove(squareId) {
    return App.state.moves.find(move => move.squareId === squareId) !== undefined;
}

function displayResult(gameWinner) {
    App.el.modal.popup.classList.toggle('hidden');

    let message = '';
    if (gameWinner) {
        message = `Player ${gameWinner} wins!`;
    } else {
        message = 'Tie!';
    }

    App.el.modal.text.textContent = message;
}

function nextRound() {
    App.state.moves = [];
    App.el.board.squares.forEach(square => square.replaceChildren());
    App.el.modal.popup.classList.toggle('hidden');
}

function quitGame() {
    App.el.modal.popup.classList.toggle('hidden');
}