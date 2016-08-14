import React, { Component, PropTypes } from 'react';

export default class InputInteger extends Component {

  constructor(props) {
    super(props);

    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    var oFReader = new FileReader();
    console.log(e.target.files[0].value);
    oFReader.readAsDataURL(e.target.files[0]);

    oFReader.onload = (oFREvent) => {
      this.props.model.value = oFREvent.target.result;
    };
  };

  render() {
    const {
      model
    } = this.props;

    return (
      <div>
        {
          model.value
          ? <img style={{width: '100px', height: '100px'}} src={model.value}/>
          : ''
        }
        <form>
          <input type="file" name="myPhoto" onChange={this.changeHandler} />
        </form>
      </div>
    );
  }
}

{/*<input type="file" className="form-control" onChange={this.changeHandler} />*/}