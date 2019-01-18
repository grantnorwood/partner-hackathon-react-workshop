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
import Panel from '../../Common/Panel/Panel';
import statusMessageMap from '../../../util/status';
import metricsMap from '../../../util/metrics';

const query = gql`
query($propertyId: String!) {
    property(propertyId: $propertyId) {
        metrics {
            scorecard {
                pageviews {
                  rankInMarket
                  pctInMarket
                  lastUpdated
                  value
                  status
                }
                reviews {
                    rankInMarket
                    pctInMarket
                    lastUpdated
                    value
                    status
                }
                minStay {
                    rankInMarket
                    pctInMarket
                    lastUpdated
                    value
                    status
                }
                lostBookings {
                    rankInMarket
                    pctInMarket
                    lastUpdated
                    value
                    status
                }
                wonBookings {
                    rankInMarket
                    pctInMarket
                    lastUpdated
                    value
                    status
                }
                searchImpressions {
                    rankInMarket
                    pctInMarket
                    lastUpdated
                    value
                    status
                }
                responseRate {
                    rankInMarket
                    pctInMarket
                    lastUpdated
                    value
                    status
                }
                netBookings {
                    rankInMarket
                    pctInMarket
                    lastUpdated
                    value
                    status
                }
                cancellationRate {
                    rankInMarket
                    pctInMarket
                    lastUpdated
                    value
                    status
                }
                declineRate {
                    rankInMarket
                    pctInMarket
                    lastUpdated
                    value
                    status
                }
                marketRank {
                    rankInMarket
                    pctInMarket
                    lastUpdated
                    value
                    status
                }
            }
        }
    }
}`;

class Metrics extends Component {
    getPercentageFromDecimal(val) {
        // Round & cut off trailing zeroes
        return (val * 100).toFixed(1).toString();
    }
    getMetricsContent(metric) {
        const percentInMarket = metric.pctInMarket !== null ? `${this.getPercentageFromDecimal(metric.pctInMarket)}%` : '';
        return (
            <div className="card-content">
                <h3>{'Rank'} <span>{metric.rankInMarket}</span></h3>
                <h3>{'Value'} <span>{metric.value}</span></h3>
                <h3>{'Status'} <span>{metric.status ? statusMessageMap[metric.status] : ''}</span></h3>
                <h3>{'Percent In Market'} <span>{percentInMarket}</span></h3>
            </div>
        )
    }
    render() {
        if (this.props.data.loading) {
            return <Loading/>;
        }
        if (!this.props.data.property) {
            return <NotFound/>;
        }
        const scoreCardElements = Object.keys(this.props.data.property.metrics ? this.props.data.property.metrics.scorecard : {})
            .filter((key) => {
                return key !== '__typename';
            })
            .filter((key) => {
                return this.props.data.property.metrics.scorecard[key].value !== null;
            })
            .map(((key) => {
                return <Panel key={key} headline={metricsMap[key] || '' } content={this.getMetricsContent(this.props.data.property.metrics.scorecard[key])}/>;
            }));
        return (
            <div id="metrics">
                {scoreCardElements}
            </div>
        );
    }
}

export default graphql(query, {
    options: (ownProps) => ({variables: {propertyId: ownProps.match.params.propertyId}})
})(Metrics);