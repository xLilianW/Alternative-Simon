var squares = document.querySelectorAll(".square")
var levelDisplay = document.querySelector("#level")
var btn = document.querySelector("#btn")

var sequence = []
var acceptInput = false
var waitingFor
var level

var sounds = ["Piano.ff.C4.wav", "Piano.ff.E4.wav", "Piano.ff.G4.wav",  "Piano.ff.C5.wav", "Piano.ff.C2.wav", "Piano.ff.C6.wav"]
var sound = new Audio()

buttonEvents()

btn.addEventListener("click", function() {
	btn.style.visibility = "hidden"	
	reset()
	turn()
})

function turn() {
	acceptInput = false
	sequence.push(Math.floor(Math.random() * 4))
	displaySequence()
	acceptInput = true
	}

async function displaySequence() {
	for(var i = 0; i < sequence.length; i++) {
		clearHighlights()
		await sleep(500)
		sound.src = sounds[sequence[i]]
		sound.play()		
		squares[sequence[i]].classList.add("highlighted")
		await sleep(500)
	}
	squares[sequence[i-1]].classList.remove("highlighted")
}

function buttonEvents() {
	for(var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", async function() {
			if (acceptInput == false) return

			sound.src = sounds[Number(this.id)]
			sound.play()

			clearHighlights()
			this.classList.add("highlighted")
			await sleep(300)
			this.classList.remove("highlighted")
			
			if(this === squares[sequence[waitingFor]]) {
				if (waitingFor == level-1) {
					nextLevel()
				}
				else {
					waitingFor++
				}
			}
			else {
				acceptInput = false
				sound.src = sounds[4]
				sound.play()				
				btn.textContent = "Play Again"
				btn.style.visibility = "visible"
			}
		})
	}
}

function clearHighlights() {
	for(var i = 0; i < squares.length; i++) {
		squares[i].classList.remove("highlighted")
	}	
}

async function nextLevel() {
	await sleep(200)
	sound.src = sounds[5]
	sound.play()	
	await sleep(200)

	waitingFor = 0
	level++
	levelDisplay.textContent = level
	
	turn()	
}

function reset() {
	level = 1
	waitingFor = 0
	levelDisplay.textContent = level
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

