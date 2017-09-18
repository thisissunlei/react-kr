import React from 'react';
import {Http} from 'kr/Utils';
import {
	Button,
	Row,
	Col,
	FdTabel,
	FContent,
	FRow,
	Toolbar,
	Toolbars,
	Dialog,
	Drawer,
	Message
} from 'kr-ui';
import {
	Store,
} from 'kr/Redux';
import {
	reduxForm,
	change,
	initialize
} from 'redux-form';
import AddDetail from './AddDetail';
import EditDetail from './EditDetail';
import DeleForm from './DeleForm';
import AddText from './AddText';
import EditText from './EditText';
import './index.less';
class TextInfo  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			openAddDetail:false,
			openEditDetail:false,
			openDelForm:false,
			openEditText:false,

			//新增字段
			openAddText:false,

			//主表信息
			mainInfo:[],
			//明细表信息
			detailInfo:[]

		}

	}



  componentDidMount() {
    let {mainInfo,detailInfo}=this.state;
	mainInfo.map((item,index)=>{
		Store.dispatch(change('TextInfo',`tableData${index}`,item.fields));
	})
	detailInfo.map((item,index)=>{
		Store.dispatch(change('TextInfo',`detailData${index}`,item.fields));
	})
  }

  componentWillMount(){
    let {textInfo}=this.props;
	var mainForm=[];
	var detailForm=[];
	textInfo.map((item,index)=>{
		if(item.isMain){
			mainForm.push(item);
		}else{
			detailForm.push(item);
		}
	})
	this.setState({
		mainInfo:mainForm,
		detailInfo:detailForm
	})
  }

  //获取表单字段信息
	getTextInfo=(id)=>{
		var _this=this;
		Http.request('form-group-table',{formId:id}).then(function(response) {
			 _this.setState({
				textInfo:response.items
			 })
		 }).catch(function(err) {
			 Message.error(err.message);
		 });
	}


  onSubmit=()=>{

  }

 //新增明细
 openAddDetail=()=>{
    this.setState({
		openAddDetail:!this.state.openAddDetail
	})
 }

 //新增提交
 onAddSubmit=(params)=>{
	let {basicInfo}=this.props;
	params.isMain=false;
	params.orderNum='';
	params.formId=basicInfo.id;
	var _this=this;
	Http.request('form-table-add',{},params).then(function(response) {
		 _this.getTextInfo(basicInfo.id);
		 _this.openAddDetail();
		}).catch(function(err) {
		Message.error(err.message);
	});
 }

 //编辑明细
 openEditDetail=(id)=>{
	let {detailInfo}=this.state;
	detailInfo.map((item,index)=>{
      if(item.id==id){
		Store.dispatch(initialize('EditDetail',item));
	  }
	})
	 this.setState({
		openEditDetail:!this.state.openEditDetail
	})
 }

 //编辑提交
 onEditSubmit=(params)=>{
	let {basicInfo}=this.props;
	delete params.fields;
	var _this=this;
	Http.request('form-table-edit',{},params).then(function(response) {
		 _this.getTextInfo(basicInfo.id);
		 _this.openEditDetail();
		}).catch(function(err) {
		Message.error(err.message);
	});
 }

