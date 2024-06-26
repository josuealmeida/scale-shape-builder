const $selectStringsNumber = document.querySelector('#select-intrument')
const $allNoteColors = document.querySelectorAll('.note-color')
const $fretboard = document.querySelector('#fretboard')
const $btnReset = document.querySelector('#btn-reset')
const $fret_numbers = 1 + 15 // nut + freta
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
	$noteColor.parentElement.style.background = $noteColor.value

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

			// add sharp and flat symbols
			$note.onkeyup = (tecla) =>{
	      $note.value = $note.value.replace('b', '♭')
	      $note.value = $note.value.replace('#', '♯')
	    }

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



function addFretMarkers(){
	const $frets = $fretboard.querySelectorAll('.fret')

	for(mark_number of [3,5,7,9,12,15]){
		const $fret = $frets[mark_number]
		const $marker = document.createElement('div')
		$marker.classList.add('marker')

		if (mark_number == 12) {
			const $double_marker = document.createElement('div')
			$double_marker.classList.add('double_marker')

			$double_marker.appendChild($marker.cloneNode(true))
			$double_marker.appendChild($marker.cloneNode(true))

			$fret.insertBefore($double_marker, $fret.firstElementChild)
		}

		else{
			$fret.insertBefore($marker, $fret.firstElementChild)
		}
	}
}



// inicialize fretboard
for (let n = 0; n < $fret_numbers; n++) {
	createFretElement($string_numbers)
}

addFretMarkers()
insertNote()



// change the number of strings
$selectStringsNumber.addEventListener('change', (event)=>{
	$string_numbers = event.target.value

	$fretboard.innerHTML = ''
	
	for (let n = 0; n < $fret_numbers; n++) {
		createFretElement($string_numbers)
	}

	addFretMarkers()
	insertNote()
})



// Reset fretboard
$btnReset.addEventListener('click', ()=>{
	const $allNotes = $fretboard.querySelectorAll('.note')

	for(const $note of $allNotes){
		$note.remove()
	}
})


