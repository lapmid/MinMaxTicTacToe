// Function to get the best move for computer from the Q-table
function getBestMoveFromQTable(board, player) {
    const boardString = board.map(c=>c==='' ? ' ':c).join('');
    const availableMoves = [];

    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            availableMoves.push(i);
        }
    }

    if (availableMoves.length === 0) {
        return null; // No available moves
    }

    // Choose the best move from the available moves based on the Q-table
    let bestMove = availableMoves[0];
    let bestQValue = Q_TABLE[boardString + '|' + (bestMove+player)];

    for (let i = 1; i < availableMoves.length; i++) {
        const move = availableMoves[i];
        const qValue = Q_TABLE[boardString + '|' + (move+player)];

        if (qValue > bestQValue) {
            bestMove = move;
            bestQValue = qValue;
        }
    }

    const possibleMoves = [];
    const qValues = []
    for (let i = 0; i < availableMoves.length; i++) {
    	move = availableMoves[i];
    	const qValue = Q_TABLE[boardString + '|' + (move+player)];
        if(bestQValue === qValue){
        	possibleMoves.push(move);
        	qValues.push(qValue);
        }
    }

    console.log(possibleMoves,qValues);
    return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
}

function getBestMoveFromMinMaxTable(board,firstPlayer){
	const boardString = board.map(c=>c==='' ? ' ':c).join('');
	console.log('game state '+boardString)
	move = MinMaxModel1[boardString];
	if(!firstPlayer){
		move = MinMaxModel2[boardString];
	}
	if(move === undefined || move === null){
		const availableMoves = [];

	    for (let i = 0; i < 9; i++) {
	        if (board[i] === '') {
	            availableMoves.push(i);
	        }
	    }

	    if (availableMoves.length === 0) {
	        return null; // No available moves
	    }
	    return availableMoves[Math.floor(Math.random() * availableMoves.length)]
	}
	return move;
}