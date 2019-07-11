import React from 'react';
import styled from 'react-emotion';
import { ClipLoader } from 'react-spinners';

const Submit = ({ disabled, loading, onClick }) => (
    <Button onClick={onClick} disabled={disabled || loading}>
        {'Calculate'}
        <ClipLoader size={15} color={'white'} loading={loading}/>
    </Button>
);

export default Submit;

export const Button = styled('button')`
    font-size: 20px;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;
    padding: 5px 25px;
    min-width: 155px;
    color: white;
    background: #344152;
    :disabled {
        background: grey;
        cursor: not-allowed;
    }
`;
