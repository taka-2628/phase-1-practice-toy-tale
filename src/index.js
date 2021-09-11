document.addEventListener("DOMContentLoaded", () => {
  getFetch()
});

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

