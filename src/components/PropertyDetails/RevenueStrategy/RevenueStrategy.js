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
import {graphql, compose} from 'react-apollo';
import Loading from '../../Common/Loading/Loading'
import NotFound from '../../Common/NotFound/NotFound';
import Panel from '../../Common/Panel/Panel';
import UpdateRevenueStrategy from './UpdateRevenueStrategy';
import currency from '../../../util/currency';
import './RevenueStrategy.css';

const query = gql`
query($propertyId: String!) {
    property(propertyId: $propertyId) {
        revenueStrategy {
            minimumRate,
            maximumRate,
            revenueStrategy
        }
    }
}`;

const mutation = gql`
mutation($propertyId: String!, $minimumRate: Int!, $maximumRate: Int!, $revenueStrategy: Int!) {
    updateProperty(propertyId: $propertyId) {
        updateRevenueStrategy(minimumRate: $minimumRate, maximumRate: $maximumRate, revenueStrategy: $revenueStrategy)
    }
}`;

class RentPotential extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(submittedData){
        this.setState({
            loading: true
        });
        this.props.mutate({
            variables: {
                propertyId: this.props.match.params.propertyId,
                minimumRate: submittedData.minimumRate,
                maximumRate: submittedData.maximumRate,
                revenueStrategy: submittedData.revenueStrategy
            },
            //Refresh Data After Mutation
            refetchQueries: [{
                query: query,
                variables: {propertyId: this.props.match.params.propertyId}
            }]
        })
        .then(({ data }) => {
            console.log(data);
          })
        .catch((error) => {
            console.error(error);
          })
        .finally(() => {
            this.setState({
                loading: false
            });
        });
    }
    render() {
        if (this.props.data.loading || this.state.loading) {
            return <Loading/>;
        }
        if (!this.props.data.property) {
            return <NotFound/>;
        }
        const minRate = `${currency['USD']}${this.props.data.property.revenueStrategy.minimumRate}`;
        const maxRate = `${currency['USD']}${this.props.data.property.revenueStrategy.maximumRate}`;
        const strategy = `${this.props.data.property.revenueStrategy.revenueStrategy}%`;
        const updateKey = minRate+maxRate+strategy;
        return (
            <div>
                <Panel headline={'Minimum Rate'} content={minRate}/>
                <Panel headline={'Maximum Rate'} content={maxRate}/>
                <Panel headline={'Booking Probability'} content={strategy}/>
                <UpdateRevenueStrategy key={updateKey} strategy={this.props.data.property.revenueStrategy} onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

export default compose(
    graphql(query, { options: (ownProps) => ({variables: {propertyId: ownProps.match.params.propertyId}})}),
    graphql(mutation)
)(RentPotential);