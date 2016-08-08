import React, { Component, PropTypes } from 'react';
import renderModel from '../utils/renderModel';
import * as itemType from '../utils/itemTypes';
import * as nestedObject from '../utils/nestedObject';
import equal from 'deep-equal';
import assignWD from '../utils/assignWithDescriptors';
import { findDOMNode } from 'react-dom';

/**
 * Presentational component that renders input fields based on provided scheme
 * @param {object} scheme
 * @param {func} setFieldValue transmits user input changes to store
 * @param {func} getFieldValue extracts user input value from store
 */
export default class FormComponent extends Component {

	constructor(props) {
		super(props);

		this.state = {
			model: []
		};

		this.setValidationStatus = this.setValidationStatus.bind(this);
		//model is the improved scheme that has properties to control the input fields
		this.state.model = this.buildModel(this.props.scheme);
		console.log('Builded model:');
		console.log(this.state.model);

		this.renderCounter = 0;
	}

	componentWillReceiveProps(nextProps) {
		const isEqual = equal(this.props.scheme.items, nextProps.scheme.items);
		if (!isEqual) {
			console.log('Scheme changed!!');
			const newModel = this.updateModel(nextProps.scheme, this.props.scheme, this.state.model);
			this.setState({
				model: newModel
			});
			console.log('New updated model:');
			console.log(newModel);
		}
	}

	buildModel(scheme) {
		const localPath = (this.props.path !== undefined) ? this.props.path : null;
		let availableRKey = 0;

		return scheme.items.map((item) => {
			if (item._type === itemType.QUESTION) {
				const needRKey = (item.name === undefined);

				return this.buildQModel(item, localPath, needRKey ? availableRKey++ : null);
			}

			return item;
		});
	}

	/**
	 * builds model for question item
	 * @param  {object} scheme
	 * @return {object}
	 */
	buildQModel(qScheme, localPath, respKey) {
		const qModel = Object.assign({}, qScheme);
		//set pointer to element in responses object, where the value of input field will be stored
		qModel._responseKey = (qModel.name) ? qModel.name : respKey;
		//dynamic changing value of field
		Object.defineProperty(qModel, "value", { 
			get: () => { 
				console.log(`responseKey: ${qModel._responseKey}`);
				return this.props.getFieldValue(localPath, qModel._responseKey);
			},
			set: (value) => { this.props.setFieldValue(localPath, qModel._responseKey, value) },
			enumerable: true
		});
		//validation status
		qModel._valid = undefined;
		return qModel;
	}

	/**
	 * updates model based on scheme changes
	 * @param  {object} scheme     new scheme
	 * @param  {object} prevScheme previous scheme
	 * @param  {object} model      current model
	 * @return {object}            new model
	 */
	updateModel(scheme, prevScheme, model) {
		console.log('New scheme:');
		console.log(scheme);
		console.log('Current model:');
		console.log(model);

		switch (scheme.items.length - prevScheme.items.length) {
			/**
			 * something changed in one of scheme items object
			 */
			case 0: {
				console.log('something changed in one of scheme items object');

				//find changed scheme item object
				let i = 0;
				while ( equal(scheme.items[i], model[i]) )
					i++;
				let oldItemLength = 0;
				let newItemLength = 0;
				for (let key in scheme.items[i])
					newItemLength++;
				for (let key in prevScheme.items[i])
					oldItemLength++;
				switch (newItemLength - oldItemLength) {
					//new property added or
					//property value changed
					case 1:
					case 0: {
						const newItem = Object.assign(model[i], scheme.items[i]);//assignWD({}, model[i], scheme.items[i]);
						model[i] = newItem;
						return model;
					}

					//some property deleted
					case -1: {
						const localPath = (this.props.path !== undefined) ? this.props.path : null;
						//find deleted property name
						let key;
						for (key in prevScheme.items[i]) {
							if (scheme.items[i][key] === undefined)
								break;
						}
						console.log(`deleted key: ${key}`);
						// const newModel = Object.assign({}, model[i]);//assignWD({}, model[i]);
						// delete newModel[key];
						// const newItem = this.buildQModel(scheme.items[i], localPath, model[i]._responseKey);
						// // newItem._valid = model[i]._valid;
						delete model[i][key];
						return model;
					}

					default: {
						console.error('wtf?!');
						return model;
					}
				}


				console.error('I am not write code here yet!');
				return model;
			}

			/**
			 * new scheme item added
			 */
			case 1: {
				console.log('new scheme item added');

				let newModel = [];
				let i = 0;
				//search for added item and accumulating all previous items into new model
				while (model[i] !== undefined && scheme.items[i] !== undefined && scheme.items[i]._id === model[i]._id) {
					const itemModel = model[i];
					newModel.push(itemModel);
					i++;
				}
				const addedItem = scheme.items[i];
				//if added item type not a question, simply add it between model items
				if (addedItem._type !== itemType.QUESTION) {
					console.log('Here!');
					return newModel.concat( [addedItem], model.slice(i) );
				}
				//Added item type is a question
				const localPath = (this.props.path !== undefined) ? this.props.path : null;
				const hasName = (addedItem.name !== undefined);
				const newQModel = this.buildQModel(addedItem, localPath, hasName ? null : i);
				//if added item nameless, we need to move response keys in remaining namelesses items right by one
				if (!hasName) {
					newModel = newModel.concat( [newQModel], model.slice(i) );
					i = i + 1;
					for (i; i < newModel.length; i++) {
						if (newModel[i].name === undefined && newModel[i]._type === itemType.QUESTION)
							++newModel[i]._responseKey;
					}
					return newModel;
				} else {
					//else simply add it between model items
					return newModel.concat( [newQModel], model.slice(i) );
				}
			}

			/**
			 * one of scheme items was deleted
			 */
			case -1: {
				console.log('one of scheme items was deleted');

				let newModel = [];
				let i = 0;
				//search for deleted item and accumulating all previous items into new model
				while (model[i] !== undefined && scheme.items[i] !== undefined && scheme.items[i]._id === model[i]._id) {
					const itemModel = model[i];
					newModel.push(itemModel);
					i++;
				}
				const delItem = model[i];
				//if deleted item type not a question, simply dont include it in new model
				if (delItem._type !== itemType.QUESTION) {
					return newModel.concat( model.slice(i+1) );
				}
				//if deleted item type is a question, we need to move response keys in remaining namelesses items left by one
				newModel = newModel.concat( model.slice(i+1) );
				for (i; i < newModel.length; i++) {
					if (newModel[i].name === undefined && newModel[i]._type === itemType.QUESTION)
						--newModel[i]._responseKey;
				}
				return newModel;
			}

			default: {
				console.error('wtf?!');
				return model;
			}
		}
	}

