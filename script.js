var table = [];
for (var i = 1; i <= 3; i++) {
    table[i] = [];
    for (var j = 1; j <= 3; j++) {
        table[i][j] = 0;
    }
}

// 1 (player1) is for X
// 2 (player2) is for 0
var turn = 1;
var player1;
var player2;

//checks if table is completed without anyone winning
function checkDraw() {
	var draw = 1;
	for (var i = 1; i <= 3; i++) {
		for (var j = 1; j <= 3; j++) {
			if (table[i][j] == 0) {
				draw = 0;
			}
		}
	}
	if (draw == 1) {
		document.getElementById("status").innerHTML = "Draw!";	
	} 
}

//changes the turn after clicking a cell
function updatePlayersTurn() {
	checkDraw();
	if (turn == 1) {
		document.getElementById("turn").innerHTML = "Turn: " + player1;
	} else {
		document.getElementById("turn").innerHTML = "Turn: " + player2;
	}
}

//prevents the table to be completed when someone wins
function disableButtons() {
	for (var i = 1; i <= 3; i++) {
		for (var j = 1; j <= 3; j++) {
			var id = "" + i + j;
			document.getElementById(id).className += " disabled";
		}
	}
}

//tells who won
function updateGameWinner(player) {
	if (player == 1) {
		document.getElementById("status").innerHTML = player1 + " won!";
	} else {
		document.getElementById("status").innerHTML = player2 + " won!";
	}
	$("#turn").remove();
	disableButtons();
}

//shows one winner cell on the game board
function colorWinningCell(row, column) {
	var id = "" + row + column;
	document.getElementById(id).className = "btn btn-success btn-lg"
}

//displays the table's winnig positions
//the id tells which row/column/diagonal is completed 
function displayWinner(direction, id) {
	if (direction == "row") {
		for (var j = 1; j <= 3; j++) {
			colorWinningCell(id, j);
		}
	} else if (direction == "column") {
		for (var i = 1; i <= 3; i++) {
			colorWinningCell(i, id);
		}
	} else if (direction == "diagonal") {
		var j = 3;
		for (var i = 1; i <= 3; i++) {
			if (id == 1) {
				colorWinningCell(i, i);
			} else {
				colorWinningCell(i, j);
				j--;
			}
		}
	}
}

function checkRowsAndColumns() {
	for (var i = 1; i <= 3; i++) {
 		if (table[i][1] == table[i][2] && table[i][2] == table[i][3] && table[i][1] != 0) {
 			updateGameWinner(table[i][1]);
 			displayWinner("row", i);
 		}
	 	if (table[1][i] == table[2][i] && table[2][i] == table[3][i] && table[1][i] != 0) {
	 		updateGameWinner(table[1][i]);
	 		displayWinner("column", i);
	 	}
 	}
}

function checkDiagonals() {
	if (table[1][1] == table[2][2] && table[2][2] == table[3][3] && table[1][1] != 0) {
 		updateGameWinner(table[1][1]);
 		displayWinner("diagonal", 1);
 	}
 	if (table[1][3] == table[2][2] && table[2][2] == table[3][1] && table[1][3] != 0) {
		updateGameWinner(table[1][3]);
		displayWinner("diagonal", 2);
 	}
}

//checks if someone won or not
 function checkGameWinner() {
 	checkRowsAndColumns();
 	checkDiagonals();
 }

//fills the clicked cell with 0 or X, depending on the player's turn
function fillCell (id) {
	var row = Math.floor(parseInt(id) / 10);
  	var column = Math.floor(parseInt(id) % 10);
  	if (table[row][column] == 0) {
		if (turn == 1) {
  			table[row][column] = 1;
  			document.getElementById(id).innerHTML = "X";
  			turn = 2;
	  	} else {
	  		table[row][column] = 2;
	  		document.getElementById(id).innerHTML = "0";
	  		turn = 1;
	  	}
	  	updatePlayersTurn();
	  	checkGameWinner();
  	} 
}

function loadTable() {
	player1 = document.getElementById("player1").value;
	player2 = document.getElementById("player2").value;
	if (player1.length == 0 || player2.length == 0) {
		restartGame();
	} else {
		$('#playersNames').remove();
		$('#gameInfo').append(`
			<h2 id="status" style="color:green"></h2>
	        <h3 id="turn">Turn: `+ player1 +`</h3>
		`);
		for (var i = 1; i <= 3; i++) {
		    $('#table').append(`
		      <tr></tr>
		    `)
		    for (var j = 1; j <= 3; j++) {
		      $('#table').append(`
		        <td><button type="button" class="btn btn-secondary btn-lg" style="width: 120px; height: 120px;" id = "` + i + + j +`" onclick = "fillCell(id);"><i class="las la-square"></i></button></td>
		      `);
		    }
		}
		$('#restartButton').append(`
			<button type="button" class="btn btn-danger" style="width: 200px; height: 50px;" onclick="restartGame();"><i class="las la-redo-alt"></i></button>
		`);
	}
	return false;
}

function restartGame() {
	location.reload();
}
