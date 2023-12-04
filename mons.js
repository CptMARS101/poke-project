let monArray =[]
fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
.then(res => res.json())
.then(mons =>  {
    monArray = mons.results;
    //console.log(monArray);
    const monList = document.querySelector('#dex-list');
    monArray.forEach(mon => {
        const monListElement = document.createElement('li');
        const monName = monArray.name;
        const monIndex = monArray.index;
        monListElement.textContent = `${monIndex} - ${monName}`
        monList.appendChild(monListElement);
        //console.log(monIndex)
        //console.log(mon);
    })
})