import React from 'react';
import GoogleMapReact from 'google-map-react'
const AnyReactComponent = ({ text }) => <div>{ text }</div>;
class Map extends React.Component{
    static defaultProps = {
        center: { lat: 40.7446790, lng: -73.9485420 },
        zoom: 11
    }
    constructor(props){
        super(props)
        this.state={
            lat: 21.146849,
            lng: 72.759691,
            zoom: 17
        };
    }
    render(){
        const center = {lat:this.state.lat,lng:this.state.lng};
        return(
            <div style={{ height: '380px', width: '900px' }}>
                <h1>Google Map Demo</h1>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBre3iF7DBNcw6dssQasL6XFZINOBk5eS8' }}
                defaultCenter={center}
                defaultZoom={this.state.zoom}

            >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text={'Kreyser Avrora'}
                />
            </GoogleMapReact>
            </div>
        )
    }
}
export default Map