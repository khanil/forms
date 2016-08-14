import React, { Component, PropTypes } from 'react';
// import renderInput from './InputComponents/renderInput';
import equal from 'deep-equal';

export default class InputGroup extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {
			model
		} =  this.props;

		const vClass = (model._valid == undefined) ? '' : (model._valid) ? 'has-success' : 'has-error';
		// const vClass = ( model._valid != undefined && !model._valid ) ? 'has-error' : '';

		const errorNode = (model._error)
			? <div className='help-block'>{model._error}</div>
			: null;

		return (
			<div className={`form-group ${vClass}`}>
				{
					model.title 
					? <label className='control-label'>{model.title}</label>
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