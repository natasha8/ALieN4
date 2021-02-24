(function () {
	const message = document.querySelector("#current-player");
	var count = 0;
	var currentPlayer = "Xanny";
	var board = new Array(6);
	var dir = [
		[1, 0],
		[1, -1],
		[1, 1],
		[0, 1],
	];
	for (var f = 0; f < board.length; f++) {
		board[f] = new Array(7);
	}
	fillBoard();

	$(".column").on("click", function (e) {
		var col = $(e.currentTarget);
		var slotsInCol = col.children();
		var sound = new Audio("files/coin.wav");
		sound.play();

		for (var i = slotsInCol.length - 1; i >= 0; i--) {
			if (
				!slotsInCol.eq(i).hasClass("Xanny") &&
				!slotsInCol.eq(i).hasClass("Nash")
			) {
				slotsInCol.eq(i).addClass(currentPlayer);
				break;
			}
		}
		console.log("i:", i);

		var slotInRow = $(".row" + i);

		fillMatrix(slotInRow, slotsInCol);
		console.log(board);
		if (i == -1) {
			console.log("NO MORE SPACE");
			var sound2 = new Audio("files/denied.mp3");
			sound2.play();
			return;
		}
		if (checkVictory()) {
			console.log(currentPlayer + " won");
			var sound3 = new Audio("files/victory.wav");
			sound3.play();
			message.textContent = currentPlayer + " won";

			if (currentPlayer === "Xanny") {
				var uno = $("p.uno");
				$(".overlay").append("<img src=files/Malien.png class=alien>");
				$("p.uno").append("<img src=files/Malien.png class=alien>");
				localStorage.setItem("GREEN ALIEN WON", uno);
			}
			if (currentPlayer === "Nash") {
				var due = $("p.due");
				$(".overlay").append("<img src=files/Falien.png class=alien>");
				$("p.due").append("<img src=files/Falien.png class=alien>");
				localStorage.setItem("PINK ALIEN WON", due);
			}
			$(".overlay").append().fadeIn(1500);
		}
		switchPlayer();
	});

	function restart() {
		var count = 0;
		var currentPlayer = "";
		var board = new Array(6);
		var dir = [
			[1, 0],
			[1, -1],
			[1, 1],
			[0, 1],
		];
		for (var f = 0; f < board.length; f++) {
			board[f] = new Array(7);
		}
		fillBoard();
		var slots = $(".slot");
		slots.removeClass("Xanny");
		slots.removeClass("Nash");
	}

	$("button").on("click", function () {
		$(".overlay").append().fadeOut(1000);
		restart();
	});

	function fillBoard() {
		for (var i = 0; i < board.length; i++) {
			for (var j = 0; j < board[i].length; j++) {
				board[i][j] = "-";
			}
			console.log(i, j);
		}
	}

	function fillMatrix(rows, columns) {
		for (var j = 0; j < rows.length; j++) {
			for (var i = 0; i < columns.length + 1; i++) {
				if (
					columns.eq(j).hasClass("Xanny") &&
					rows.eq(i).hasClass("Xanny") &&
					board[j][i] === "-"
				) {
					board[j][i] = "X";
				} else if (
					columns.eq(j).hasClass("Nash") &&
					rows.eq(i).hasClass("Nash") &&
					board[j][i] === "-"
				) {
					board[j][i] = "O";
				}
			}
			console.log();
		}
	}

	function checkVictory() {
		for (var d of dir) {
			var di = d[0];
			var dj = d[1];

			for (var i = 0; i < board.length; i++) {
				for (var j = 0; j < board[i].length; j++) {
					var lasti = i + 3 * di;
					var lastj = j + 3 * dj;
					if (
						0 <= lasti &&
						lasti < board.length &&
						-1 <= lastj &&
						lastj < board[i].length
					) {
						var token = board[i][j];
						if (currentPlayer === "Xanny") {
							if (
								token === "X" &&
								token === board[i + di][j + dj] &&
								token === board[i + 2 * di][j + 2 * dj] &&
								token === board[lasti][lastj]
							) {
								return true;
							}
						} else if (currentPlayer === "Nash") {
							if (
								token === "O" &&
								token === board[i + di][j + dj] &&
								token === board[i + 2 * di][j + 2 * dj] &&
								token === board[lasti][lastj]
							) {
								return true;
							}
						}
					}
				}
			}
		}
		return false;
	}

	function switchPlayer() {
		currentPlayer === "Xanny"
			? (currentPlayer = "Nash")
			: (currentPlayer = "Xanny");
		message.textContent = currentPlayer;
	}
})();
