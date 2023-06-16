import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map({ manualMarker1, setManualMarker1, manualMarker2, setManualMarker2, setlocation1, setlocation2, setError, pageStyle, clearMarkers, setClearMarkers }) {
  const mapContainerRef = useRef(null);
  const markers = [];

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3phY2NhZ25pIiwiYSI6ImNsaHFpMzI5OTA1MTYzcm13bmpvMjZ5YnAifQ.zV1QaHivm1i8M0p8XSk6BA';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 1,
    });

    let marker1 = ''
    let marker2 = ''

    if (clearMarkers) {
        markers.forEach(marker => marker.remove());
        setClearMarkers(false)
    }

    if (manualMarker1 !== '') {
        console.log('1')
        const coords = manualMarker1.split(',').map(el => el.trim())
        try {
            const marker = new mapboxgl.Marker().setLngLat(coords).addTo(map);
            markers.push(marker)
            setError('')
            marker.getElement().addEventListener('click', (event) => {
                event.stopPropagation();
                // Remove the marker from the map
                marker.remove();
                // Clear manualMarker1
                setManualMarker1('')
                // Remove from location state
                setlocation1('')
            });
        } catch {
            console.log('error')
            setError('ERROR GETTING LOCATION COORDINATES ON MAP')
        }
    }

    if (manualMarker2 !== '') {
        console.log('2')
        const coords = manualMarker2.split(',').map(el => el.trim())
        try {
            const marker = new mapboxgl.Marker().setLngLat(coords).addTo(map);
            setError('')
            marker.getElement().addEventListener('click', (event) => {
                event.stopPropagation();
                // Remove the marker from the map
                marker.remove();
                // Clear manualMarker1
                setManualMarker2('')
                // Remove from location state
                setlocation2('')
            });
        } catch {
            console.log('error')
            setError('ERROR GETTING LOCATION COORDINATES ON MAP, PLEASE TRY DIFFERENT COORDINATES')
        }
    }

    // Add a click event listener to the map
    map.on('click', (e) => {
        if (marker1 === '') {
            console.log('3')
            const marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map);
            setError('')
            marker1 = marker
            const coordinates = marker.getLngLat()
            marker.getElement().addEventListener('click', (event) => {
                event.stopPropagation();
                // Remove the marker from the map
                marker.remove();
                // Clear marker1
                marker1 = ''
                // Remove from location state
                setlocation1('')
            });
            setlocation1(`${coordinates.lng}, ${coordinates.lat}`)
            setManualMarker1('')
        } else if (marker2 === '') {
            console.log('4')
            const marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map);
            setError('')
            marker2 = marker
            const coordinates = marker.getLngLat();
            marker.getElement().addEventListener('click', (event) => {
                event.stopPropagation();
                // Remove the marker from the map
                marker.remove();
                // Clear marker1
                marker2 = ''
                // Remove from location state
                setlocation2('')
            });
            setlocation2(`${coordinates.lng}, ${coordinates.lat}`)
        }
    });
  }, [manualMarker1, manualMarker2, clearMarkers]);

  return <div className='map-container' ref={mapContainerRef} style={pageStyle}/>;
}
