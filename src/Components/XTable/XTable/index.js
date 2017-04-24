import React from 'react';

export default class XTable extends React.Component {

  static defaultProps = {
    
      config:{
        page:1,
        pageSize:20,
        pageOpen:true,
        exportOpen:true,
      }

  }

  static propTypes = {

    params:React.PropTypes.object,

    onExport:React.PropTypes.func,
    onLoading:React.PropTypes.func,
    onLoaded:React.PropTypes.func,

    config:React.PropTypes.object,

  }

  constructor(props,context){
    super(props,context);


  }

  render(){

    return (<div></div>);

  }

}
