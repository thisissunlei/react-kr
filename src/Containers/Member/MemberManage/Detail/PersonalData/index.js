import React from 'react';


import './index.less';
import {
	KrField,
} from 'kr-ui';
export default class BasicInfo extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	static defaultProps = {

	}

	static PropTypes = {

	}

	constructor(props, context) {
		super(props, context);
		this.state = {
			baseInfo:{}
		}
	}
	componentDidMount() {

	}

	render() {
		let {
			params,detail
		} = this.props;
		let baseInfo = detail;
			if(baseInfo.gender==0){
	     		baseInfo.gender  = "女";
			}else if(baseInfo.gender==1){
				 baseInfo.gender  = "男";
			}else{
				baseInfo.gender  = "保密";
			}
			if(baseInfo.maritalStatus=="MARRIED"){
				baseInfo.maritalStatus = "已婚";
			}else if(baseInfo.maritalStatus=="UNMARRIED"){
				baseInfo.maritalStatus = "未婚";
			}else{
				baseInfo.maritalStatus = "保密";
			}
		return (

			<div className='data-detail-order'>
			           <KrField grid={1/3} alignRight={true} label="姓名:" component="labelText" value={baseInfo.name} defaultValue="无" style={{marginRight:"20px"}}/>
			           <KrField grid={1/3}  alignRight={true} label="微信:" component="labelText"   value={baseInfo.wechatNick} defaultValue="无" style={{marginLeft:'-20px'}}/>
                	   <KrField grid={1/3} alignRight={true} label="婚姻状况:" component="labelText"  value={baseInfo.maritalStatus} defaultValue="无" style={{marginLeft:"-20px"}}/>
			           <KrField grid={1/3} alignRight={true} label="邮箱:" component="labelText"  value={baseInfo.email} defaultValue="无" style={{marginRight:'20px'}}/>
			            <KrField grid={1/3} alignRight={true} label="性别:"   component="labelText" value={baseInfo.gender} defaultValue="无" style={{marginLeft:'-20px'}}/>
						<KrField grid={1/3} alignRight={true} label="联系电话:"   component="labelText" value={baseInfo.phone} defaultValue="无" style={{marginLeft:"-20px"}}/>
						<KrField grid={1/3} alignRight={true} label="生日:"  component="labelText" value={baseInfo.birthday} defaultValue="无" style={{marginRight:'20px'}}/>
						<KrField grid={1/3} alignRight={true} label="注册时间:" component="labelText" type="date" value={baseInfo.registerTime} defaultValue="无" style={{marginLeft:"-20px"}}/>
									
			</div>

		)

	}

}
