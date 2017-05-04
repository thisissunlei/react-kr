import React from 'react';
import {
	toJS
} from 'mobx';
import {DateFormat} from 'kr/Utils';
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
	DivTitle
 
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
	      	codeName:''
		}
	}
  	componentDidMount(){
      
 	}

	onSubmit = (values) => {
		 State.stationVos.push(State.Leader);
		 	values.cmtManagerListStr = State.stationVos;
		
		values.cmtManagerListStr = JSON.stringify(values.cmtManagerListStr);
		console.log('values.cmtManagerListStr',values.cmtManagerListStr)
		values.cmtGuideListStr = JSON.stringify(State.addGuideList)
		// const {onSubmit} = this.props;
		// onSubmit && onSubmit(values);
		State.onNewAddressSubmit(values)
		console.log('onsubmit',values)
  	}

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	closeNew=()=>{
		State.switchNewAddress();
	}

	selectCommunity=(item)=>{
		console.log(item)
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
		console.log(State.stationVos,State.stationVos[index],item[type],index,type,value)

		item[type]= value;
		// State.stationVos[index][type] = value;
	}
	positionChange=(index, value,type)=>{
		console.log(index, value,type)

	}
	onBlur=(item)=>{
		console.log('onblur',State.stationVos)
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
				managerName:'',
				managerPhone:'',
				managerEmail:'',
				managerIcon:'',
				managerType:'COMMUNITY_MANAGER'
			};
		State.stationVos.push(item);
		console.log(State.stationVos.length)

	}
	reduceArr=(index)=>{
		State.stationVos.splice(index,1);
	}



	render(){
		let {handleSubmit} = this.props;
		console.log("State.addGuideList",State.addGuideList.length);
		let list = State.stationVos;
		let _this = this;
		let typeLinkLeaderNameList = {
			value: State.Leader.managerName,
			requestChange: _this.onLeaderChange.bind(null,'managerName')
		}
		let typeLinkLeaderPhoneList = {
			value: State.Leader.managerPhone,
			requestChange: _this.onLeaderChange.bind(null,'managerPhone')
		}
		let typeLinkLeaderEmailList = {
			value: State.Leader.managerEmail,
			requestChange: _this.onLeaderChange.bind(null,'managerEmail')
		}
		return (
	      <div className="new-my-address">
	        <div className="close-new-div">
	          <img src={require('../images/closeIcon.svg')} className="close-new-img" onClick={this.closeNew}/>
	        </div>

	        <form onSubmit={handleSubmit(this.onSubmit)} >
	        <p style={{fontSize:'18px',color:'#333',margin:0,marginBottom:'20px'}}>基本信息</p>
	      	<DivTitle index={1} title='社区公告' styleType={2}>
				<div style={{marginLeft:15}}> 
				<KrField name="notice" style={{marginBottom:13}}type="textarea" component="textarea" label="社区公告" maxSize={1000} placeholder='请输入社区公告'/>
				</div>
			</DivTitle>

			<DivTitle index={2} title='社区信息' styleType={2}>
				<div style={{marginBottom:5,paddingBottom:32,marginLeft:15}}> 
				<KrField grid={1/2} name="communityId" right={15} component="searchCommunityManage" inline={false} label="社区名称" onChange={this.selectCommunity}  requireLabel={true}/>
				<KrField grid={1/2} type="address" left={15} component="labelText" inline={false} label="社区地址"  defaultValue="无"  requireLabel={true}/>
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
					 	<input type="text" name="name" className="info-input" valueLink={typeLinkLeaderNameList}  placeholder='请输入姓名'/>
					 	<input type="text" name="telephone" className="info-input" valueLink={typeLinkLeaderPhoneList}  placeholder='请输入电话号码'/>
					 	<input type="text" name="email" className="info-input"  valueLink={typeLinkLeaderEmailList}  placeholder='请输入邮箱'/>
					</div> 
				</div>

				{list && list.map((item,index)=>{	
			    		let typeLinkNameList = {
							value: State.stationVos[index].managerName,
							requestChange: _this.onStationVosChange.bind(null,'managerName',index)
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
					    			<input type="text" name="name" className="info-input" valueLink={typeLinkNameList}  placeholder='请输入姓名'/>
					    			<input type="text" name="telephone" className="info-input" valueLink={typeLinkPhoneList}  placeholder='请输入电话号码'/>
					    			<input type="text" name="email" className="info-input"  valueLink={typeLinkEmailList}  placeholder='请输入邮箱'/>
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


      // if(!values.area){
      //   errors.area='请输入社区面积';
      // }

		return errors
	}
export default reduxForm({ 
	form: 'NewCommunityList',
	validate,
	enableReinitialize:true,
	keepDirtyOnReinitialize:true
})(NewCommunityList);
