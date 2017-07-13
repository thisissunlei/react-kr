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
		let obj = {
			name:'111',
			code:'110120',
			ip:'198.160.10.6',
			people:'你好',
			telephone:'110',
			newsContent:'dddddd'

		}
		Store.dispatch(initialize('EditNewList', obj));
		console.log('====>');
	}
	componentWillMount() {
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
							component="input"
							label="系统编码"
							left={20}
							requireLabel={true}
							grid={1/2}
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
								name="people"
								component="input"
								label="联系人"
								maxSize={300}
								requireLabel={true}
								left={20}
						/>
						<KrField 
								name="telephone"
								component="input"
								requireLabel={true}
								label="联系人手机号"
								grid={1/2}
								right={20}

								/>
						<KrField 
								component="textarea" 
								name="newsContent" 
								label="备注" 
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
	const errors = {}
	let numContr =/^[1-9]\d{0,4}$/;
	if(!values.title){
		errors.title = '请输入新闻标题';
	}
	if(values.title){
		if(values.title.length>50){
			errors.title = '新闻标题不能超过50字';
		}
	}
	if(!values.publishedTime){
		errors.publishedTime = '请选择发布时间';
	}
	if(!values.orderNum){
		errors.orderNum = '请输入排序号';
	}
	if(values.orderNum){
		var orderNum = (values.orderNum+'').replace(/(^\s*)|(\s*$)/g, "");
		if(!numContr.test(orderNum)){
			errors.orderNum = '排序号必须为五位以内正整数';
		}
	}
	if(!values.newsDesc){
		errors.newsDesc = '请输入新闻简介';
	}
	if(!values.photoUrl){
		errors.photoUrl = '请上传新闻列表图片';
	}
	
	

	return errors
}

export default EditNewList = reduxForm({
	form: 'EditNewList',
	validate,
})(EditNewList);

