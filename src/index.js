const bodyPartsURL = 'http://localhost:3000/api/v1/body_groups';
const exercisesURL = 'http://localhost:3000/exercises'
const bodyPartList = document.querySelector('#body_groups-list')
const muscleCardSubtitle = document.querySelector('#muscleCardSubtitle')
const pictureOrVideo = document.querySelector('#muscle-diagram')
const imageOrVideo = document.querySelector('#image-or-video')
console.log(imageOrVideo)

fetch(bodyPartsURL)
  .then(res => res.json())
  .then(data => {

    data.forEach(bodypart => {
      bodyPartList.innerHTML += `
        <div class="w3-ul w3-border">
          <ul data-name=${bodypart.name}>${bodypart.name}
          <button id='${bodypart.id}' class='button'>See Exercises</button>
          </ul>
        </ul>
      `
    })
  })


bodyPartList.addEventListener('click', (e) => {
  if (e.target.className === 'button') {
    fetch(exercisesURL)
      .then(res => res.json())
      .then(exercises => {



        const filterExercise = exercises.filter((exercise) =>
				 parseInt(e.target.id) === exercise.body_group_id)


				muscleCardSubtitle.innerHTML = ``
        filterExercise.forEach(exercise => {
					// console.log(exercise)

          muscleCardSubtitle.innerHTML += `
                      <h3>${exercise.name}</h3>
                      <p>${exercise.description}</p> </br>
											<button data-id=${exercise.id} class='videoBtn' type="button" name="button">Press for Video</button>
                    `
      }) //end of filterExercise forEach
    }) //exercises.forEach(exercise =>
	}
})

muscleCardSubtitle.addEventListener('click', (e)=>{
	if (e.target.className === 'videoBtn') {
		fetch(exercisesURL+'/'+e.target.dataset.id)
			.then(res=>res.json())
			.then(exercise=>{

				imageOrVideo.innerHTML = `
						<iframe width="420" height="315"
						src=${exercise.videoURL}>
						</iframe>
					`
			})
	}
})
