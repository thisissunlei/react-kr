import React from 'react';
import {
  reduxForm,
  change,
  arrayPush,
  initialize
} from 'redux-form';

import {
  Actions,
  Store
} from 'kr/Redux';
import {
	Title,Dialog,
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,

} from 'kr-ui';
import nothings from '../images/nothings.png';
import  "../index.less";
import State from '../State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

class NullTable  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	componentDidMount(){
	}

	render(){
		let imgStyle= {
			display:'block',
			margin:'0 auto'
		};
		let fontStyle= {
			display:'inline-block',
			marginLeft:20,
			marginTop:10
		}
		
		
		return(
			<div style={{height:570}}>
				<div style={{textAlign:'center',marginTop:120}}>
					<img src={nothings} style={imgStyle}/>
					<div style={fontStyle}>暂时还没有数据呦~</div>
				</div>
				

	     	</div>

		);
	}
}

export default NullTable;
