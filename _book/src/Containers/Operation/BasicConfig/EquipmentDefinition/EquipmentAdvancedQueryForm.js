
import React from 'react';
import {reduxForm,change,initialize,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	SearchForm,
} from 'kr-ui';
class EquipmentAdvancedQueryForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			searchForm: false,
			floorsOptions:[{label:"",value:""}],
		}
	}
	componentWillReceiveProps(){
	}
	componentDidMount(){
		let _this = this;
		Store.dispatch(change('EquipmentAdvancedQueryForm','type',this.props.filter));
		Store.dispatch(change('EquipmentAdvancedQueryForm','value',this.props.content));
	}
	// 提交
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
		const {onSubmit} =this.props;
		onSubmit && onSubmit(values);
	}
	// 重置
	onReset=()=>{
		Store.dispatch(reset('EquipmentAdvancedQueryForm',''));
		this.refs.IndexsearchForm.refs.componentSearchInput.value = "";
		Store.dispatch(change('EquipmentAdvancedQueryForm','type',"deviceCode"));
		const {onReset} = this.props;
		onReset && onReset();

	}
	// 过滤器失去焦点执行
	onFilter=(search)=>{
		this.setState({searchForm:true});
		if(search.content){
			Store.dispatch(change('EquipmentAdvancedQueryForm','type',search.value));
			Store.dispatch(change('EquipmentAdvancedQueryForm','value',search.content));

		}else{
			Store.dispatch(change('EquipmentAdvancedQueryForm','type',search.value));
			Store.dispatch(change('EquipmentAdvancedQueryForm','value',''));
		}
	}
	// 查询楼层
	onSearchFloor=(community)=>{
		let _this = this;
		if(community == null){
			return;
		}
		let CommunityId = {
			communityId : community.id
		}
    	Http.request('getFloorByComunity',CommunityId)
    	.then(function(response){
    		var arrNew = []
    		for (var i=0;i<response.whereFloors.length;i++){
    			arrNew[i] = {label:response.whereFloors[i],value:response.whereFloors[i]}
    		}
    		_this.setState({
    			floorsOptions : arrNew
    		})
    	}).catch(function(err){
    	})
	}

	render(){
		let {floorsOptions}=this.state;
		const { error, handleSubmit,content,filter} = this.props;
		let options=[{
	      label:"门编号",
	      value:"deviceCode"
	    },{
	      label:"硬件编号",
	      value:"hardwareId"
	    }]
	    // 类型待选项
		let typeOptions = [{
			label: '门禁',
			value: 1
		}];
		// 属性待选项
		let propertyOption=[{
			label: '大门',
			value: 1
		},{
			label: '会议室',
			value: 2
		},{
			label: '独立办公室',
			value: 3
		},{label: '路演厅',value: 4},{label: '配置门',value: 5}]
		// 对应功能选项
		let correspondingFunction =[{
			label: '开门',
			value: 1
		},{
			label: '开门／预定',
			value: 2
		},{
			label: '预定',
			value: 3
		}]
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
							ref ="IndexsearchForm"
						/>
					</ListGroupItem>
				</ListGroup>
				<KrField name="communityId"
					component="searchCommunity"
					onChange = {this.onChangeSearchCommunity}
					label="社区名称"
					style={{width:'252px',margin:'0 35px 5px 0'}}
					onChange = {this.onSearchFloor}
				/>
				<KrField name="floor"
					component="select"
					label="楼层"
					options = {floorsOptions}
					errors={{requiredValue:'社区为必填项'}}
					style={{width:'252px'}}
				/>
				<KrField name="typeId"
					component="select"
					label="类型"
					onChange = {this.onchooseType}
					options={typeOptions}
					style={{width:'252px',margin:'0 35px 5px 0'}}
				/>
				<KrField name="propertyId"
					component="select"
					label="属性"
					onChange = {this.onchooseProperty}
					options={propertyOption}
					style={{width:'252px'}}
				/>
				<KrField name="functionId"
					component="select"
					options={correspondingFunction}
					label="对应功能"
					onChange = {this.onchooseCorrespondingFunction}
					style={{width:'252px',margin:'0 35px 5px 0'}}
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
