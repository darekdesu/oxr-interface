import React, { Component } from 'react';
import { Grid, Input, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import { dateFormat, datePickerFormat, datePickerMinDate } from '../consts/dateTypes';

export default class ExchangeRatesDatePicker extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        return this.props.onChange(date.format(dateFormat));
    }

    render() {
        const { isLoading, pickedDate } = this.props;

        return (
            <Segment
                stacked
                color="blue"
                disabled={isLoading}
                loading={isLoading}
            >
                <Grid textAlign="center" verticalAlign="middle">
                    <Grid.Column mobile={8} textAlign="right">
                        Wybierz datę by sprawdzić kurs wymiany z przeszłości:
                    </Grid.Column>
                    <Grid.Column mobile={8} textAlign="left">
                        <DatePicker
                            selected={moment(pickedDate)}
                            onChange={this.handleChange}
                            showYearDropdown
                            minDate={moment(datePickerMinDate)}
                            maxDate={moment()}
                            dateFormat={datePickerFormat}
                            locale="PL"
                            customInput={<Input/>}
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}

ExchangeRatesDatePicker.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    pickedDate: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
