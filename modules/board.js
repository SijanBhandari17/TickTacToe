import { player1, player2 } from "./players.js";

export const gameBoard = (function() {

	const container = document.querySelector(".grid-container")
	const winnerDialog = document.querySelector(".winner-dialog");
	const winner = document.querySelector(".winner")

	let turnCounter = 0;
	let domElement = [];
	let winCount = 0
	let matrix = {}

	function setValue(item, mark) {
		const position = item.dataset.position;
		matrix[position][0] = 1
		matrix[position][1] = mark
		winCount++;
		if (winCount > 4) {
			let mark = checkVictory()
			if (mark != false) {
				displayWinner(mark)
			}
		}
	}
	function display() {
		return matrix
	}
	function displayWinner(mark) {
		if (player1.getMark() == mark) {
			winner.textContent = `${player1.getName()} is the winner`
		}
		else {
			winner.textContent = `${player2.getName()} is the winner`
		}

		winnerDialog.showModal()
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
			setTimeout(resetBoard, 2000)
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
		for (const items of domElement) {
			items.textContent = ""
			items.classList.remove("marked")
			matrix[items.dataset.position] = [0, null]
		}
		turnCounter = 0;
	}
	function displayBoard() {
		const divArray = []
		let k = 0;
		for (let i = 0; i < 3; i++) {
			const individualContainer = document.createElement('div');
			divArray[i] = []

			for (let j = 0; j < 3; j++) {
				const div = document.createElement('div');
				div.classList.add(`row${i}${j}`);
				div.dataset.position = `${k}`
				k++
				divArray[i][j] = div;

				matrix[div.dataset.position] = [0, null];

			}
			divArray[i].map((child) => {
				individualContainer.appendChild(child)
			})
			individualContainer.classList.add("individual-container")
			container.appendChild(individualContainer)
		}
		domElement = document.querySelectorAll('[class^="row"]');
		domElement.forEach((item) => {
			item.addEventListener('click', () => {
				addMark(item)
			})
		})
	}
	function addMark(item) {
		if (matrix[item.dataset.position][0] == 1) {
			return;
		}
		if (turnCounter % 2 == 0) {
			item.textContent = player1.getMark();
			setValue(item, player1.getMark())
			turnCounter++;
		}
		else {
			item.textContent = player2.getMark()
			setValue(item, player2.getMark())
			turnCounter++;
		}

		item.classList.add('marked');
	}
	return { setValue, display, checkVictory, resetBoard, displayBoard }
})()
