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
import EditTemplate from './EditTemplate';
import State from '../../State';
import {
	TemplatePrint
} from 'kr/PureComponents';
import {
	observer
} from 'mobx-react';
import '../../index.less';

@observer
class Template extends React.Component {

	constructor(props) {
		super(props);
		this.state={
			open:false,
			openWarn:false,
			openChooce:false,
			openTemplate:false,//新建合同模板
			allData:{},
			sealList:[]
		}

		
	}

	componentWillMount(){
		this.getSealData();
	}
	componentDidMount() {
		State.initialize();
		var initializeValues = {mode:'normol',allowPrint:'true'};
		State.getCreateTable(this.props.formId);
		Store.dispatch(initialize('Template',initializeValues));
		State.getTemplateList(this.props.formId);
		State.getPrintTemplateList(this.props.formId);
		State.getPrintTemplateData(this.props.keyId);  
	}
	
	onCancel=()=>{
		Store.dispatch(reset('Template',''));
		State.reset()
	}
	onSubmit=(form)=>{
		console.log('onSubmit--->',form)
		let _this = this;
		form.wfId = this.props.id;
		form.id=this.props.keyId;
		State.printTempId = false;
		
		form.printTempId = form.printTempId || State.formworkId || '' ;
		console.log('onSubmit--->', form)
		
		if(!form.formTempId){
			State.formTempId = true;
		}
		if(form.allowPrint === 'true' && !form.printTempId){
			State.printTempId = true;
		}
		if(form.allowPrint === 'false'){
			State.printTempId = false;
		}
		if(State.formTempId || State.printTempId){
			return;
		}
		
		Http.request('save-template', '',form).then(function(response) {
			// Store.dispatch(reset('Template',''));
			// State.reset();
			Message.success('提交成功');
			State.getPrintTemplateData(_this.props.keyId);
		}).catch(function(err) {
			Message.error(err.message);
		});
		
	}
	closeChooceDialog=()=>{
		this.setState({
			openChooce:false
		})
	}
	pcClick=(type)=>{
		State.open=true;
	}
	closeCreateTemplate=()=>{
		State.open=false
	}
	changeName=(value)=>{
		console.log('changeName',value);
		State.pcName = value.label;
		State.formTempId = false;
		State.formData.formTempId = value.value;
		Store.dispatch(change('Template','formTempId',value.value));


	}
	choocePrint=()=>{
		this.setState({
			openWarn:true
		})
	}
	closeEditTemplate=()=>{
		State.openEdit = false;
	}
	changePrintType=(value)=>{
		console.log('changePrintType',value)
		State.printName = value ? value.label:'';
		State.printTempId = false;
		State.formworkId = value ? value.value:'';
		Store.dispatch(change('Template', 'printTempId', value ? value.value : ''));
	}
	onCancelDialog=()=>{
		this.setState({
			openWarn:false
		})
	}

	//新建合同模板的开关
	onOpenTemplate = (type = '') =>{
		
		let {openTemplate,allData} = this.state;
		let data = Object.assign({},allData);
		if(!openTemplate && type !== "edit"){

			Store.dispatch(initialize('TemplatePrint',{name:'',content:''}))
			data.content = '';
			this.setState({
				allData: data,
				id:''
			})
		}
		if(openTemplate){
			document.body.style.overflow = "auto";
		}else{
			document.body.style.overflow = "hidden";
		}
		this.setState({
			openTemplate:!openTemplate,
		})
	}
	
	//模板新建提交
	templateSubmit = (values) =>{
		State.printName = values.name;
		State.formworkId = values.printTemplateId;
		console.log('===>', values.printTemplateId, State.formworkId)
		this.onOpenTemplate();
		State.getPrintTemplateList(this.props.formId);
	}

	//获取公章
    getSealData=()=>{
		let {formId}=this.props;
		var _this = this;
		Http.request("get-seal-list",{formId:formId}).then(function (response) {
			_this.setState({
				sealList:response.items
			})
		}).catch(function (err) {
			Message.error(err.message);
		});
	}

	//获取编辑数据
	getEditData = () =>{
		var id = toJS(State.formworkId);
		var _this = this;
		Http.request("get-other-contract-formwork",{id:id}).then(function (response) {
			
			Store.dispatch(initialize('TemplatePrint',{name:response.name,content:response.content}))
			_this.onOpenTemplate("edit");
			_this.setState({
				allData: response.content,
				id:response.id,
			})
		}).catch(function (err) {
			Message.error(err.message);
		});
	}
	openEdit=(id)=>{
		// State.openEdit = true;
		State.editTemplate(id);
	}
    
