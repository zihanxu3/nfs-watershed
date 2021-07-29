import React, { Component } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import geoData from '../assets/Watershed.json'
import reachData from '../assets/Reach.json'

import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { Select, FormControl, MenuItem, InputLabel, InputAdornment, Accordion, AccordionSummary, AccordionDetails, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
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

function createData(bmp, coverCrop, fertilizerRate, waterways, landAlloc) {
    return { bmp, coverCrop, fertilizerRate, waterways, landAlloc };
}

const rows = [
    createData('Baseline', '-', '176 kg DAP/ha', '36% of ag. land', '100% (Default)'),
    createData('BMP 1', 'No cover crop (status quo)', '30% DAP reduction', 'Not applied', <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='19' InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
    }} />),
    createData('BMP 2', 'No cover crop (status quo)', '30% DAP reduction', 'Grass waterway (GS)', <TextField id="outlined-basic" variant='outlined' size='small' InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
    }} />),
    createData('BMP 3', 'Winter cover crop', '30% DAP reduction', 'Not applied', <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='19' InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
    }} />),
    createData('BMP 4', 'Winter cover crop', '30% DAP reduction', 'Filter Strips (FS)', <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='19' InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
    }} />),
    createData('BMP 5', 'Winter cover crop', '30% DAP reduction', 'Grass waterway (GS)', <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='19' InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
    }} />),
    createData('BMP 6 (land use change)', 'Bioenergy Crop: Switch Grass', '-', 'Not applied', <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='19' InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
    }} />),
];

function createDefaultData(gep, baseline, units) {
    return { gep, baseline, units };
}

const defaultRows = [
    createDefaultData('Corn Market Price', '0.152', '$/kg'),
    createDefaultData('Soybean market price', '0.356', '$/kg'),
    createDefaultData('Biomass market price', '40.0', '$/kg (dry basis)'),
    createDefaultData('Willingness to pay', '0.95', '$/(household*year) for 1% water quality improvement'),
    createDefaultData('Interest rate', '7%', '-'),
    createDefaultData('Electricity price', '0.0638', '$/kWh'),
    createDefaultData('Natural gas price', '5.25', '$/cbf'),
];

function createPlantData(parameter, value, unit, source) {
    return { parameter, value, unit, source }
}

const wwtRows = [
    createPlantData('Influent Flow Index',
        <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='0' InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }} />,
        '% Change from Baseline',
        '-'
    ),
    createPlantData('Influent P Index',
        <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='0' InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }} />,
        '% Change from Baseline',
        '-'
    ),
    createPlantData('Influent N Index',
        <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='0' InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }} />,
        '% Change from Baseline',
        '-'
    ),
    createPlantData('Recovered Struvite',
        <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='0.5' InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
        }} />,
        '$/Kg',
        'Assumption considering DAP market price'
    ),
    createPlantData('Ferric Chloride (40%)',
        <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='1.49' InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
        }} />,
        '$/Kg',
        'Bid tabulation (online)'
    ),
    createPlantData('Magnesium Chloride (30%)',
        <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='0.153' InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
        }} />,
        '$/Kg',
        'Bid tabulation (online)'
    ),
    createPlantData('Sodium hydroxide',
        <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='0.37' InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
        }} />,
        '$/Kg',
        'Bid tabulation (online)'
    ),
    createPlantData('Interst Rate',
        <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='7' InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }} />,
        '%',
        'Assumption'
    ),
    createPlantData('Electricity Price',
        <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='0.0638' InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
        }} />,
        '$/kWh',
        'Industrial user in Illinois, IEA'
    ),
    createPlantData('Natural gas price',
        <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='5.25' InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
        }} />,
        '$/cbf',
        'Industrial user in Illinois, IEA'
    ),
]

