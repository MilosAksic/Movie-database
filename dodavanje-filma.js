const linkSlike = document.getElementById ('slika')
const logo = document.getElementById ('logo1')

linkSlike.addEventListener('input', function() {
    logo.src = linkSlike.value
    
  })
