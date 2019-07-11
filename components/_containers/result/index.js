import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker, Polyline } from 'google-maps-react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';

import { setFrom, setTo, setDistance } from '../../../actions/airports';
import MY_API_KEY from '../../../lib/my-api-key';
import formSchema from '../../_molecules/FormSchema';
import Form from '../../_molecules/Form';
import HomeButton from '../../_molecules/HomeButton';

export class Result extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };
    handleMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    handleClose = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    getZoom = distance => {
        return distance > 5000
            ? 2
            : distance > 2000
                ? 4.9
                : distance > 1000
                    ? 6
                    : distance > 100
                        ? 7
                        : 9;
    };
    render() {
        const { from, to, distance, setFrom, setTo, setDistance, google } = this.props;
        if (!from || !from.lat) {
            Router.push('/home');
            return <h1>Navigating to Home Page...</h1>
        } else {
            this.getZoom(from, to);
            const triangleCoords = [
                { lat: parseFloat(from.lat), lng: parseFloat(from.lon) },
                { lat: parseFloat(to.lat), lng: parseFloat(to.lon) }
            ];
            return (
                <>
                    <HomeButton />
                    <Formik
                        initialValues={{ from: from, to: to }}
                        validationSchema={formSchema}
                    >
                        {formik => {
                            return (
                                <Form
                                    from={from}
                                    to={to}
                                    setFrom={setFrom}
                                    setTo={setTo}
                                    formik={formik}
                                    home={false}
                                    setDistance={setDistance}
                                />
                            );
                        }}
                    </Formik>
                    <h1>{`The distance from ${from.name} to ${to.name} is`}</h1>
                    <h1>{`${distance.toFixed(2)} nautical miles`}</h1>
                    <Map
                        google={google}
                        style={{ width: '95%' }}
                        zoom={this.getZoom(distance)}
                        initialCenter={{
                            // lat: (parseFloat(from.lat) + parseFloat(to.lat)) / 2,
                            // lng: (parseFloat(from.lon) + parseFloat(to.lon)) / 2
                            lat: parseFloat(from.lat),
                            lng: parseFloat(from.lon)
                        }}
                    >
                        {/* <Marker
                            title={'Current'}
                            name={'Current location'}
                            position={{ lat: parseFloat(from.lat), lng: parseFloat(from.lon) }}
                        /> */}
                        <Marker
                            name={'Dolores park'}
                            position={{ lat: parseFloat(to.lat), lng: parseFloat(to.lon) }} />
                        <Marker />
                        <InfoWindow onClose={this.onInfoWindowClose}>
                            <div>
                                <h1>{'hhh'}</h1>
                            </div>
                        </InfoWindow>
                        <Polyline
                            path={triangleCoords}
                            strokeColor='red'
                            strokeOpacity={1}
                            strokeWeight={5}
                        />
                    </Map>
                </>
            );
        }
    }
}


const mapStateToProps = () => {
    return state => {
        return {
            from: state.airports.from,
            to: state.airports.to,
            distance: state.airports.distance
        };
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setFrom: bindActionCreators(setFrom, dispatch),
        setTo: bindActionCreators(setTo, dispatch),
        setDistance: bindActionCreators(setDistance, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
    apiKey: MY_API_KEY
})(Result));
