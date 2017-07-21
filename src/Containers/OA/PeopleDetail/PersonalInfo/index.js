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
	Dialog
} from 'kr-ui';
import './index.less';
import EditPerson from './EditPerson';
import AddFamily from './AddFamily';
import EditFamily from './EditFamily';
import AddWork from './AddWork';
import EditWork from './EditWork';
import DeleteFamily from './DeleteFamily';
import DeleteWork from './DeleteWork';
import {Http} from 'kr/Utils';
import {Store} from 'kr/Redux';
import {
  initialize
} from 'redux-form';

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

			},
			//工作经历
			workSearchParams:{

			}
		}
	}


	componentWillMount(){
	  let {personId}=this.props;
	  //获取个人信息
	  this.personData(personId);
	}

	//获取个人信息
	personData=(id)=>{
       Http.request('postListAdd',{id:id}).then(function(response) {
		   this.setState({
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
			  openDeleteF:!this.state.openDeleteF
			})
	   }
	} 

	//获取家庭编辑信息
	getFamilyInfo=(id)=>{
	    Http.request('postListAdd',{id:id}).then(function(response) {
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
			  openDeleteW:!this.state.openDeleteW
			})
	   }
	}
    
	//获取工作编辑信息
	getWorkInfo=(id)=>{
	    Http.request('postListAdd',{id:id}).then(function(response) {
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
       var _this=this;
       Http.request('postListAdd',{},params).then(function(response) {
           console.log('response',response);
           _this.personData(params.id);
        }).catch(function(err) {
          Message.error(err.message);
        });
   }
   
   //新增家庭人员开关
   addFamily=()=>{
     this.setState({
		openAddF:!this.state.openAddF
	 })
   }
   
   //新增家庭提交
   addPerSubmit=(params)=>{
      var _this=this;
       Http.request('postListAdd',{},params).then(function(response) {
           _this.setState({
			   familySearchParams:{
				   time:+new Date()
			   }
		   })
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
      var _this=this;
       Http.request('postListAdd',{},params).then(function(response) {
           _this.setState({
			   workSearchParams:{
				   time:+new Date()
			   }
		   })
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
     var _this=this;
       Http.request('postListAdd',{},params).then(function(response) {
           console.log('response',response);
           _this.setState({
			   familySearchParams:{
				   time:+new Date()
			   }
		   })
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
     var _this=this;
       Http.request('postListAdd',{},params).then(function(response) {
           console.log('response',response);
           _this.setState({
			   workSearchParams:{
				   time:+new Date()
			   }
		   })
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

		let {personInfo,familySearchParams,workSearchParams}=this.state;

		let infoName=[
			 {name:'身份证号码',
			  detail:personInfo.idCard},
			 {name:'出生日期',
			  detail:personInfo.birthday},
			 {name:'星座',
			  detail:personInfo.constellation},
			 {name:'血型',
			  detail:personInfo.bloodType},
			 {name:'民族',
			  detail:personInfo.nation},
			 {name:'籍贯',
			  detail:personInfo.nativePlace},
			 {name:'户口',
			  detail:personInfo.household},
			 {name:'政治面貌',
			  detail:personInfo.politicsStatus},
			 {name:'入团时间',
			  detail:personInfo.leagueDate},
			 {name:'入党时间',
			  detail:personInfo.partyDate},
			 {name:'毕业院校',
			  detail:personInfo.college},
              {name:'专业',
			  detail:personInfo.major},
              {name:'学历',
			  detail:personInfo.education},
              {name:'学位',
			  detail:personInfo.degree},
              {name:'参加工作时间',
			  detail:personInfo.workDate},
              {name:'现居住地',
			  detail:personInfo.currentAddress},
              {name:'暂/居住证号码',
			  detail:personInfo.temporaryPermit},
              {name:'个人邮箱',
			  detail:personInfo.personEmail},
              {name:'微信号',
			  detail:personInfo.wechat},
              {name:'联系电话',
			  detail:personInfo.mobilePhone},
              {name:'身高(cm)',
			  detail:personInfo.height},
              {name:'体重(公斤)',
			  detail:personInfo.weight},
              {name:'健康状况',
			  detail:personInfo.healthy},
              {name:'婚姻状况',
			  detail:personInfo.maritalStatus},
              {name:'紧急联系人姓名',
			  detail:personInfo.emergencyContact},
              {name:'紧急联系人电话',
			  detail:personInfo.emergencyPhone},
              {name:'紧急联系人关系',
			  detail:personInfo.emergencyRelation},
			];

		return(
			<div className='info-wrap-p'>
				  <div className='title-out'>
						<span className='title-blue'></span>
						<span className='title-name'>个人资料</span>
						<span className='title-right' onClick={this.openPerson}>编辑</span>
				  </div>
                  <ul className='info-inner personal-inner'>
					{
					  infoName.map((item,index)=>{
                        return (<li key={index}>
							<span className='name'>{item.name}</span>
							<span className='info'>{item.detail}</span>
					   </li>)
					  })	
					}		
				  </ul>

				<div className='info-title'>
					<div className='title-out family'>
							<span className='title-blue'></span>
							<span className='title-name'>家庭资料</span>
							<span className='title-right' onClick={this.addFamily}>添加</span>
					</div>
                </div> 
				 
				 <Table
                    ajax={true}
                    onOperation={this.onFamilyOperation}
                    displayCheckbox={false}
                    ajaxParams={familySearchParams}
                    ajaxUrlName='123'
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
                                  <Button label="编辑"  type="operation"  operation="edit"/>
			                      <Button label="删除"  type="operation"  operation="delete" />
			                </TableRowColumn>
			               </TableRow>
			        </TableBody>
              </Table>

			  <div className='info-title'>
				<div className='title-out family'>
							<span className='title-blue'></span>
							<span className='title-name'>工作经历</span>
							<span className='title-right' onClick={this.addWork}>添加</span>
					</div>
              </div>  

				 <Table
                    ajax={true}
                    onOperation={this.onWorkOperation}
                    displayCheckbox={false}
                    ajaxParams={workSearchParams}
                    ajaxUrlName='345'
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
							<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='startDate'></TableRowColumn>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='endDate'></TableRowColumn>
							<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='contactName'></TableRowColumn>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='contactPhone'></TableRowColumn>
							<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='contactEmail'></TableRowColumn>
			                <TableRowColumn type="operation">
                                  <Button label="编辑"  type="operation"  operation="edit"/>
			                      <Button label="删除"  type="operation"  operation="delete" />
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
			               onCancel={this.openPerson}
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
						   onSubmit={this.addPerSubmit}   
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
						   onSubmit={this.addWorkSubmit}   
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
