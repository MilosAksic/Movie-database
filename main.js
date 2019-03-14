const prikaz = document.getElementById('prikaz')
const kriterijum = document.getElementById('kriterijum')

const godinaUp = document.getElementById('godina-gore')
const godinaDown = document.getElementById('godina-dole')
const naslovUp = document.getElementById('naslov-gore')
const naslovDown = document.getElementById('naslov-dole')



const username = document.getElementById('username')
const password = document.getElementById('password')


const logIn = document.getElementById('log-in')







logIn.addEventListener('click', function () {
  if (username.value == "admin" && password.value == "admin") {
    const iks = document.getElementsByClassName('iks')
    console.log(iks);
    for (let i = 0; i < iks.length; i++) {
      iks[i].style.display = "block"

    }
  }

})




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
    <div class="iks"> <i class="fas fa-times-circle"></i></div>
    <h3 class= "naslov-filma"> ${rezultati[i].naziv}</h3> 
    <p> Godina : ${rezultati[i].godina}</p> 
     <img src=${rezultati[i].slika} alt="" class="slike">
        </div> `
  }
  prikaz.innerHTML = stringUpis
}


function render(niz) {
  console.log(niz)
  let sablon = ''
  const limit = niz.length >= 14 ? 14 : niz.length
  for (var i = 0; i < limit; i++) {
    sablon += ` <div class= "filmski-div">
    <div class="iks"> <i class="fas fa-times-circle " ></i></div>
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






