import React, { Component } from 'react';
import axios from 'axios';
import * as material from '@material-ui/core';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import './App.css';
import L from 'leaflet';
import car from './assets/car.png';
import red from './assets/red.png';
import green from './assets/green.png';
import yellow from './assets/yellow.png';
import person from './assets/person.png';
import { Modal, ModalBody } from 'reactstrap'

let urlCrosswalk = 'http://localhost:3333/crosswalks/'

class App extends Component {
    state = {
        crosswalks: [],
        idCrosswalk: -1,
        crosswalk: {},
        modal: false
    }

    componentDidMount() {
        axios.get(urlCrosswalk).then((res) => {
            this.setState({
                crosswalks: res.data
            })
        }).catch(e => {
            console.log(e)
        });

        setInterval(() => {
            axios.get(urlCrosswalk).then((res) => {
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
            axios.get(`${urlCrosswalk}${this.state.idCrosswalk}`).then(res => {
                console.log(res.data);
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

    getCrosswalkState = (state) => {
        if (state === -1) {
            return "Vermelho"
        }
        if (state === 0) {
            return "Amarelo"
        }
        if (state === 1) {
            return "Verde"
        }
    }

    getCrosswalkIcon = (state) => {
        if (state === -1) {
            return this.redIcon
        }
        if (state === 0) {
            return this.yellowIcon
        }
        if (state === 1) {
            return this.greenIcon
        }
    }

    render() {
        let map;
        let pedestrians;
        let vehicles;

        if (this.state.crosswalk.crosswalk) {
            // fazer o código para meter dentro dos markers os pedestres veiculos e a crosswalk
            if (this.state.crosswalk.res_pedestrians) {
                pedestrians = this.state.crosswalk.res_pedestrians.map((pedestrian) => {
                    return (
                        <Marker key={pedestrian.id} position={[pedestrian.lat, pedestrian.lng]} icon={this.personIcon}>
                            <Popup>
                                <span>
                                    <p>Nome: {pedestrian.name} </p>
                                    <p>Lat: {pedestrian.lat}</p>
                                    <p>Lng: {pedestrian.lng}</p>
                                </span>
                            </Popup>
                        </Marker>
                    );
                })
            }

            if (this.state.crosswalk.res_vehicles) {
                vehicles = this.state.crosswalk.res_vehicles.map((vehicle) => {
                    return <Marker key={vehicle.id} position={[vehicle.lat, vehicle.lng]} icon={this.carIcon}>
                        <Popup>
                            <span>
                                Nome: {vehicle.name}
                                Lat: {vehicle.lat}
                                Lng: {vehicle.lng}
                            </span>
                        </Popup>
                    </Marker>
                })
            }

            map = (
                <Map center={[this.state.crosswalk.crosswalk.lat, this.state.crosswalk.crosswalk.lng]} zoom={20} style={{ width: "100%" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <Marker position={[this.state.crosswalk.crosswalk.lat, this.state.crosswalk.crosswalk.lng]} icon={this.getCrosswalkIcon(this.state.crosswalk.crosswalk.state)}>
                        <Popup>
                            <span>
                                Rua: {this.state.crosswalk.crosswalk.address}
                                Lat: {this.state.crosswalk.crosswalk.lat}
                                Lng: {this.state.crosswalk.crosswalk.lng}
                            </span>
                        </Popup>
                    </Marker>
                    {pedestrians}
                    {vehicles}
                </Map>
            );

        }

        let table = <material.TableRow>
            <material.TableCell>
                A carregar dados ...
            </material.TableCell>
            <material.TableCell>
                A carregar dados ...
            </material.TableCell>
            <material.TableCell>
                A carregar dados ...
            </material.TableCell>
            <material.TableCell>
                A carregar dados ...
            </material.TableCell>
            <material.TableCell>
                A carregar dados ...
            </material.TableCell>
            <material.TableCell>
                A carregar dados ...
            </material.TableCell>
            <material.TableCell>
                A carregar dados ...
            </material.TableCell>
        </material.TableRow>
        let status = <p>Sem status</p>

        if (this.state.crosswalks.length > 0) {
            table = this.state.crosswalks.map((crosswalk) => (
                <material.TableRow key={crosswalk.id} onClick={() => {
                    this.changeIdCrosswlak(crosswalk.id)
                    this.setState({
                        modal: !this.state.modal
                    })
                }}>
                    <material.TableCell component='th' scope='row'>
                        {crosswalk.id}
                    </material.TableCell>
                    <material.TableCell align='right'>
                        {crosswalk.address}
                    </material.TableCell>
                    <material.TableCell align='right'>
                        {crosswalk.lat}
                    </material.TableCell>
                    <material.TableCell align='right'>
                        {crosswalk.lng}
                    </material.TableCell>
                    <material.TableCell align='right'>
                        {this.getCrosswalkState(crosswalk.state)}
                    </material.TableCell>
                    <material.TableCell align='right'>
                        0
                    </material.TableCell>
                    <material.TableCell align='right'>
                        0
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
                                <material.TableCell align='right'>Semáforo</material.TableCell>
                                <material.TableCell align='right'>Total de Pedestres/dia</material.TableCell>
                                <material.TableCell align='right'>Total de Veículos/dia</material.TableCell>
                            </material.TableRow>
                        </material.TableHead>
                        <material.TableBody>
                            {table}
                        </material.TableBody>
                    </material.Table>
                </material.TableContainer>

                <Modal size="lg" isOpen={this.state.modal} toggle={() => { this.setState({ modal: !this.state.modal }) }} style={{ width: "100vh" }}>
                    <ModalBody>
                        {map}
                    </ModalBody>
                </Modal>

            </div >
        );
    }
}

export default App;
