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
import Panel from '../../Common/Panel/Panel';

const query = gql`
query($propertyId: String!) {
    property(propertyId: $propertyId) {
        legacyId
        externalId
        unitUuid
    }
}`;

class Basic extends Component {
    render() {
        if (this.props.data.loading) {
            return <Loading/>;
        }
        if (!this.props.data.property) {
            return <NotFound/>;
        }
        return (
            <div>
                <Panel headline={'Legacy ID'} content={this.props.data.property.legacyId}/>
                <Panel headline={'External ID'} content={this.props.data.property.externalId}/>
                <Panel headline={'Unit ID'} content={this.props.data.property.unitUuid}/>
            </div>
        );
    }
}

export default graphql(query, {
    options: (ownProps) => ({variables: {propertyId: ownProps.match.params.propertyId}})
})(Basic);