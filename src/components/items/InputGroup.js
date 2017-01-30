import React, { Component, PropTypes } from 'react';
import CComponent from '../CComponent';

/**
 * React presentational component which renders form input group based on model
 * @param {object} model
 * @param {number} index oreder of all input groups in this form
 * @param {react components} children
 */
export default class InputGroup extends CComponent {

	constructor(props) {
		super(props);
	}

	render() {
		const {
			title, description, valid, error, pristine, type
		} = this.props.model.toObject();

		// const vClass = (valid == undefined) ? '' : (valid) ? 'has-success' : 'has-error';
		const vClass = ( !pristine && !valid ) ? 'has-error' : '';

		const label = title ? <label className='control-label super-form__item-title'>{title}</label> : null;
		const descriptionBlock = description ? <span className='super-form__item-description'>{description}</span> : null;

		const errorNode = (!pristine && error !== '')
			? <div className='help-block super-form__item-help-block super-form__item-help-block_type_error'>{error}</div>
			: null;

		return (
			<div className={'super-form__item super-form__item_type_question' + ` form-group ${vClass}`}
			style={type === 'switch' ? {textAlign: 'right'} : null}>
				{label}
				{descriptionBlock}
				{this.props.children}
				{errorNode}
			</div>
		);
	}
}

InputGroup.propTypes = {
	model: PropTypes.object.isRequired
}