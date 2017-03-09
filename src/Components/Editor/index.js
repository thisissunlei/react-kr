import React, { PropTypes } from 'react';



export default class Editor extends React.Component{

  static displayName = 'Editor';

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    var um = UM.getEditor('myEditor');
  }

  render() {

    return (
       <div id="myEditor"> sdfdsds </div>
       );
  }
}
