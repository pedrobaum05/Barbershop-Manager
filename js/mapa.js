//Integração com API

function inicializarMapa () {

    //Coordenadas - Três Passos RS
    const coordenadas = [-27.44616682635313, -53.94769171641555]

    //Cria o mapa
    const mapa = L.map('map').setView(coordenadas, 18)

    //Base do mapa 
    L.tileLayer('https://tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        attribution:  '© OpenStreetMap'

    }).addTo(mapa)

    //Marcador
    L.marker(coordenadas)
        .addTo(mapa)
        .bindPopup('Barbearia Galileia')
}

window.addEventListener('load', inicializarMapa)