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
		
		return (
			<div className="new-create-system">
				<div className="u-title-box">
                <DrawerTitle title ="编辑同步主体" onCancel = {this.onCancel}/>

					</div>
				<div className="m-create-system">
							
			   <form onSubmit={handleSubmit(this.onSubmit)}>
						<KrField
							name="name"
							type="text"
							component="input"
							label="同步主体"
							style={{marginRight:30,width:280}}
							requireLabel={true}
							grid={1/2}

					 	/>
					 	<KrField
							name="code"
							type="text"
							component="labelText"
							label="主体编码"
							right={20}
							grid={1/2}
							value={itemData.code}
							requireLabel={true}
							inline={false}
					 	/>
						<KrField 
								component="textarea" 
								name="remark" 
								label="备注" 
								defaultValue=''
								maxSize={50}
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
		errors.name = '请输入主体名称';
	}
	if(values.name && values.name.length>20){
		errors.name = '主体名称不能超过20字'
	}
	if(values.code && values.code.length>20){
		errors.code = '主体编码不能超过20字';
	}
	if(!values.code){
		errors.code = '请输入主体编码';
	}
	
	
	

	return errors
}

export default EditNewList = reduxForm({
	form: 'EditNewList',
	validate,
})(EditNewList);

