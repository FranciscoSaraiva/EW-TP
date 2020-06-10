import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import * as material from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import './App.css';
import L from 'leaflet';
import car from './assets/car.png';
import red from './assets/red.png';
import green from './assets/green.png';
import yellow from './assets/yellow.png';
import person from './assets/person.png'

let urlCrosswalk = 'http://localhost:3333/crosswalks/'

class App extends Component {
    state = {
        crosswalks: [],
        idCrosswalk: -1,
        crosswalk: []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts/1/comments').then((res) => {
            this.state.crosswalks = res.data;
            this.setState({
                crosswalks: res.data
            })
        });

        this.state.crosswalks = setInterval(() => {
            axios.get('https://jsonplaceholder.typicode.com/posts/1/comments').then((res) => {
                this.setState({
                    crosswalks: res.data
                })
            });
        }, 60000);
    }

    changeIdCrosswlak = (id) => {
        this.setState({
            idCrosswalk: id
        })
        setInterval(() => {
            axios.get('https://jsonplaceholder.typicode.com/posts?userId=1').then(res => {
                this.setState({
                    crosswalk: res.data
                })
            }).catch(error => {
                console.log(error);
            })
        }, 5000)
    }


    carIcon = L.icon({
        iconUrl: car,
        iconSize: [80, 80], // size of the icon
    });
    yellowIcon = L.icon({
        iconUrl: yellow,
        iconSize: [80, 80], // size of the icon
    });
    redIcon = L.icon({
        iconUrl: red,
        iconSize: [80, 80], // size of the icon
    });
    greenIcon = L.icon({
        iconUrl: green,
        iconSize: [80, 80], // size of the icon
    });
    personIcon = L.icon({
        iconUrl: person,
        iconSize: [80, 80], // size of the icon
    });

    //classes = useStyles2();


    render() {
        console.log(this.state.crosswalk);
        let map = <p>Por favor selecione uma crosswalk</p>
        let pedestrains;
        let vehicles;
        let traffic_light;

        if (this.state.crosswalk.length > 0) {
            // fazer o código para meter dentro dos markers os pedestres veiculos e a crosswalk
        }

        if (this.state.idCrosswalk !== -1) {
            map = <Map center={[45.4, -75.7]} zoom={13}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={[45.4, -75.7]} icon={this.personIcon}>
                    <Popup>
                        <span>
                            A pretty CSS3 popup. <br /> Easily customizable.
						</span>
                    </Popup>
                </Marker>
            </Map>
        }

        let table = <p>Ainda sem dados ...</p>

        if (this.state.crosswalks.length > 0) {
            table = this.state.crosswalks.map((crosswalk) => (
                <material.TableRow key={crosswalk.id} onClick={() => this.changeIdCrosswlak(crosswalk.id)}>
                    <material.TableCell component='th' scope='row'>
                        {crosswalk.userId}
                    </material.TableCell>
                    <material.TableCell style={{ width: 160 }} align='right'>
                        {crosswalk.email}
                    </material.TableCell>
                    <material.TableCell style={{ width: 160 }} align='right'>
                        {crosswalk.name}
                    </material.TableCell>
                </material.TableRow>
            ))
        }
        return (
            <div className='App'>
                <div className='jumbotron'>
                    <h1 className='display-4'>Crosswalks</h1>
                </div>
                <material.TableContainer component={material.Paper}>
                    <material.Table aria-label='custom pagination table'>
                        <material.TableHead>
                            <material.TableRow>
                                <material.TableCell>#id</material.TableCell>
                                <material.TableCell align='right'>Rua</material.TableCell>
                                <material.TableCell align='right'>Latitude</material.TableCell>
                                <material.TableCell align='right'>Longitude</material.TableCell>
                                <material.TableCell align='right'>Total de Pedestres/dia</material.TableCell>
                                <material.TableCell align='right'>Total de Veículos/dia</material.TableCell>
                            </material.TableRow>
                        </material.TableHead>
                        <material.TableBody>
                            {table}
                        </material.TableBody>
                    </material.Table>
                </material.TableContainer>

                {map}

            </div>
        );
    }
}

export default App;
