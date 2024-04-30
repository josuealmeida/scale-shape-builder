const $selectStringsNumber = document.querySelector('#select-intrument')
const $allNoteColors = document.querySelectorAll('.note-color')
const $fretboard = document.querySelector('#fretboard')
const $btnReset = document.querySelector('#btn-reset')
const $fret_numbers = 12
let $string_numbers = $selectStringsNumber.value
let $color

function createFretElement(string_numbers){
	const $fret = document.createElement('div')
	$fret.classList.add('fret')
	$fretboard.appendChild($fret)

	for (let n = 0; n < string_numbers; n++) {
		const $string = document.createElement('div')

		$string.classList.add('string')

		$fret.appendChild($string)
	}
}

for(const $noteColor of $allNoteColors){
	$color = $noteColor.value
	$noteColor.parentElement.style.background = $color

	if($noteColor.checked == true){
		$color = $noteColor.value 	
	}
	
	$noteColor.addEventListener('click', (event)=>{
		$color = event.target.value
	})
}

function insertNote(){
	const $all_notes_positions = document.querySelectorAll('.string')

	for(const $note_position of $all_notes_positions){
		$note_position.addEventListener('click', (event)=>{	
			const $note_position = event.target
			const $note = document.createElement('input')

			$note.classList.add('note')
			$note.style.background = $color

			$note_position.appendChild($note)
			
			$note.focus()

			// disable note focus when esc or enter is pressed
			document.addEventListener('keydown', (event)=>{ 
				const esc_key = 27
				const enter_key = 13
			 
				if (event.keyCode == esc_key || event.keyCode == enter_key){
					$note.blur()
			 	}
			})	

			$note.addEventListener('blur', ()=>{
				// remove note
				$note.addEventListener('click', ()=>{
					$note.remove()
				})
			})
		})
	}
}



// inicialize fretboard
for (let n = 0; n < $fret_numbers; n++) {
	createFretElement($string_numbers)
}

insertNote()



// change the number of strings
$selectStringsNumber.addEventListener('change', (event)=>{
	$string_numbers = event.target.value

	$fretboard.innerHTML = ''
	
	for (let n = 0; n < $fret_numbers; n++) {
		createFretElement($string_numbers)
	}

	insertNote()
})



// Reset fretboard
$btnReset.addEventListener('click', ()=>{
	const $allNotes = $fretboard.querySelectorAll('.note')

	for(const $note of $allNotes){
		$note.remove()
	}
})


