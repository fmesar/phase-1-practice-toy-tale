let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
document.querySelector('.add-toy-form').addEventListener('submit',
handleSubmit)
function handleSubmit(e){
  e.preventDefault()
  let toyObj = {
  name:e.target.name.value,
  image:e.target.image.value,
  likes: 0
  }
  addToys(toyObj)
}
function renderCaracters(carcter){
let card = document.createElement('div')
  card.className = 'card'
  card.innerHTML = `
      <h2>${carcter.name}</h2>
      <img src="${carcter.image}"  class="toy-avatar" />
      <p>
      <span class = "likes-count">${carcter.likes} </span> Likes </p>
      <button class="like-btn" id="[toy_id]">Like</button>
      `
    card.querySelector('.like-btn').addEventListener('click',() => {
      carcter.likes+= 1
      card.querySelector('span').textContent = carcter.likes
    } )
      document.querySelector('#toy-collection').appendChild(card)
}

function getAllToys(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toyData => toyData.forEach(toy => renderCaracters(toy) ))
  
}
function addToys(toyObj){
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}
function updateToys(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`,{
    method: 'PATCH',
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}

getAllToys()
