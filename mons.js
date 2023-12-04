fetch('http://localhost:3000/pokemon')
.then(res => res.json())
.then(mons =>  {
    console.log(mons)
    const monList = document.querySelector('#dex-list');
    mons.forEach(mon => {
        const monListElement = document.createElement('li');
        const monName = mon.name;
        monListElement.textContent = `${monName}`.toUpperCase();
        monList.appendChild(monListElement);
        //console.log(monIndex)
        //console.log(mon);
    })
})