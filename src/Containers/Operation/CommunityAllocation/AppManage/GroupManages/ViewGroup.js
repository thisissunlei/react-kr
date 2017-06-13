import React from 'react';
import {Http} from 'kr/Utils';
import {
	reduxForm,
	change
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import {
	KrField,
	CircleStyleTwo,
	Grid,
	Row,
	Col,
	ButtonGroup,
	Button
} from 'kr-ui';
import './index.less';


class ViewGroup extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			viewData:{},
		}
		this.getViewData();
	}
	getViewData=()=>{
		var _this=this;
		const {GroupModel,detail}=this.props;
		Http.request('cluster-detail',{clusterId:detail.id}).then(function (response) {
			console.log('response---0000',response)
			_this.setState({
				viewData:response
			})
		}).catch(function (err) { });
	}
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	
	render() {
		let {viewData}=this.state;
		return (
			<div className="g-create-group">
				<div className="u-create-title">
						<div><span className="u-create-icon"></span><label className="title-text">群组详情</label></div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
				<CircleStyleTwo num="1" info="头像信息">
					<img src={viewData.headUrl} alt="" width={100} height={100}/>
				</CircleStyleTwo>
				<CircleStyleTwo num="2" info="群组信息" circle="bottom">
					<KrField
						style={{width:260}}
						name="title"
						inline={false} 
						component="labelText"
						label="群组名称"
						value={viewData.clusterName}
				 	/>
				 	<KrField
						style={{width:260,marginLeft:25}}
						name="title"
						inline={false} 
						component="labelText"
						label="群组类型"
						value={viewData.clusterType=='COUNTRYWIDE'?'全国群组':'社区群组'}
				 	/>
				 	<KrField
						style={{width:260}}
						name="title"
						inline={false} 
						component="labelText"
						label="所属城市"
						value={viewData.city || ''}
				 	/>
				 	<KrField
						style={{width:260,marginLeft:25}}
						name="title"
						inline={false} 
						component="labelText"
						label="所属社区"
						value={viewData.cmtName}
				 	/>
				 	<KrField 
				 		style={{width:260,marginBottom:10}}
				 		name="publishedStatus" 
				 		label="允许退出群组"
				 		inline={false} 
						component="labelText"
						value={viewData.follow==1?'是':'否'}
					 />   
					<KrField 
				 		style={{width:260,marginLeft:25,marginBottom:10}}
				 		name="publishedStatus"
				 		label="允许发帖"
						inline={false} 
						component="labelText"
						value={viewData.allow==1?'是':'否'}
					 /> 
					<KrField 
				 		style={{width:260,marginBottom:10}}
				 		name="publishedStatus"
						inline={false} 
						component="labelText"
				 		label="是否推荐"
				 		value={viewData.recommend==1?'是':'否'}
					 />
		                    
					
					<KrField
						style={{width:260,marginLeft:25}}
						name="title"
						inline={false} 
						component="labelText"
						label="排序号"
						value={viewData.sort}
				 	/>
				 	<KrField
						style={{width:548}}
						name="newsDesc"
						inline={false} 
						component="labelText"
						label="群组描述"
						value={viewData.intro}
						
				/>
				<Grid style={{marginTop:50,width:'81%'}}>
				<Row >
				<Col md={12} align="center">
					<ButtonGroup>
						<Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/>
					</ButtonGroup>
				  </Col>
				</Row>
				</Grid>
				</CircleStyleTwo>
				
			</div>
		);
	}

}
export default reduxForm({
		form: 'viewGroup',
	})(ViewGroup);

