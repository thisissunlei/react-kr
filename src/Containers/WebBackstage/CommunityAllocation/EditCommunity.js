import React from 'react';
import {
	toJS
} from 'mobx';
import {DateFormat,Http} from 'kr/Utils';
import {reduxForm,initialize,change,FieldArray} from 'redux-form';
import {Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message,
} from 'kr-ui';
import './index.less';
 class EditCommunity extends React.Component{
	constructor(props){
		super(props);
		this.state={
		    picUrl:'',
			picId:''
		}
	}

	onSubmit = (values) => {
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
    }

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}



			render(){


				let {picUrl,picId}=this.state;		

				const {handleSubmit,dataReady,open,cityData,photoF,photoL,photoD,timeStart,timeEnd,communityName,opend} = this.props;

                let defaultValue={
					picId:picId,
                    picUrl:picUrl
				}



				return (
					<div>
						<form className="web-communityList-m"  style={{paddingLeft:9}} onSubmit={handleSubmit(this.onSubmit)}  onClick={this.closemm}>
							<div className="title">
								<div><span className="new-icon list-icon"></span><label className="title-text">编辑社区配置</label></div>
								<div className="customer-close" onClick={this.onCancel}></div>
							</div>
							<div className="cheek">
                                <div className="titleBar"><span className="order-number">1</span><span className="wire"></span><label className="small-title">基本信息</label></div>
                                <div className="small-cheek">


                                    <KrField grid={1/2} label="社区名称" inline={false} value={communityName} style={{width:262,marginLeft:18}} component="labelText"/>

                                    <KrField grid={1/2} label="开业状态" inline={false} value={opend} style={{width:262,marginLeft:28}} component="labelText"/>
        
                                
                            </div>
                                <div className="titleBar"><span className="order-number">2</span><span className="wire"></span><label className="small-title">移动工位</label></div>
                                <div className="small-cheek">


                                    <KrField grid={1/2} label="工位个数" name="mobileStationNum" style={{width:262,marginLeft:18}} component="input"/>

                                    <KrField grid={1/2} label="单价(积分/天)" name="mobileStationPrice" style={{width:262,marginLeft:28}} component="input"/>

                                    <KrField
                                        label=""
                                        name="picId"
                                        component="newuploadImage"
                                        innerstyle={{width:364,height:254,padding:16}}
                                        sizePhoto
                                        photoSize={'3:2'}
                                        pictureFormat={'JPG,PNG,GIF'}
                                        pictureMemory={'300'}
                                        requestURI = '/api/krspace-finance-web/cmt/community/upload-photo/type/multi'
                                        inline={false}
                                        formfile=' '
                                        defaultValue={defaultValue}
                                        center='center'
                                    />

                                
                            </div>


							<div style={{display:'block'}}>
								<div className="titleBar"><span className="order-number">3</span><span className="wire"></span><label className="small-title">官网信息</label></div>
								<div className="small-cheek" style={{paddingBottom:0}}>
                                    <KrField grid={1/2} label="是否企业定制" name="portalShow" style={{width:248,marginLeft:15}} component="group">
										<KrField name="portalShow" label="非定制" type="radio" value='false' onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
										<KrField name="portalShow" label="定制" type="radio" value='true' onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
									</KrField>
                                    <KrField grid={1/2} label="是否允许预约" name="portalShow" style={{width:200,marginLeft:35}} component="group">
										<KrField name="portalShow" label="可预约" type="radio" value='true' onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
										<KrField name="portalShow" label="不可预约" type="radio" value='false' onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
									</KrField>
                                    <KrField grid={1/2} label="是否显示覆盖标签" name="portalShow" style={{width:248,marginLeft:15}} component="group">
										<KrField name="portalShow" label="显示" type="radio" value='true' onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
										<KrField name="portalShow" label="不显示" type="radio" value='false' onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
									</KrField>
									<KrField grid={1/2} label="官网显示状态" name="portalShow" style={{width:200,marginLeft:35}} component="group" requireLabel={true}>
										<KrField name="portalShow" label="显示" type="radio" value='1' onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
										<KrField name="portalShow" label="不显示" type="radio" value='0' onClick={this.hasOfficeClick} style={{marginTop:5,display:'inline-block',width:84}}/>
									</KrField>

									<KrField grid={1/2} label="覆盖标签内容" name="orderNum" component="input" style={{width:262,marginLeft:15}} onChange={this.communityRankChange}/>
                                
									<KrField grid={1/2} label="排序" name="orderNum" component="input" style={{width:262,marginLeft:25}} onChange={this.communityRankChange}/>

                                    <KrField style={{width:262,marginLeft:15}}  name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel}/>
                                    
									{/*{State.isCorpRank && <div style={{fontSize:14,color:"red",paddingLeft:26,paddingBottom:7}}>该序号已存在</div>}*/}

                                    {/*<FieldArray name="porTypes" component={renderStation} />*/}

                	<div className='speakInfo' style={{marginBottom:3}}><KrField grid={1} label="社区简介" name="description" style={{marginLeft:15}} heightStyle={{height:"140px",width:'543px'}}  component="textarea"  maxSize={200} placeholder='请输入社区简介' lengthClass='list-length-textarea'/></div>

										
										<KrField grid={1} label="交通" name="brightPorts.brightPoints"  heightStyle={{height:"78px",width:'530px'}}  component="textarea"  maxSize={100} placeholder='请输入交通' style={{width:517,marginLeft:15}} lengthClass='list-len-textarea'/>
										<KrField grid={1} label="周边" name="brightRound.brightPoints" heightStyle={{height:"78px",width:'530px'}}  component="textarea"  maxSize={100} placeholder='请输入周边' style={{width:517,marginLeft:15}} lengthClass='list-len-textarea'/>
										<div style={{marginTop:'-16px'}}>
											<span className='upload-pic-first'>上传首页图片</span>
											<KrField name="photosStr_first"
												component="uploadImageList"
												style={{marginTop:10,textAlign:'left'}}
												defaultValue={photoF}
                        imgFlag={true}
												/>
										</div>

										<div style={{marginTop:'16px'}}>
											<span className='upload-pic-first'>上传社区列表页图片</span>
											<KrField name="photosStr_list"
												component="uploadImageList"
												style={{marginTop:10,textAlign:'left'}}
												defaultValue={photoL}
                        imgFlag={true}
												/>
										</div>


										<div style={{marginTop:'16px'}}>
											<span className='upload-pic-first'>上传详情页图片</span>
											<KrField name="photosStr_detail"
												component="uploadImageList"
												style={{marginTop:10,textAlign:'left'}}
												defaultValue={photoD}
                        imgFlag={false}
                        innerBoxStyle={{width:254,height:70}}
                        innerStyle={{left:110,top:12}}
												/>
										</div>

									</div>
									<div className="end-round"></div>
								</div>


							</div>
							<Grid style={{marginTop:30}}>
								<Row>
									<Col md={12} align="center">
										<ButtonGroup>
											<div  className='list-btn-center'><Button  label="确定" type="submit"/></div>
											<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel}/>
										</ButtonGroup>
									</Col>
								</Row>
							</Grid>
						</form>
					</div>
				);
			}
		}
		const validate = values =>{

			const errors = {};
			let phone = /(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/;
			let checkTel=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
			let stationN = /^([1-9][0-9]{0,2})$/;
            let stationNP=/^([0-9][0-9]{0,4})$/;
			//正整数
			let numberNotZero=/^[0-9]*[1-9][0-9]*$/;
			//非负整数
			let noMinus=/^(0|[1-9]\d*)$/;
			//整数
            let zeroNum=/^-?\d+$/;　
            //坐标
            var reg =/^[-\+]?\d+(\.\d+)\,[-\+]?\d+(\.\d+)$/;

			 //空格
	 		let regs=/^\s*$/;


	      


	           //工位校验
	        if (!values.porTypes || !values.porTypes.length) {
	           errors.porTypes = { _error: 'At least one member must be entered' }
	         } else {
	           const membersArrayErrors = []
	           values.porTypes.forEach((porTypes, memberIndex) => {
	             const memberErrors = {}
	             if (porTypes.price&&porTypes.price.toString().trim()&&!stationNP.test(porTypes.price.toString().trim())) {
	               memberErrors.price = '价格不超过五位整数'
	               membersArrayErrors[memberIndex] = memberErrors
	             }
	           })
	         if(membersArrayErrors.length) {
	           errors.porTypes = membersArrayErrors
	         }
	       }


	     if(values.floorHeight&&isNaN(values.floorHeight)){
	        errors.floorHeight='请输入数字';
	     }
	     if(values.entryNum&&values.entryNum.toString().trim()&&!numberNotZero.test(values.entryNum.toString().trim())){
	        errors.entryNum='请输入正整数';
	     }
	     if(values.elevatorNum&&values.elevatorNum.toString().trim()&&!numberNotZero.test(values.elevatorNum.toString().trim())){
	        errors.elevatorNum='请输入正整数';
	     }
	     if(values.cargoNum&&values.cargoNum.toString().trim()&&!numberNotZero.test(values.cargoNum.toString().trim())){
	        errors.cargoNum='请输入正整数';
	     }
	     if(values.efficientRate&&isNaN(values.efficientRate)){
	        errors.efficientRate='请输入数字';
	     }
	     if(values.greenRate&&isNaN(values.greenRate)){
	        errors.greenRate='请输入数字';
	     }
	     if(values.stationNum&&values.stationNum.toString().trim()&&!numberNotZero.test(values.stationNum.toString().trim())){
	        errors.stationNum='请输入正整数';
	     }
	     if(values.meetNum&&values.meetNum.toString().trim()&&!numberNotZero.test(values.meetNum.toString().trim())){
	        errors.meetNum='请输入正整数';
	     }

	     if(values.local&&values.local.toString().trim()&&!reg.test(values.local.toString().trim())){
	       errors.local='请填写正确的坐标格式';
	     }

	       if(!values.name||(values.name&&regs.test(values.name.toString().trim()))){
	         errors.name = '请填写社区名称';
	       }

	       if(!values.code||(values.code&&regs.test(values.code.toString().trim()))){
	         errors.code='请填写社区编码';
	       }

	       if(!values.local||(values.local&&regs.test(values.local.toString().trim()))){
	         errors.local='请输入社区坐标';
	       }

	       if(!values.area||(values.area&&regs.test(values.area.toString().trim()))){
	         errors.area='请输入社区面积';
	       }
	       if(values.area&&values.area.toString().trim()&&!numberNotZero.test(values.area.toString().trim())){
	         errors.area='请输入正整数';
	       }

	       if (!values.countyId) {
	         errors.countyId= '请填写所属区县';
	       }

	       if (!values.address||(values.address&&regs.test(values.address.toString().trim()))) {
	         errors.address= '请输入详细地址';
	       }

	        //排序
	     if(values.orderNum&&isNaN(values.orderNum)){
	       errors.orderNum='请输入数字';
	     }
	     if(values.orderNum&&values.orderNum.length>3){
	       errors.orderNum = '最多输入3个字符';
	     }
	     if(values.orderNum&&values.orderNum.toString().trim()&&!stationN.test(values.orderNum.toString().trim())){
	       errors.orderNum = '请输入3位以内正整数,不能以0开头';
	     }


	 			//values.opened = String(values.opened);
	       if (!values.opened) {
	         errors.opened= '请输入社区状态';
	       }

	       if (!values.openDate) {
	         errors.openDate= '请输入开业时间';
	       }

	       if (!values.signStartDate) {
	         errors.signStartDate= '请输入签约开始时间';
	       }

	       if (!values.signEndDate) {
	         errors.signEndDate= '请输入签约结束时间';
	       }

	       if (!values.stationNum||(values.stationNum&&regs.test(values.stationNum.toString().trim()))) {
	         errors.stationNum= '请输入工位总数';
	       }

	       if (!values.meetNum||(values.meetNum&&regs.test(values.meetNum.toString().trim()))) {
	         errors.meetNum= '请输入会议室总数';
	       }

	       if(!values.contract||(values.contract&&regs.test(values.contract.toString().trim()))){
	         errors.contract='请输入联系方式'
	       }
	       if(values.mobileStationNum&&(!numberNotZero.test(values.mobileStationNum.toString().trim())&&values.mobileStationNum!=0)){
	         errors.mobileStationNum='工位数为正整数或0'
	       }
	       if(values.mobileStationPrice&&(!numberNotZero.test(values.mobileStationPrice.toString().trim())&&values.mobileStationPrice!=0)){
	         errors.mobileStationPrice='工位单价为正整数或0'
	       }

	 			if(values.mobileStationNum&&values.mobileStationNum.toString().trim().length>5){
	         errors.mobileStationNum='工位数最多5位'
	       }
	       if(values.mobileStationPrice&&values.mobileStationPrice.toString().trim().length>5){
	         errors.mobileStationPrice='工位单价最多5位'
	       }

			return errors
		}
		export default reduxForm({ form: 'EditCommunity',validate})(EditCommunity);
