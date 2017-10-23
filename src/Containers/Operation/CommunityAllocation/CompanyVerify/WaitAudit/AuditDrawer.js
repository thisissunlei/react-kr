import React from 'react';
import {
	Http,
	DateFormat
} from 'kr/Utils';
import {
	reduxForm,
	change,
	initialize
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	ButtonGroup,
	Button,
	Message,
	KrDate,
} from 'kr-ui';
import {PhotoSwipeGallery} from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';
import './index.less';

class AuditDrawer extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			infoList:{},
		}
		this.getInfo();
	}
	
	getInfo=()=>{
		var _this=this;
        const {detail}=this.props;
		Http.request('verification-detail',{companyId:detail.companyId}).then(function(response) {
			_this.setState({
                infoList:response
            })
		}).catch(function(err) {
			Message.error(err.message);
		});	
	}
   	
	onSubmit=()=>{
		let {onSubmit,detail} = this.props;
		onSubmit && onSubmit(detail.companyId);
	}
	onCancel=(type)=>{
		let {onCancel,detail} = this.props;
		onCancel && onCancel(detail.companyId,type);
	}
    getThumbnailContent = (item) => {
		return (
		  <img src={item.src} width={90} height={90}/>
		);
	  }
	
	
	render() {
			const {
				error,
				handleSubmit,
				pristine,
                reset,
                detail
			} = this.props;
			let {
                infoList
            }=this.state;
            let items = [
                {
                    src: infoList.licenseImg,
                    w: 900,
                    h: 900,
                }
            ];
		
		return (
			<div className="g-audit-drawer">
				<div className="u-create-title">
						<div className="title-text">企业详情</div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
				<form ref="form" >
                            <div className="u-photo-box">
								<span className="u-photo-title">公司Logo：</span>
								<div style={{marginLeft:15}}>
								  <img src={infoList.logo} width={90}/>
								</div>
							</div>
						 	<KrField
								style={{width:260,marginRight:25}}
								component="labelText"
                                inline={false}
								label="公司名称"
                                value={infoList.compnayName}
						 	/>
						 	
						 	<KrField
								style={{width:260,marginRight:25}}
								component="labelText"
								label="公司简称"
                                inline={false}
                                value={infoList.shortName}
						 	/>
						 	<div className="u-photo-box">
								<span className="u-photo-title">附件：</span>
								<div style={{marginLeft:15}}>
								  {
									infoList.licenseImg?<PhotoSwipeGallery items={items}  options={{index:detail.companyId,Share:false}} thumbnailContent={this.getThumbnailContent}/>:'无'
								  }
								</div>
							</div>
						 	

						<Grid style={{marginTop:50,width:'81%'}}>
						<Row >
						<Col md={12} align="center">
							<ButtonGroup>
								<Button  label="审核通过" onTouchTap={this.onSubmit} />
								<Button  label="退回" cancle={true} type="button"  onTouchTap={this.onCancel.bind(this,'1')}/>
							</ButtonGroup>
						  </Col>
						</Row>
						</Grid>
						
				</form>
			</div>
		);
	}
}
const validate = values => {

		const errors = {};

		if (!values.title) {
			errors.title = '请填写活动标题';
		}
		if (values.title && values.title.length>50) {
			errors.title = '活动标题不能超过50个字符';
		}

		if (!values.cost) {
			errors.cost = '请输入费用';
		}

		if (!values.type) {
			errors.type = '请选择活动类型';
		}
		if (!values.address) {
			errors.address = '请填写活动地址';
		}

		if (!values.cmtId) {
			errors.cmtId = '请选择所属社区';
		}
		if (!values.sponsor) {
			errors.sponsor = '请填写主办方';
		}

		if (!(values.startTime && values.StartTimeStr)) {
			errors.startTime = '请填写开始时间';
		}
		if (!(values.endTime && values.EndTimeStr)) {
			errors.endTime = '请填写结束时间';
		}
		if (!values.imgUrl) {
			errors.imgUrl = '请选择活动封面';
		}

		if (!values.richText) {
			errors.richText = '请输入活动内容';
		}
		
		

		return errors
}

export default reduxForm({
		form: 'auditDrawer',
		 validate,
		
	})(AuditDrawer);
