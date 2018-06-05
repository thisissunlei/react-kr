
import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import State from './State';
import {ShallowEqual} from 'kr/Utils';
import Toggle from 'material-ui/Toggle';
import "./index.less";


import {
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
	Notify,
	Message,
} from 'kr-ui';
class ControlLampForm extends React.Component{
	constructor(props){
		super(props);
		this.detail = this.props.detail;
		this.state={
			detail:{},
			switchOn : false
		}
	}

	componentDidMount(){
		let {detail} = this.props;

		if(detail.extReported){
			this.setState({
				detail : detail,
				switchOn : detail.extReported.on 
			})
		}else{
			this.setState({
				detail : detail,
				switchOn : false
			})
		}
				
	}



	closeDialog=()=>{
		State.controlLampDialog= false;
	}
	
	// 编辑设备定义
	onSubmit=(values)=>{
		
	}


	switchOnEquipment=()=>{
		let {switchOn} = this.state;
		var onParam = {on:!switchOn}
		this.switchOpenLamp(onParam);
	}

	switchOpenLamp=(obj)=>{
		let _this = this;
		let {mainInfo} = this.props;
		
		var param = {serialNo:mainInfo.serialNo};
		var newParam = Object.assign(param,obj)
		Http.request('SwitchOpenLampFrost',{},newParam).then(function(response) {
			
			Message.warntimeout("操作成功",'success');

			_this.setState({
				switchOn : obj.on
			})
		
		}).catch(function(err) {
			Message.warntimeout(err.message,'error');
			
		});
	}

	freshStatus=()=>{
		let {detail} = this.props;
		let _this = this;
		Http.request('getSonEquipmentDetailInfo',{id:detail.id}).then(function(response) {
			
			_this.setState({
				switchOn: (response.extReported &&response.extReported.on )|| false
			})
			Message.warntimeout("刷新成功",'success');
			
		}).catch(function(err) {
			Message.warntimeout(err.message,'error');
		});
	}

	render(){
		
		const { error, handleSubmit, reset ,detail,mainInfo} = this.props;
		let {switchOn} = this.state;
		return(
			<div>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					
					<div>
						<KrField
							style={{width:350,display:"inline-block"}}
							inline={true}
							component="labelText"
							label="名称："
							value={mainInfo.name}
						/>
						<KrField
							style={{width:350,display:"inline-block"}}
							inline={true}
							component="labelText"
							label="序列号："
							value={mainInfo.serialNo}
						/>
						
						<div className="control-lamp-grost-line">
							<div style={{paddingLeft:10,width:90,marginTop:10,display:"inline-block"}}>
								
								<Toggle
									toggled={switchOn} 
									label={"开关："}
									style={{}}
									labelStyle={{color :"#333333" }}
									onToggle = {this.switchOnEquipment}
								/>
								
							</div>
							
						</div>
						
						<Grid>
							<Row style={{textAlign:'center',marginTop:10}}>
								<ListGroup >
									<ListGroupItem style={{padding:0,display:'inline-block',marginRight:30}}>
										<Button  label="刷新" cancle={true} type="button" onTouchTap={this.freshStatus}/>
									</ListGroupItem>
									<ListGroupItem style={{padding:0,display:'inline-block'}}>
										<Button label="关闭" cancle={true} type="button" onTouchTap={this.closeDialog}/>
									</ListGroupItem>
								</ListGroup>					
							</Row>
						</Grid>
				  	</div>
					
					
				</form>
			</div>
		);
	}
}
const validate = values=>{
	const errors={};
	// if(!values.communityId){
	// 	errors.communityId = '社区名称为必填项';
	// }
	
	return errors;
}
export default ControlLampForm = reduxForm({
	form: 'ControlLampForm',
	validate,
})(ControlLampForm);
