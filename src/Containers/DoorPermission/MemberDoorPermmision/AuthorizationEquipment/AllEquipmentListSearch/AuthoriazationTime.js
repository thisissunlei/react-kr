

import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,change,reset} from 'redux-form';
import {
	Title,
	Button,
	Section,
	Dialog,
	Message,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Tooltip,
	KrField
} from 'kr-ui';
// import warning from "./images/warning.svg";
import {Http,DateFormat} from 'kr/Utils';
import './index.less';

import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

class AddEquipmentToGroup extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			endAt:'',
			startAt : '',
		}
	}

	componentDidMount(){
		
	}



	onSubmit=(values)=>{
		
		
		if(values.startAt && values.endAt){
			var start=Date.parse(DateFormat(values.startAt,"yyyy-mm-dd hh:MM:ss"));
			var end=Date.parse(DateFormat(values.endAt,"yyyy-mm-dd hh:MM:ss"));
			if(start>end){
				Message.warntimeout("结束时间不能小于开始时间","error");
				return ;
			}

			var endTime = values.endAt;
			endTime = endTime.substring(0,10)+" 23:59:59";
			var params = {
				startAt : values.startAt,
				endAt : endTime
			}
			let {confirmAuthoriazationEquipment} = this.props;
			confirmAuthoriazationEquipment && confirmAuthoriazationEquipment(params);
		}
	}
	
	cancleAuthoriazation=()=>{

		console.log("sldkflkflkd");
		let {onCancel} = this.props;
		onCancel && onCancel();
	}

	onStartChange=(sdate)=>{
		let {endAt}=this.state;
		let start=Date.parse(DateFormat(sdate,"yyyy-mm-dd hh:MM:ss"));
		if(endAt){
			var end=Date.parse(DateFormat(endAt,"yyyy-mm-dd hh:MM:ss"))
		}
		if(endAt&&start>end){
			Message.warntimeout("结束时间不能小于开始时间","error");
			return ;
		}

		Store.dispatch(change('DeleteMemberFromGroup','startAt',sdate));

		this.setState({
			startAt : sdate
		});

	}
	onEndChange=(edate)=>{
		let {startAt}=this.state;
		
		let end=Date.parse(DateFormat(edate,"yyyy-mm-dd hh:MM:ss"));
		if(startAt){
			var start=Date.parse(DateFormat(startAt,"yyyy-mm-dd hh:MM:ss"));
		}
		if(startAt&&start>end){
			Message.warntimeout("结束时间不能小于开始时间","error");
			
			return ;
		}
		Store.dispatch(change('AddEquipmentToGroup','endAt',edate));			 
		
		this.setState({
			endAt : edate
		});
	}

	render() {
		let {} = this.props;
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} className="search-form-second-door">
			
				<div style={{marginTop:20}}>
					<ListGroup>
						<ListGroupItem>
							
							<KrField label="开始时间：" 
								name="startAt" component="date" 
								inline={false} 
								style={{width:366}} 
								onChange={this.onStartChange} 
								placeholder="日期"
							/>
							
						</ListGroupItem>

						<ListGroupItem>
							<KrField label="结束时间：" 
								name="endAt" component="date" 
								inline={false} 
								style={{width:366}} 
								onChange={this.onEndChange}  
								placeholder="日期"
							/>
						</ListGroupItem>
						
					</ListGroup>
					<Grid style={{marginTop:30,marginBottom:'4px'}}>
						<Row>
							<ListGroup>
								<ListGroupItem style={{width:170,textAlign:'right',padding:0,paddingRight:15}}>
								<Button  label="确定" type="submit"  />
								</ListGroupItem>
								<ListGroupItem style={{width:170,textAlign:'left',padding:0,paddingLeft:15}}>
								<Button  label="取消" type="button"  cancle={true} onTouchTap={this.cancleAuthoriazation} />
								</ListGroupItem>
							</ListGroup>
						</Row>
					</Grid>
				</div>
			</form>
		);

	}

}
const validate = values => {
	
	const errors = {}
	if (!values.startAt) {
		errors.startAt = '请选择授权开始时间';
	}
	if (!values.endAt) {
		errors.endAt = '请选择授权结束时间';
	}
	
	return errors
}
export default AddEquipmentToGroup = reduxForm({
	form: 'AddEquipmentToGroup',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(AddEquipmentToGroup);

