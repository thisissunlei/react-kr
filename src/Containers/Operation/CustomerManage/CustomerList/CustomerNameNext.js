import React from 'react';
import {reduxForm,initialize,change} from 'redux-form';
import {
	observer
} from 'mobx-react';
import mobx, {
	toJS
} from 'mobx';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message,
	Drawer
} from 'kr-ui';
import {
     NewIndent
} from 'kr/PureComponents';
import  State from "./SignedClient/State";
import  newIndentState from './NewIndent/State';

@observer
 class CustomerNameNext extends React.Component{

	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
		this.state={
		   orderList:[],
		}
	}


	//下一步被点击
	onSubmit = () => {			
        //Store.dispatch(initialize('NewIndent',{}));
		//State.orderNameInit(State.listId);
		console.log(';;;;====');
		State.switchNewIndent();
		newIndentState.cityLable="";
	}
	//下一步取消
	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	};	
    //打开新建订单
    openNewIndent=()=>{
		Store.dispatch(initialize('NewIndent',{}));
		var _this=this;
		let data={};
		data.customerId=allState.listId;

		Store.dispatch(Actions.callAPI('get-customName-orderName',data)).then(function(response) {
			allState.customerName=response.customerName;
			allState.orderCount=response.orderCount;
			newIndentState.orderName="";
		}).catch(function(err) {
			 Message.error(err.message);
		});		
	}

	render(){
		const { error, handleSubmit, pristine, reset,dataReady,open} = this.props;
		let {orderList}=this.state;
		return (
          <div>
			<form className="m-newMerchants" onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:9}} >
				<div className="title" style={{marginBottom:"30px"}}>
						<div><span className="new-icon"></span><label className="title-text">新建订单</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>
						<KrField  grid={1/2}  name="companyId" style={{width:262,display:'block',margin:'0 auto'}} component='companyName'  label="客户名称" inline={false}  placeholder='请输入客户名称' requireLabel={true}/>

						<Grid style={{marginTop:30}}>
							<Row>
								<Col md={12} align="center">
										<div  className='ui-btn-center' style={{marginRight:20,display:"inline-block"}}><Button  label="下一步" type="submit"/></div>
										<div style={{marginLeft:15,display:"inline-block"}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} /></div>
								</Col>
							</Row>
						</Grid>
				</form>

				{/*新建订单*/}
					<Drawer
							open={State.openNewIndent}
							width={750}
							openSecondary={true}
							className='m-finance-drawer'
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					 >
						<NewIndent
							 companyName={State.companyName}
							 onCancel={this.switchNewIndent}
			                 //orderReady={orderReady}
			                 listId={State.listId}
			                 customerName={State.customerName}
			                 orderCount={State.orderCount}
			                 isOpenIndent={State.orderName}

						/>
					</Drawer>
			</div>
		);
	}
}
const validate = values =>{
	const errors = {};
	if(!values.companyId){
		errors.companyId = '客户名称不能为空';
	}
	return errors;
}
export default reduxForm({ form: 'CustomerNameNext',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(CustomerNameNext);