const nonWWTRows = [
    createPlantData('Market price of recovered P',
        <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='351.5' InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
        }} />,
        '$/ton',
        'Assumed and considering DAP market price'
    ),
    createPlantData('Market price of CGF',
        <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='98.7' InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
        }} />,
        '$/ton',
        '5-year average, USDA ERS'
    ),
    createPlantData('Market price of DDGS',
        <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='152.8' InputProps={{
            endAdornment: <InputAdornment position="end">$</InputAdornment>,
        }} />,
        '$/ton',
        '5-year average, USDA ERS '
    ),
    createPlantData('Interst Rate',
        <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='7' InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }} />,
        '%',
        'Assumption'
    ),
    createPlantData('Electricity Price',
        <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='0.07' InputProps={{
            endAdornment: <InputAdornment position="end">$/kWh</InputAdornment>,
        }} />,
        '$/kWh',
        'Industrial user in Illinois, IEA'
    ),
    createPlantData('Natural gas price',
        <TextField id="outlined-basic" variant='outlined' size='small' defaultValue='2.77' InputProps={{
            endAdornment: <InputAdornment position="end">$/MMBtu</InputAdornment>,
        }} />,
        '$/MMBtu',
        'Industrial user in Illinois, IEA'
    ),
]

export default class ITEEMSimulation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: { lat: 40.0278, lng: -88.5734 },
            zoom: 9,
            selectedWatershed: '/',
            expanded_shed: true,
            selectedPlant: '/',
            expanded_plant: true,
            menu_value: "",
        }

    }

    onEachSubWatershed = (subWatershed, layer) => {
        const id_ = subWatershed.properties.OBJECTID;
        // console.log(id_);
        layer.bindTooltip("Sub-watershed " + id_.toString());

        layer.on({
            click: (event) => {
                this.setState({
                    selectedWatershed: id_.toString(),
                    selectedPlant: '/'
                })
                console.log(this.state.selectedWatershed);
            }
        })
    };


    handleChange = (event) => {
        this.setState({ menu_value: event.target.value });
    };

    render() {
        const { currentLocation, zoom, selectedWatershed, expanded_shed, selectedPlant, expanded_plant, menu_value } = this.state;
        return (
            <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#F5F5F5' }}>
                <div style={{ flex: 1 }}>
                    <MapContainer center={currentLocation} zoom={zoom}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        />
                        {/* <Markers venues={data.venues}/> */}
                        <GeoJSON tag="Subwatersheds" data={geoData.features} onEachFeature={this.onEachSubWatershed} style={style} />
                        <GeoJSON tag="Reach" data={reachData} />

                        <Marker tag="WWT Plant" position={[39.83121, -89.00160]} eventHandlers={{
                            click: () => {
                                this.setState({ selectedWatershed: '/', selectedPlant: 'WWT Plant' })
                            }
                        }}>
                        </Marker>
                        <Marker tag="DWT plant" position={[39.82819, -88.95055]} eventHandlers={{
                            click: () => {
                                this.setState({ selectedWatershed: '/', selectedPlant: 'DWT Plant' })
                            }
                        }}>
                        </Marker>
                        <Marker tag="Dairy feedlot" position={[40.28538, -88.50410]} eventHandlers={{
                            click: () => {
                                this.setState({ selectedWatershed: '/', selectedPlant: 'Dairy Feedlot' })
                            }
                        }}>
                        </Marker>

                        <Marker tag="Plant A: Wet milling corn" position={[39.86549, -88.88719]} eventHandlers={{
                            click: () => {
                                this.setState({ selectedWatershed: '/', selectedPlant: 'Plant A: Wet milling corn' })
                            }
                        }}>
                        </Marker>
                        <Marker tag="Plant B: Wet milling corn" position={[39.84768, -88.92386]} eventHandlers={{
                            click: () => {
                                this.setState({ selectedWatershed: '/', selectedPlant: 'Plant B: Wet milling corn' })
                            }
                        }}>
                        </Marker>
                        <Marker tag="Plant C: Dry grind corn" position={[40.46996, -88.39672]} eventHandlers={{
                            click: () => {
                                this.setState({ selectedWatershed: '/', selectedPlant: 'Plant C: Dry grind corn' })
                            }
                        }}>
                        </Marker>

                    </MapContainer>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: "calc(100vh - 85px)", overflowY: 'auto', paddingRight: 30, paddingLeft: 30 }}>

                    {/* onClick={() => {this.setState({ selectedWatershed: '/'})}} */}
                    <Accordion style={{ width: '100%', marginTop: 20 }} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <p style={{ fontFamily: 'Noto Sans', fontWeight: 'bold' }}>General Information</p>
                        </AccordionSummary>
                        <AccordionDetails>

                            {/* The following is for general information table */}
                            <TableContainer component={Paper}>
                                <Table style={{ minWidth: 300 }} size="small" aria-label="dense table">
                                    <TableHead style={{ backgroundColor: '#DA5902', fontFamily: 'Noto Sans' }}>
                                        <TableRow>
                                            <TableCell style={{ fontFamily: 'Noto Sans', color: 'white', fontWeight: 'bold' }}>General<br></br>Economic Parameters</TableCell>
                                            <TableCell align="left" style={{ fontFamily: 'Noto Sans', color: 'white' }}>Default</TableCell>
                                            <TableCell align="left" style={{ fontFamily: 'Noto Sans', color: 'white' }}>Unit</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {defaultRows.map((row) => (
                                            <TableRow key={row.gep}>
                                                <TableCell component="th" scope="row" style={{ fontFamily: 'Noto Sans' }}>
                                                    {row.gep}
                                                </TableCell>
                                                <TableCell align="left" style={{ fontFamily: 'Noto Sans' }}>{row.baseline}</TableCell>
                                                <TableCell align="left" style={{ fontFamily: 'Noto Sans', maxWidth: 65 }}>{row.units}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                    {/* The following is for table when user clicks a subwatershed */}
                    <Accordion style={{ display: selectedWatershed == '/' ? 'none' : 'block' }} expanded={expanded_shed} onChange={() => { this.setState({ expanded_shed: !expanded_shed }) }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <p style={{ fontFamily: 'Noto Sans', fontWeight: 'bold' }}>Selected Subwatershed: #{selectedWatershed}</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table style={{ minWidth: 300 }} size="small" aria-label="simple table">
                                    <TableHead style={{ backgroundColor: '#DA5902' }}>
                                        <TableRow>
                                            <TableCell style={{ fontFamily: 'Noto Sans', color: 'white', fontWeight: 'bold' }}>BMP&nbsp;#</TableCell>
                                            <TableCell align="left" style={{ fontFamily: 'Noto Sans', color: 'white' }}>Cover Crop</TableCell>
                                            <TableCell align="left" style={{ fontFamily: 'Noto Sans', color: 'white' }}>Fertilizer Rate</TableCell>
                                            <TableCell align="left" style={{ fontFamily: 'Noto Sans', color: 'white' }}>Waterways/Buffers</TableCell>
                                            <TableCell align="left" style={{ fontFamily: 'Noto Sans', color: 'white' }}>Land Allocation</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.bmp}>
                                                <TableCell component="th" scope="row" style={{ fontFamily: 'Noto Sans' }}>
                                                    {row.bmp}
                                                </TableCell>
                                                <TableCell align="left" style={{ fontFamily: 'Noto Sans' }}>{row.coverCrop}</TableCell>
                                                <TableCell align="left" style={{ fontFamily: 'Noto Sans' }}>{row.fertilizerRate}</TableCell>
                                                <TableCell align="left" style={{ fontFamily: 'Noto Sans' }}>{row.waterways}</TableCell>
                                                <TableCell align="left" style={{ fontFamily: 'Noto Sans' }}>{row.landAlloc}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion style={{ display: selectedPlant == '/' ? 'none' : 'block' }} expanded={expanded_plant} onChange={() => { this.setState({ expanded_plant: !expanded_plant }) }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <p style={{ fontFamily: 'Noto Sans', fontWeight: 'bold' }}>Selected Plant: #{selectedPlant}</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                                <FormControl style={{ minWidth: 200, marginBottom: 20 }}>
                                    <InputLabel>Variables</InputLabel>

                                    {selectedPlant == 'WWT Plant' ?
                                        <Select
                                            value={menu_value}
                                            onChange={this.handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>Default</em>
                                            </MenuItem>
                                            <MenuItem value={1}>Activated sludge (AS)</MenuItem>
                                            <MenuItem value={2}>Activated sludge with chemical precipitation (ASCP)</MenuItem>
                                            <MenuItem value={3}>Enhanced biological phosphorus removal (EBPR)</MenuItem>
                                            <MenuItem value={4}>Enhanced biological phosphorus removal with acetate addition (EBPR_acetate)</MenuItem>
                                            <MenuItem value={5}>Enhanced biological phosphorus removal with struvite precipitation (EBPR_StR)</MenuItem>
                                        </Select>
                                        :
                                        <Select
                                            value={menu_value}
                                            onChange={this.handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>Default</em>
                                            </MenuItem>
                                            <MenuItem value={1}>Baseline</MenuItem>
                                            <MenuItem value={2}>P Recovery</MenuItem>
                                        </Select>
                                    }
                                </FormControl>

                                <TableContainer component={Paper}>
                                    <Table style={{ minWidth: 300 }} size="small" aria-label="simple table">
                                        <TableHead style={{ backgroundColor: '#DA5902' }}>
                                            <TableRow>
                                                <TableCell style={{ fontFamily: 'Noto Sans', color: 'white', fontWeight: 'bold' }}>Parameter</TableCell>
                                                <TableCell align="left" style={{ fontFamily: 'Noto Sans', color: 'white' }}>Value</TableCell>
                                                <TableCell align="left" style={{ fontFamily: 'Noto Sans', color: 'white' }}>Unit</TableCell>
                                                <TableCell align="left" style={{ fontFamily: 'Noto Sans', color: 'white' }}>Source</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {selectedPlant == 'WWT Plant' ?
                                            <TableBody>
                                                {wwtRows.map((row) => (
                                                    <TableRow key={row.parameter}>
                                                        <TableCell component="th" scope="row" style={{ fontFamily: 'Noto Sans' }}>
                                                            {row.parameter}
                                                        </TableCell>
                                                        <TableCell align="left" style={{ fontFamily: 'Noto Sans' }}>{row.value}</TableCell>
                                                        <TableCell align="left" style={{ fontFamily: 'Noto Sans' }}>{row.unit}</TableCell>
                                                        <TableCell align="left" style={{ fontFamily: 'Noto Sans' }}>{row.source}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                            :
                                            <TableBody>
                                                {nonWWTRows.map((row) => (
                                                    <TableRow key={row.parameter}>
                                                        <TableCell component="th" scope="row" style={{ fontFamily: 'Noto Sans' }}>
                                                            {row.parameter}
                                                        </TableCell>
                                                        <TableCell align="left" style={{ fontFamily: 'Noto Sans' }}>{row.value}</TableCell>
                                                        <TableCell align="left" style={{ fontFamily: 'Noto Sans' }}>{row.unit}</TableCell>
                                                        <TableCell align="left" style={{ fontFamily: 'Noto Sans' }}>{row.source}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        }
                                    </Table>
                                </TableContainer>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Button variant="contained" color="secondary" style={{ marginTop: 20, marginRight: 20, display: selectedWatershed == '/' ? 'none' : 'block' }} onClick={() => { this.setState({ selectedWatershed: '/' }) }} >
                            Reset Subwatershed
                            </Button>
                        <Button variant="contained" color="primary" style={{ marginTop: 20, display: selectedWatershed == '/' ? 'none' : 'block' }} onClick={() => { }} >
                            Run Simulation
                            </Button>
                    </div>
                </div>

            </div>
        );
    }
}

