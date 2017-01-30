import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class CComponent extends Component {
    constructor(props) {
        super(props);
        this.shouldUpdate;
    }

    componentDidUpdate() {
        //console.timeEnd(this.constructor.name);
    }

    componentWillUpdate() {
        //console.time(this.constructor.name);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const shouldUpdate = shallowCompare(this, nextProps, nextState);
        this.shouldUpdate = shouldUpdate;
        //console.info(this.constructor.name + ': ' + shouldUpdate);
        return shouldUpdate;
    }
}