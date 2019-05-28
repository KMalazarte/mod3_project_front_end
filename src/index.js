


document.addEventListener('DOMContentLoaded', () => {
  const endPoint = 'http://localhost:3000/api/v1/body_groups';
  const exercisesURL = 'http://localhost:3000/exercises'
  const bodygroupContainer = document.querySelector('#body_groups-container')
  const exerciseShow = document.querySelector('#show')
  // console.log(exerciseShow);
  fetch(endPoint)
    .then(res => res.json())
    .then(body_groups => {

      // console.log(body_groups)
      body_groups.forEach(bodypart => {
        // console.log(bodypart)
        const markup = `
        <li>
        <h3>${bodypart.name}
        <button id = '${bodypart.id}'>See Exercises</button>
        </h3>
        </li>`;
        const bodylist = document.querySelector('#body_groups-list').innerHTML += markup;
      })//end of forEach
    })//end first fetch

      bodygroupContainer.addEventListener('click', function (e) {
        // console.log()
        fetch(exercisesURL, {method: "GET"})
        .then (resp => {return resp.json()})
        .then (exercises => {
          // exercises.forEach(exercise => {
            // console.log(typeof(exercise.body_group_id))
            let filterExercise = exercises.filter( exercise => parseInt(e.target.id) === exercise.body_group_id)
            // console.log(filterExercise)
            filterExercise.forEach( exercise => {
              console.log(exercise)
            exerciseShow.innerHTML +=
            `<h3> ${exercise.name}</h3>
             <p> ${exercise.description}</p>`
             // exerciseShow.innerHTML = ""
           })//end of filterExercise forEach
           // if(e.target.id === exercises.body_group_id)
        })//exercises.forEach(exercise =>
        })

      // })//bodygroupContainer.addEventListener



});// DOMContentLoaded
