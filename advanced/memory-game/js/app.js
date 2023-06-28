const App = {
    el: {
        //game setup
        gameSetup: document.getElementById("game-setup"),

        themes: document.querySelectorAll('[data-id="themes"]'),
        noPlayers: document.querySelectorAll('[data-id="no-players"]'),
        gridSizes: document.querySelectorAll('[data-id="grid-sizes"]'),
        btnStartGame: document.querySelector('[data-id="btn-start-game"]'),

        //board
        gameBoard: document.getElementById("game-board"),
        btnMenu: document.querySelector('[data-id="btnMenu"]'),
        board: document.querySelector('[data-id="board"]'),

        //menu
        menuOverlay: document.getElementById('game-overlay'),
        btnMnuRestart: document.querySelector('[data-id="btn-mnu-restart-game"]'),
        btnMnuNewGame: document.querySelector('[data-id="btn-mnu-new-game"]'),
        btnMnuResume: document.querySelector('[data-id="btn-mnu-resume-game"]'),

        //scores
        multiPlayerScore: document.querySelector('[data-id="multi-player-score"]'),
        singlePlayerScore: document.querySelector('[data-id="single-player-score"]'),
    },

    state: {
        theme: 'Numbers', //Numbers, Icons
        players: 1, //1, 2, 3, 4 (0 = no player)
        gridSize: 4, //4x4 or 6x6
        currentPlayer: 1,
        currentGame: [],
        playerScores: [],
        moves: 0, //for single player only
        intervalId: 0
    },

    initGame() {
        App.state.currentGame = [];
        App.state.playerScores = new Array(App.state.players).fill(0);

        const nrElements = App.state.gridSize * App.state.gridSize;
        let maximum = nrElements / 2;
        let templateArray = new Array();

        for (let i = 1; i <= maximum; i++) {
            templateArray.push(i);
            templateArray.push(i);
        }

        randomize(templateArray);

        for (let i = 0; i < nrElements; i++) {
            App.state.currentGame.push({index: i, number: templateArray[i], player: 0});
        }
    },

    initBoard() {
        //populate board
        let boardHtml = ``;
        let size = App.state.gridSize;
        let classSize, gapSize;

        if (size === 4) {
            classSize = 'four';
            gapSize = 'large';
        }

        if (size === 6) {
            classSize = 'six';
            gapSize = 'small';
        }

        App.el.board.classList.add(gapSize);

        for (let i = 0; i < App.state.currentGame.length; i++) {
            let index = App.state.currentGame[i]["index"];
            let number = App.state.currentGame[i]["number"];
            let player = App.state.currentGame[i]["player"];

            boardHtml += `
                <div id="${index}" data-id="board-item" class="board-item ${classSize} dark-color">${number}</div>
            `;
        }
        App.el.board.innerHTML = boardHtml;

        document.querySelectorAll('[data-id="board-item"]').forEach(boardItem => {
            // boardItem.style.transition = 'all 2s';
            boardItem.addEventListener('click', event => onBoardItemClick(event));
        })
    },

    initScores() {
        if (App.state.players === 1) {
            App.el.singlePlayerScore.classList.toggle('hidden');
            let scoreHtml = `
                <!-- Time elapsed -->
                <div class="score-player secondary-color">
                    <span class="player-name">Time</span>
                    <span id="single-time" class="player-score">0:0</span>
                </div>

                <!-- Moves total -->
                <div class="score-player secondary-color">
                    <span class="player-name">Moves</span>
                    <span id="single-moves" class="player-score">0</span>
                </div>
            `;
            App.el.singlePlayerScore.innerHTML = scoreHtml;

            App.el.singleTime = document.getElementById('single-time');
            App.el.singleMoves = document.getElementById('single-moves');

            const start = new Date().getTime();

            App.state.intervalId = setInterval(() => {
                const now = new Date().getTime();
                const distance = now - start;

                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                App.el.singleTime.innerHTML = minutes + ":" + seconds;
                App.el.singleMoves.innerHTML = App.state.moves;
            }, 1000);

        } else {
            App.el.multiPlayerScore.classList.toggle('hidden');
            let scoreHtml = ``;
            for (let i = 1; i <= App.state.players; i++) {
                let colorClass;

                if (i === App.state.currentPlayer) colorClass = 'primary-color';
                else colorClass = 'secondary-color';

                scoreHtml += `
                <div class="score-player ${colorClass}">
                    <span class="player-name">P${i}</span>
                    <span class="player-score">${App.state.playerScores[i - 1]}</span>
                </div>
                `;
            }
            App.el.multiPlayerScore.innerHTML = scoreHtml;
        }
    },


    init: () => {
        App.registerEventListeners();
    },

    registerEventListeners() {
        //setup
        App.el.themes.forEach(theme =>
            theme.addEventListener('click', event => {
                App.state.theme = toggleActiveIdle(event, App.el.themes)
            }));
        App.el.noPlayers.forEach(noPlayer =>
            noPlayer.addEventListener('click', event => {
                App.state.players = parseInt(toggleActiveIdle(event, App.el.noPlayers))
            }));
        App.el.gridSizes.forEach(gridSize =>
            gridSize.addEventListener('click', event => {
                App.state.gridSize = parseInt(toggleActiveIdle(event, App.el.gridSizes))
            }));

        App.el.btnStartGame.addEventListener("click", () => {
            App.el.gameSetup.classList.toggle('hidden');
            App.el.gameBoard.classList.toggle('hidden');

            App.initGame();
            App.initBoard();
            App.initScores();
        });

        //board
        App.el.btnMenu.addEventListener('click', () => console.log('Menu clicked!'));

        //menu
        App.el.btnMenu.addEventListener('click', () => {
            App.el.menuOverlay.classList.toggle('hidden');
        })

        App.el.btnMnuNewGame.addEventListener('click', () => {
            //TODO => create new game
            App.el.menuOverlay.classList.toggle('hidden');
        })
        App.el.btnMnuRestart.addEventListener('click', () => {
            //TODO => restart game
            App.el.menuOverlay.classList.toggle('hidden');
        })
        App.el.btnMnuResume.addEventListener('click', () => {
            App.el.menuOverlay.classList.toggle('hidden');
        })
    },

    updateMoves() {
        //verify how many opened items we have
        const selectedBoardItems = document.querySelectorAll('.board-item.primary-color');

        if (selectedBoardItems.length == 2) {
            if (App.state.players === 1) {
                App.state.moves++;
                document.getElementById('single-moves').innerHTML = App.state.moves;
                console.log(App.state.moves);
            }

            //multi player
            let currentPlayer = App.state.currentPlayer;
            let item1 = selectedBoardItems[0];
            let item2 = selectedBoardItems[1];

            if (item1.innerHTML === item2.innerHTML) {
                //update score && display new score
                App.state.playerScores[currentPlayer - 1]++;

                //save state in game
                let currentEl1 = App.state.currentGame.find(l => l.index == item1.id);
                let currentEl2 = App.state.currentGame.find(l => l.index == item2.id);

                currentEl1.player = currentPlayer;
                currentEl2.player = currentPlayer;

                //make opened items inactive
                item1.classList.remove('primary-color');
                item1.classList.add('secondary-color');

                item2.classList.remove('primary-color');
                item2.classList.add('secondary-color');
            } else {
                //close opened items
                item1.classList.remove('primary-color');
                item1.classList.add('dark-color');

                item2.classList.remove('primary-color');
                item2.classList.add('dark-color');
            }

            //change player
            App.state.currentPlayer = currentPlayer++ / App.state.players;
            App.verifyEndGame();
        }
    },

    verifyEndGame() {
        //TODO => verify if game ended and display popup if so
        console.log(App.state)
        if (App.state.currentGame.filter(l => l.player === 0).length === 0) {
            console.log('game ended')

            if (App.state.players === 1)
                clearInterval(App.state.intervalId);
            //display winner popup
            // App.state.playerScores
        }
    }

}

window.addEventListener('load', App.init);

//css only
function toggleActiveIdle(event, elements) {
    let inner;
    elements.forEach(el => {
        if (el === event.target) {
            makeClassActive(el);
            inner = el.innerHTML;
        } else
            makeClassIdle(el);
    });
    return inner;
}

function makeClassActive(element) {
    if (element.classList.contains('idle'))
        element.classList.remove('idle')
    if (!element.classList.contains('active'))
        element.classList.add('active')
}

function makeClassIdle(element) {
    if (element.classList.contains('active'))
        element.classList.remove('active')
    if (!element.classList.contains('idle'))
        element.classList.add('idle')

}

function randomize(arr) {
    // Start from the last element and swap
    // one by one. We don't need to run for
    // the first element that's why i > 0
    for (let i = arr.length - 1; i > 0; i--) {

        // Pick a random index from 0 to i inclusive
        let j = Math.floor(Math.random() * (i + 1));

        // Swap arr[i] with the element
        // at random index
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function onBoardItemClick(event) {
    if (event.target.classList.contains('dark-color')) {
        event.target.classList.remove('dark-color');
        event.target.classList.add('primary-color');

        setTimeout(App.updateMoves, 1500);
    }
}
