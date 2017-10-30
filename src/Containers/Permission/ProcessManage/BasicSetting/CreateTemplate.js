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
	CircleStyleTwo,
	ButtonGroup
} from 'kr-ui';
import {
	observer
} from 'mobx-react';
import './index.less';
@observer
class CreateNewList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}
		
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
			<div className="g-create-template">
					<div className="u-title-box">
						<img className="u-title-img" src={require('./images/icon-t.svg')} />
						<span className="u-title-text">模板设置——普通模式</span>
						<span className="u-close-page" onClick={this.onCancel}>
							<img 
								src={require('./images/closeIMG.svg')} 
								className="u-close-page-img"
							 />
						</span>
					</div>
			   <form onSubmit={handleSubmit(this.onSubmit)}>
						<KrField
							name="name"
							type="text"
							component="input"
							label="模板名称"
							requireLabel={true}
							grid={1/2}
					 	/>
						<Grid style={{marginTop:50,width:'81%'}}>
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


		);
	}
}
const validate = values => {
	const errors = {}
	let numContr =/^[1-9]\d{0,4}$/;
	if(!values.name){
		errors.name = '请输入新闻标题';
	}
	if(values.name){
		if(values.name.length>20){
			errors.name = '模板名称不能超过20字';
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
	if(!values.newsContent){
		errors.newsContent = '请输入新闻内容';
	}
	
	

	return errors
}

export default CreateNewList = reduxForm({
	form: 'createNewList',
	validate,
})(CreateNewList);

