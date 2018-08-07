var map, infoWindow;

const printMap = (pos) => {
    // Create the places service.
    var service = new google.maps.places.PlacesService(map);

    // Perform a nearby search.
    service.nearbySearch(
        { location: pos, radius: 500, type: ['restaurant'] },
        function (results, status) {
            if (status !== 'OK') return;

            createMarkers(results);
        });
}

const createMarkers = (places) => {
    let bounds = new google.maps.LatLngBounds();
    let placesList = document.getElementById('places');

    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });

        let placeCard = document.createElement('div');
        let textCard = document.createElement('div');
        let placeName = document.createElement('p');
        let placeRating = document.createElement('p');

        placeCard.setAttribute('class','placeCard');

        placeCard.dataset.placeKey = place.id;
        placeCard.dataset.address = place.vicinity;
        placeCard.dataset.types = place.types;
        placeCard.dataset.rating = place.rating;
        // console.log(place);


        placeName.innerHTML = place.name
        // placeRating.innerHTML =`&#9733; ${place.rating}`;
        textCard.appendChild(placeName);
        // textCard.appendChild(placeRating);
        placeCard.appendChild(textCard);
        placesList.appendChild(placeCard);
       
        bounds.extend(place.geometry.location);
        // console.log(placeCard.dataset);
        getDivForModal(placeCard,marker);
    }
    map.fitBounds(bounds);
}

const getPosition = (position) => {
    var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    infoWindow.setContent('Tú estas aquí');
    infoWindow.open(map);
    map.setCenter(pos);
    printMap(pos);
};

const error = () => {
    swal({
        type: 'error',
        title: 'Oops...',
        text: `Necesitas habilitar tus servicios de geolocalización para usar correctamente FoodMap`
    });
};


initMap = () => {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 19.4045352, lng: -99.1662097 },
        zoom: 15
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition, error);
    } else {
        // Browser doesn't support Geolocation
        swal({
            type: 'error',
            title: 'Oops...',
            text: `Tu navegador no soporta geolocalización`
        });
    }
}

const showModal = (modalData, marker) => {
    modalAddress = modalData.address;
    console.log(modalData.types);
    swal({
        title: modalData.name,
        text: `${modalData.address} | ★ ${modalData.rating}`,
        imageUrl: 'https://source.unsplash.com/400x200/?restaurant,food',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        showCloseButton: true,
        showConfirmButton: false
    });
};

const getDivForModal = (placeCard, marker) => {
    let modalData = placeCard.dataset;
    placeCard.addEventListener('click', () => {
        showModal(modalData, marker);
    });
};
