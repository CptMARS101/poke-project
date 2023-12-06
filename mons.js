let pkmn = []
const monList = document.querySelector('#dex-list')
//an object of all the elements of the monDisplay, for quick reference in the 'renderDisplay' function
const monDisplay = {
    name: document.querySelector('#name'),
    img: document.querySelector('#image'),
    type1: document.querySelector('#type1'),
    type2: document.querySelector('#type2')
  };
const statDisplay = {
    hp: document.querySelector('#hp'),
    attk: document.querySelector('#attk'),
    def: document.querySelector('#def'),
    sa: document.querySelector('#sa'),
    sd: document.querySelector('#sd'),
    sp: document.querySelector('#sp')
}

const movesList = document.querySelector('#moves-list');
const statDiv = document.querySelector('#stat-display');

fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
.then(res => res.json())
.then(mons =>  {
    //mons just exists inside of fetch request. saving mons data to pokemon array for global access. 
    //can be editted/worked with more easily
    //pokemons = mons
    console.log(mons.results);
    pkmn = mons.results;
    refreshDex(pkmn)
    renderDisplay(pkmn[0])
})

//this function creates a line for a << given >> pokemon in the dex-list
const dexLine = mon => {
    const monListElement = document.createElement('li');
    monListElement.textContent = `${mon.name}`.toUpperCase();
    //on click of the monListElement, the mon details are displayed 
    monListElement.addEventListener("click", (e) => {
        movesList.innerHTML = '';
        renderDisplay(mon);
        renderStats(mon);
        renderMoves(mon);
    })
    monListElement.addEventListener("mouseover", () => {
        monListElement.style.backgroundColor = '#61834A';
    })
    monListElement.addEventListener("mouseout", () => {
        monListElement.style.backgroundColor = 'chartreuse';
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
    console.log(mon)
    fetch(mon.url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        monDisplay.name.textContent = data.name.toUpperCase();
        monDisplay.img.src = data.sprites.front_default;
        let addButton = document.createElement("button");
        addButton.placeholder = "+";
        addButton.addEventListener("click", () => {

        } )
    })
}

const renderStats = mon => {
    fetch(mon.url)
    .then(res => res.json())
    .then(data => {
        console.log(data.moves);
        statDisplay.hp.textContent = `HP:` + data.stats[0].base_stat;
        statDisplay.attk.textContent = `ATTACK:` + data.stats[1].base_stat;
        statDisplay.def.textContent = `DEFENSE:` + data.stats[2].base_stat;
        statDisplay.sa.textContent = `Sp ATTACK:` + data.stats[3].base_stat;
        statDisplay.sd.textContent = `Sp DEFENSE:` + data.stats[4].base_stat;
        statDisplay.sp.textContent = `SPEED:` + data.stats[5].base_stat;  
    })
        statDiv.style.backgroundColor = 'chartreuse';
        movesList.style.backgroundColor= 'chartreuse';
}

const renderMoves = mon => {
    fetch(mon.url)
    .then(res => res.json())
    .then(data => {
        data.moves.forEach(moveData => {
            console.log(moveData);
            movesList.style.backgroundColor= 'chartreuse';
            const moveLi = document.createElement('li');
            moveLi.textContent = moveData.move.name;
            movesList.appendChild(moveLi);
        })
    })
}

const searchForm = document.querySelector('#poke-form');
//Form Submission
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //Getting Form Input
    let input = document.querySelector('#poke-search').value;
    //Searching the pkmn array for a name that === input
    let found = pkmn.find(pkmn => pkmn.name === input);
        movesList.innerHTML = '';
         renderDisplay(found);
         renderStats(found);
         renderMoves(found);
    })

