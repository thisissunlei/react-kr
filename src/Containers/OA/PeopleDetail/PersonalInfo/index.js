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
			openDeleteW:false
		}
	}
    
	//家庭操作
	onFamilyOperation=(type,itemDetail)=>{
       if(type=='edit'){
			this.setState({
			  openEditF:!this.state.openEditF
			})
	   }else if(type=='delete'){
		   this.setState({
			  openDeleteF:!this.state.openDeleteF
			})
	   }
	} 
    
	//工作操作
    onWorkOperation=(type,itemDetail)=>{
       if(type=='edit'){
			this.setState({
			  openEditW:!this.state.openEditW
			})
	   }else if(type=='delete'){
		   this.setState({
			  openDeleteW:!this.state.openDeleteW
			})
	   }
	}


   //编辑个人信息开关
   openPerson=()=>{
	   this.setState({
		   openEdit:!this.state.openEdit
	   })
   }
   
   //编辑提交
   editSubmit=(params)=>{
    
   }
   
   //新增家庭人员开关
   addFamily=()=>{
     this.setState({
		openAddF:!this.state.openAddF
	 })
   }
   
   //新增家庭提交
   addPerSubmit=(params)=>{
     
   }

  //编辑家庭人员开关
   EditFamily=()=>{
     this.setState({
		openEditF:!this.state.openEditF
	 })
   }
   
   //编辑人员提交
   EditPerSubmit=()=>{

   }

   //新增工作经历开关
   addWork=()=>{
	 this.setState({
		openAddW:!this.state.openAddW
	 })  
   }

   //新增工作经历提交
   addWorkSubmit=(params)=>{

   }

   //编辑工作开关
   editWork=()=>{
    this.setState({
		openEditW:!this.state.openEditW
	 })  
   }
   
   //编辑工作提交
   editWorkSubmit=()=>{

   }

   //关闭删除人员
   cancelDelete=()=>{
     this.setState({
		openDeleteF:!this.state.openDeleteF
	 })  
   }
  
   //删除人员提交
   deleteSubmit=()=>{
     
   }
  
   //关闭删除工作
   cancelDelWork=()=>{
	 this.setState({
		openDeleteW:!this.state.openDeleteW
	 })  
   }
   
   //关闭删除提交
   delWorkSubmit=()=>{
     
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

		let infoName=[
			 {name:'身份证号码',
			  detail:123},
			 {name:'出生日期',
			  detail:123},
			 {name:'星座',
			  detail:123},
			 {name:'血型',
			  detail:123},
			 {name:'民族',
			  detail:123},
			 {name:'籍贯',
			  detail:123},
			 {name:'户口',
			  detail:123},
			 {name:'政治面貌',
			  detail:123},
			 {name:'入团时间',
			  detail:123},
			 {name:'入党时间',
			  detail:123},
			 {name:'毕业院校',
			  detail:123},
              {name:'专业',
			  detail:123},
              {name:'学历',
			  detail:123},
              {name:'学位',
			  detail:123},
              {name:'参加工作时间',
			  detail:123},
              {name:'现居住地',
			  detail:123},
              {name:'暂/居住证号码',
			  detail:123},
              {name:'个人邮箱',
			  detail:123},
              {name:'微信号',
			  detail:123},
              {name:'联系电话',
			  detail:123},
              {name:'身高(cm)',
			  detail:123},
              {name:'体重(公斤)',
			  detail:123},
              {name:'健康状况',
			  detail:123},
              {name:'婚姻状况',
			  detail:123},
              {name:'紧急联系人姓名',
			  detail:123},
              {name:'紧急联系人电话',
			  detail:123},
              {name:'紧急联系人关系',
			  detail:123},
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
                    //ajax={true}
                    onOperation={this.onFamilyOperation}
                    displayCheckbox={false}
                    //ajaxParams={}
                    //ajaxUrlName=''
                    //ajaxFieldListName="items"
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
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>12</TableRowColumn>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>12</TableRowColumn>
							<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>12</TableRowColumn>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>12</TableRowColumn>
							<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>12</TableRowColumn>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>12</TableRowColumn>
							<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>12</TableRowColumn>
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
                    //ajax={true}
                    onOperation={this.onWorkOperation}
                    displayCheckbox={false}
                    //ajaxParams={}
                    //ajaxUrlName=''
                    //ajaxFieldListName="items"
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
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>12</TableRowColumn>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>12</TableRowColumn>
							<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>12</TableRowColumn>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>12</TableRowColumn>
							<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>12</TableRowColumn>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>12</TableRowColumn>
							<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>12</TableRowColumn>
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
						   onSubmit={this.EditPerSubmit}   
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
