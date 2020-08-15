import {Map, GoogleApiWrapper} from 'google-maps-react';
import React from 'react';

class MapInput extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lat:39.8283,
      lng:-98.5795
    }
  }

  retLatLng = (t, map, coord) => {
    const {latLng} = coord
    this.props.mapCoordCallback(latLng.lat(), latLng.lng())
  }

  render() {
    return  (
      <div>
        <Map
            google={this.props.google}
            zoom={4}
            centerAroundCurrentLocation="true"
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