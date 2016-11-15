import React from 'react';

export default class CodeBlockTitle extends React.Component{


  static PropTypes = {
    title: React.PropTypes.string,
    tooltip: React.PropTypes.string,
  }

  render(){

    return (

      <div style={{padding:'10px 20px'}}>

      {this.props.title || 'Example'}

      </div>
    );

  }


}
