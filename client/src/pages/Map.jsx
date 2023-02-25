import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import MarkerInfo from '../Components/MarkerInfo';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEntities } from '../redux/actions/entitiesActions';
import Autocomplete from 'react-google-autocomplete';

const containerStyle = {
  width: '99vw',
  height: '100vh',
};

const Map = () => {
  const [activeMarker, setActiveMarker] = React.useState(null);
  const { entities } = useSelector((state) => state.entitiesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEntities());
  }, []);

  const handleMarkerMouseOver = (marker) => {
    setActiveMarker({ ...marker });
  };

  const handleMarkerMouseOut = () => {
    setTimeout(() => setActiveMarker(null), 1500);
  };

  return (
    <Box>
      {/* <LoadScript googleMapsApiKey="AIzaSyDrsME92YLQUVHQ7gIROn5_Sx9xQZEcwS0"> */}
      <Autocomplete />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: -39,
          lng: -64,
        }}
        zoom={5}
      >
        {entities?.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onMouseOver={() => handleMarkerMouseOver(marker)}
            onMouseOut={handleMarkerMouseOut}
          />
        ))}

        {activeMarker && (
          <InfoWindow
            position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
          >
            <MarkerInfo data={activeMarker} />
          </InfoWindow>
        )}
      </GoogleMap>
      {/* </LoadScript> */}
    </Box>
  );
};

export default Map;
