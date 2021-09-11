document.addEventListener("DOMContentLoaded", () => {
  getFetch()
});

function renderToyObj(toy){
  // create a card <div> and add className 'card'
  let cardDiv = document.createElement('div');
  cardDiv.className = 'card'

  // create <h2> (toy's name)
  let h2 = document.createElement('h2');
  // assign the value that the key 'name' points to in toy obj to <h2> content 
  h2.textContent = toy['name'];

  // create <img> (toy's image)
  let img = document.createElement('img');
  // add calssName 'toy-avatar'
  img.className = 'toy-avatar';
  // add src attribute which is assigned to the value (url) that the key image points to in toy obj
  img.src = toy['image'];

  // create <p> (counts number of likes)
  let p = document.createElement('p');
  // interpolate the number of likes the toy has and assign the string to the content of <p>
  p.textContent = `${toy['likes']} likes`;

  // create <button> (like button)
  let btn = document.createElement('button');
  // add className 'toy-avatar'
  btn.className = 'like-btn';
  // add id which is the id of toy obj
  btn.id = toy['id'];
  // add textContent 'Like'
  btn.textContent = 'Like';
  
  // add an event listener to btn for PATCH FETCH
  btn.addEventListener('click', ()=>{
    patchFetch(toy, p)
  });

  // appendChild <h2> <img> <p> <button> to <div class = 'card'>
  cardDiv.appendChild(h2);
  cardDiv.appendChild(img);
  cardDiv.appendChild(p);
  cardDiv.appendChild(btn);

  // add <div call = 'card'> to DOM by appending it to existing HTML element <div id = 'toy-collection'>
  let toyCollection = document.querySelector('#toy-collection');
  toyCollection.appendChild(cardDiv);
}

// -------------------- GET FETCH --------------------
function getFetch(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toyArr => handleArr(toyArr))
}

function handleArr(toyArr){
  for (let toy of toyArr){
    renderToyObj(toy)
  }
}

// -------------------- POST FETCH --------------------
function handleForm(){
  let addToy = false;
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  // hide & reveal the form
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  // Add new toy
  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const newToy = {
      name: e.target.childNodes[3].value,
      image: e.target.childNodes[7].value,
      likes: 0
    }
    postFetch(newToy);
  })
}

function postFetch(newToy){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(newToy)
  })
  .then(res => res.json())
  .then(newToyObj => renderToyObj(newToyObj))
}

// -------------------- PATCH FETCH --------------------
function patchFetch(toy, p){
  toy['likes'] = toy['likes'] + 1;
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({'likes': toy['likes']})
  })
  .then(res => res.json())
  .then(updatedToy => {
    p.textContent = `${updatedToy['likes']} likes`;
  })
}

