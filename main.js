let d = id =>document.getElementById(id)

const prikaz = d('prikaz')
const kriterijum = d('kriterijum')

const godinaUp = d('godina-gore')
const godinaDown = d('godina-dole')
const naslovUp = d('naslov-gore')
const naslovDown = d('naslov-dole')



const username = d('username')
const password = d('password')

  
const logIn = d('log-in')

const ws = new WebSocket('wss://baza-filmova.herokuapp.com')

ws.addEventListener('message', e => {
  console.log(e.data) 
})


logIn.addEventListener('click', function () {
  if (username.value == "admin" && password.value == "admin") {
    const iks = document.getElementsByClassName('iks')
    console.log(iks);
    for (let i = 0; i < iks.length; i++) {
      iks[i].style.display = "block"

    }
  }

})

/// delete funkcija

function deleteData(item) {
  return fetch(`'https://baza-filmova.herokuapp.com/obrisi-film/'${item}`, {
    method: 'delete'
  })
  .then(response => response.json());
}




let sviFilmovi = []
let rezultati = []

function uporediGG(a, b) {
  if (a.godina < b.godina)
    return -1;
  if (a.godina > b.godina)
    return 1;
  return 0;
}

function uporediGD(b, a) {
  if (a.godina < b.godina)
    return -1;
  if (a.godina > b.godina)
    return 1;
  return 0;
}

function uporediNG(a, b) {
  if (a.naziv < b.naziv)
    return -1;
  if (a.naziv > b.naziv)
    return 1;
  return 0;
}

function uporediND(b, a) {
  if (a.naziv < b.naziv)
    return -1;
  if (a.naziv > b.naziv)
    return 1;
  return 0;
}

function prikazi(rezultati) {
  stringUpis = ""
  const limit = rezultati.length >= 14 ? 14 : rezultati.length
  for (let i = 0; i < limit; i++) {
    stringUpis += ` <div class= "filmski-div">
    <div class="iks"> <i class="fas fa-times-circle"></i>
    <span class="ID-filma"> ${rezultati[i]._id}</span> </div>
    <h3 class= "naslov-filma"> ${rezultati[i].naziv}
    
    </h3> 
    
    <p> Godina : ${rezultati[i].godina}</p> 
     <img src=${rezultati[i].slika} alt="" class="slike">
        </div>
  `
  }
  prikaz.innerHTML = stringUpis
}


function render(niz) {
  console.log(niz)
  let sablon = ''
  const limit = niz.length >= 14 ? 14 : niz.length
  for (var i = 0; i < limit; i++) {
    sablon += ` <div class= "filmski-div">
    <div class="iks"> <i class="fas fa-times-circle " ></i>
    
    <span class="ID-filma"> ${rezultati[i]._id}</span> 
    
    </div>
            <h3 class= "naslov-filma">${niz[i].naziv} </h3> 
            
            <p> Godina : ${niz[i].godina}</p> 
             <img src=${niz[i].slika} alt="" class="slike">
                </div> `
  }


  prikaz.innerHTML = sablon
}

fetch('https://baza-filmova.herokuapp.com/filmovi/ ')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    sviFilmovi = rezultati = data
    render(rezultati)
  })

kriterijum.addEventListener('input', function () {
  rezultati = sviFilmovi.filter(film => film.naziv.includes(kriterijum.value))

  render(rezultati)


})
 // fetch nizova


//modal

$(document).on('click', ".filmski-div", function (){
  $("#myModal").modal('show')
  let ime = $(this).find('h3').html()
  console.log(ime);
  
  fetch(`http://www.omdbapi.com/?t=${ime}&plot=full&apikey=2a1dfa44`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    document.getElementById('movie-title').innerText= data.Title;
    document.getElementById('Opis').innerText= data.Plot;
    document.getElementById('Released').innerText= data.Released;

    
})
});

// delete 


$(document).on('click', ".iks", function (){

  let ID = $(this).find('span').html()
  console.log(ID);
  deleteData(ID)
  
});

$('#ok').on('click', function () {
  $("#myModal").modal('hide');
})


godinaUp.addEventListener("click", function () {
  rezultati.sort(uporediGG)
  prikazi(rezultati)
})

godinaDown.addEventListener("click", function () {
  rezultati.sort(uporediGD)
  prikazi(rezultati)
})

naslovUp.addEventListener("click", function () {
  rezultati.sort(uporediNG)
  prikazi(rezultati)
})

naslovDown.addEventListener("click", function () {
  rezultati.sort(uporediND)
  prikazi(rezultati)
})



