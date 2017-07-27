import React from 'react';
import {	
	Table,
	TableHeader,
	TableHeaderColumn,
	TableBody,
	TableRow,
	TableRowColumn,
    Button,
	Drawer,
	Dialog,
	Message,
	Dictionary,
	KrDate
} from 'kr-ui';
import './index.less';
import EditPerson from './EditPerson';
import AddFamily from './AddFamily';
import EditFamily from './EditFamily';
import AddWork from './AddWork';
import EditWork from './EditWork';
import DeleteFamily from './DeleteFamily';
import DeleteWork from './DeleteWork';
import {Http,DateFormat} from 'kr/Utils';
import {Store} from 'kr/Redux';
import {
  initialize
} from 'redux-form';
import {
	observer,
	inject
} from 'mobx-react';
@inject("NavModel")
@observer
export default class PersonalInfo  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			openEdit:false,
			openAddF:false,
			openAddW:false,
			openEditF:false,
			openEditW:false,
			openDeleteF:false,
			openDeleteW:false,
			//人员个人信息
			personInfo:{},
			//家庭情况
			familySearchParams:{
				resourceId:this.props.personId
			},
			//工作经历
			workSearchParams:{
				resourceId:this.props.personId
			},
			//家庭删除id
			familyId:'',
			//工作记录删除id
			jobId:'',
			isEditUser:false,
			
		}
	}


	componentWillMount(){
	  let {personId}=this.props;
	  //获取个人信息
	  this.personData(personId);
	}
	componentDidMount() {
		var {checkOperate} = this.props.NavModel;
		var _this = this;
		setTimeout(function() {
			_this.setState({
				isEditUser : checkOperate("hrm_resource_edit")
				
			})
		
		},500);	

	}

	//获取个人信息
	personData=(id)=>{
	   var _this=this;
       Http.request('people-person-watch',{resourceId:id}).then(function(response) {
		   _this.setState({
			   personInfo:response
		   })
        }).catch(function(err) {
          Message.error(err.message);
        });
	}
    
	//家庭操作
	onFamilyOperation=(type,itemDetail)=>{
       if(type=='edit'){
		    this.getFamilyInfo(itemDetail.id);
			this.setState({
			  openEditF:!this.state.openEditF
			})
	   }else if(type=='delete'){
		   this.setState({
			  openDeleteF:!this.state.openDeleteF,
			  familyId:itemDetail.id
			})
	   }
	} 

	//获取家庭编辑信息
	getFamilyInfo=(id)=>{
	    Http.request('people-family-get',{id:id}).then(function(response) {
		    Store.dispatch(initialize('EditFamily',response));
        }).catch(function(err) {
          Message.error(err.message);
        });	
	}
    
	//工作操作
    onWorkOperation=(type,itemDetail)=>{
       if(type=='edit'){
		    this.getWorkInfo(itemDetail.id);
			this.setState({
			  openEditW:!this.state.openEditW
			})
	   }else if(type=='delete'){
		   this.setState({
			  openDeleteW:!this.state.openDeleteW,
			  jobId:itemDetail.id
			})
	   }
	}
    
	//获取工作编辑信息
	getWorkInfo=(id)=>{
	    Http.request('people-job-get',{id:id}).then(function(response) {
		    Store.dispatch(initialize('EditWork',response));
        }).catch(function(err) {
           Message.error(err.message);
        });	
	}

   //编辑个人信息开关
   openPerson=()=>{
	   let {personInfo}=this.state;
	   Store.dispatch(initialize('EditPerson',personInfo));
	   this.setState({
		   openEdit:!this.state.openEdit
	   })
   }
   
   //编辑提交
   editSubmit=(params)=>{
	   let {personId}=this.props;
	   delete params.uTime;
	   params.birthday = DateFormat(params.birthday,"yyyy-mm-dd hh:MM:ss");
	   params.workDate = DateFormat(params.workDate,"yyyy-mm-dd hh:MM:ss");
	   params.partyDate = DateFormat(params.partyDate,"yyyy-mm-dd hh:MM:ss");
	   params.leagueDate = DateFormat(params.leagueDate,"yyyy-mm-dd hh:MM:ss");
	   params.resourceId=personId;
       var _this=this;
       Http.request('people-person-edit',{},params).then(function(response) {
           _this.personData(params.resourceId);
		   _this.cancelPerson();
        }).catch(function(err) {
          Message.error(err.message);
        });
   }
   
   //编辑关闭
   cancelPerson=()=>{
		this.setState({
		   openEdit:!this.state.openEdit
	   })
   }
   
   //新增家庭人员开关
   addFamily=()=>{
     this.setState({
		openAddF:!this.state.openAddF
	 })
   }
   
   //新增家庭提交
   addPerSubmit=(params)=>{
	  let {personId}=this.props;
	  params.resourceId=personId;
      var _this=this;
       Http.request('people-family-add',{},params).then(function(response) {
           _this.setState({
			   familySearchParams:{
				   time:+new Date(),
				   resourceId:params.resourceId
			   }
		   })
		    _this.addFamily();
       }).catch(function(err) {
          Message.error(err.message);
        });
   }
   
   //编辑家庭提交
   editPerSubmit=(params)=>{
	  let {personId}=this.props;
	  params.resourceId=personId;
	  var _this=this;
       Http.request('people-family-edit',{},params).then(function(response) {
           _this.setState({
			   familySearchParams:{
				   time:+new Date(),
				   resourceId:params.resourceId
			   }
		   })
		   _this.EditFamily();
       }).catch(function(err) {
          Message.error(err.message);
        });
   }

  //编辑家庭人员开关
   EditFamily=()=>{
     this.setState({
		openEditF:!this.state.openEditF
	 })
   }
  

   //新增工作经历开关
   addWork=()=>{
	 this.setState({
		openAddW:!this.state.openAddW
	 })  
   }

   //新增工作经历提交
   addWorkSubmit=(params)=>{
	 let {personId}=this.props;
	  params.resourceId=personId;
      var _this=this;
       Http.request('people-job-add',{},params).then(function(response) {
           _this.setState({
			   workSearchParams:{
				   time:+new Date(),
				   resourceId:params.resourceId
			   }
		   })
		   _this.addWork();
       }).catch(function(err) {
          Message.error(err.message);
       });
   }

   //编辑工作经历提交
   editWorkSubmit=(params)=>{
	 let {personId}=this.props;
	  params.resourceId=personId;
	  params.endDate = DateFormat(params.endDate,"yyyy-mm-dd hh:MM:ss");
	  params.startDate = DateFormat(params.startDate,"yyyy-mm-dd hh:MM:ss");
	  var _this=this;
       Http.request('people-job-edit',{},params).then(function(response) {
           _this.setState({
			   workSearchParams:{
				   time:+new Date(),
				   resourceId:params.resourceId
			   }
		   })
		    _this.editWork();
       }).catch(function(err) {
          Message.error(err.message);
        });
   }

   //编辑工作开关
   editWork=()=>{
    this.setState({
		openEditW:!this.state.openEditW
	 })  
   }
   

   //关闭删除人员
   cancelDelete=()=>{
     this.setState({
		openDeleteF:!this.state.openDeleteF
	 })  
   }
  
   //删除人员提交
   deleteSubmit=()=>{
	 let {familyId}=this.state; 
	 let {personId}=this.props;
     var _this=this;
       Http.request('people-family-delete',{id:familyId}).then(function(response) {
           _this.setState({
			   familySearchParams:{
				   time:+new Date(),
				   resourceId:personId
			   }
		   })
		   _this.cancelDelete();
       }).catch(function(err) {
          Message.error(err.message);
       });
   }
  
   //关闭删除工作
   cancelDelWork=()=>{
	 this.setState({
		openDeleteW:!this.state.openDeleteW
	 })  
   }
   
   //关闭删除提交
   delWorkSubmit=()=>{
	 let {jobId}=this.state;
	 let {personId}=this.props;
     var _this=this;
       Http.request('people-job-delete',{id:jobId}).then(function(response) {
           _this.setState({
			   workSearchParams:{
				   time:+new Date(),
				   resourceId:personId
			   }
		   })
		   _this.cancelDelWork();
       }).catch(function(err) {
          Message.error(err.message);
       });
   }
  
  //关闭所有
   allClose=()=>{
      this.setState({
		   openEdit:false,
		   openAddF:false,
		   openAddW:false,
		   openEditF:false,
		   openEditW:false,
	   })
   }

	render(){

		let {personInfo,familySearchParams,workSearchParams,isEditUser}=this.state;

		let infoName=[
			 {name:'身份证号码',
			  detail:personInfo.idCard},
			 {name:'出生日期',
			  detail:<KrDate value={personInfo.birthday} format="yyyy-mm-dd"/>},
			 {name:'星座',
			  type:'ERP_Constellation',
			  isSwitch:true,
			  detail:personInfo.constellation},
			 {name:'血型',
			  type:'ERP_BloodType',
			  isSwitch:true,
			  detail:personInfo.bloodType},
			 {name:'民族',
			  type:'ERP_Nation',
			  isSwitch:true,
			  detail:personInfo.nation},
			 {name:'籍贯',
			  detail:personInfo.nativePlace},
			 {name:'户口',
			  type:'ERP_HouseholdType',
			  isSwitch:true,
			  detail:personInfo.household},
			 {name:'政治面貌',
			  type:'ERP_PoliticsStatus',
			  isSwitch:true,
			  detail:personInfo.politicsStatus},
			 {name:'入团时间',
			  detail:personInfo.leagueDate?<KrDate value={personInfo.leagueDate} format="yyyy-mm-dd"/>:'-'},
			 {name:'入党时间',
			  detail:personInfo.partyDate?<KrDate value={personInfo.partyDate} format="yyyy-mm-dd"/>:'-'},
			 {name:'毕业院校',
			  detail:personInfo.college?personInfo.college:'-'},
              {name:'专业',
			  detail:personInfo.major?personInfo.major:'-'},
              {name:'学历',
			   type:'ERP_EducationType',
			   isSwitch:true,
			  detail:personInfo.education},
              {name:'学位',
			   type:'ERP_Degree',
			   isSwitch:true,
			  detail:personInfo.degree},
              {name:'参加工作时间',
			  detail:personInfo.workDate?<KrDate value={personInfo.workDate} format="yyyy-mm-dd"/>:'-'},
              {name:'现居住地',
			  detail:personInfo.currentAddress?personInfo.currentAddress:'-'},
              {name:'暂/居住证号码',
			  detail:personInfo.temporaryPermit?personInfo.temporaryPermit:'-'},
              {name:'个人邮箱',
			  detail:personInfo.personEmail?personInfo.personEmail:'-'},
              {name:'微信号',
			  detail:personInfo.wechat?personInfo.wechat:'-'},
              {name:'联系电话',
			  detail:personInfo.personPhone},
              {name:'身高(cm)',
			  detail:personInfo.height?personInfo.height:'-'},
              {name:'体重(公斤)',
			  detail:personInfo.weight?personInfo.weight:'-'},
              {name:'健康状况',
			   type:'ERP_HealthyStatus',
			   isSwitch:true,
			  detail:personInfo.healthy},
              {name:'婚姻状况',
			   type:'ERP_MaritalStatus',
			   isSwitch:true,
			  detail:personInfo.maritalStatus},
              {name:'紧急联系人姓名',
			  detail:personInfo.emergencyContact},
              {name:'紧急联系人电话',
			  detail:personInfo.emergencyPhone},
              {name:'紧急联系人关系',
			  type:'ERP_ResourceRelation',
			  isSwitch:true,
			  detail:personInfo.emergencyRelation},
			];

		return(
			<div className='info-wrap-p'>
				  <div className='title-out'>
						<span className='title-blue'></span>
						<span className='title-name'>个人资料</span>
						{isEditUser && <span className='title-right' onClick={this.openPerson}>编辑</span>}
				  </div>
                  <ul className='info-inner personal-inner'>
					{
					  infoName.map((item,index)=>{
                        return (<li key={index}>
							<span className='name'>{item.name}</span>
							<span className='info'>
								{item.isSwitch?<Dictionary type={item.type} value={item.detail}/>:item.detail}
							</span>
					   </li>)
					  })	
					}		
				  </ul>

				<div className='info-title'>
					<div className='title-out family'>
							<span className='title-blue'></span>
							<span className='title-name'>家庭资料</span>
							{isEditUser && <span className='title-right' onClick={this.addFamily}>添加</span>}
					</div>
                </div> 
				 
				 <Table
                    ajax={true}
                    onOperation={this.onFamilyOperation}
                    displayCheckbox={false}
                    ajaxParams={familySearchParams}
                    ajaxUrlName='people-family-list'
                    ajaxFieldListName="items"
					  >
		            <TableHeader className='detail-header'>
		              <TableHeaderColumn className='header-row'>成员</TableHeaderColumn>
		              <TableHeaderColumn className='header-row'>称谓</TableHeaderColumn>
                      <TableHeaderColumn className='header-row'>身份证</TableHeaderColumn>
					  <TableHeaderColumn className='header-row'>工作单位</TableHeaderColumn>
		              <TableHeaderColumn className='header-row'>职务</TableHeaderColumn>
                      <TableHeaderColumn className='header-row'>地址</TableHeaderColumn>
					  <TableHeaderColumn className='header-row'>联系电话</TableHeaderColumn>
                      <TableHeaderColumn>操作</TableHeaderColumn>
		          	</TableHeader>

			        <TableBody >
			              <TableRow className='detail-row'>		                
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='name'></TableRowColumn>
							<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='calledStr'></TableRowColumn>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='idCard'></TableRowColumn>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='company'></TableRowColumn>
							<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='position'></TableRowColumn>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='address'></TableRowColumn>
							<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='contractPhone'></TableRowColumn>
			                <TableRowColumn type="operation">
                                  <Button label="编辑" operateCode="hrm_resource_edit" type="operation"  operation="edit"/>
			                      <Button label="删除" operateCode="hrm_resource_edit"  type="operation"  operation="delete" />
			                </TableRowColumn>
			               </TableRow>
			        </TableBody>
              </Table>

			  <div className='info-title'>
				<div className='title-out family'>
							<span className='title-blue'></span>
							<span className='title-name'>工作经历</span>
							{isEditUser && <span className='title-right' onClick={this.addWork}>添加</span>}
					</div>
              </div>  

				 <Table
                    ajax={true}
                    onOperation={this.onWorkOperation}
                    displayCheckbox={false}
                    ajaxParams={workSearchParams}
                    ajaxUrlName='people-job-list'
                    ajaxFieldListName="items"
					  >
		            <TableHeader className='detail-header'>
		              <TableHeaderColumn className='header-row'>公司名称</TableHeaderColumn>
		              <TableHeaderColumn className='header-row'>职务</TableHeaderColumn>
                      <TableHeaderColumn className='header-row'>开始时间</TableHeaderColumn>
					  <TableHeaderColumn className='header-row'>终止时间</TableHeaderColumn>
		              <TableHeaderColumn className='header-row'>联系人姓名</TableHeaderColumn>
                      <TableHeaderColumn className='header-row'>联系人电话</TableHeaderColumn>
					  <TableHeaderColumn className='header-row'>联系人邮箱</TableHeaderColumn>
                      <TableHeaderColumn>操作</TableHeaderColumn>
		          	</TableHeader>

			        <TableBody >
			              <TableRow className='detail-row'>		                
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='company'></TableRowColumn>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='job'></TableRowColumn>
							<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='startDate' component={(value,oldValue)=>{
										return (<KrDate value={value} format="yyyy-mm-dd"/>)
						}}></TableRowColumn>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='endDate' component={(value,oldValue)=>{
										return (<KrDate value={value} format="yyyy-mm-dd"/>)
						}}></TableRowColumn>
							<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='contactName'></TableRowColumn>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='contactPhone'></TableRowColumn>
							<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='contactEmail'></TableRowColumn>
			                <TableRowColumn type="operation">
                                  <Button label="编辑" operateCode="hrm_resource_editt"  type="operation"  operation="edit"/>
			                      <Button label="删除" operateCode="hrm_resource_edit"  type="operation"  operation="delete" />
			                </TableRowColumn>
			               </TableRow>
			        </TableBody>
              </Table>

			       {/*编辑个人信息*/}
					<Drawer
							open={this.state.openEdit}
							width={750}
							openSecondary={true}
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
							onClose={this.allClose}
					 >
						<EditPerson
			               onCancel={this.cancelPerson}
						   onSubmit={this.editSubmit}   
						/>
					</Drawer>

					{/*新增家庭人员*/}
					<Drawer
							open={this.state.openAddF}
							width={750}
							openSecondary={true}
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
							onClose={this.allClose}
					 >
						<AddFamily
			               onCancel={this.addFamily}
						   onSubmit={this.addPerSubmit}   
						/>
					</Drawer>

					{/*编辑家庭人员*/}
					<Drawer
							open={this.state.openEditF}
							width={750}
							openSecondary={true}
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
							onClose={this.allClose}
					 >
						<EditFamily
			               onCancel={this.EditFamily}
						   onSubmit={this.editPerSubmit}   
						/>
					</Drawer>

					{/*新增工作经历*/}
					<Drawer
							open={this.state.openAddW}
							width={750}
							openSecondary={true}
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
							onClose={this.allClose}
					 >
						<AddWork
			               onCancel={this.addWork}
						   onSubmit={this.addWorkSubmit}   
						/>
					</Drawer>

					{/*编辑工作经历*/}
					<Drawer
							open={this.state.openEditW}
							width={750}
							openSecondary={true}
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
							onClose={this.allClose}
					 >
						<EditWork
			               onCancel={this.editWork}
						   onSubmit={this.editWorkSubmit}   
						/>
					</Drawer>

					{/*删除人员*/}
					<Dialog
						title="提示"
						onClose={this.cancelDelete}
						open={this.state.openDeleteF}
						contentStyle ={{ width: '444px',height:'190px'}}
					>
					<DeleteFamily
						onCancel={this.cancelDelete}
						onSubmit={this.deleteSubmit}  
					/>
					</Dialog>

					{/*删除人员*/}
					<Dialog
						title="提示"
						onClose={this.cancelDelWork}
						open={this.state.openDeleteW}
						contentStyle ={{ width: '444px',height:'190px'}}
					>
					<DeleteWork
						onCancel={this.cancelDelWork}
						onSubmit={this.delWorkSubmit}  
					/>
					</Dialog>

			</div>
		);
	}
}
