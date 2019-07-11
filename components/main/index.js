import React, { Component } from 'react';
import styled from 'react-emotion';

class Main extends Component {
    render() {
        return (
            <Container>
                <h1>Airport Distance Calculator</h1>
                <p>To calculate airport distance, enter airport names or airport codes or airport cities of the two airports between which you need to find the distance in the text boxs below and click 'Calculate Distance' button. The result page will show you the distance between the airports</p>
                {this.props.children}
            </Container>
        )
    }
}

export default Main;

const Container = styled('div')`
    padding: 20px;
    h1 {
        color: #344152;
        font-size: 40px;
        display: flex;
        justify-content: center;
    }
    p {
        font-size: 20px;
        color: #525354;
    }
`;