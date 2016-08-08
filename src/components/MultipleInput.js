import React, { Component, PropTypes } from 'react';
import FormComponent from '../components/FormComponent';
import * as nestedObject from '../utils/nestedObject';
import { OPTION } from '../utils/inputTypes';
import InputOption from './inputs/InputOption';

const initialState = {
	scheme: {
		items: []
	}
}

export default class MultipleInput extends Component {

	constructor(props) {
		super(props);

		this.state = initialState;

		this.getOptionTemplate = this.getOptionTemplate.bind(this);
		this.addOption = this.addOption.bind(this);
		this.removeOption = this.removeOption.bind(this);
	}

	componentWillMount() {
		this.addOption();
	}

	getOptionTemplate() {
		return {
			_type: 'question',
			type: OPTION,
			removeOption: this.removeOption
		};
	}

	addOption() {
		const endIndex = this.state.scheme.items.length;

		const newScheme = nestedObject.setProperty(this.state.scheme, ['items'], endIndex, this.getOptionTemplate());

		this.setState({
			scheme: newScheme
		});
	}

	removeOption(index) {
		const newScheme = nestedObject.removeProperty(this.state.scheme, ['items'], index);

		this.setState({
			scheme: newScheme
		});
	}

	render() {
		const {
			model: {
				getFieldValue,
				setFieldValue,
				path,
				name
			}
		} =  this.props;

		const model = {
			getFieldValue,
			setFieldValue,
			path: `${path}.${name}`,
			name
		};

		return (
			<div>
				<FormComponent scheme={this.state.scheme} {...model} />

				<button type="button" className="btn btn-default" onClick={this.addOption}>+</button>
			</div>
		);
	}
}

MultipleInput.propTypes = {
	model: PropTypes.object.isRequired
}