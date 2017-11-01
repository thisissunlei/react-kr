import React from 'react';
import {reduxForm,initialize,reset,change} from 'redux-form';
import {Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import mobx, {
	observable,
	action,
	toJS
} from 'mobx';
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
	ButtonGroup,
	Drawer,
	Dialog
} from 'kr-ui';
import CreateTemplate from './CreateTemplate';
import State from './State';

import {
	observer
} from 'mobx-react';
import './index.less';

@observer
class Template extends React.Component {

	constructor(props) {
		super(props);
		this.state={
			open:false,
			openChooce:false,
		}

		
	}
	componentDidMount() {
		var initializeValues = {mode:'normol',allowPrint:'true'};
		State.getCreateTable(this.props.id);
		Store.dispatch(initialize('Template',initializeValues));
		State.getTemplateList(this.props.id);
		State.getPrintTemplateList();
	}
	
	onCancel=()=>{
		Store.dispatch(reset('Template',''));
		State.reset()
	}
	onSubmit=(form)=>{
		console.log('onSubmit--->',form)
		if(!form.printTemplateId){
			State.printTemplateId = true;
		}
		if(!form.formTemplateId){
			State.formTemplateId = true;
		}
		if(State.formTemplateId || State.printTemplateId){
			return;
		}
		
		Http.request('save-template', '',form).then(function(response) {
			Store.dispatch(reset('Template',''));
			State.reset();
			Message.success('提交成功');
		}).catch(function(err) {
			Message.error('下线失败');
		});
		
	}
	closeChooceDialog=()=>{
		this.setState({
			openChooce:false
		})
	}
	pcClick=(type)=>{
		this.setState({
			open:true
		})
		console.log('pcClick',type)
	}
	closeCreateTemplate=()=>{
		this.setState({
			open:false
		})
	}
	changeName=(value)=>{
		console.log('changeName',value);
		State.pcName = value.label;
		State.formTemplateId = false;
		Store.dispatch(change('Template','formTemplateId',value.value));


	}
	changePrintType=(value)=>{
		console.log('changePrintType',value)
		State.printName = value.label;
		State.printTemplateId = false;
		Store.dispatch(change('Template','printTemplateId',value.value));

	}


	render() {
		const { handleSubmit} = this.props;
		return (
			<div className="g-chooce-template">
			   <form onSubmit={handleSubmit(this.onSubmit)}>
					<CircleStyleTwo num="1" info="PC端模板"  circle="none">
					 	 <KrField 
					 		style={{width:260,marginRight:25,marginBottom:10}}
					 		name="mode" 
					 		component="group" 
					 		label="显示模式"
					 		grid={1}
					 		requireLabel={true} 
						 >
			                    <KrField 
			                    		name="mode" 
			                    		grid={1 / 2} 
			                    		label="普通模式" 
			                    		type="radio" 
			                    		value="normol"
			                    />
			                    {/*<KrField 
			                    		name="publishedStatus" 
			                    		grid={1 / 2} 
			                    		label="未发布" 
			                    		type="radio" 
			                    		value="UNPUBLISHED"
			                    />*/}
						</KrField>
						<KrField 
			                grid={1} 
			                label="模板设置" 
			                type="labelText" 
			                requireLabel={true}
			            />
			            
			            <div className="up-load-template">
			            	<span className='addBtn' onClick={this.pcClick.bind(this,'pc')}>新建</span>
			            	<span className="chooce-button" >选择</span>
			            	<KrField
	                            grid={1/2}
	                            style={{width:73,height:26,overflow:'hidden',margin:'-10px 20px 0 9px'}}
	                            name="formType"
	                            leftData={toJS(State.pcList)}
	                            component="switchSlide"
	                            valueText = '选择'
	                            control='single'
	                            onChange={this.changeName}
	                        />
	                        {!!State.pcName?
			            	<span className="has-template template-name">{State.pcName} </span>
			            	:<span className="no-template template-name">未设置</span>}
			            	{State.formTemplateId && <div className="error-message">请选择显示模板</div>}
			            </div>
	                    
					</CircleStyleTwo>
					<CircleStyleTwo num="2" info="打印模板" circle="bottom">
						<KrField 
	                		style={{width:260,marginTop:5,marginBottom:5}}
	                		name="allowPrint" 
	                		component="group" 
	                		label="是否打印"
	                		requireLabel={true}
	                		>
			                    <KrField 
			                    		name="allowPrint" 
			                    		grid={1 / 2} 
			                    		label="是" 
			                    		type="radio" 
			                    		value="true"
			                    />
			                    <KrField 
			                    		name="allowPrint" 
			                    		grid={1 / 2} 
			                    		label="否" 
			                    		type="radio" 
			                    		value="false"
			                    />
	                	</KrField>
	                	<KrField 
			                grid={1} 
			                label="模板设置" 
			                type="labelText" 
			                requireLabel={true}
			            />
			            <div className="up-load-template">
			            	<span className='addBtn'>新建</span>
			            	<span className="chooce-button" onClick={this.choocePrint}>选择</span>
			            	<KrField
	                            grid={1/2}
	                            style={{width:73,height:26,overflow:'hidden',margin:'-10px 20px 0 9px'}}
	                            name="printType"
	                            leftData={toJS(State.printList)}
	                            component="switchSlide"
	                            valueText = '选择'
	                            control='single'
	                            onChange={this.changePrintType}
	                        />
	                        {!!State.printName?
			            	<span className="has-template template-name">{State.printName}</span>
			            	:<span className="no-template template-name">未设置</span>}
			            	{State.printTemplateId && <div className="error-message">请选择显示模板</div>}

			            </div>
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
					</CircleStyleTwo>
				</form> 
				<Drawer
				        open={this.state.open}
				        width={750}
				        openSecondary={true}
				        onClose={this.closeCreateTemplate}

				        className='m-finance-drawer'
				        containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			        >

			       	 	<CreateTemplate onCancel={this.closeCreateTemplate}/>
		        </Drawer>
			</div>


		);
	}
	
}
const validate = values => {
	const errors = {}
	let numContr =/^[1-9]\d{0,4}$/;
	
	

	return errors
}
export default Template = reduxForm({
	form: 'Template',
	validate,
})(Template);

