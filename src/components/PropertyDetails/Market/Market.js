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
import Carousel from '../../Common/Carousel/Carousel';
import currency from '../../../util/currency';
import './Market.css';

const query = gql`
query($propertyId: String!) {
    property(propertyId: $propertyId) {
        competitiveUnits {
            distanceFromUnit,
            summary,
            unitThumbnailUrl
        }
        metrics {
            market {
                marketSize
                name
            }
            scorecard {
                rentPotential {
                    value {
                        high,
                        low,
                        rentPotential,
                        currency
                    }
                    lastUpdated
                }
            }
        }
    }
}`;

class Market extends Component {
    getRentPotentialContent(market) {
        return (
            <div>
                <h3>{'Potential '}<span>{market.value.rentPotential}</span></h3>
                <h3>{'High '}<span>{market.value.high}</span></h3>
                <h3>{'Low '}<span>{market.value.low}</span></h3>
                <h3>{'Last Updated '}<span>{market.lastUpdated}</span></h3>
            </div>
        );
    }
    getMarketInfoContent(market) {
        return (
            <div>
                <h3>{'Name '}<span>{market.name}</span></h3>
                <h3>{'Size '}<span>{market.marketSize}</span></h3>
            </div>
        );
    }
    render() {
        if (this.props.data.loading) {
            return <Loading/>;
        }
        if (!this.props.data.property) {
            return <NotFound/>;
        }
        const comps = (this.props.data.property.competitiveUnits || []).map(comp => {
            return {
                title: `${comp.distanceFromUnit.toFixed(1)}mi`,
                description: comp.summary,
                img: comp.unitThumbnailUrl
            }
        });
        return (
            <div id="market-container">
                {/* Market Info */}
                <Panel headline={'Market'} content={this.getMarketInfoContent(this.props.data.property.metrics.market)}/>
                {/* Rent Potential */}
                {
                    this.props.data.property.metrics.scorecard.rentPotential.lastUpdated ? <Panel headline={`Rent Potential ${currency[this.props.data.property.metrics.scorecard.rentPotential]}` || ''} content={this.getMarketInfoContent(this.props.data.property.metrics.scorecard.rentPotential)}/> : null
                }
                {/* Comps */}
                <h3>Competitive Units</h3>
                <Carousel data={comps}/>
            </div>
        );
    }
}

export default graphql(query, {
    options: (ownProps) => ({variables: {propertyId: ownProps.match.params.propertyId}})
})(Market);