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
import Loading from '../../Common/Loading/Loading'
import NotFound from '../../Common/NotFound/NotFound';
import DatePicker from '../../Common/DatePicker/DatePicker';
import Opportunity from './Opportunity';
import SearchResults from './SearchResults';
import './Opportunities.css';

const query = gql`
query($propertyId: String!) {
    property(propertyId: $propertyId) {
        nextOpportunity {
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
    constructor() {
        super();

        this.state = {
            startDate: null,
            endDate: null
        };

        this.onDateRangeChange = this.onDateRangeChange.bind(this);
    }
    onDateRangeChange(type, value) {
        this.setState({
            [type]: value
        });
    }
    render() {
        if (this.props.data.loading) {
            return <Loading/>;
        }
        if (!this.props.data.property) {
            return <NotFound/>;
        }
        return (
            <div id="opportunities">
                {/* Next Opportunity */}
                <div className="next-opp">
                    <h3>{'Next Opportunity'}</h3>
                    {
                        this.props.data.property.nextOpportunity && this.props.data.property.nextOpportunity.status ? <Opportunity data={this.props.data.property.nextOpportunity}/> : <h4>{'No Upcoming Opportunities'}</h4>
                    }
                </div>
                {/* Search For Opportunities */}
                <div className="opp-search">
                    <h3>{'Search For Other Opportunities'}</h3>
                    <DatePicker label={'Start Date'} onChange={this.onDateRangeChange.bind(this, 'startDate')}/>
                    <DatePicker label={'End Date'} onChange={this.onDateRangeChange.bind(this, 'endDate')}/>
                </div>
                {
                    (this.state.startDate && this.state.endDate) ? <SearchResults propertyId={this.props.match.params.propertyId} startDate={this.state.startDate} endDate={this.state.endDate}/> : null
                }
            </div>
        );
    }
}

export default graphql(query, {
    options: (ownProps) => ({variables: {propertyId: ownProps.match.params.propertyId}})
})(Opportunities);