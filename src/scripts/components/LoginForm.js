import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: {
                value: '',
                isValid: true,
                messages: []
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, { name, value }) {
        return this.setState({
            [name]: {
                ...this.state[name],
                value,
                isValid: true,
                messages: []
            }
        });
    }

    handleSubmit() {
        const { apiKey } = this.state;

        const addErrorMessage = (errorMessage) => this.setState({
            apiKey: {
                ...apiKey,
                isValid: false,
                messages: [...apiKey.messages, errorMessage]
            }
        });


        if (apiKey.value.length === 0) {
            return addErrorMessage('Klucz API jest pusty.');
        }

        if (/\s/g.test(apiKey.value)) {
            return addErrorMessage('Klucz API zawiera białe znaki.');
        }

        return this.props.onSubmit(apiKey.value);
    }

    render() {
        const { apiKey } = this.state;
        const { isLoading, isLoadError } = this.props;

        return (
            <div className="login-form">
                <Grid textAlign="center">
                    <Grid.Column textAlign="left" mobile={16} tablet={8} computer={6}>
                        <Header as="h2" textAlign="center">
                            Logowanie do konwertera walut
                        </Header>
                        <Form onSubmit={this.handleSubmit} size="large">
                            <Segment stacked>
                                <Form.Input
                                    onChange={this.handleChange}
                                    value={apiKey.value}
                                    error={!apiKey.isValid}
                                    name="apiKey"
                                    fluid
                                    icon="privacy"
                                    iconPosition="left"
                                    placeholder="Podaj klucz API dla Open Exchange Rates"
                                />
                                <Message
                                    visible={!apiKey.isValid}
                                    error
                                    header="Formularz zawiera błędy"
                                    list={apiKey.messages.map((message) => message)}
                                />
                                <Button
                                    loading={isLoading}
                                    disabled={!apiKey.isValid || isLoading}
                                    primary
                                    fluid
                                    size="large">
                                    Zaloguj
                                </Button>
                                <Message
                                    visible={isLoadError}
                                    error
                                    header="Coś poszło nie tak"
                                    content="Upewnij się, że wpisano poprawny klucz API i spróbuj ponownie za chwilę."
                                />
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoadError: PropTypes.bool.isRequired
};
