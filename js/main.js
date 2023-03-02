const key1 = document.querySelector('.key1')
const key2 = document.querySelector('.key2')
const key3 = document.querySelector('.key3')
const key4 = document.querySelector('.key4')
const key5 = document.querySelector('.key5')
const key6 = document.querySelector('.key6')
const key7 = document.querySelector('.key7')
const key8 = document.querySelector('.key8')
const key9 = document.querySelector('.key9')
const keys = document.querySelectorAll('.key')
const dayBtn = document.querySelector('.day-btn')
const nightBtn = document.querySelector('.night-btn')
const start = document.querySelector('.start')
const timer = document.querySelector('.timer')
const points = document.querySelector('#point')
let lostKey = document.querySelectorAll('.key--lost')
let actualPoint = 0

const soundPeak = new Audio('../sounds/peak.mp3')
const soundStart = new Audio('../sounds/start.mp3')
const soundEnd = new Audio('../sounds/end.mp3')
const soundPick = new Audio('../sounds/pick.mp3')
const soundMole = new Audio('../sounds/mole.mp3')

const record = document.querySelector('#record')
let yourRecord = 0

//losowa aktywacja pól
const lottery = () => {
	keys[Math.floor(Math.random() * 8)].classList.add('key--active')
}

// funkcja odliczania czasu
const countdown = () => {
	timer.innerHTML = gameCountdown
	const countdown2 = setInterval(function () {
		if (gameCountdown > 0) {
			gameCountdown -= 1
			timer.innerHTML = gameCountdown
		} else {
			let activeKey = document.querySelector('.key--active')
			activeKey.classList.remove('key--active') //usuwamy aktywna klase
			clearInterval(countdown2) //usuwamy interwal
			const lastPoint = document.querySelector('#lastPoint')
			let yourLastPoint = actualPoint
			lastPoint.innerHTML = yourLastPoint

			recordSave()

			actualPoint = 0
			points.innerHTML = actualPoint
			startBtn()
		}
	}, 1000)
}

const game = () => {
	timer.style.color = '#dadadae6'
	gameCountdown = 7 //czas gry

	lottery()
	countdown()

	for (let i = 0; i < keys.length; i++) {
		keys[i].addEventListener('click', () => {
			if (keys[i].classList.contains('key--active') === true) {
				keys[i].classList.remove('key--active')
				playgame()
			}
		})
	}

	document.addEventListener('keydown', e => {
		if (e.keyCode == 97 && keys[6].classList.contains('key--active') === true) {
			keys[6].classList.remove('key--active')
			playgame()
		} else if (e.keyCode == 98 && keys[7].classList.contains('key--active') === true) {
			keys[7].classList.remove('key--active')
			playgame()
		} else if (e.keyCode == 99 && keys[8].classList.contains('key--active') === true) {
			keys[8].classList.remove('key--active')
			playgame()
		} else if (e.keyCode == 100 && keys[3].classList.contains('key--active') === true) {
			keys[3].classList.remove('key--active')
			playgame()
		} else if (e.keyCode == 101 && keys[4].classList.contains('key--active') === true) {
			keys[4].classList.remove('key--active')
			playgame()
		} else if (e.keyCode == 102 && keys[5].classList.contains('key--active') === true) {
			keys[5].classList.remove('key--active')
			playgame()
		} else if (e.keyCode == 103 && keys[0].classList.contains('key--active') === true) {
			keys[0].classList.remove('key--active')
			playgame()
		} else if (e.keyCode == 104 && keys[1].classList.contains('key--active') === true) {
			keys[1].classList.remove('key--active')
			playgame()
		} else if (e.keyCode == 105 && keys[2].classList.contains('key--active') === true) {
			keys[2].classList.remove('key--active')
			playgame()
		}
	})
}
const playgame = () => {
	actualPoint += 1
	points.innerHTML = actualPoint
	removeWin()
}

//usunięcie zaznaczonych pól po prawidłowym oznaczeniu
const removeWin = () => {
	lostKey = document.querySelectorAll('.key--lost')
	for (let z = 0; z < lostKey.length; z++) {
		lostKey[z].classList.remove('key--lost')
	}
	lottery()
}

//funkcja naciśnięcia przycisku START
start.addEventListener('click', () => {
	start.classList.add('hidden')
	timer.classList.remove('hidden')
	startBtn()
})

if (start.classList.contains('hidden') !== true) {
	document.addEventListener('keyup', () => {
		start.classList.add('hidden')
		timer.classList.remove('hidden')
		startBtn()
	})
}

//funkcja po nacisnieciu przycisku START
const startBtn = () => {
	timer.innerHTML = '3'
	timer.style.color = '#ff000093'
	setTimeout(function () {
		timer.innerHTML = '2'
	}, 1000)
	setTimeout(function () {
		timer.innerHTML = '1'
	}, 2000)
	setTimeout(game, 3000)
}

//zapis rekordu
const recordSave = () => {
	yourLastPoint = actualPoint
	if (Number(yourLastPoint) > Number(yourRecord)) {
		yourRecord = yourLastPoint
		record.innerHTML = yourRecord
	}
}
