const prikaz = document.getElementById('prikaz')
const kriterij = document.getElementById('kriterij')

let sviFilmovi = []
let rezultati = []

function render(niz) {
  let sablon = ''
  for (var i = 0; i < niz.length; i++) {
    sablon += `<h3>${niz[i].naziv}</h3>`
  }
  prikaz.innerHTML = sablon
}

fetch('https://baza-filmova.herokuapp.com/filmovi/ ')
  .then(res => res.json())
  .then(data => {
    sviFilmovi = rezultati = data
    render(rezultati)
  })

kriterij.addEventListener('input', function() {
  rezultati = sviFilmovi.filter(film => film.naziv.includes(kriterij.value))
  render(rezultati)
})
