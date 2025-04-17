import { player1, player2 } from "./players.js";

export const playerSelectionDialog = (function() {

	const dialog = document.querySelector('.player-selection')
	const player1Name = document.querySelector(".player1-name")
	const player2Name = document.querySelector(".player2-name")
	const player1Mark = document.querySelector(".player1-mark")
	const player2Mark = document.querySelector(".player2-mark")
	const form = document.querySelector("#player-form")
	let obj;

	form.addEventListener('submit', (event) => {
		event.preventDefault()
		const formData = new FormData(form);
		obj = Object.fromEntries(formData)
		closedialog();
		fillInfo();
	})
	function opendialog() {
		dialog.showModal();
	}
	function closedialog() {
		dialog.close();
	}
	function fillInfo() {

		player1.setName(obj["player1"]);
		player2.setName(obj["player2"]);
		player1.setMark(obj["player1-mark"])
		player2.setMark(obj["player2-mark"])

		player1Name.textContent = player1.getName()
		player2Name.textContent = player2.getName()
		player1Mark.textContent = player1.getMark()
		player2Mark.textContent = player2.getMark()
	}

	return { opendialog, closedialog }
})()

