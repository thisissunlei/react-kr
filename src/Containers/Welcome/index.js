import React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';


import UpdateLog from '../UpdateLog';


@inject("NavModel")
@observer
export default class Help extends React.Component{

	constructor(props,context){
		super(props, context);
		  var docuH = document.body.getBoundingClientRect().height-102;
		  var docuW = document.body.getBoundingClientRect().width;
		  this.state={
		      styles:{
		        height:docuH,
		        width:docuW,
		      },
		     
		    }
	}

	componentDidMount(){
		const {NavModel} = this.props;
		NavModel.setSidebar(false);
	}

	render(){
		const {
	      styles,
	    } = this.state;
		return(

			<div>
				<div className="m-welcome" style={styles}>
				</div>

						<UpdateLog />
			</div>
		);

	}

}