	render() {
		const { handleSubmit,formId} = this.props;
		const { allData, id,sealList} = this.state;
	
		return (
			<div className="g-chooce-template">
			   <form onSubmit={handleSubmit(this.onSubmit)}>
					<CircleStyleTwo num="1" info="PC端模板"  circle="none">
					 	 <KrField 
					 		style={{width:260,marginRight:25}}
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
			            	<span className="chooce-button" onClick={this.choocePrint}>选择</span>
			            	{!!toJS(State.pcList).length && <KrField
	                            grid={1/2}
	                            style={{width:73,height:26,overflow:'hidden',margin:'-10px 20px 0 9px'}}
	                            name="formType"
	                            leftData={toJS(State.pcList)}
	                            component="switchSlide"
	                            valueText = '选择'
	                            control='single'
	                            title='模板'
	                            onChange={this.changeName}
	                        />}
	                        {!!State.pcName?
			            	<span className="template-name has-template " onClick={this.openEdit.bind(this,State.formData.formTempId)}>{State.pcName}</span>
			            	:<span className="no-template template-name">未设置</span>}
			            	{State.formTempId && <div className="error-message">请选择显示模板</div>}
			            </div>
	                    
					</CircleStyleTwo>
					<CircleStyleTwo num="2" info="打印模板" circle="bottom">
						<KrField 
						    grid={1}
	                		style={{marginTop:5}}
	                		name="allowPrint" 
	                		component="group" 
	                		label="是否打印"
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
                            style={{width:262,marginTop:5}}
                            name="rentField"
                            component="select"
                            label="公章－取值字段"
                            options={sealList}
						/>


	                	<KrField 
			                grid={1} 
			                label="模板设置" 
			                type="labelText" 
			            />
			            <div className="up-load-template">
			            	<span className='addBtn' onClick={()=>{
								this.onOpenTemplate("new")
							}}>新建</span>
			            	<span className="chooce-button" onClick={this.choocePrint}>选择</span>
			            	{!!toJS(State.printList).length && <KrField
	                            grid={1/2}
	                            style={{width:73,height:26,overflow:'hidden',margin:'-10px 20px 0 9px'}}
	                            name="printType"
	                            leftData={toJS(State.printList)}
	                            component="switchSlide"
	                            valueText = '选择'
	                            control='single'
	                            title="模板"
	                            onChange={this.changePrintType}
	                        />}
	                        {!!State.printName?
			            	<span className="has-template template-name template-active" onClick = {this.getEditData}>{State.printName}</span>
			            	:<span className="no-template template-name">未设置</span>}
			            	{State.printTempId && <div className="error-message">请选择打印模板</div>}

			            </div>
						<Grid style={{marginTop:50,width:'50%'}}>
							<Row >
								<Col md={12} align="center">
									<ButtonGroup>
										<Button  label="保存" type="submit"  />
										{/*<Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/>*/}
									</ButtonGroup>
								  </Col>
							</Row>
						</Grid>
					</CircleStyleTwo>
				</form> 
				<Drawer
					open={State.open}
					width={750}
					openSecondary={true}
					onClose={this.closeCreateTemplate}

					className='m-finance-drawer'
					containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			    >

			       	<CreateTemplate onCancel={this.closeCreateTemplate}/>
		        </Drawer>
		        <Drawer
					open={State.openEdit}
					width={750}
					openSecondary={true}
					onClose={this.closeEditTemplate}

					className='m-finance-drawer'
					containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			    >

			       	<EditTemplate onCancel={this.closeEditTemplate}/>
		        </Drawer>
		        <Dialog
				title="选择模板"
				contentStyle ={{ width: '444px',overflow:'inherit'}}
				onClose={this.onCancelDialog}
				open={this.state.openWarn} >
					<div style={{fontSize:'16px',textAlign:'center',width:'100%',paddingTop:'30px'}}>
						<span style={{fontSize:'16px',textAlign:'center',fontWeight:'400',color:'#666'}}>没有模板选择，请新建模板</span>
						<Grid style={{marginTop:50,width:'100%'}}>
							<Row >
								<Col md={12} align="center">
									<ButtonGroup>
										<Button  label="确定" type="button"  onTouchTap={this.onCancelDialog}/>
									</ButtonGroup>
								  </Col>
							</Row>
						</Grid>
					</div>
			  </Dialog>
				{/*新建合同模板*/}
				<Drawer
					open={this.state.openTemplate}
					width={"1205px"}
					openSecondary={true}
					onClose={this.onOpenTemplate}

					className='m-finance-drawer'
					containerStyle={{top:60,paddingBottom:48,zIndex:20}}
				>

					<TemplatePrint id={id} formId={formId} allData = {allData} onSubmit = {this.templateSubmit} onCancel={this.onOpenTemplate}/>
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

