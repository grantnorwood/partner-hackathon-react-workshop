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
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import Loading from '../../Common/Loading/Loading';
import NotFound from '../../Common/NotFound/NotFound';
import Opportunity from './Opportunity';

const query = gql `
    query($propertyId: String!, $startDate: String!, $endDate: String!) {
        property(propertyId: $propertyId) {
            opportunities(startDate: $startDate, endDate: $endDate) {
                startDate,
                endDate,
                status,
                rates {
                    currentRate
                }
            }
        }
    }`;
class Opportunities extends Component {
    render() {
        if (this.props.startDate && this.props.endDate) {
            if (this.props.data.loading) {
                return <Loading/>;
            }
            if (!this.props.data.property) {
                return <NotFound/>;
            }
            if (!this.props.data.property.opportunities.length) {
                return <NotFound/>;
            }
            return (
                <div>
                    {
                        this.props.data.property.opportunities.map((opp, idx) => {
                            return <Opportunity key={`opportunity-${idx}`} data={opp}/>;
                        })
                    }
                </div>
            );
        }
        return null;
    }
}

export default graphql(query, {
    options: (ownProps) => ({variables: {propertyId: ownProps.propertyId, startDate: ownProps.startDate, endDate: ownProps.endDate}})
})(Opportunities);