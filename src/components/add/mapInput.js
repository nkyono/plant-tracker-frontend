import {Map, GoogleApiWrapper} from 'google-maps-react';
import React from 'react';

class MapInput extends React.Component {

  retLatLng = (t, map, coord) => {
    const {latLng} = coord
    this.props.mapCoordCallback(latLng.lat(), latLng.lng())
  }

  render() {
    return  (
      <div>
        <Map
            google={this.props.google}
            zoom={5}
            initialCenter={{
              lat:39.8283,
              lng:-98.5795
            }}
            onClick = {this.retLatLng}
        >
        </Map>
      </div>
    );
  }
}
  
export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_google_maps_api_key)
})(MapInput)