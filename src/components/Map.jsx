import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent} from 'react-leaflet';
import styles from './Map.module.css';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeoLocation';
import Button from './Button';
import { useURLPosition } from '../hooks/useURLPosition';


function Map() {
     

   // Correctly invoke the hook
    const {cities}= useCities();
    const [mapPosition, setMapPosition] = useState([40, 0]);

   const [mapLat, mapLng] = useURLPosition()

    const { isLoading: isLoadingPosition,
        position: geoLocationPosition,
    getPosition} = useGeolocation();

    useEffect(function () {
        if (mapLat && mapLng)  setMapPosition([mapLat, mapLng]);
        
    }, [mapLat, mapLng]);
    
    useEffect(function () {
        if (geoLocationPosition) setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }, [geoLocationPosition]);

    return (
        <div className={styles.mapContainer}>
         {!geoLocationPosition &&  <Button type="position" onClick={getPosition}>
                {isLoadingPosition ? "Loading..." : "Get your position"}
            </Button>}
            <MapContainer
                // center={[mapLat, mapLng]}
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={true}
                className={styles.map}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) =>(
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}>
                <Popup>
                            <span>{city.emoji} </span>
                            <span>{city.cityName}</span>
                </Popup>
                </Marker>
            ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    ); 
}


function ChangeCenter({position}) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();
    
    useMapEvent({
        click: (e) => 
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        
    })
    
}

export default Map;