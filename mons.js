let pkmn = []
const monList = document.querySelector('#dex-list')
//an object of all the elements of the monDisplay, for quick reference in the 'renderDisplay' function
const monDisplay = {
    name: document.querySelector('#name'),
    img: document.querySelector('#image'),
    type: document.querySelector('#type')
  };

fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
.then(res => res.json())
.then(mons =>  {
    //mons just exists inside of fetch request. saving mons data to pokemon array for global access. 
    //can be editted/worked with more easily
    //pokemons = mons
    console.log(mons.results);
    pkmn = mons.results;
    refreshDex(pkmn)
})

//this function creates a line for a << given >> pokemon in the dex-list
const dexLine = mon => {
    const monListElement = document.createElement('li');
    monListElement.textContent = `${mon.name}`.toUpperCase();
    //on click of the monListElement, the mon details are displayed 
    monListElement.addEventListener("click", (e) => {
        renderDisplay(mon)
    })
    monList.appendChild(monListElement);
}

//creates a dex-line for << each >> pokemon 
const refreshDex = () => {
    //this clears old data/children
    removeAllChildren(monList)
    //re-populates the monList with fresh dexLines
    //this looks at the pokemon array (which we want to be easily edittable), 
    //and makes a monList element only for those mons 
    pkmn.forEach(mon => dexLine(mon))
}

//when parentElement [monList] has any children [monListElement], remove children from the parentElement
function removeAllChildren(parentElement) {
    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
    }
  }

//function that renders display details of the mon that was clicked on from the dex-list
//does so by populating the monDisplay object above 
const renderDisplay = mon => {
    fetch(mon.url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        monDisplay.name.textContent = data.name
        monDisplay.img.src = data.sprites.front_default
        //monDisplay.type.textContent = data.
        //wonky when more than 1 type ... gonna dig this one a bit!
    })
}