
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
	ButtonGroup
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
			
			const communityList=response.communityList
			const mainbilltypeList=response.mainbilltypeList
           
			

			communityList.map(function(item,index){
				 item.label = item.communityname;
				 item.value=item.id
				 return item;
			});
             
            mainbilltypeList.map(function(item,index){
				 item.label = item.mainBillTypeDesc;
                 item.value=item.mainbilltype;
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
		 const {onSubmit} = this.props;
		 onSubmit && onSubmit(values);
	 }

	 onCancel(){
		 const {onCancel} = this.props;
		
		 onCancel && onCancel();
		 
	 }

	render(){


        
       
		const { error, handleSubmit, pristine, reset} = this.props;

		return (

			<form onSubmit={handleSubmit(this.onSubmit)}>
			   
				<KrField grid={1/2} name="customername" type="text" label="公司名称" /> 
				<KrField grid={1/2} component="labelText"/> 
				<KrField grid={1/2} name="communityid"  type="select" label="所属社区" options={this.state.communityList} >
				</KrField>
				<KrField  grid={1/2} name="mainbilltype" type="select" label="订单类型" options={this.state.mainbilltypeList}>
				</KrField>
				<KrField  grid={1/2} name="startDate" component="date" label="起始时间"/>
				<KrField grid={1/2} name="endDate" component="date" label="结束时间"/>
             
				

				<Grid style={{marginTop:30}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
			</form>
		);
	}
}


export default reduxForm({ form: 'newCreateForm'})(NewCreateForm);