//删除明细表
 deleForm=()=>{
  this.setState({
		openDelForm:!this.state.openDelForm
	})
 }

 //批量删除
 batchdelete=(params)=>{
	var ids=[];
	params.map((item,index)=>{
		ids.push(item.id);
	})
	var _this=this;
	Http.request('form-all-batch',{},{ids:ids}).then(function(response) {
		}).catch(function(err) {
		Message.error(err.message);
	});
 }

 //删除明细表提交
 onDelSubmit=()=>{
	let {basicInfo}=this.props;
    var _this=this;
	Http.request('form-table-delete',{id:basicInfo.id}).then(function(response) {
		 _this.getTextInfo(basicInfo.id);
		 _this.deleForm();
		}).catch(function(err) {
		Message.error(err.message);
	});
 }


 //字段关闭
 cancelAddText=()=>{
	 this.setState({
		openAddText:!this.state.openAddText
	 })
 }
 allClose=()=>{
	this.setState({
		openAddText:false
	 })
 }
 //打开新增字段
 addText=()=>{
	this.setState({
		openAddText:!this.state.openAddText
	 })
 }
 //新增字段提交
 onAddTextSub=()=>{

 }

 editText=()=>{
   this.setState({
		 openEditText:!this.state.openEditText
	 })
 }

	render(){

		let {handleSubmit,textInfo,isCreate,basicInfo}=this.props;
		let {detailInfo,mainInfo}=this.state;

		return(

			<div className='watch-text'>
			<Row style={{marginBottom:11,position:'relative',zIndex:5,marginTop:20}}>

					<Col
					style={{float:'left'}}
					>
					<Button
						label="新建明细表"
						type='button'
						onTouchTap={this.openAddDetail}
					/>
					</Col>

			</Row>

            <form onSubmit={handleSubmit(this.onSubmit)}>

			{
				mainInfo.map((item,index)=>{

					return <div className='main-form' style={{marginTop:20}}>

						<div className='main-name'>
						<span>主表-</span>
						<span>{item.name}</span>
						<span>({item.tableName})</span>
						</div>


						<FdTabel
								name = {`tableData${index}`}
								isFold = {false}
								toolbar={true}
								batchDel={true}
								checkbox={true}
								batchdelete={this.batchdelete}
							>

									<Toolbars>
									  <Toolbar label='新增字段' rightSpac='14px' iconClass='add-text' iconClick={this.addText} />
									</Toolbars>

									<FRow name = "name" label = "字段名称"/>
									<FRow name = "label" label = "字段显示名"/>
									<FRow name = "inputTypeStr" label = "表现形式"/>
									<FRow name = "compTypeStr" label = "字段类型"/>
									<FRow label = "操作" type='operation' component={(item)=>{
											return <div style={{color:'#499df1',cursor:'pointer'}}>编辑</div>
									}}/>
						</FdTabel>
					</div>
				})
			}

			{
				detailInfo.map((item,index)=>{

				  return <div className='main-form detail-form' style={{marginTop:20}}>

								<div className='main-name'>
								<span>明细表-</span>
								<span>{item.name}</span>
								<span>({item.tableName})</span>
								</div>


								<FdTabel
									name = {`detailData${index}`}
									isFold = {false}
									toolbar={true}
									batchDel={true}
									checkbox={true}
									batchdelete={this.batchdelete}
								>
									<Toolbars>
										<Toolbar label='编辑' rightSpac='14px' iconClass='edit-form' iconClick={this.openEditDetail.bind(this,item.id)} />
										<Toolbar label='删除明细表' rightSpac='14px' iconClass='del-form' iconClick={this.deleForm} />
										<Toolbar label='新增字段' rightSpac='14px' iconClass='add-text' iconClick={this.addText} />
									</Toolbars>

									<FRow name = "name" label = "字段名称"/>
									<FRow name = "label" label = "字段显示名"/>
									<FRow name = "inputTypeStr" label = "表现形式"/>
									<FRow name = "compTypeStr" label = "字段类型"/>
									<FRow label = "操作" type='operation' component={(item)=>{
											return <div style={{color:'#499df1',cursor:'pointer'}} onClick={this.editText}>编辑</div>
									}}/>
							</FdTabel>
						</div>
				})
			 }
    				</form>

						   {/*新建明细表*/}
							<Dialog
							title="新建明细表单"
							onClose={this.openAddDetail}
							open={this.state.openAddDetail}
							contentStyle ={{ width: '666px',height:'auto'}}
							>
								<AddDetail
									onCancel={this.openAddDetail}
									onSubmit={this.onAddSubmit}
								/>
							</Dialog>

							{/*编辑明细表*/}
							 <Dialog
							 title="编辑明细表单"
							 onClose={this.openEditDetail}
							 open={this.state.openEditDetail}
							 contentStyle ={{ width: '666px',height:'auto'}}
							 >
								 <EditDetail
										 onCancel={this.openEditDetail}
										 onSubmit={this.onEditSubmit}
										 isCreate={isCreate}
										 basicInfo={basicInfo}
								 />
						 </Dialog>

						 {/*删除明细表*/}
							<Dialog
							title="提示"
							onClose={this.deleForm}
							open={this.state.openDelForm}
							contentStyle ={{ width: '446px',height:'auto'}}
							>
								<DeleForm
										onCancel={this.deleForm}
										onSubmit={this.onDelSubmit}
								/>
						</Dialog>

						{/*新增字段*/}
						<Drawer
								open={this.state.openAddText}
								width={750}
								openSecondary={true}
								containerStyle={{top:60,paddingBottom:228,zIndex:20}}
								onClose={this.allClose}
							>
							<AddText
								onCancel={this.cancelAddText}
								onSubmit={this.onAddTextSub}

							/>
			      </Drawer>

						{/*编辑字段*/}
						{!isCreate&&<Drawer
								open={this.state.openEditText}
								width={750}
								openSecondary={true}
								containerStyle={{top:60,paddingBottom:228,zIndex:20}}
								onClose={this.allClose}
							>
							<EditText
								onCancel={this.cancelEditText}
								onSubmit={this.onEditTextSub}

							/>
			      </Drawer>}

						{/*编辑字段*/}
						{isCreate&&<Dialog
						title="编辑字段－已创建表"
						onClose={this.cancelEditText}
						open={this.state.openEditText}
						contentStyle ={{ width: '374px',height:'auto'}}
						>
							<EditCreate
								onCancel={this.cancelEditText}
								onSubmit={this.onEditTextSub}
							/>
						</Dialog>}

			</div>
		);
	}

}

export default reduxForm({
	form: 'TextInfo'
})(TextInfo);
