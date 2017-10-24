import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

export default class Credentials extends Component {
    render() {
        return (
            <Container className="credentials" textAlign="center">
                <p>
                    Made with <span role="img" aria-label="Smiling Face">😄&nbsp;</span> by Dariusz Dubicki
                </p>
            </Container>
        );
    }
}
