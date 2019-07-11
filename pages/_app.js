import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux'
import withReduxStore from '../lib/with-redux-store'

import Main from '../components/main';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps, reduxStore } = this.props;

        return (
            <Container>
                <Provider store={reduxStore}>
                    <Main><Component {...pageProps} /></Main>
                </Provider>
            </Container>
        );
    }
}

export default withReduxStore(MyApp);