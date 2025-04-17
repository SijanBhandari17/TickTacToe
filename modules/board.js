import { player1, player2 } from "./players.js";
export const gameBoard = (function() {

	const container = document.querySelector(".grid-container")
	let turnCounter = 0;
	let winCount = 0
	const matrix = {
		A: [0, null],
		B: [0, null],
		C: [0, null],
		D: [0, null],
		E: [0, null],
		F: [0, null],
		G: [0, null],
		H: [0, null],
		I: [0, null],
	}
	function setValue(position, mark) {
		matrix[position][0] = 1
		matrix[position][1] = mark
		winCount++;
		if (winCount > 4) {
			checkVictory()
		}
	}
	function display() {
		return matrix
	}
	function checkVictory() {

		const values = Object.values(matrix)

		const row1 = checkEquality(values[0], values[1], values[2])

		const row2 = checkEquality(values[3], values[4], values[5])
		const row3 = checkEquality(values[6], values[7], values[8])

		const checkRow = row1 || row2 || row3

		const col1 = checkEquality(values[0], values[3], values[6])
		const col2 = checkEquality(values[1], values[4], values[7])
		const col3 = checkEquality(values[2], values[5], values[8])

		const checkColumn = col1 || col2 || col3

		const dia1 = checkEquality(values[0], values[4], values[8])
		const dia2 = checkEquality(values[6], values[4], values[2])

		const checkDiagonal = dia1 || dia2

		const finalCheck = (checkRow || checkColumn || checkDiagonal)
		if (finalCheck != false) {
			resetBoard()
			return finalCheck
		}
		else { return false }
	}
	function checkEquality(value1, value2, value3) {
		if (value1[0] == value2[0] && value2[0] == value3[0] && value2[0] != 0) {
			if (value1[1] == value2[1] && value2[1] == value3[1] && value2[1] != null) {
				return value1[1]
			}
			else {
				return false
			}
		}
		else {
			return false
		}
	}
	function resetBoard() {
		for (const keys in matrix) {
			matrix[keys] = [0, null]
		}
	}
	function displayBoard() {
		const divArray = []
		for (let i = 0; i < 3; i++) {

			const individualContainer = document.createElement('div');
			divArray[i] = []

			for (let j = 0; j < 3; j++) {
				const div = document.createElement('div');
				div.classList.add(`row${j}`);
				divArray[i][j] = div;
			}
			divArray[i].map((child) => {
				individualContainer.appendChild(child)
			})
			individualContainer.classList.add("individual-container")
			container.appendChild(individualContainer)
		}
		divArray.forEach((row) => {
			row.forEach((item) => {
				item.addEventListener('click', () => {
					addMark(item)
				})
			})
		});
	}
	function addMark(item) {
		if (turnCounter % 2 == 0) {
			item.textContent = player1.getMark();
			turnCounter++;
		}
		else {
			item.textContent = player2.getMark()
			turnCounter++;
		}

		item.classList.add('marked');
	}

	return { setValue, display, checkVictory, resetBoard, displayBoard }
})()
