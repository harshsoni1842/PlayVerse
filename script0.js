class RetroCheckersGame {
    constructor() {
        // Board: 8x8 array, pieces hold { color: 'red'|'black', isKing: boolean, player: 'red'|'black' }
        this.board = [];
        this.currentPlayer = 'red'; // 'red' (Player 1) or 'black' (Player 2)
        this.selectedSquare = null;
        this.validMoves = []; // moves for selected piece: { row, col, captures: [{row,col},...] }
        this.gameHistory = []; // history of boards for undo
        this.soundEnabled = true;

        this.initializeBoard();
        this.renderBoard();
        this.updateGameInfo();
        this.setupEventListeners();
    }

    // Initialize board with classic checkers starting position
    initializeBoard() {
        this.board = Array.from({ length: 8 }, () => Array(8).fill(null));

        // Black pieces on rows 0,1,2 (top)
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 8; col++) {
                if ((row + col) % 2 === 1) {
                    this.board[row][col] = { color: 'black', isKing: false, player: 'black' };
                }
            }
        }

        // Red pieces on rows 5,6,7 (bottom)
        for (let row = 5; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if ((row + col) % 2 === 1) {
                    this.board[row][col] = { color: 'red', isKing: false, player: 'red' };
                }
            }
        }

        this.gameHistory = [];
        this.selectedSquare = null;
        this.validMoves = [];
        this.currentPlayer = 'red';
    }

    // Render the board to DOM
    renderBoard() {
        const gameBoard = document.getElementById('gameBoard');
        if (!gameBoard) return;
        gameBoard.innerHTML = '';

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = `square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.row = row;
                square.dataset.col = col;

                // valid move highlight
                if (this.validMoves.some(m => m.row === row && m.col === col)) {
                    square.classList.add('valid-move');
                }

                // selected highlight
                if (this.selectedSquare && this.selectedSquare.row === row && this.selectedSquare.col === col) {
                    square.classList.add('selected');
                }

                // piece
                const piece = this.board[row][col];
                if (piece) {
                    const pieceEl = document.createElement('div');
                    pieceEl.className = `piece ${piece.color} ${piece.isKing ? 'king' : ''}`;
                    square.appendChild(pieceEl);
                }

                square.addEventListener('click', () => this.handleSquareClick(row, col));
                gameBoard.appendChild(square);
            }
        }
    }

    // Setup global UI listeners (undo, sound, modal close, keyboard)
    setupEventListeners() {
        const undoBtn = document.getElementById('undoBtn');
        if (undoBtn) undoBtn.addEventListener('click', () => undoLastMove());

        const soundBtn = document.getElementById('soundBtn');
        if (soundBtn) soundBtn.addEventListener('click', () => toggleSound());

        // keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            switch (e.key.toLowerCase()) {
                case 'n': startNewGame(); break;
                case 'u': undoLastMove(); break;
                case 's': toggleSound(); break;
                case 'escape': closeGameOverModal(); break;
            }
        });

        // prevent contextmenu on board
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.game-board')) e.preventDefault();
        });

        // handle resize re-render
        window.addEventListener('resize', () => {
            setTimeout(() => this.renderBoard(), 80);
        });
    }

    // Handle clicks on squares
    handleSquareClick(row, col) {
        // Ignore clicks if modal open (game over)
        if (document.getElementById('gameOverModal')?.style.display === 'flex') return;

        const clickedPiece = this.board[row][col];

        // If a piece is selected and click is a valid move -> perform move
        if (this.selectedSquare) {
            const validMove = this.validMoves.find(m => m.row === row && m.col === col);
            if (validMove) {
                this.makeMove(this.selectedSquare, { row, col }, validMove.captures);
                // After move, check for chain capture. makeMove will set selection if chain possible.
                this.renderBoard();
                this.updateGameInfo();
                this.checkGameOver();
                return;
            }
        }

        // Otherwise, attempt to select a piece of the current player
        if (clickedPiece && clickedPiece.player === this.currentPlayer) {
            this.selectedSquare = { row, col };
            this.validMoves = this.getValidMoves(row, col, clickedPiece);
            this.playSound('select');

            if (this.validMoves.length === 0) {
                document.getElementById('gameStatus').textContent = 'This piece has no moves';
            } else {
                const text = this.validMoves.some(m => m.captures.length > 0) ?
                    `${this.validMoves.length} capture/available moves` :
                    `${this.validMoves.length} available move(s)`;
                document.getElementById('gameStatus').textContent = text;
            }
        } else {
            // clicked empty square or other player's piece -> clear selection
            this.clearSelection();
        }

        this.renderBoard();
        this.updateGameInfo();
    }

    // Clear selection
    clearSelection() {
        this.selectedSquare = null;
        this.validMoves = [];
        const status = (this.currentPlayer === 'red') ? 'Select a red piece' : 'Select a black piece';
        document.getElementById('gameStatus').textContent = status;
    }

    // Get valid moves for a piece at (row,col)
    getValidMoves(row, col, piece) {
        const moves = [];
        const directions = piece.isKing
            ? [[-1, -1], [-1, 1], [1, -1], [1, 1]]
            : (piece.color === 'red' ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]]);

        for (const [dr, dc] of directions) {
            const nr = row + dr, nc = col + dc;
            // simple move
            if (this.isValidPosition(nr, nc) && !this.board[nr][nc]) {
                moves.push({ row: nr, col: nc, captures: [] });
            }

            // capture move
            const cr = row + dr * 2, cc = col + dc * 2;
            if (this.isValidPosition(cr, cc) &&
                !this.board[cr][cc] &&
                this.isValidPosition(nr, nc) &&
                this.board[nr][nc] &&
                this.board[nr][nc].player !== piece.player) {

                const caps = [{ row: nr, col: nc }];
                moves.push({ row: cr, col: cc, captures: caps });

                // check further captures recursively
                const multi = this.getMultipleCaptures(cr, cc, piece, caps);
                moves.push(...multi);
            }
        }

        // If there exist capture moves, standard checkers rules require captures to be taken.
        const anyCapture = moves.some(m => m.captures.length > 0);
        if (anyCapture) {
            return moves.filter(m => m.captures.length > 0);
        }
        return moves;
    }

    // Recursive multiple captures detection
    getMultipleCaptures(row, col, piece, existingCaptures) {
        const moves = [];
        const directions = piece.isKing
            ? [[-1, -1], [-1, 1], [1, -1], [1, 1]]
            : (piece.color === 'red' ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]]);

        for (const [dr, dc] of directions) {
            const midR = row + dr, midC = col + dc;
            const destR = row + dr * 2, destC = col + dc * 2;

            if (this.isValidPosition(destR, destC) &&
                !this.board[destR][destC] &&
                this.isValidPosition(midR, midC) &&
                this.board[midR][midC] &&
                this.board[midR][midC].player !== piece.player &&
                !existingCaptures.some(cap => cap.row === midR && cap.col === midC)) {

                const newCaps = [...existingCaptures, { row: midR, col: midC }];
                moves.push({ row: destR, col: destC, captures: newCaps });

                // recurse for further captures
                const further = this.getMultipleCaptures(destR, destC, piece, newCaps);
                moves.push(...further);
            }
        }
        return moves;
    }

    isValidPosition(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    // Make a move from -> to and remove captures.
    // Also handles chain-capture requirement: if piece can still capture, keep same player's turn and select it.
    makeMove(from, to, captures) {
        // Save board snapshot for undo
        this.gameHistory.push(JSON.parse(JSON.stringify(this.board)));
        document.getElementById('undoBtn').disabled = false;

        const piece = this.board[from.row][from.col];
        if (!piece) return;

        // Move piece
        this.board[to.row][to.col] = piece;
        this.board[from.row][from.col] = null;

        // Remove captured pieces
        if (captures && captures.length) {
            captures.forEach(cap => {
                if (this.isValidPosition(cap.row, cap.col)) this.board[cap.row][cap.col] = null;
            });
            this.playSound('capture');
        } else {
            this.playSound('move');
        }

        // Promote to king if reached opposite end
        if ((piece.color === 'red' && to.row === 0) ||
            (piece.color === 'black' && to.row === 7)) {
            if (!piece.isKing) {
                piece.isKing = true;
                this.playSound('king');
            }
        }

        // After capturing, check if that same piece can capture again (chain capture)
        if (captures && captures.length > 0) {
            const newMoves = this.getValidMoves(to.row, to.col, piece).filter(m => m.captures.length > 0);
            if (newMoves.length > 0) {
                // Must continue capturing with same piece: keep current player, select the landing square and valid capture moves
                this.selectedSquare = { row: to.row, col: to.col };
                this.validMoves = newMoves;
                // Update UI status
                document.getElementById('gameStatus').textContent = 'Continue capture!';
                this.renderBoard();
                this.updateGameInfo();
                return;
            }
        }

        // No chain capture: switch player
        this.selectedSquare = null;
        this.validMoves = [];
        this.currentPlayer = (this.currentPlayer === 'red') ? 'black' : 'red';
        this.updateGameInfo();
    }

    // Get all valid moves for a player (used to detect stalemate)
    getAllValidMovesForPlayer(playerColor) {
        const moves = [];
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = this.board[r][c];
                if (piece && piece.player === playerColor) {
                    const pieceMoves = this.getValidMoves(r, c, piece);
                    pieceMoves.forEach(m => {
                        moves.push({
                            from: { row: r, col: c },
                            to: { row: m.row, col: m.col },
                            captures: m.captures
                        });
                    });
                }
            }
        }
        return moves;
    }

    // Update UI info (scores, current turn text)
    updateGameInfo() {
        const redCount = this.countPieces('red');
        const blackCount = this.countPieces('black');

        const p1 = document.getElementById('player1Score');
        const p2 = document.getElementById('player2Score');
        if (p1) p1.textContent = redCount;
        if (p2) p2.textContent = blackCount;

        const turnEl = document.getElementById('currentTurn');
        if (turnEl) {
            const playerText = this.currentPlayer === 'red' ? '🔴 TURN: PLAYER 1 (RED)' : '⚫ TURN: PLAYER 2 (BLACK)';
            turnEl.textContent = playerText;
        }

        // status message when not in selection/chain
        if (!this.selectedSquare) {
            const status = (this.currentPlayer === 'red') ? 'Select a red piece' : 'Select a black piece';
            document.getElementById('gameStatus').textContent = status;
        }
    }

    countPieces(playerColor) {
        let count = 0;
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (this.board[r][c] && this.board[r][c].player === playerColor) count++;
            }
        }
        return count;
    }

    // Check for game over conditions
    checkGameOver() {
        const redPieces = this.countPieces('red');
        const blackPieces = this.countPieces('black');
        const redMoves = this.getAllValidMovesForPlayer('red');
        const blackMoves = this.getAllValidMovesForPlayer('black');

        if (redPieces === 0) {
            this.endGame('PLAYER 2 (BLACK) WINS!', 'All red pieces have been captured.');
            return;
        }
        if (blackPieces === 0) {
            this.endGame('PLAYER 1 (RED) WINS!', 'All black pieces have been captured.');
            return;
        }

        if (this.currentPlayer === 'red' && redMoves.length === 0) {
            this.endGame('PLAYER 2 (BLACK) WINS!', 'Red has no valid moves.');
            return;
        }
        if (this.currentPlayer === 'black' && blackMoves.length === 0) {
            this.endGame('PLAYER 1 (RED) WINS!', 'Black has no valid moves.');
            return;
        }
    }

    // Show modal and play sounds
    endGame(title, message) {
        const t = document.getElementById('gameOverTitle');
        const m = document.getElementById('gameOverMessage');
        const modal = document.getElementById('gameOverModal');

        if (t) t.textContent = title;
        if (m) m.textContent = message;
        if (modal) modal.style.display = 'flex';

        if (title.includes('WINS')) this.playSound('win');
        else this.playSound('lose');
    }

    // Simple retro sounds using WebAudio
    playSound(type) {
        if (!this.soundEnabled) return;

        try {
            const ac = new (window.AudioContext || window.webkitAudioContext)();
            const now = ac.currentTime;
            let osc, gain;

            const short = (freq, tLen = 0.08, typeOsc = 'square') => {
                osc = ac.createOscillator();
                gain = ac.createGain();
                osc.type = typeOsc;
                osc.frequency.setValueAtTime(freq, now);
                gain.gain.setValueAtTime(0.08, now);
                osc.connect(gain);
                gain.connect(ac.destination);
                osc.start(now);
                osc.stop(now + tLen);
            };

            switch (type) {
                case 'move': short(440, 0.06, 'sine'); break;
                case 'select': short(660, 0.04, 'sine'); break;
                case 'capture': short(220, 0.12, 'sawtooth'); break;
                case 'king': short(880, 0.18, 'triangle'); break;
                case 'win':
                    // 4-tone melody
                    [523, 659, 784, 1047].forEach((f, i) => {
                        setTimeout(() => short(f, 0.12, 'square'), i * 140);
                    });
                    break;
                case 'lose':
                    [392, 330, 262, 196].forEach((f, i) => {
                        setTimeout(() => short(f, 0.14, 'square'), i * 160);
                    });
                    break;
                case 'click': short(800, 0.03, 'square'); break;
                default: break;
            }
        } catch (err) {
            // audio not supported
            // console.log('Audio not supported', err);
        }
    }
}

// ------------------------------
// Global functions & wiring
// ------------------------------
let game = null;

function startNewGame() {
    game = new RetroCheckersGame();
    // Reset UI buttons
    const undoBtn = document.getElementById('undoBtn');
    if (undoBtn) undoBtn.disabled = true;

    const soundBtn = document.getElementById('soundBtn');
    if (soundBtn) soundBtn.textContent = game.soundEnabled ? '🔊 SOUND: ON' : '🔇 SOUND: OFF';

    closeGameOverModal();
    game.playSound('click');
}

function undoLastMove() {
    if (!game || game.gameHistory.length === 0) return;

    const prev = game.gameHistory.pop();
    game.board = JSON.parse(JSON.stringify(prev));
    game.selectedSquare = null;
    game.validMoves = [];
    game.currentPlayer = 'red'; // set to red for simplicity (could restore from history if you saved)
    game.renderBoard();
    game.updateGameInfo();
    game.playSound('click');

    const undoBtn = document.getElementById('undoBtn');
    if (undoBtn && game.gameHistory.length === 0) undoBtn.disabled = true;
}

function toggleSound() {
    if (!game) return;
    game.soundEnabled = !game.soundEnabled;
    const soundBtn = document.getElementById('soundBtn');
    if (soundBtn) soundBtn.textContent = game.soundEnabled ? '🔊 SOUND: ON' : '🔇 SOUND: OFF';
    if (game.soundEnabled) game.playSound('click');
}

function closeGameOverModal() {
    const modal = document.getElementById('gameOverModal');
    if (modal) modal.style.display = 'none';
}

// Load a new game on window load
window.addEventListener('load', () => {
    startNewGame();
});
