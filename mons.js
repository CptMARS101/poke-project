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
        //console.log(monData)
        monDisplay.name.textContent = data.name.toUpperCase();
        monDisplay.img.src = data.sprites.front_default;
       console.log(data.types[0]);
       console.log(data.types[1]);
        monDisplay.type1.textContent = data.types[0].type.name.toUpperCase()
        //typeIn2 = data.types[1].type.name.toUpperCase();
        if (data.types[1] === undefined)
         {
            monDisplay.type2.textContent = "---";
         } else {
            monDisplay.type2.textContent = data.types[1].type.name.toUpperCase();
         }; 
        const typeArray = [
            {
                "name": "FIRE",
                "color": "red"
            },
            {
                "name": "GRASS",
                "color": "green"
            },
            {
                "name": "WATER",
                "color": "blue"
            },
            {
                "name": "ELECTRIC",
                "color": "yellow"
            },
            {
                "name": "PSYCHIC",
                "color": "purple"
            },
            {
                "name": "STEEL",
                "color": "#808080"
            },
            {
                "name": "ROCK",
                "color": "#7e5b4d"
            },
            {
                "name": "GROUND",
                "color": "brown"
            },
            {
                "name": "POISON",
                "color": "purple"
            },
            {
                "name": "NORMAL",
                "color": "white"
            },
            {
                "name": "ICE",
                "color": "#D9DBF1"
            },
            {
                "name": "GHOST",
                "color": "#811bdc"
            },
            {
                "name": "FLYING",
                "color": "white"
            },
            {
                "name": "FIGHTING",
                "color": "#e95c4b"
            },
            {
                "name": "FAIRY",
                "color": "#ffb3ba"
            },
            {
                "name": "DRAGON",
                "color": "#314e82"
            },
            {
                "name": "DARK",
                "color": "#3f4d63"
            },
            {
                "name": "BUG",
                "color": "chartreuse"
            },
            {
                "name": "---",
                "color": "red"
            }
        ]
    //Searching the type array for the name/color
    let typeIn1 = monDisplay.type1.textContent;
    let typeIn2 = monDisplay.type2.textContent;
    let foundType1 = typeArray.find(type => type.name === typeIn1);
    monDisplay.type1.style.backgroundColor = foundType1.color;
    console.log(foundType1)
    let foundType2 = typeArray.find(type => type.name === typeIn2);
    monDisplay.type2.style.backgroundColor = foundType2.color;
    console.log(foundType2)        
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
