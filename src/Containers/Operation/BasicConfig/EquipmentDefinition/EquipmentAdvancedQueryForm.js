
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
	Notify,
	ButtonGroup,
  	ListGroup,
  	ListGroupItem,
	SearchForm,
	Message,
} from 'kr-ui';
class EquipmentAdvancedQueryForm extends Component{
	constructor(props){
		super(props);
		this.state={
			searchForm: false
		}
	}
	onSubmit=(values)=>{
		let {content,filter} = this.props;
		let {searchForm} = this.state;
		if (!searchForm){
			values.type = filter;
			values.value = content;
		}
		if(!values.type){
			values.type = filter;
		}
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}
	onReset=()=>{
		Store.dispatch(reset('EquipmentAdvancedQueryForm',''));
		const {onReset} = this.props;
		onReset && onReset();
	}
	onFilter=(search)=>{
		this.setState({searchForm:true});
		Store.dispatch(change('EquipmentAdvancedQueryForm','type',search.value));
		Store.dispatch(change('EquipmentAdvancedQueryForm','value',search.content));
	}
	render(){
		const { error, handleSubmit,content,filter} = this.props;
		let options=[{
	      label:"门编号",
	      value:"doorNum"
	    },{
	      label:"硬件编号",
	      value:"hardwareNums"
	    }]
	    // 类型待选项
		let typeOptions = [{
			label: '门禁',
			value: 'doorLock'
		}, {
			label: '全部',
			value: ''
		}];
		// 属性待选项
		let propertyOption=[{
			label: '大门',
			value: 'bigDoor'
		},{
			label: '会议室',
			value: 'meetingRoom'
		},{
			label: '功能室',
			value: 'functionRoom'
		},{
			label: '全部',
			value: ''
		}]
		// 对应功能选项
		let correspondingFunction =[{
			label: '开门',
			value: 'openDoor'
		},{
			label: '开门／预定',
			value: 'openOrReserve'
		},{
			label: '预定',
			value: 'reserve'
		},{
			label: '全部',
			value: ''
		}]
		// console.log("filter",filter,"content",content);
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:'37px',marginLeft:'40px'}}>
				<ListGroup >
					<ListGroupItem style={{marginBottom:5}}>
						<SearchForm 
							searchFilter={options} 
							style={{width:252,marginBottom:10}} 
							defaultFilter={filter} 
							defaultContent={content} 
							onSubmit={this.onFilter}
						/>
					</ListGroupItem>
				</ListGroup>
				<KrField name="communityName" 
					component="searchCommunity" 
					onChange = {this.onChangeSearchCommunity}
					label="社区名称"    
					style={{width:'252px',margin:'0 35px 5px 0'}}
				/>
				<KrField name="floor" 
					component="searchCommunity" 
					label="楼层" 
					style={{width:'252px'}}
				/>
				<KrField name="equipmentType" 
					component="select" 
					label="类型" 
					onChange = {this.onchooseType}
					options={typeOptions} 
					style={{width:'252px',margin:'0 35px 5px 0'}}
				/>
				<KrField name="property" 
					component="select" 
					label="属性"
					onChange = {this.onchooseProperty}
					options={propertyOption}  
					style={{width:'252px'}}
				/>
				<KrField name="correspondingFunction" 
					component="select" 
					options={correspondingFunction}
					label="对应功能"
					onChange = {this.onchooseCorrespondingFunction}
					style={{width:'252px',margin:'0 35px 5px 0'}}
				/>
				<KrField name="correspondingLocation" 
					component="select" 
					options={correspondingFunction}
					label="对应位置"
					onChange = {this.onchooseCorrespondingLocation}  
					style={{width:'252px'}}
				/>
				<Grid style={{margin:"20px 0 3px -10px"}}>
					<Row>
						<ListGroup>
							<ListGroupItem style={{width:'269px',textAlign:'right',padding:0,paddingRight:15}}>
								<Button  label="确定" type="submit"/>
							</ListGroupItem>
							<ListGroupItem style={{width:'254px',textAlign:'left',padding:0,paddingLeft:15}}>
								<Button  label="重置" type="button"  cancle={true} onTouchTap={this.onReset} />
							</ListGroupItem>
						</ListGroup>
					</Row>
				</Grid>
		  </form>
		);
	}
}
export default EquipmentAdvancedQueryForm = reduxForm({
	form: 'EquipmentAdvancedQueryForm',
	// validate,
	// enableReinitialize: true,
	// keepDirtyOnReinitialize: true,
})(EquipmentAdvancedQueryForm);
