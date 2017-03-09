import React, { PropTypes } from 'react';



export default class Editor extends React.Component{

  static displayName = 'Editor';

  constructor(props) {
    super(props);
  }

  componentDidMount(){
          var ue = UE.getEditor('container');
  }

  render() {

    return (
       <div id="container"> sdfdsds </div>
       );
  }
}
