import React from 'react';
import styled from 'react-emotion';

import getDistance from '../../lib/get-distance';
import InputDropDown from './InputDropDown';
import Submit from './SubmitButton';

const Form = ({ from, to, setFrom, setTo, formik, home, setDistance }) => (
    <FormContainer>
        <form>
            <InputDropDown
                question='From'
                name='from'
                placeholder='From Airport'
                formik={formik}
                pick={option => {
                    setFrom(option);
                    if (from) setDistance(getDistance(option, to));
                }}
            />
            <InputDropDown
                question='To'
                name='to'
                placeholder='To Airport'
                formik={formik}
                pick={option => {
                    setTo(option);
                    if (from) setDistance(getDistance(from, option));
                }}
            />
        </form>
        {home &&
            <div className="buttonContainer">
                <Submit
                    onClick={formik.handleSubmit}
                    disabled={!formik.isValid}
                    loading={formik.isSubmitting}
                />
            </div>
        }
    </FormContainer>
);


export default Form;

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