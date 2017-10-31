import React from 'react';
import {reduxForm,initialize,reset} from 'redux-form';
import {Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
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
			list:[
				{label: "iOS工程师", value: 55},
				{label: "Android开发工程师", value: 61},
				{label: "Java开发工程师", value: 74},
				{label: "Java开发工程师（中级）", value: 75},
				{label: "Java开发工程师（高级）", value: 76},
				{label: "前端开发工程师", value: 77},
				{label: "技术经理", value: 78},
				{label: "UI设计师", value: 79},
				{label: "产品运维工程师", value: 80},
				{label: "测试工程师", value: 81},
				{label: "iOS开发工程师", value: 82},
				{label: "创投", value: 316},
				{label: "测试", value: 317}
			],
		}

		
	}
	componentDidMount() {
		var initializeValues = {mode:'normol',print:'ok'};
		Store.dispatch(initialize('Template',initializeValues));
	}
	
	onCancel=()=>{
		// var initializeValues = {mode:'normol',print:'ok'};
		// Store.dispatch(reset('Template',''));
	}
	onSubmit=(form)=>{
		
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
	cloaeCreateTemplate=()=>{
		this.setState({
			open:false
		})
	}
	chooceShow=()=>{
		console.log('chooceShow')
		this.setState({
			openChooce:true
		})
	}
	choocePrint=()=>{
		console.log('choocePrint')
		this.setState({
			openChooce:true
		})
	}
	changeName=(value)=>{
		console.log('changeName',value)
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
	                            name="jobId"
	                            leftData={this.state.list}
	                            component="switchSlide"
	                            valueText = '选择'
	                            control='single'
	                            onChange={this.changeName}
	                        />
			            	<span className="has-template template-name">发起人模板 2017-08-10 18:10:22</span>
			            	<span className="no-template template-name">未设置</span>
			            </div>
	                    
					</CircleStyleTwo>
					<CircleStyleTwo num="2" info="打印模板" circle="bottom">
						<KrField 
	                		style={{width:260,marginTop:5,marginBottom:5}}
	                		name="print" 
	                		component="group" 
	                		label="是否打印"
	                		requireLabel={true}
	                		>
			                    <KrField 
			                    		name="print" 
			                    		grid={1 / 2} 
			                    		label="是" 
			                    		type="radio" 
			                    		value="ok"
			                    />
			                    <KrField 
			                    		name="print" 
			                    		grid={1 / 2} 
			                    		label="否" 
			                    		type="radio" 
			                    		value="no"
			                    />
	                	</KrField>
	                	<KrField 
			                grid={1} 
			                label="模板设置" 
			                type="labelText" 
			                requireLabel={true}
			            />
			            <div className="up-load-template">
			            	<span className='addBtn' onClick={this.pcClick.bind(this,'print')}>新建</span>
			            	<span className="chooce-button" onClick={this.choocePrint}>选择</span>
			            	<KrField
	                            grid={1/2}
	                            style={{width:73,height:26,overflow:'hidden',margin:'-10px 20px 0 9px'}}
	                            name="jobId"
	                            leftData={this.state.list}
	                            component="switchSlide"
	                            valueText = '选择'
	                            control='single'
	                            onChange={this.changeName}
	                        />
			            	<span className="has-template template-name">发起人模板 2017-08-10 18:10:22</span>
			            	<span className="no-template template-name">未设置</span>
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
				        width={550}
				        openSecondary={true}
				        onClose={this.cloaeCreateTemplate}

				        className='m-finance-drawer'
				        containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			        >

			       	 	<CreateTemplate onCancel={this.cloaeCreateTemplate}/>
		        </Drawer>
		        <Dialog
		              title="选择模板"
		              modal={true}
		              open={this.state.openChooce}
		              onClose={this.closeChooceDialog}
		              contentStyle={{width:666,height:330}}
		            >
		              dddd
		        </Dialog>
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
export default Template = reduxForm({
	form: 'Template',
	validate,
})(Template);

