import React, { Component } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import styled from 'react-emotion';

import getDistance from '../../../lib/get-distance';
import { setFrom, setTo, setDistance } from '../../../actions/airports';
import formSchema from '../../_molecules/FormSchema';
import Form from '../../_molecules/Form';

class Home extends Component {
    render() {
        const { from, to, setFrom, setTo, setDistance } = this.props;
        return (
            <Formik
                initialValues={{ from: from, to: to }}
                onSubmit={values => {
                    setDistance(getDistance(from, to));
                    Router.push(`/result?origins=${values.from.code}&destinations=${values.to.code}`);
                }}
                validationSchema={formSchema}
            >
                {formik => {
                    return (
                        <Form setFrom={setFrom} setTo={setTo} formik={formik} home={true} />
                    );
                }}
            </Formik>
        );
    }
}

const mapStateToProps = () => {
    return state => {
        return {
            from: state.airports.from,
            to: state.airports.to
        };
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setFrom: bindActionCreators(setFrom, dispatch),
        setTo: bindActionCreators(setTo, dispatch),
        setDistance: bindActionCreators(setDistance, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

export const FormContainer = styled('div')`
    padding-bottom: 20px;
    background: lightgrey;
    @media (min-width: 1200px) {
        form {
            display: flex;
            justify-content: space-around;
        }
    }
    .buttonContainer {
        display: flex;
        justify-content: center;
    }
`;