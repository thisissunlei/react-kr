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
	Message,
	IconTip
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
import EditCreate from './EditCreate';
import './index.less';
class TextInfo  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			openAddDetail:false,
			openEditDetail:false,
			openDelForm:false,
			openEditText:false,
			openAddText:false,

			//主表信息
			mainInfo:[],
			//明细表信息
			detailInfo:[],

			//deleteId
			deleteId:'',
			//主表明细表id
			detailId:'',

			//编辑字段id
			editId:'',
			//编辑表单字段回血信息
		    getEdit:{},

		}
		this.checkedData = [];
	}



  componentDidMount() {
    
  }

  componentWillMount(){
	let {basicInfo}=this.props;
	this.getTextInfo(basicInfo.id);
  }


  //字段
  textDetailForm=()=>{
	let {mainInfo,detailInfo}=this.state;
	
	mainInfo.map((item,index)=>{
		if(!item.fields){
			item.fields=[];
		}
		Store.dispatch(change('TextInfo',`fields${index}`,this.tabelFilter(item.fields)));
	})
	
	detailInfo.map((item,index)=>{
		if(!item.fields){
			item.fields=[];
		}
		Store.dispatch(change('TextInfo',`detailFields${index}`,this.tabelFilter(item.fields)));
	})
	
  }
  tabelFilter = (arr) =>{
	var data = arr.map((item,index)=>{
		for(let i=0;i<this.checkedData.length;i++){
			if(item.id === this.checkedData[i].id){
				item.checked = true;
				break;
			}
		}
		return item;
	})
	return data;
  }

  //主表和明细表
  mainDetailForm=(textInfo,callback)=>{
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
	},function(){
		callback && callback();
	})
  }

  //获取表单字段信息
	getTextInfo=(id)=>{
		var _this=this;
		Http.request('form-group-table',{formId:id}).then(function(response) {
			 _this.setState({
				textInfo:response.items
			 },function(){
				_this.mainDetailForm(_this.state.textInfo,function(){
					_this.textDetailForm();
				});	
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
 deleForm=(id)=>{
  this.setState({
		openDelForm:!this.state.openDelForm,
		deleteId:id
	})
 }

 //批量删除
 batchdelete=(params)=>{
	let {basicInfo}=this.props;
	var ids=[];
	params.map((item,index)=>{
		ids.push(item.id);
	})
	var _this=this;
	Http.request('form-all-batch',{},{ids:ids}).then(function(response) {
		_this.getTextInfo(basicInfo.id);
		}).catch(function(err) {
		Message.error(err.message);
	});
 }

 //删除明细表提交
 onDelSubmit=()=>{
	let {basicInfo}=this.props;
	let {deleteId}=this.state;
    var _this=this;
	Http.request('form-table-delete',{id:deleteId}).then(function(response) {
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
	const {onClose}=this.props;
	onClose && onClose();
	this.setState({
		openAddText:false,
		openEditText:false
	 })
 }

 //打开新增字段
 addText=(id)=>{
	this.setState({
		openAddText:!this.state.openAddText,
		detailId:id
	 })
 }
 //新增字段提交
 onAddTextSub=(values)=>{
	 values = Object.assign({},values);
	if(values.inputType=='SELECT'||values.inputType=='CHECK'){
	  values.itemListStr=JSON.stringify(values.itemListStr);
      if(values.sourceType=='PUBLIC_DICT'){
		delete values.itemListStr;
	  } 
	}else{
		var littleText=[];
		for (var item in values){
			if(item.indexOf("ws")!=-1){
				var list={};
				list[item]=values[item];
				littleText.push(list);
			}
		}
		values.setting=JSON.stringify(littleText);
		delete values.itemListStr;
	}	
	let {basicInfo}=this.props;
	let {detailId}=this.state;
	values.detailId=detailId;
	values.formId=basicInfo.id;
	var _this=this;
	Http.request('form-field-add',{},values).then(function(response) {
		 _this.getTextInfo(basicInfo.id);
		 _this.cancelAddText();
		}).catch(function(err) {
		Message.error(err.message);
	});
 }

//获取编辑字段信息
 editText=(item,detailId)=>{
    this.setState({
		 openEditText:!this.state.openEditText,
		 editId:item.id||'',
		 detailId:detailId,
	 })
	 let {isCreate}=this.props;
     var _this=this;
	 Http.request('get-field-edit',{id:item.id}).then(function(response) {
		if(isCreate){
			Store.dispatch(initialize('EditCreate',response));	 
		 }else{
			Store.dispatch(initialize('EditText',response));
			Store.dispatch(change('EditText','itemListStr',response.items&&response.items.length>0?response.items:[]));	  
		 }
		 _this.setState({
			getEdit:response
		 })
		 }).catch(function(err) {
		 Message.error(err.message);
	 });
 }

 onEditTextSub=(data)=>{
	let {editId,detailId}=this.state;
	let {basicInfo,isCreate}=this.props;
	var params = Object.assign({},data);
	params.id=editId;
	params.detailId=detailId;
	params.formId=basicInfo.id||'';
	console.log('parma',params);
	var _this=this;
	for(let key in params){
		
		if(!params[key] || (Object.prototype.toString.call(params[key]) === '[object Array]' && !params[key].length)){
			delete params[key];

		}
	}

    if(isCreate){
		
		 	Http.request('create-field-edit',{},params).then(function(response) {
		 		 _this.cancelEditText();
				}).catch(function(err) {
		 		Message.error(err.message);
		 	});
	}else{
		    if(params.itemListStr&&params.itemListStr.length!=0){
				params.itemListStr=JSON.stringify(params.itemListStr);	
				delete 	params.items;	
			}else{
				var littleText=[];
				for (var item in params){
					 if(item.indexOf("ws")!=-1){
						var list={};
						list[item]=params[item];
						littleText.push(list);
					 }
				 }
				params.setting=JSON.stringify(littleText);
				delete 	params.items;	
			}
		    
			Http.request('form-field-edit',{},params).then(function(response) {
				_this.cancelEditText();
			}).catch(function(err) {
				Message.error(err.message);
			});
		}
 }

 cancelEditText=()=>{
	let {basicInfo}=this.props;
	this.getTextInfo(basicInfo.id);
	 this.setState({
		 openEditText:!this.state.openEditText
	 })
 }

 //排序
 moveClick=(params)=>{ 
  
  let {basicInfo}=this.props;

  var param={};
  var ids=[];
  var detailId='';
  this.getCheckedData(params);
  params.map((item,index)=>{
	ids.push(item.id);
	detailId=item.detailId;
  })
  param.ids=ids;
  param.detailId=detailId;
  var _this=this;
  Http.request('form-field-order',{},param).then(function(response) {
	   //_this.getTextInfo(basicInfo.id);
	  }).catch(function(err) {
	  Message.error(err.message);
  });
 }
getCheckedData = (arr) =>{
	var checkedData = [];
	arr.map((item,index)=>{
		if(item.checked){
			checkedData.push(item);
		}
	})
	this.checkedData = [].concat(checkedData);

}



	render(){

		let {handleSubmit,textInfo,isCreate,basicInfo}=this.props;
		let {detailInfo,mainInfo,getEdit}=this.state;

	

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
								name = {`fields${index}`}
								isFold = {false}
								toolbar={true}
								batchDel={true}
								checkbox={true}
								batchdelete={this.batchdelete}
								initFoldNum={100}
								moveClick={this.moveClick}
							>

									<Toolbars>
									  <Toolbar label='新增字段' rightSpac='14px' iconClass='add-text' iconClick={this.addText.bind(this,item.id)} />
									</Toolbars>

									<FRow name = "name" label = "字段名称"/>
									<FRow name = "label" label = "字段显示名"/>
									<FRow name = "inputTypeStr" label = "表现形式"/>
									<FRow name = "compTypeStr" label = "字段类型"/>
									<FRow label = "操作" type='operation' component={(items)=>{
											return <div style={{color:'#499df1',cursor:'pointer'}} onClick={this.editText.bind(this,items,item.id)}>编辑</div>
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
									name = {`detailFields${index}`}
									isFold = {false}
									toolbar={true}
									batchDel={isCreate?false:true}
									checkbox={true}
									batchdelete={this.batchdelete}
									moveClick={this.moveClick}
									initFoldNum={100}
								>
									<Toolbars>
										<Toolbar label='编辑' rightSpac='14px' iconClass='edit-form' iconClick={this.openEditDetail.bind(this,item.id)} />
										{!isCreate&&<Toolbar label='删除明细表' rightSpac='14px' iconClass='del-form' iconClick={this.deleForm.bind(this,item.id)} />}
										{isCreate&&<div className='not-del-form'>  
													<IconTip iconClass='del-tip' label='删除明细表' className='up-tip'>
												       <div style={{textAlign:'left'}}>亲，该明细表已经创建过表！</div>
											        </IconTip>
											</div>}
										<Toolbar label='新增字段' rightSpac='14px' iconClass='add-text' iconClick={this.addText.bind(this,item.id)} />
									</Toolbars>

									<FRow name = "name" label = "字段名称"/>
									<FRow name = "label" label = "字段显示名"/>
									<FRow name = "inputTypeStr" label = "表现形式"/>
									<FRow name = "compTypeStr" label = "字段类型"/>
									<FRow label = "操作" type='operation' component={(items)=>{
											return <div style={{color:'#499df1',cursor:'pointer'}} onClick={this.editText.bind(this,items,item.id)}>编辑</div>
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
							    getEdit={getEdit}
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
