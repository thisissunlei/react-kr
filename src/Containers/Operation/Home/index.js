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
	

} from 'kr-ui';
import  "./index.less";
import {Http,DateFormat} from "kr/Utils";
import {
	observer,
	inject
} from 'mobx-react';

@observer

class Home  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	componentDidMount(){
	}

	render(){
		
		return(
			<div style={{border:'1px solid red',minHeight:'910'}}>

	     	</div>

		);
	}
}

export default Home;
