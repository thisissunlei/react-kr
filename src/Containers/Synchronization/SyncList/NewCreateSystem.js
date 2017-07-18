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
// import './index.less';
import State from './State';
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
		console.log('=====>')
		let {onSubmit}=this.props;
		onSubmit && onSubmit(form);
	}


	render() {
		const { handleSubmit} = this.props;
		let options = [{label:'1',value:'1'},{label:'12',value:'12'},]
		
		return (
			<div className="new-create-system">
				<div className="u-title-box">
						<img className="u-title-img" src={require('./images/activity.svg')} />
						<span className="u-title-text">新建系统</span>
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
							name="mainId"
							type="text"
							component="select"
							label="同步主体"
							style={{marginRight:30,width:280}}
							requireLabel={true}
							grid={1/2}
							options={options}

					 	/>
					 	<KrField
							name="systemId"
							type="text"
							component="select"
							label="同步系统"
							left={20}
							grid={1/2}
							options={options}
							requireLabel={true}
					 	/>
	                	<KrField
								grid={1/2}
								name="interfaceAdd"
								component="input"
								label="接口地址"
								maxSize={300}
								requireLabel={true}
								right={30}
						/>
						<KrField 
								component="textarea" 
								name="remark" 
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
	let errors = {};
	if(!values.mainId){
		errors.mainId = '请选择主体';
	}
	if(!values.systemId){
		errors.systemId = '请选择同步系统';
	}
	if(!values.interfaceAdd){
		errors.interfaceAdd = '请输入接口地址';
	}
	
	

	return errors
}

export default CreateNewList = reduxForm({
	form: 'createNewList',
	validate,
})(CreateNewList);

