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
import {parse} from 'query-string';
import {Route} from 'react-router-dom';
import Navigation from '../Common/Navigation/Navigation';
import Basic from './Basic/Basic';
import Metrics from './Metrics/Metrics';
import Opportunities from './Opportunities/Opportunities';
import Market from './Market/Market';
import RevenueStrategy from './RevenueStrategy/RevenueStrategy';
import './PropertyDetails.css'

class PropertyDetails extends Component {
    constructor(props) {
        super(props);

        const links = [
            {
                label: 'Basic',
                path: `${props.match.path}`
            },
            {
                label: 'Metrics',
                path: `${props.match.path}/metrics`
            },
            {
                label: 'Market',
                path: `${props.match.path}/market`
            },
            {
                label: 'Opportunities',
                path: `${props.match.path}/opportunities`
            },
            {
                label: 'Revenue Strategy',
                path: `${props.match.path}/revenue`
            }
        ];

        this.routes = links
            .map((route) => {
                return route.path.replace(':propertyId', this.props.match.params.propertyId);
            });
        this.labels = links
            .map((route) => {
                return route.label;
            });

        const routeIndex = this.routes.indexOf(props.location.pathname);

        this.state = {
            propertyId: parse(this.props.location.search).propertyId || '',
            navIndex: routeIndex !== -1 ? routeIndex : 0
        };
        this.handleNavChange = this.handleNavChange.bind(this);
    }

    handleNavChange(navIndex) {
        this.setState({navIndex});
        let path = this.routes[navIndex];
        this.props.history.push(path);
    }

    render() {
        return (
            <div id="property-details-container">
                {/* --- Navigation --- */}
                <Navigation
                    labels={this.labels}
                    activeIndex={this.state.navIndex}
                    onChange={this.handleNavChange}
                />

                {/* --- Content (Routes) --- */}
                <div id="property-details">
                    {/* ADD NEW ROUTES HERE */}
                    <Route path={`${this.props.match.path}`} component={Basic} exact/>
                    <Route path={`${this.props.match.path}/metrics`} component={Metrics}/>
                    <Route path={`${this.props.match.path}/market`} component={Market}/>
                    <Route path={`${this.props.match.path}/opportunities`} component={Opportunities}/>
                    <Route path={`${this.props.match.path}/revenue`} component={RevenueStrategy}/>
                </div>
            </div>
        );
    }
}

export default PropertyDetails;