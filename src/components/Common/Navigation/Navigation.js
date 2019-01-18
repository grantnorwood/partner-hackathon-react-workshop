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
import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.activeIndex || 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.onChange(value);
  };

  render() {
    var links = this.props.labels.map((labels, idx)=>{
      return <Tab label={labels} key={`tab-${idx}`} />
    });
    return (
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
          {links}
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

Navigation.propTypes = {
  labels: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};


export default Navigation;