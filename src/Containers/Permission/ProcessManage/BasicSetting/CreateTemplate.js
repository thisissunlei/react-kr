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
					 	<div className="template-title">主表(ft_wf_ft)</div>
					 	<KrField
							name="num"
							type="text"
							component="select"
							label="每行显示字段数"
							grid={1/2}
							inline={true}
							options={[{label:'2',value:'2'},{label:'1',value:'1'}]}
					 	/>
					 	<div className="template-title">明细表-请假明细 (wf_fdt_1_12)</div>

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
	
	
	

	return errors
}

export default CreateNewList = reduxForm({
	form: 'createNewList',
	validate,
})(CreateNewList);

