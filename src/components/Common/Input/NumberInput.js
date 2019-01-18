/**
Copyright 2018 Expedia Group, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 300,
    }
  });

class TextFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        numberValue: this.props.value || 0,
        error: false
    }
    this.handleChange = this.handleChange.bind(this);
}

  handleChange(event) {
    const val = event.target.value;
    const error = (this.props.min !== undefined && val < this.props.min) || (this.props.max !== undefined && val > this.props.max)
    this.setState({
      'numberValue': event.target.value,
      error
    });
    if (!error && val !== '') {
        this.props.onChange(+val);
    }
    else {
        this.props.onChange(null);
    }
  };

  render() {
    const { classes } = this.props;

    return (
        <TextField
            className={classes.formControl}
            label={this.props.label}
            value={this.state.numberValue}
            onChange={this.handleChange}
            id={this.props.name}
            type="number"
            error={this.state.error}
        />
    );
  }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    min: PropTypes.number,
    max: PropTypes.number
};

export default withStyles(styles)(TextFields);