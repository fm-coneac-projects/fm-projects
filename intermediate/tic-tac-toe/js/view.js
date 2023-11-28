export default class View {
    el = {}

    constructor() {
        this.el.newGameWindow = document.querySelector('[data-id="new-game"]');
        this.el.gameBoardWindow = document.querySelector('[data-id="game-board"]');

        this.el.newGame = {};
        this.el.newGame.btnX = document.getElementById('btn-x');
        this.el.newGame.btnO = document.getElementById('btn-o');
        this.el.newGame.btnNewGameVsCPU = document.getElementById('btn-new-game-vs-cpu');
        this.el.newGame.btnNewGameVsPlayer = document.getElementById('btn-new-game-vs-player');

        this.el.board = {};
        this.el.board.turn = document.querySelector('[data-id="turn"]');
        this.el.board.btnReset = document.querySelector('[data-id="btn-reset"]');
        this.el.board.squares = document.querySelectorAll('[data-id="square"]');

        this.el.modal = {};
        this.el.modal.popup = document.querySelector('[data-id="modal"]');
        this.el.modal.text = document.querySelector('[data-id="modal-text"]');
        this.el.modal.btnQuit = document.querySelector('[data-id="modal-btn-quit"]');
        this.el.modal.btnNext = document.querySelector('[data-id="modal-btn-next"]');

        // UI only event listeners
        this.el.newGame.btnX.addEventListener('click', () => {
            this.el.newGame.btnX.classList.toggle('btn-secondary-silver');
            this.el.newGame.btnO.classList.toggle('btn-secondary-silver');
        });

        this.el.newGame.btnO.addEventListener('click', () => {
            this.el.newGame.btnX.classList.toggle('btn-secondary-silver');
            this.el.newGame.btnO.classList.toggle('btn-secondary-silver');
        });

        this.el.newGame.btnNewGameVsCPU.addEventListener('click', () => {
            this.el.newGameWindow.classList.toggle('hidden');
            this.el.gameBoardWindow.classList.toggle('hidden');
        })

        this.el.newGame.btnNewGameVsPlayer.addEventListener('click', () => {
            this.el.newGameWindow.classList.toggle('hidden');
            this.el.gameBoardWindow.classList.toggle('hidden');
        })


    }

    /**
     * Register all event listeners
     * @param handler
     */
    bindGameResetEvent(handler) {
        this.el.board.btnReset.addEventListener('click', handler);
    }

    bindNewRoundEvent(handler) {
        this.el.modal.btnNext.addEventListener('click', handler);
    }

    bindPlayerMoveEvent(handler) {
        this.el.board.squares.forEach(square => {
            square.addEventListener('click', handler);
        });
    }


}