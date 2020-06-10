import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as material from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import './App.css';
import L from 'leaflet';
import car from './assets/car.png';

const useStyles2 = makeStyles({
	table: {
		minWidth: 500,
	},
});

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: '#eeeeee',
		color: theme.palette.common.black,
	},
	body: {
		fontSize: 14,
	},
}))(material.TableCell);

function App() {
	const [crosswalks, setCrosswalks] = useState([]);
	const classes = useStyles2();

	// useEffect(() => {
	// 	axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
	// 		setCrosswalks(res.data);
	// 	});
	// }, []);

	const carIcon = L.icon({
		iconUrl: car,
		iconSize: [80, 80], // size of the icon
		shadowSize: [50, 64], // size of the shadow
		iconAnchor: [45.4, -75.7], // point of the icon which will correspond to marker's location
		shadowAnchor: [4, 62], // the same for the shadow
		popupAnchor: [0, 0],
	});

	return (
		<div className='App'>
			<div className='jumbotron'>
				<h1 className='display-4'>Crosswalks</h1>
			</div>
			<material.TableContainer component={material.Paper}>
				<material.Table className={classes.table} aria-label='custom pagination table'>
					<material.TableHead>
						<material.TableRow>
							<StyledTableCell>#id</StyledTableCell>
							<StyledTableCell align='right'>Rua</StyledTableCell>
							<StyledTableCell align='right'>Latitude</StyledTableCell>
							<StyledTableCell align='right'>Longitude</StyledTableCell>
							<StyledTableCell align='right'>Total de Pedestres/dia</StyledTableCell>
							<StyledTableCell align='right'>Total de Veículos/dia</StyledTableCell>
						</material.TableRow>
					</material.TableHead>
					<material.TableBody>
						{/* {crosswalks.map((crosswalk) => (
							<material.TableRow key={crosswalk.id}>
								<material.TableCell component='th' scope='row'>
									{crosswalk.userId}
								</material.TableCell>
								<material.TableCell style={{ width: 160 }} align='right'>
									{crosswalk.title}
								</material.TableCell>
								<material.TableCell style={{ width: 160 }} align='right'>
									{crosswalk.body}
								</material.TableCell>
							</material.TableRow>
						))} */}
					</material.TableBody>
				</material.Table>
			</material.TableContainer>

			<Map center={[45.4, -75.7]} zoom={13}>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				<Marker position={[45.4, -75.7]} icon={carIcon}>
					<Popup>
						<span>
							A pretty CSS3 popup. <br /> Easily customizable.
						</span>
					</Popup>
				</Marker>
			</Map>
		</div>
	);
}

export default App;
