import React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
@inject("NavModel")
@observer
export default class Help extends React.Component{

	constructor(props,context){
		super(props, context);
	}
	componentDidMount(){
		const {NavModel} = this.props;
		NavModel.toggleSidebar();
	}

	render(){

		return(

			<div>
				<div className="m-welcome">
					<h1>Welcome</h1>
				</div>
			</div>
		);

	}

}
