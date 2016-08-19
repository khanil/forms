import React, { Component, PropTypes } from 'react';

/**
 * React presentational component which renders form input group based on model
 * @param {object} model
 * @param {number} index oreder of all input groups in this form
 * @param {react components} children
 */
export default class InputGroup extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {
			title, valid, error, pristine
		} = this.props.model.toObject();

		// const vClass = (valid == undefined) ? '' : (valid) ? 'has-success' : 'has-error';
		const vClass = ( !pristine && !valid ) ? 'has-error' : '';
		// const vClass = ( !valid ) ? 'has-error' : '';

		const errorNode = (!pristine && error !== '')
			? <div className='help-block'>{error}</div>
			: null;

		return (
			<div className={`form-group ${vClass}`}>
				{
					title 
					? <label className='control-label'>{title}</label>
					: null
				}
				
				{this.props.children}
				{errorNode}
			</div>
		);
	}
}

InputGroup.propTypes = {
	model: PropTypes.object.isRequired
}