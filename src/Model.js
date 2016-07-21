/**
 * builds model from scheme
 * @param  {object}  scheme
 * @return {object}
 */
export default function buildModel(scheme) {
  //copying scheme to solo object
  const model = scheme.questions.map( (item, i) => (Object.assign({}, item)));

  let nextAvailableResponsesKey = 0;
  for (let key in model) {
    let item = model[key];

    if (item._type === 'question') {
      //set pointer to element in responses object, where the value of input field will be stored
      item._responseKey = nextAvailableResponsesKey;
      nextAvailableResponsesKey++;

      //dynamic changing value of field
      Object.defineProperty(item, "value", { 
        get: () => (this.state.responses[item._responseKey]),
        set: (value) => {
          const newResponsesState = this.state.responses.slice();
          newResponsesState[item._responseKey] = value;
          this.setState({responses: newResponsesState});
        }
      });
    }
  }

  console.log('Builded model: ');
  console.log(model);
  return model;
}