document.addEventListener('DOMContentLoaded',() => {
    console.log('pup')
    getPups();

    const filterButton = document.querySelector('#good-dog-filter');
    let filtered = false;
    filterButton.addEventListener('click', () => {
    const grabDogs = document.querySelectorAll('span');
    filtered = !filtered;
    filterButton.textContent = filtered ? "Filter good dogs: ON" : "Filter good dogs: OFF";
    
    grabDogs.forEach(span =>{
        if(filtered && span.dataset.isGoodDog === "false"){
            span.style.display = "none"
        }else{
            span.style.display = ""
        }
    })
  })
})

function getPups(){
    fetch('http://localhost:3000/pups')
    .then(r => r.json())
    .then(pups => {
        const puppies = document.getElementById('dog-bar');

        pups.forEach(pup =>{
            const pupSpan = document.createElement('span');
            pupSpan.textContent = pup.name;
            pupSpan.dataset.isGoodDog = pup.isGoodDog;
            puppies.appendChild(pupSpan);

            pupSpan.addEventListener('click', () => {
                pupDisplay(pup);
            
            })
        })
    })
}

function pupDisplay(pup){
    const h2 = document.createElement('h2');
    h2.textContent = pup.name
    const img = document.createElement('img');
    img.src = pup.image;
    const goodBoy = document.createElement('button');
    const goodDog = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
    goodBoy.textContent = goodDog;
    const dogInfo = document.querySelector('#dog-info');
    dogInfo.textContent = "";
    dogInfo.appendChild(h2);
    dogInfo.appendChild(img);
    dogInfo.appendChild(goodBoy);

    goodBoy.addEventListener('click', () => {
        pup.isGoodDog = !pup.isGoodDog;
        goodBoy.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
    })
}

function updateDog(pup){
    fetch(`http://localhost:3000/pups/${pup.id}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(pup)
    })
    .then(res => res.json())
    .then(data => data)
};

