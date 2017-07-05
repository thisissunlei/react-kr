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
		const {detail}=this.props;
		Http.request('cluster-detail',{clusterId:detail.id}).then(function (response) {
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
		var status;
		if(viewData.follow==0){
			status='非强制'
		}else if(viewData.follow==1){
			status='强制不可离开'
		}else if(viewData.follow==2){
			status='强制可离开'
		}
		return (
			<div className="g-create-group">
				<div className="u-create-title">
						<div className="title-text">群组详情</div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
					<form className="u-view-group">
					<div className="u-view-img ">
						<p  style={{display:"inline-block"}}>群组头像</p>
						<img className="u-person-img" src={viewData.headUrl} style={{marginLeft:16}} />
					</div>
					
				
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
				 	{viewData.clusterType=='COMMUNITY'?(<KrField
						style={{width:260}}
						name="title"
						inline={false} 
						component="labelText"
						label="所属城市"
						value={viewData.city || ''}
				 	/>):''}
				 	{viewData.clusterType=='COMMUNITY'?(<KrField
						style={{width:260,marginLeft:25}}
						name="title"
						inline={false} 
						component="labelText"
						label="所属社区"
						value={viewData.cmtName}
				 	/>):''}
				 	<KrField 
				 		style={{width:260,marginBottom:10}}
				 		name="publishedStatus" 
				 		label="群组状态："
						component="labelText"
						value={status}
						inline={false} 
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
				 		style={{width:548,marginBottom:10}}
				 		name="publishedStatus"
				 		label="允许发帖："
						component="labelText"
						value={viewData.allow==1?'是':'否'}
					 /> 
					<KrField 
				 		style={{width:548,marginBottom:10}}
				 		name="publishedStatus"
						component="labelText"
				 		label="是否推荐："
				 		value={viewData.recommend==1?'是':'否'}
					 />
		            {viewData.recommend==1?(<div className="u-view-img">
						<img src={viewData.listUrl} style={{marginLeft:16}} width={320} height={220}/>
					</div>):'' }     
					
					
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
				</form>
				
			</div>
		);
	}

}
export default reduxForm({
		form: 'viewGroup',
	})(ViewGroup);

