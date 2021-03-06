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
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: '250px'
  }
});

function AppButton(props) {
  const { classes } = props;
  return (
    <Button variant="contained" color="primary" className={classes.button} disabled={!!props.disabled} onClick={props.onClick}>
        {props.label}
    </Button>
  );
}

AppButton.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default withStyles(styles)(AppButton);