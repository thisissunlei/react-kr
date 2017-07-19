import React from 'react';
import {	
	Table,
	TableHeader,
	TableHeaderColumn,
	TableBody,
	TableRow,
	TableRowColumn,
    Button
} from 'kr-ui';
import './index.less';

export default class PersonalInfo  extends React.Component{

	constructor(props,context){
		super(props, context);
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
			<div className='info-wrap'>
				  <div className='title'>
						<span className='title-blue'></span>
						<span className='title-name'>个人资料</span>
						<span className='title-right'>编辑</span>
				  </div>
                  <ul className='info-inner personal-inner'>
					{
					  infoName.map((item,index)=>{
                        return (<li>
							<span className='name'>{item.name}</span>
							<span className='info'>{item.detail}</span>
					   </li>)
					  })	
					}		
				  </ul>

				<div className='info-title'>
					<div className='title family'>
							<span className='title-blue'></span>
							<span className='title-name'>家庭资料</span>
							<span className='title-right'>添加</span>
					</div>
                </div> 
				 
				 <Table
                    //ajax={true}
                    onOperation={this.onOperation}
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
				<div className='title family'>
							<span className='title-blue'></span>
							<span className='title-name'>工作经历</span>
							<span className='title-right'>添加</span>
					</div>
                </div>  
				 <Table
                    //ajax={true}
                    onOperation={this.onOperation}
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
			</div>
		);
	}

}
