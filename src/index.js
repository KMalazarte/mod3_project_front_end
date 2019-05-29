const bodyPartsURL = 'http://localhost:3000/api/v1/body_groups';
const exercisesURL = 'http://localhost:3000/exercises'
const bodyPartList = document.querySelector('#body_groups-list')
const muscleCardSubtitle = document.querySelector('#muscleCardSubtitle')
const pictureOrVideo = document.querySelector('#muscle-diagram')


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
        const filterExercise = exercises.filter((exercise) => parseInt(e.target.id) === exercise.body_group_id)

        muscleCardSubtitle.innerHTML = ''
        filterExercise.forEach(exercise => {

          muscleCardSubtitle.innerHTML += `
                      <h3> ${exercise.name}</h3>
                      <p> ${exercise.description}</p> </br>
                    `
        }) //end of filterExercise forEach
      }) //exercises.forEach(exercise =>
  }
})
