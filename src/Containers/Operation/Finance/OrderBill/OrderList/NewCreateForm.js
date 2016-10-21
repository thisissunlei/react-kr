
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
} from 'kr-ui';


 class NewCreateForm extends Component{

	 static PropTypes = {
		 onSubmit:React.PropTypes.func,
		 onCancel:React.PropTypes.func,
	 }

	constructor(props){
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.state={
			communityList:[],
			mainbilltypeList:[]
		}
		
	}
	componentDidMount() {

		var _this = this;
		Store.dispatch(Actions.callAPI('getFinaDataCommunityAndMainBillType')).then(function(response){
			//console.log("88888",response.communityAndMainBillTypeMap)
			const communityList=response.communityAndMainBillTypeMap.communityList
			const mainbilltypeList=response.communityAndMainBillTypeMap.mainbilltypeList
			communityList.map(function(item,index){
				 item.label = item.communityname;
				 item.value=item.id
				 return item;
			});
             
            mainbilltypeList.map(function(item,index){
				 item.label = item.mainBillTypeDesc;
                 item.value=item.mainBillTypeValue;
				return item;
			});

			_this.setState({
				communityList,
				mainbilltypeList
			});


			
		}).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		});

		
	}
	 onSubmit(values){
		 /*var _this = this;
		Store.dispatch(Actions.callAPI('getFinaDataCommunityAndMainBillType',{},values)).then(function(response){
			
 			}).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		});*/
		 const {onSubmit} = this.props;
		 onSubmit && onSubmit(values);

	 }

	 onCancel(){
		 const {onCancel} = this.props;
		
		 onCancel && onCancel();
		 
	 }

	render(){
        //console.log(",,,,,,",this.state.mainbilltypeList)
		const { error, handleSubmit, pristine, reset} = this.props;

		return (

			<form onSubmit={handleSubmit(this.onSubmit)}>
				<KrField name="customername" type="text" label="客户名称" /> 
				<KrField name="communityid" type="select" label="所属社区" options={this.state.communityList} >
				</KrField>
				<KrField name="mainbilltype" type="select" label="订单类型" options={this.state.mainbilltypeList}>
				</KrField>
				<KrField  name="startDate" component="date" label="起始时间"/>
				<KrField name="endDate" component="date" label="结束时间"/>
             
				

				<Grid style={{marginTop:30}}>
					<Row>
						<Col md={8}></Col>
						<Col md={2}> <Button  label="确定" type="submit" primary={true} /> </Col>
						<Col md={2}> <Button  label="取消" type="button"  onTouchTap={this.onCancel} /> </Col>
					</Row>
				</Grid>
				</form>
		);
	}
}


export default reduxForm({ form: 'newCreateForm'})(NewCreateForm);
