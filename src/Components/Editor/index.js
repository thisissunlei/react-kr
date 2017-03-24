import React, { PropTypes } from 'react';



export default class Editor extends React.Component{

  static displayName = 'Editor';

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    let _this= this;
        var ue = UE.getEditor('container', {
          toolbars:   _this.props.toolbars,
          autoHeightEnabled: this.props.autoHeightEnabled,
          autoFloatEnabled: this.props.autoFloatEnabled,
          elementPathEnabled: this.props.elementPathEnabled,
          maximumWords:this.props.maximumWords,
          enableAutoSave : this.props.enableAutoSave,
          initialFrameHeight: _this.props.initialFrameHeight
    });
  }

  render() {
    let {label} = this.props;
    return (
       <div id="container"> <span style={{display:'inline-block',width:'100%',height:20,marginBottom:10}}>{label}</span> </div>
       );
  }
}