	setValidationStatus(fieldKey, status) {
		const fieldCopy = Object.assign({}, this.state.model[fieldKey], {
			_valid: status
		});

		const newModel = this.state.model.slice();
		newModel[fieldKey] = fieldCopy;

		console.log('new model:');
		console.log(newModel);

		this.setState({
			model: newModel
		});
	}

	render() {
		console.log(' ');
	  console.log('Component render tymes: ' + ++this.renderCounter);
	  console.log(' ');
		//model is the improved scheme that has properties to control the input fields
		// this.state.model = this.buildModel(this.props.scheme);

		const model = this.state.model;
		const formTitle = this.props.scheme.title;

		return (
			<div>
				{
					formTitle
					? <legend>{formTitle}</legend>
					: null
				}
				{renderModel(model)}
			</div>
		)
	}
}

FormComponent.propTypes = {
	scheme: PropTypes.object.isRequired,
	setFieldValue: PropTypes.func,
	getFieldValue: PropTypes.func
}

	// componentWillReceiveProps(nextProps) {
	// 	// console.log('FormComponent previousProps:');
	// 	// console.log(this.props);
	// 	// console.log('FormComponent nextProps:');
	// 	// console.log(nextProps);
	// 	// const isEqual = equal(this.props, nextProps);
	// 	// console.log(`Equal? -${isEqual}`);
	// 	// console.log(' ');

	// 	// console.log('EQUAL TEST:');
	// 	// for (let key in nextProps.scheme.items) {
	// 	// 	let isSame = this.props.scheme.items[key] === nextProps.scheme.items[key];
	// 	// 	console.log(`items with key = ${key} same? -${isSame}-`);
	// 	// }
	// 	// console.log(' ');
	// 	// this.state.model = this.buildModel(this.props.scheme);
	// }
	// 
		/**
	 * builds model from scheme
	 * @param  {object}  scheme
	 * @return {object}
	 */
	// buildModel(scheme) {
	// 	//copying scheme to solo object
	// 	const model = scheme.items.map( (item, i) => (Object.assign({}, item)));
	// 	//define responses object location relative to root store object
	// 	const localPath = (this.props.path !== undefined) ? this.props.path : null;

	// 	let nextAvailableResponsesKey = 0;
	// 	for (let key in model) {
	// 		let item = model[key];

	// 		if (item._type === itemType.QUESTION) {
	// 			//questions must contain special properties that handle input fields behavior
	// 			const qModel = item;
	// 			//set pointer to element in responses object, where the value of input field will be stored
	// 			qModel._responseKey = (qModel.name) ? qModel.name : nextAvailableResponsesKey++;
	// 			//dynamic changing value of field
	// 			Object.defineProperty(qModel, "value", { 
	// 				get: () => ( this.props.getFieldValue(localPath, qModel._responseKey) ),
	// 				set: (value) => { this.props.setFieldValue(localPath, qModel._responseKey, value) }
	// 			});
	// 			//validation status
	// 			qModel._valid = undefined;


	// 			//is value belongs to input type and passes validation rule
	// 			// Object.defineProperty(qModel, "_valid", {
	// 			// 	set: (value) => { this.setValidationStatus(key, value)}
	// 			// });
	// 		}
	// 	}

	// 	console.log('Builded model: ');
	// 	console.log(model);
	// 	return model;
	// }