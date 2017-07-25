import React from 'react';
import {	
   Drawer
} from 'kr-ui';
import AddPerson from './AddPerson';

export default class AddPostPeople  extends React.Component{

	constructor(props,context){
		super(props, context);
	}
	
	render(){

		return(

			<div>
                   {/*新建用户*/}
					<Drawer
							open={this.props.open}
							width={750}
							openSecondary={true}
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
							onClose={this.props.onClose}
					 >
						<AddPerson
						   dimId={this.props.dimId||""}
			               onCancel={this.props.onCancel}
						   onSubmit={this.props.onSubmit}   
						/>
					</Drawer>
			</div>
		);
	}
}
