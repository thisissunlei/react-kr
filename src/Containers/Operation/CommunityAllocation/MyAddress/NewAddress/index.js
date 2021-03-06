import React from 'react';
import {
	toJS
} from 'mobx';
import {DateFormat,Http} from 'kr/Utils';
import {reduxForm,initialize,change,FieldArray} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	observer,
	mobx
} from 'mobx-react';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message,
	ListGroup,
	ListGroupItem,
	DivTitle,
	DrawerTitle,
	Notify
 
} from 'kr-ui';
import './index.less';
import State from '../State';
import HeaderUpload from './HeaderUpload';
@observer
 class NewCommunityList extends React.Component{

	static PropTypes = {

	}

	constructor(props){
		super(props);
		this.state={
			cityId:'',
			openDown:true,
	      	openUp:false,
	      	communityName:'',
			codeName:'',
		}
	}
  	componentDidMount(){
  		State.address = '';
  		State.stationVos=[
				{
					managerNick:'',
					managerPhone:'',
					managerEmail:'',
					managerIcon:'',
					managerType:'COMMUNITY_MANAGER'
				}];
			State.Leader={
				managerNick:'',
				managerPhone:'',
				managerEmail:'',
				managerIcon:'',
				managerType:'COMMUNITY_LEADER'
			};
			State.addGuideList = []
      
 	}

	onSubmit = (values) => {
		var form={};
		let managerInfo = {
				managerNick:'',
				managerPhone:'',
				managerEmail:'',
				managerIcon:'',
				managerType:'COMMUNITY_MANAGER',
				memberId:''
			};
		let manager = [];
		managerInfo = JSON.stringify(managerInfo);
		
		State.stationVos.map(item=>{
			if(JSON.stringify(item) !== managerInfo){
				manager.push(item)
			}
			
		});
		manager.push(State.Leader);
		values.cmtManagerList = JSON.stringify(manager);
		values.cmtGuideList = JSON.stringify(State.addGuideList)
		State.onNewAddressSubmit(values)

  	}

	onCancel = () => {
		State.stationVos=[
				{
					managerNick:'',
					managerPhone:'',
					managerEmail:'',
					managerIcon:'',
					managerType:'COMMUNITY_MANAGER'
				}];
			State.Leader={
				managerNick:'',
				managerPhone:'',
				managerEmail:'',
				managerIcon:'',
				managerType:'COMMUNITY_LEADER'
			};
			
		State.cmtGuideList = [];

		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	closeNew=()=>{
		State.switchNewAddress();
	}

	selectCommunity=(item)=>{
		if(item.id){
			Http.request('checkCommunityId', {
				cmtId: item.id
			}).then(function(response) {
				State.address = item.address;
			}).catch(function(err) {
				Notify.show([{
					message: err.message,
					type: 'danger',
				}]);
				Store.dispatch(change('NewCommunityList', 'communityId',''));

			});
		}	

	}
   

   




	componentWillReceiveProps(nextProps) {
	}


	// 编辑指南
	editGuide=(item,index)=>{

		State.guideEditItem =item;
		State.Editindex = index;
		State.switchOpenEditGuideFun();

	}
	// 删除指南
	deleteGuide=(item,index)=>{

		State.switchOpenDeleteItemGuideFun(item,index);

	}


	onStationVosChange=(type,index,value)=>{
		let item = State.stationVos[index]
		item[type]= value;
	}
	onBlur=(item,type)=>{
		if(type === 'managerPhone' && item.managerPhone){
			var isPhone = /(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/;
			var  phone= /^400-([0-9]){1}([0-9-]{7})$/;
			var telephone = /^0\d{2,3}-?\d{7,8}$/;
			if(!isPhone.test(item.managerPhone)&& !phone.test(item.managerPhone)&& !telephone.test(item.managerPhone)){
				Notify.show([{
					message: '请填写正确的电话',
					type: 'danger',
				}]);
				item.managerPhone = '';
				return;
			}

		}else if(type === 'managerEmail'&&  item.managerEmail){
			let email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;	
			if(!email.test(item.managerEmail)){
				Notify.show([{
					message: '请填写正确的邮箱',
					type: 'danger',
				}]);
				item.managerEmail = ''
				return
			}

		}
	}
	onChange=()=>{
		console.log('onChange');
	}
	onLeaderChange=(type,value)=>{
		State.Leader[type]= value;
		
	}
	addUrl=(result,index)=>{
		State.stationVos[index].managerIcon = result;
	}
	addHeaderLeaderUrl=(result,index)=>{
		State.Leader.managerIcon = result;
	}
	addArr=()=>{
		let item = {
				managerNick:'',
				managerPhone:'',
				managerEmail:'',
				managerIcon:'',
				managerType:'COMMUNITY_MANAGER'
			};
		State.stationVos.push(item);

	}
	reduceArr=(index)=>{
		State.stationVos.splice(index,1);
	}
	selectManagerName=(form)=>{
		State.Leader.managerNick=form.managerNick;
		State.Leader.managerPhone=form.managerPhone;
		State.Leader.managerEmail=form.managerEmail;
		State.Leader.headerUrl=form.managerIcon;
		State.Leader.memberId=form.memberId;
		
	}

	selectName=(index,form)=>{
		State.stationVos[index].managerNick=form.managerNick;
		State.stationVos[index].managerPhone=form.managerPhone;
		State.stationVos[index].managerEmail=form.managerEmail;
		State.stationVos[index].headerUrl=form.managerIcon;
		State.stationVos[index].memberId=form.memberId;

	}


	render(){
		let {handleSubmit} = this.props;
		let list = State.stationVos;
		var _this=this;
		
		
		let typeLinkLeaderNameList = {
			value:State.Leader.managerNick,
			requestChange: _this.onLeaderChange.bind(null,'managerNick')
		}
		let typeLinkLeaderPhoneList = {
			value: State.Leader.managerPhone,
			requestChange: _this.onLeaderChange.bind(null,'managerPhone')
		}
		let typeLinkLeaderEmailList = {
			value:State.Leader.managerEmail,
			requestChange: _this.onLeaderChange.bind(null,'managerEmail')
		}
		return (
	      <div className="new-my-address">
	      	<div style={{marginLeft:10,marginBottom:30}}>
				<DrawerTitle title ='新建地点' onCancel = {this.onCancel}/>
			</div>

	        <form onSubmit={handleSubmit(this.onSubmit)} >
	      	<DivTitle index={1} title='社区公告' styleType={2}>
				<div style={{marginLeft:15}}> 
				<KrField name="notice" style={{marginBottom:13}}type="textarea" component="textarea" label="社区公告" maxSize={1000} placeholder='请输入社区公告' requireLabel={true}/>
				</div>
			</DivTitle>

			<DivTitle index={2} title='社区信息' styleType={2}>
				<div style={{marginBottom:5,paddingBottom:32,marginLeft:15}}> 
				<KrField grid={1/2} name="communityId" right={15} component="searchCommunityAll" inline={false} label="社区名称" onChange={this.selectCommunity}  requireLabel={true}/>
				<KrField grid={1/2} name="address" left={15} component="labelText" inline={false} label="社区地址"  defaultValue={State.address|| "无"} requireLabel={true}/>
                <KrField grid={1/2} name="wifiName" right={15} component="input" type="text" inline={false} label="Wifi账号" requireLabel={true}/>
                <KrField grid={1/2} name="wifiPwd" left={15} component="input" type="text" inline={false} label="Wifi密码" requireLabel={true}/>
				</div>
			</DivTitle>
			<DivTitle index={3} title='团队信息'>
			<div style={{marginBottom:5,paddingBottom:32,textAlign:'center'}}>

				<div className="info-box">
					 <HeaderUpload defaultUrl={State.Leader.headerUrl} onChange={this.addHeaderLeaderUrl} index={0}/>
					 	
					<div className="info-list">
						<span className="info-input" style={{border:'none',lineHeight:'36px',display:'inline-block',marginTop:'-10px',marginBottom:'3px'}}>社区负责任人</span>
						<KrField  
							name="memberId"  
							component="searchPersonName" 
							inline={false} 
							onChange={this.selectManagerName} 
							style={{width:261}}
						 />
						<input type="text"  name="name" className="info-input" valueLink={typeLinkLeaderNameList} maxLength={10} placeholder='请输入昵称' onBlur={this.onBlur.bind(this,State.Leader,'managerNick')}/>
					 	<input type="text"  name="leadertelephone" className="info-input" valueLink={typeLinkLeaderPhoneList}  placeholder='请输入电话号码'  onBlur={this.onBlur.bind(this,State.Leader,'managerPhone')}/>
					 	<input type="text"  name="email" className="info-input"  valueLink={typeLinkLeaderEmailList}  placeholder='请输入邮箱' onBlur={this.onBlur.bind(this,State.Leader,'managerEmail')}/>
					</div> 
				</div>

				{list && list.map((item,index)=>{	
			    		let typeLinkNameList = {
							value: State.stationVos[index].managerNick,
							requestChange: _this.onStationVosChange.bind(null,'managerNick',index)
						}
						let typeLinkPhoneList = {
							value: State.stationVos[index].managerPhone,
							requestChange: _this.onStationVosChange.bind(null,'managerPhone',index)
						}
						let typeLinkEmailList = {
							value: State.stationVos[index].managerEmail,
							requestChange: _this.onStationVosChange.bind(null,'managerEmail',index)
						}
			    		return (
			    			<div className="info-box" key={index}>
					    		<HeaderUpload defaultUrl={item.headerUrl} onChange={this.addUrl} index={index}/>
					    		
								<div className="info-list">
									<span className="info-input" style={{border:'none',lineHeight:'36px',display:'inline-block',marginTop:'-10px',marginBottom:'3px'}}>社区管家</span>
									<KrField  
										name={`memberId${index}`}
										component="searchPersonName" 
										inline={false} 
										onChange={this.selectName.bind(_this,index)} 
										style={{width:261}}
									/>
					    			<input type="text" name="name" className="info-input" valueLink={typeLinkNameList} maxLength={10}  placeholder='请输入姓名' onBlur={this.onBlur.bind(this,item,'managerNick')}/>
					    			<input type="text" name="telephone" className="info-input" valueLink={typeLinkPhoneList}  placeholder='请输入电话号码' onBlur={this.onBlur.bind(this,item,'managerPhone')}/>
					    			<input type="text" name="email" className="info-input"  valueLink={typeLinkEmailList}  placeholder='请输入邮箱' onBlur={this.onBlur.bind(this,item,'managerEmail')}/>
								</div> 
								<div className="caozuo">
									{index == list.length-1 && <span className="add-info-box" onClick={this.addArr}>+</span>}
									{State.stationVos.length>1 && <span className="less-info-box"  onClick={this.reduceArr.bind(this,index)}>-</span>}
								</div>
					    	</div>

			    		)
			    	})}
			 </div>
			</DivTitle>

			<DivTitle index={4} title='社区指南' styleType={3}>
		        
		        <div className="community-guide-list-box" >
		        	<div style={{marginBottom:19,marginLeft: 28}}>
		        	<Button  label="添加指南" type="button"  onTouchTap={State.switchOpenAddGuideFun}/>
		        	</div>
		        	{
		        		State.addGuideList.length>0?<div className="community-guide-list">
		        		{
		        			State.addGuideList.map((item,index)=>{
		        				return(
		        					<div className="guide-list-item" key={index}>
		        						<span>{item.guideTitle}</span>
		        						<div className="operation-btn">
		        							<span onClick={this.editGuide.bind(this,item,index)}>编辑</span>
		        							<span onClick={this.deleteGuide.bind(this,item,index)}>删除</span>
		        						</div>
		        						
		        					</div>
		        					);
		        			})
		        		}
			        	</div>:<div className="community-guide-list-no">
			          		<img src={require('../images/hasNo.png')} className="list-no-img" onClick={this.closeNew}/>
			        	</div>
	        		}
	        	</div>
	        </DivTitle>
	        	<Grid style={{marginTop:25,marginBottom:'4px',marginLeft:40}}>

					<Row>
						<ListGroup>
							<ListGroupItem style={{width:'300px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="submit"/></ListGroupItem>
							<ListGroupItem style={{width:'254px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} /></ListGroupItem>
						</ListGroup>					
					</Row>
				</Grid>

	        	
	        </form >
        
      	</div>
		);
	}
}
const validate = values =>{

		const errors = {};

      if(!values.notice){
        errors.notice='请输入社区公告';
      }
      if(!values.communityId){
        errors.communityId='请选择社区';
      }
      if(!values.wifiName){
        errors.wifiName='请输入wifi名称';
      }
      if(!values.wifiPwd){
        errors.wifiPwd='请输入wifi密码';
      }
      if(values.wifiName && values.wifiName.length>30){
        errors.wifiName='wifi名称长度不能大于30';
      }
      if(values.wifiPwd && values.wifiPwd.length>30){
        errors.wifiPwd='wifi密码长度不饿能大于30';
      }

		return errors
	}
export default reduxForm({ 
	form: 'NewCommunityList',
	validate,
	enableReinitialize:true,
	keepDirtyOnReinitialize:true
})(NewCommunityList);
