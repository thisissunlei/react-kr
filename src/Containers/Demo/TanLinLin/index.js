import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message,
	SnackTip,
	ListGroup,
	ListGroupItem,
} from 'kr-ui';
import './index.less';

class ZhangQu extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			open:true,
			checkedStations:[],
		}
	}
	componentWillMount() {
	}

	componentDidMount(){
		
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
