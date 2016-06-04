	var number_puzzle = createNumber();
	console.log(number_puzzle);

	var mess = document.getElementById("message");
	var input = document.getElementsByTagName("input")[0];
	var table = document.getElementsByTagName("table")[0];

	function createNumber () {
		var n = "";
    	for (i = 0; i < 4; i++)
			n += Math.round(Math.random()*10 - 0.5);
		return n;
	}

	function bulls(str1, str2) {
		var m = 0;
		for (i = 0; i < 4; i++) {
			if (str1.slice(i, i+1) == str2.slice(i, i+1))
				m++;
		}
		return m;
	}

	function cows(str1, str2) {
		var m = 0;
		var n = 0;
		var res = 0;
		for (i = 0; i <= 9; i++) {
			for (j = 0; j < 4; j++) {
				if (Number(str1.slice(j, j+1)) == i)
					m++;
				if (Number(str2.slice(j, j+1)) == i) 
					n++;	
			}
			if (m <= n) 
				res += m;
			else 
				res += n;
			m = 0;
			n = 0;
		}
		return res;
	}

	function message(bulls, cows) {
		if (bulls == 1) {
			if (cows == 1)
				return "1 bull and 1 cow";
			else return "1 bull and " + cows + " cows";
		}
		else {
			if (cows == 1)
				return bulls + " bulls and 1 cow";
			else return  bulls + " bulls and " + cows + " cows";
		}		
	}

	function newGame() {
		table.className = "hidden";
		number_puzzle = createNumber();
		mess.innerHTML = "";	
		console.log(number_puzzle);	
		input.value = "";
		n = table.children.length;
		for (i = 0; i < n-1; i++)
			table.removeChild(table.children[table.children.length - 1])
	}

	var new_game = document.getElementsByTagName("button")[1];
	new_game.onclick = function() {
		newGame();
	}

	var check = document.getElementsByTagName("button")[0];

	check.onclick = function() {
		table.className = "no-hidden";
		compare();
	}

	function isRightNumber(number) {
		if (number.length !== 4) 
			return false;
		if (isNaN(+number))
			return false;
		return true;

	}

	function compare() {
		var user_number = input.value;
		input.value = "";
		if (isRightNumber(user_number)) {
			var bulls_n = bulls(number_puzzle, user_number);
			var cows_n = cows(number_puzzle,user_number) - bulls_n;
			tr = document.createElement("tr");
			td = document.createElement("td");
			td.innerHTML = user_number;
			td = tr.appendChild(td); 
			td = document.createElement("td");
			td.innerHTML = bulls_n;
			td = tr.appendChild(td);
			td = document.createElement("td");
			td.innerHTML = cows_n;
			td = tr.appendChild(td);
			tr = table.appendChild(tr);
			mess.innerHTML = message(bulls_n, cows_n);
			if (bulls_n == 4) {
				if (confirm("You win! Do you want to start new game?"))
					newGame();
			}
			else
				return 0;
		}
		else mess.innerHTML = "It is not appropriate number";
	}


