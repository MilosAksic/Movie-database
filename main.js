const prikaz = document.getElementById('prikaz')
const kriterijum = document.getElementById('kriterijum')

let sviFilmovi = []
let rezultati = []

function render(niz) {
  let sablon = ''
  const limit =niz.length > 12 ? niz.length : niz.length = 12
  for (var i = 0; i < niz.length; i++) {
    sablon += ` <div class= "filmski-div">
            <h3 class= "naslov-filma">${niz[i].naziv}</h3> 
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

  kriterijum.addEventListener('input', function() {
  rezultati = sviFilmovi.filter(film => film.naziv.includes(kriterijum.value))

  render(rezultati)
})
