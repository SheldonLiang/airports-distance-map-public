import React, { Component } from 'react';
import styled from 'react-emotion';
import { ClipLoader } from 'react-spinners';
import { isNil, toLower } from 'ramda';
import airportsApi from '../../lib/request-airports';

class InputDropDown extends Component {
    state = { open: false, filter: null, options: [], searching: true };
    handleBlur = () => {
        this.setState({ open: false });
    };
    handleFocus = () => this.setState({ open: true });
    handleChange = e => {
        this.setState({ filter: e.target.value || '' });
    };
    handleSelect = option => () => {
        this.props.formik.setFieldValue(this.props.name, option);
        this.props.pick(option);
        this.setState({ open: false, filter: null });
    };
    filterFun = (option, filter) =>
        !Object.values(this.props.formik.values).map(airport => airport ? airport.code : null).includes(option.code) && (
            filter ?
                toLower(option.code || '').includes(toLower(filter)) ||
                toLower(option.name || '').includes(toLower(filter)) ||
                toLower(option.city || '').includes(toLower(filter))
                : true);
    componentDidMount() {
        if (!this.state.options.length) {
            fetch(airportsApi)
                .then(res => res.json())
                .then(airports =>
                    this.setState({
                        options: airports,
                        // options: airports.filter(airport => airport.country === "United States"),
                        searching: false
                    })
                )
        }
    }
    render() {
        const { open, filter, options, searching } = this.state;
        const { question, name, formik, placeholder } = this.props;
        return (
            <Container>
                <label>{question}</label>
                <div className={'input'}>
                    <input
                        name={name}
                        value={!isNil(filter) ? filter : formik.values[name] ? formik.values[name].name : ''}
                        placeholder={placeholder}
                        error={formik.errors[name]}
                        onBlur={this.handleBlur}
                        onFocus={this.handleFocus}
                        onChange={this.handleChange}
                    />
                    {
                        open &&
                        <DropDownContainer>
                            {searching &&
                                <>
                                    <ClipLoader size={30} />
                                    <span>Searching...</span>
                                </>
                            }
                            {options.filter(option => this.filterFun(option, filter)).map(option => (
                                <div key={option.code} onMouseDown={this.handleSelect(option)}>
                                    <span style={{ fontWeight: 'bold' }}>{`${option.name} - `}</span>
                                    <span style={{ color: '#525354' }}>{`${option.city} - `}</span>
                                    <span>{`${option.code}`}</span>
                                </div>
                            ))}
                        </DropDownContainer>
                    }
                </div>
            </Container>
        );
    }
}



export default InputDropDown;

const Container = styled('div')`
    padding: 30px 30px 220px 30px;
    label {
        color: #344152;
        font-size: 20px;
    }
    input {
        font-size: 30px;
        height: 40px;
        width: 495px;
        color: #344152;
    }
    @media (max-width: 1200px) {
        label {
            display: flex;
            justify-content: center;
        }
        .input {
            display: flex;
            justify-content: center;
        }
    }
    @media (max-width: 600px) {
        input {
            width: 100%;
        }
    }
`;

const DropDownContainer = styled('div')`
    background: white;
    width: 500px;
    max-height: 190px;
    overflow: scroll;
    position: absolute;
    div {
        padding: 10px 0;
        font-size: 20px;
        cursor: pointer;
        :hover {
            background: #f7f8fa;
        }
    }
    @media (max-width: 1200px) {
        margin-top: 46px;
    }
    @media (max-width: 600px) {
        width: calc(100% - 115px);
    }
`;
