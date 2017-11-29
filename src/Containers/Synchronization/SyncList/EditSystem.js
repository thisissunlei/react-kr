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
	DrawerTitle,
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
		itemData.mainId += '';
		itemData.systemId +="" ;
		Store.dispatch(initialize('EditNewList', itemData));
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
		let {itemData} = this.props;
		let {systemList,mainList} = this.props;
		console.log('edit',systemList,itemData.systemId,itemData.systemName);
		return (
			<div className="new-create-system">
				<div className="u-title-box">
                <DrawerTitle title ="编辑系统" onCancel = {this.onCancel}/>

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
							options={mainList}

					 	/>
					 	<KrField
							name="systemId"
							type="text"
							component="select"
							label="同步系统"
							left={20}
							grid={1/2}
							requireLabel={true}
							options={systemList}
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

export default EditNewList = reduxForm({
	form: 'EditNewList',
	validate,
})(EditNewList);

