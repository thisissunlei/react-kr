import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {reduxForm,formValueSelector,initialize,change,FieldArray} from 'redux-form';
import {
	bindActionCreators
} from 'redux';

import {
	Section,
	PlanMap,
	Dialog,
	Button,
	KrField
} from 'kr-ui';

class ZhangQu extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			open:true,
			checkedStations:[],
		}

	}

	close = ()=>{
		this.setState({
			open:!this.state.open
		})
	}

	confirm = ()=>{
		this.close();
		console.log('resule:',this.state.checkedStations);
	}

	onCheckedStation =(clickStation,checkedStations)=>{
		this.setState({
			checkedStations
		});
	}

	componentDidMount() {}

	render() {
       

        
		return (
			<div>
					{/*<Dialog
						title="平面图"
						contentStyle={{width:1000}}
						actions={<Button label="确定" onTouchTap={this.confirm}/>}
						onClose={this.close}
						bodyStyle={{paddingLeft:0,paddingRight:0}}
						open={this.state.open} >
								<PlanMap onCheckedStation={this.onCheckedStation} />
				   </Dialog>*/}
               <form>
			       <KrField name="uploadImage" 
								component="uploadImage" 
								style={{marginTop:10}} 
								photoSize={'212*136'} 
								pictureFormat={'JPG'} 
								pictureMemory={'32K'}
								//requestURI = {this.state.requestURI}
					/>

			  </form>

             

			</div>

		);
	}
}

export default reduxForm({ form: 'ZhangQu'})(ZhangQu);
