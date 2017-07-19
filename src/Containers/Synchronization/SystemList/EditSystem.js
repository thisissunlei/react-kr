import React from 'react';
import {reduxForm,initialize} from 'redux-form';
import {Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Message,
	ListGroup,
	ListGroupItem,
	ButtonGroup
} from 'kr-ui';
import {
	observer
} from 'mobx-react';
import './index.less';
import State from './State';
@observer
class EditNewList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}
		
	}
	componentDidMount(){
		let {itemData} = this.props;
		Store.dispatch(initialize('EditNewList', itemData));
		
	}
	componentWillMount() {
	}
	componentWillReceiveProps(nextProps) {
		if(this.props.itemData != nextProps.itemData){
			Store.dispatch(initialize('EditNewList', nextProps.itemData));
		}
	}

	onCancel=()=>{
		let {onCancel}=this.props;
		onCancel && onCancel();
	}
	onSubmit=(form)=>{
		let {onSubmit}=this.props;
		onSubmit && onSubmit(form);
	}


	render() {
		const { handleSubmit} = this.props;
		let {itemData} = this.props;
		
		return (
			<div className="new-create-system">
				<div className="u-title-box">
						<img className="u-title-img" src={require('./images/activity.svg')} />
						<span className="u-title-text">编辑系统</span>
						<span className="u-close-page" onClick={this.onCancel}>
							<img 
								src={require('./images/closeIMG.svg')} 
								className="u-close-page-img"
							 />
						</span>
					</div>
				<div className="m-create-system">
							
			   <form onSubmit={handleSubmit(this.onSubmit)}>
						<KrField
							name="name"
							type="text"
							component="input"
							label="系统名称"
							style={{marginRight:30,width:280}}
							requireLabel={true}
							grid={1/2}

					 	/>
					 	<KrField
							name="code"
							component="labelText"
							label="系统编码"
							left={20}
							requireLabel={true}
							grid={1/2}
							value={itemData.code}
							inline={false}
					 	/>
					 	<KrField
							name="ip"
							type="text"
							component="input"
							label="系统IP"
							right={20}
							grid={1/2}
							requireLabel={true}
					 	/>
	                	<KrField
								grid={1/2}
								name="linkman"
								component="input"
								label="联系人"
								maxSize={300}
								requireLabel={true}
								left={20}
						/>
						<KrField 
								name="phone"
								component="input"
								requireLabel={true}
								label="联系人手机号"
								grid={1/2}
								right={20}

								/>
						<KrField 
								component="textarea" 
								name="remark" 
								label="备注" 
								maxSize={100}
								defaultValue=''
								/>
						<Grid style={{marginTop:50,width:'100%'}}>
							<Row >
								<Col md={12} align="center">
									<ButtonGroup>
										<Button  label="确定" type="submit"  />
										<Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/>
									</ButtonGroup>
								  </Col>
							</Row>
						</Grid>
				</form> 
			</div>
		</div>


		);
	}
}
const validate = values => {
	let errors = {};
	if(!values.name){
		errors.name = '请输入系统名称';
	}
	if(values.name && values.name.length>20){
		errors.name = '系统名称不能超过20字';
	}
	if(values.code && values.code.length>20){
		errors.code = '系统编码名称不能超过20字';
	}

	if(!values.code){
		errors.code = '请输入系统编码';
	}
	if(!values.ip){
		errors.ip = '请输入系统IP';
	}
	if(values.ip && values.ip.length>50){
		errors.ip = 'IP名称不能超过50字';
	}
	if(!values.linkman){
		errors.linkman = '请输入联系人';
	}
	if(values.linkman && values.linkman.length>10){
		errors.linkman = 'IP名称不能超过10字';
	}
	if(!values.phone){
		errors.phone = '请输入联系人手机号';
	}
	if( values.phone && !(/^1[34578]\d{9}$/.test(values.phone))){
		errors.phone = '请输入正确联系人手机号';
	}	

	return errors
}

export default EditNewList = reduxForm({
	form: 'EditNewList',
	validate,
})(EditNewList);

