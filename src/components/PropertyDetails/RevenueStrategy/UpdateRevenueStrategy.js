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
import NumberInput from '../../Common/Input/NumberInput';
import Button from '../../Common/Input/Button';

const CONSTANTS = {
    MIN: 'minimumRate',
    MAX: 'maximumRate',
    STRATEGY: 'revenueStrategy'
}

const getStateFromProps = (props) => {
    return {
        [CONSTANTS.MIN]: props.strategy.minimumRate || 0,
        [CONSTANTS.MAX]: props.strategy.maximumRate || 0,
        [CONSTANTS.STRATEGY]: props.strategy.revenueStrategy || 0
    }
}

class RentPotential extends Component {
    constructor(props) {
        super(props);
        this.state = getStateFromProps(this.props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.isDisabled = this.isDisabled.bind(this);
    }
    onChange (type, value) {
        this.setState({
            [type]: value
        });
    }
    onSubmit () {
        this.props.onSubmit(this.state);
    }
    isDisabled () {
        return Object.keys(this.state).some( key => this.state[key] == null ) || (this.state.min > this.state.max);
    }
    render() {
        return (
            <div id="revenue-strategy">
                <h4>{'Update Revenue Strategy'}</h4>
                <NumberInput name={'min'} label={'Min. Rate'} value={this.state[CONSTANTS.MIN]} onChange={this.onChange.bind(this, CONSTANTS.MIN)} min={0}/>
                <NumberInput name={'max'} label={'Max. Rate'} value={this.state[CONSTANTS.MAX]} onChange={this.onChange.bind(this, CONSTANTS.MAX)} min={0}/>
                <NumberInput name={'strategy'} label={'Revenue Strategy'} value={this.state[CONSTANTS.STRATEGY]} onChange={this.onChange.bind(this, CONSTANTS.STRATEGY)}  min={0} max={100}/>
                <div className="button-container">
                    <Button label="Update" onClick={this.onSubmit} disabled={this.isDisabled()}/>
                </div>
            </div>
        );
    }
}

export default RentPotential;