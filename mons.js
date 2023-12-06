let pkmn = []
let monData = []
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
};
const movesList = document.querySelector('#moves-list');
const statDiv = document.querySelector('#stat-display');
const teamDiv = document.querySelector('#team-td');
const cardDisplay = document.querySelector('#display');
const teamImgElement = document.querySelector('.teamster');
let teamImg

fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
.then(res => res.json())
.then(mons =>  {
    //mons just exists inside of fetch request. saving mons data to pokemon array for global access. 
    //can be editted/worked with more easily
   // console.log(mons.results);
    pkmn = mons.results;
    refreshDex(pkmn)
    monDisplay.img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png"
})

//add pkmn to team bar
const addButton = document.querySelector("#add-button");
addButton.addEventListener("click", mon => {
    //console.log(mon);
       teamImg = document.createElement('img');
       //console.log(monData)
        teamImg.src = monData.sprites.front_default;
        teamImg.id = `${monData.name}`;
        teamImg.className = "teamster";
        teamDiv.appendChild(teamImg);
    });


const remButton = document.querySelector('#remove-button');
remButton.addEventListener("click", () => {
    document.getElementById(`${monData.name}`).remove();
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
   // console.log(mon)
    fetch(mon.url)
    .then(res => res.json())
    .then(data => {
        monData = data
        console.log(monData)
        monDisplay.name.textContent = data.name.toUpperCase();
        monDisplay.img.src = data.sprites.front_default;
        const type1Span = document.querySelector('#type1');
        const type2Span = document.querySelector('#type2');
        monDisplay.type1.textContent = ""
        monDisplay.type2.textContent = ""
        monDisplay.type1.textContent = data.types[0].type.name.toUpperCase();
        monDisplay.type2.textContent = data.types[1].type.name.toUpperCase();
        if (type1Span.textContent === "FIRE") {
            type1Span.style.backgroundColor = "red"
        } else if (type1Span.textContent === "GRASS") {
            type1Span.style.backgroundColor = "green"
        } else if (type1Span.textContent === "WATER") {
            type1Span.style.backgroundColor = "blue"
        } else if (type1Span.textContent === "ELECTRIC") {
            type1Span.style.backgroundColor = "#FFFF00"
        } else if (type1Span.textContent === "PSYCHIC") {
            type1Span.style.backgroundColor = "purple"
        } else if (type1Span.textContent === "STEEL") {
            type1Span.style.backgroundColor = "gray"
        } else if (type1Span.textContent === "ROCK") {
            type1Span.style.backgroundColor = "brown"
        } else if (type1Span.textContent === "POISON") {
            type1Span.style.backgroundColor = "purple"
        } else if (type1Span.textContent === "NORMAL") {
            type1Span.style.backgroundColor = "white"
        } else if (type1Span.textContent === "ICE") {
            type1Span.style.backgroundColor = "blue"
        } else if (type1Span.textContent === "GROUND") {
            type1Span.style.backgroundColor = "brown"
        } else if (type1Span.textContent === "GHOST") {
            type1Span.style.backgroundColor = "purple"
        } else if (type1Span.textContent === "FLYING") {
            type1Span.style.backgroundColor = "white"
        } else if (type1Span.textContent === "FIGHTING") {
            type1Span.style.backgroundColor = "brown"
        } else if (type1Span.textContent === "FAIRY") {
            type1Span.style.backgroundColor = "pink"
        } else if (type1Span.textContent === "DRAGON") {
            type1Span.style.backgroundColor = "blue"
        } else if (type1Span.textContent === "DARK") {
            type1Span.style.backgroundColor = "black"
        } else if (type1Span.textContent === "BUG") {
            type1Span.style.backgroundColor = "chartreuse"
        } else if (type21Span.textContent === "") {
            type1Span.style.backgroundColor = "transparent"
        }

        if (type2Span.textContent === "FIRE") {
            type2Span.style.backgroundColor = "red"
        } else if (type2Span.textContent === "GRASS") {
            type2Span.style.backgroundColor = "green"
        } else if (type2Span.textContent === "WATER") {
            type2Span.style.backgroundColor = "blue"
        } else if (type2Span.textContent === "ELECTRIC") {
            type2Span.style.backgroundColor = "#FFFF00"
        } else if (type2Span.textContent === "PSYCHIC") {
            type2Span.style.backgroundColor = "purple"
        } else if (type2Span.textContent === "STEEL") {
            type2Span.style.backgroundColor = "gray"
        } else if (type2Span.textContent === "ROCK") {
            type2Span.style.backgroundColor = "brown"
        } else if (type2Span.textContent === "POISON") {
            type2Span.style.backgroundColor = "purple"
        } else if (type2Span.textContent === "NORMAL") {
            type2Span.style.backgroundColor = "white"
        } else if (type2Span.textContent === "ICE") {
            type2Span.style.backgroundColor = "blue"
        } else if (type2Span.textContent === "GROUND") {
            type2Span.style.backgroundColor = "brown"
        } else if (type2Span.textContent === "GHOST") {
            type2Span.style.backgroundColor = "purple"
        } else if (type2Span.textContent === "FLYING") {
            type2Span.style.backgroundColor = "white"
        } else if (type2Span.textContent === "FIGHTING") {
            type2Span.style.backgroundColor = "brown"
        } else if (type2Span.textContent === "FAIRY") {
            type2Span.style.backgroundColor = "pink"
        } else if (type2Span.textContent === "DRAGON") {
            type2Span.style.backgroundColor = "blue"
        } else if (type2Span.textContent === "DARK") {
            type2Span.style.backgroundColor = "black"
        } else if (type2Span.textContent === "BUG") {
            type2Span.style.backgroundColor = "chartreuse"
        } else if (type2Span.textContent === "") {
            type2Span.style.backgroundColor = "transparent"
        }
    })
}

const renderStats = mon => {
    fetch(mon.url)
    .then(res => res.json())
    .then(data => {
       // console.log(data.moves);
        statDisplay.hp.textContent = `HP:  ` + data.stats[0].base_stat;
        statDisplay.attk.textContent = `ATTACK:  ` + data.stats[1].base_stat;
        statDisplay.def.textContent = `DEFENSE:  ` + data.stats[2].base_stat;
        statDisplay.sa.textContent = `Sp ATTACK:  ` + data.stats[3].base_stat;
        statDisplay.sd.textContent = `Sp DEFENSE:  ` + data.stats[4].base_stat;
        statDisplay.sp.textContent = `SPEED:  ` + data.stats[5].base_stat;  
    })
        statDiv.style.backgroundColor = 'chartreuse';
        movesList.style.backgroundColor= 'chartreuse';
}

const renderMoves = mon => {
    fetch(mon.url)
    .then(res => res.json())
    .then(data => {
        data.moves.forEach(moveData => {
           // console.log(moveData);
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
    });

    //add event listener to team div instead of img as imgs arent created on load
    //click team member img to reload UI
    teamDiv.addEventListener("click", (e) => {
        if (e.target.tagName === "IMG") {
          const clickedMonName = e.target.id;
          const clickedMonData = pkmn.find(mon => mon.name === clickedMonName);
          console.log(clickedMonName);
          console.log(clickedMonData);
          movesList.innerHTML = '';
          renderDisplay(clickedMonData);
          renderStats(clickedMonData);
          renderMoves(clickedMonData);
        }
      });
