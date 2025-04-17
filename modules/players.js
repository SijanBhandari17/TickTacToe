function CreatePlayers() {
	let noOfWins = 0
	let name
	let mark
	function setName(playerName) {
		name = playerName
	}
	function setMark(markSymbol) {
		mark = markSymbol
	}
	function getName() {
		return name
	}
	function increaseWins() {
		noOfWins++
	}
	function getWins() {
		return noOfWins
	}
	function getMark() {
		return mark;
	}
	return { setName, setMark, getName, increaseWins, getWins, getMark }
}
export const player1 = CreatePlayers()
export const player2 = CreatePlayers()

