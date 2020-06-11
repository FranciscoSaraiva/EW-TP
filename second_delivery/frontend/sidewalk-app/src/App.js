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
import { Modal, ModalBody, Form, Input, Alert } from 'reactstrap'

let urlCrosswalk = 'http://localhost:3333/crosswalks/'

class App extends Component {
    state = {
        crosswalks: [],
        pedestrians: [],
        vehicles: [],
        idCrosswalk: -1,
        crosswalk: {},
        modal: false,
        lat: "",
        lng: "",
        address: ""
    }

    componentDidMount() {
        axios.get(urlCrosswalk).then((res) => {
            console.log(res.data)
            this.setState({
                crosswalks: res.data.crosswalks,
                pedestrians: res.data.pedestrians,
                vehicles: res.data.vehicles
            })
        }).catch(e => {
            console.log(e)
        });

        setInterval(() => {
            axios.get(urlCrosswalk).then((res) => {
                console.log(res.data)
                this.setState({
                    crosswalks: res.data.crosswalks,
                    pedestrians: res.data.pedestrians,
                    vehicles: res.data.vehicles
                })
            });
        }, 3000);
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

    handleSubmit = (event) => {
        event.preventDefault();
        //enviar o pedido post para a api gateway
        axios.post(`${urlCrosswalk}`, {
            address: this.state.address,
            lat: this.state.lat,
            lng: this.state.lng
        }).then(res => console.log(res))
            .catch(error => console.log(error));
    }

    carIcon = L.icon({
        iconUrl: car,
        iconSize: [50, 50], // size of the icon
    });
    yellowIcon = L.icon({
        iconUrl: yellow,
        iconSize: [50, 50], // size of the icon
    });
    redIcon = L.icon({
        iconUrl: red,
        iconSize: [50, 50], // size of the icon
    });
    greenIcon = L.icon({
        iconUrl: green,
        iconSize: [50, 50], // size of the icon
    });
    personIcon = L.icon({
        iconUrl: person,
        iconSize: [50, 50], // size of the icon
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

        let globalMap;
        let globalCrosswalks;
        let globalPedestrians;
        let globalVehicles;

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
                                <p>Matrícula: {vehicle.license_plate}</p>
                                <p>Lat: {vehicle.lat}</p>
                                <p>Lng: {vehicle.lng}</p>
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
                                <p>Rua: {this.state.crosswalk.crosswalk.address}</p>
                                <p>Lat: {this.state.crosswalk.crosswalk.lat}</p>
                                <p>Lng: {this.state.crosswalk.crosswalk.lng}</p>
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

        if (this.state.crosswalks.length > 0) {
            table = this.state.crosswalks.map((crosswalk) => (
                <material.TableRow key={crosswalk.crosswalk.id} onClick={() => {
                    this.changeIdCrosswlak(crosswalk.crosswalk.id)
                    this.setState({
                        modal: !this.state.modal
                    })
                }}>
                    <material.TableCell component='th' scope='row'>
                        {crosswalk.crosswalk.id}
                    </material.TableCell>
                    <material.TableCell align='right'>
                        {crosswalk.crosswalk.address}
                    </material.TableCell>
                    <material.TableCell align='right'>
                        {crosswalk.crosswalk.lat}
                    </material.TableCell>
                    <material.TableCell align='right'>
                        {crosswalk.crosswalk.lng}
                    </material.TableCell>
                    <material.TableCell align='right'>
                        {this.getCrosswalkState(crosswalk.crosswalk.state)}
                    </material.TableCell>
                    <material.TableCell align='right'>
                        {crosswalk.record.total_pedestrians}
                    </material.TableCell>
                    <material.TableCell align='right'>
                        {crosswalk.record.total_vehicles}
                    </material.TableCell>
                </material.TableRow>
            ))
            globalCrosswalks = this.state.crosswalks.map((crosswalk) => {
                return (
                    <Marker key={crosswalk.crosswalk.id} position={[crosswalk.crosswalk.lat, crosswalk.crosswalk.lng]} icon={this.getCrosswalkIcon(crosswalk.crosswalk.state)}>
                        <Popup>
                            <span>
                                <p>Rua: {crosswalk.crosswalk.address}</p>
                                <p>Lat: {crosswalk.crosswalk.lat}</p>
                                <p>Lng: {crosswalk.crosswalk.lng}</p>
                            </span>
                        </Popup>
                    </Marker>
                )
            })

            if (this.state.pedestrians.length > 0) {
                globalPedestrians = this.state.pedestrians.map((pedestrian) => {
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

            if (this.state.vehicles.length > 0) {
                globalVehicles = this.state.vehicles.map((vehicle) => {
                    return (
                        <Marker key={vehicle.id} position={[vehicle.lat, vehicle.lng]} icon={this.carIcon}>
                            <Popup>
                                <span>
                                    <p>Matrícula: {vehicle.license_plate}</p>
                                    <p>Lat: {vehicle.lat}</p>
                                    <p>Lng: {vehicle.lng}</p>
                                </span>
                            </Popup>
                        </Marker>
                    );
                })
            }

            globalMap = <Map center={[41.560661, -8.397521]} zoom={20} style={{ width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {globalCrosswalks}
                {globalPedestrians}
                {globalVehicles}
            </Map>
        }
        return (
            <div className='App'>
                <div className='jumbotron'>
                    <h1 className='display-4'>Crosswalks</h1>
                </div>
                <Alert color="primary" style={{ margin: "16px" }}>
                    Registar uma nova Passadeira
                </Alert>
                <div className='d-flex justify-content-center'>

                    <Form onSubmit={this.handleSubmit}>
                        <Input
                            type="text"
                            value={this.state.address}
                            onChange={(e) => this.setState({ address: e.target.value })}
                            placeholder="Morada" />
                        <Input
                            type="text"
                            value={this.state.lat}
                            onChange={(e) => this.setState({ lat: e.target.value })}
                            placeholder="Latitude" />
                        <Input
                            type="text"
                            value={this.state.lng}
                            onChange={(e) => this.setState({ lng: e.target.value })}
                            placeholder="Longitude" />
                        <Input
                            type="submit"
                            value='Submit'
                            style={{ margin: '24px 0px' }} />
                    </Form>
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
                <Alert color="primary" style={{ margin: "16px" }}>
                    Mapa Geral das Crosswalks
                </Alert>
                {globalMap}
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
