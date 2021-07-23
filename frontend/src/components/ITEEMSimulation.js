import React, { Component } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import geoData from '../assets/Watershed.json'
import reachData from '../assets/Reach.json'

import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [24,36],
    iconAnchor: [12,36],
});

L.Marker.prototype.options.icon = DefaultIcon;

function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '3',
        fillOpacity: 0.3
    };
}




export default class ITEEMSimulation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: { lat: 40.0278, lng: -88.5734 },
            zoom: 9,
            selectedWatershed: null, 
        }

    }

    onEachSubWatershed = (subWatershed, layer) => {
        const id_ = subWatershed.properties.OBJECTID;
        // console.log(id_);
        layer.bindTooltip("Sub-watershed " + id_.toString());
    
        layer.on({
            click: (event) => {
                this.setState({selectedWatershed: id_.toString()}) 
                console.log(this.state.selectedWatershed);
            }
        })

    }
    render() {
        const { currentLocation, zoom, selectedWatershed } = this.state;
        return (
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <div style={{flex: 1}}>
                    <MapContainer center={currentLocation} zoom={zoom}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        />
                        {/* <Markers venues={data.venues}/> */}
                        <GeoJSON attribution="Subwatersheds" data={geoData.features} onEachFeature={this.onEachSubWatershed} style={style}/>
                        <GeoJSON attribution="Reach" data={reachData} />

                        <Marker attribution="WWT Plant" position={[39.83121, -89.00160]}> 
                        </Marker>
                        <Marker attribution="DWT plant" position={[39.82819, -88.95055]}> 
                        </Marker>
                        <Marker attribution="Dairy feedlot" position={[40.28538, -88.50410]}> 
                        </Marker>

                    </MapContainer>
                </div>
                <div style={{flex: 1}}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3 style={{ fontFamily: 'Noto Sans' }}>This is the watershed information</h3>
                        <p style={{ fontFamily: 'Noto Sans' }}> Watershed selected is {selectedWatershed} </p>
                    </div>
                </div>
                
            </div>
        );
    }
}

