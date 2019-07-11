import React from 'react';
import Router from 'next/router';

import {Button} from './SubmitButton';

const BackHome = () => (
    <Button onClick={() => Router.push('/home')}>Home</Button>
);

export default BackHome;
