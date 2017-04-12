import React, { PropTypes } from 'react';


import RippleContainer from '../Lib/RippleContainer';
import CircleShadow from '../Lib/CircleShadow';


export default class extends React.Component{

  static displayName = 'ListItem';

  constructor(props) {
    super(props);
  }




  renderRipples = (disabled, onClick, styles = [])=>{
    if (disabled) {
      return null;
    }

        let endStyle = {};
        styles.map(function(item,index){
            endStyle = Object.assign({},endStyle,item);
        });

    return (
      <RippleContainer
        onClick={ onClick }
        style={endStyle} />
    );
  }


  render() {



    return (
      <div style={ {
        cursor: 'pointer',
        display: 'inline-block',
        height: 24,
        padding: 8,
        position: 'relative',
        width: 24,
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        outline: 'none'
      }}>

        <CircleShadow
          active={ true }
          styles={{
            backgroundColor:'#ddd',
            height: 24,
            left: 0,
            padding: 0,
            top: 8,
            transform: 'scale(2) translateZ(0)',
            width: 24
          }}
        />
          x
      </div>

    );
  }
}
