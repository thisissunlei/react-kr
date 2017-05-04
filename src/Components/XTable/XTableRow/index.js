import React from 'react';

export default class XTableRow extends React.Component {

  static displayName = "XTableRow";


  static defaultProps = {
  }
  static propTypes = {
    name:React.PropTypes.string,
    type:React.PropTypes.string,
    component:React.PropTypes.any,
    format:React.PropTypes.string,
    defaultValue:React.PropTypes.string,
    width:React.PropTypes.any,
  }

  constructor(props,context){
    super(props,context);
  }

  render(){
    return (
      <div> </div>
    );

  }


}
