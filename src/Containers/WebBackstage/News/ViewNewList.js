import React from 'react';
import {
	ReactHtmlParser
} from "kr/Utils";
import {
	KrField,
	CircleStyleTwo,
	DrawerTitle
} from 'kr-ui';
import {Http} from 'kr/Utils';
import {reduxForm,initialize} from 'redux-form';
import {Store} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
import './index.less';
import State from './State';

@observer
class ViewNewList extends React.Component {
	
	constructor(props) {
		super(props);

		let {detail}=this.props;
		State.getNewsDate(detail.id);
		
	}
	componentWillReceiveProps(nextProps){
		if(!ShallowEqual(this.props.initializeValues,nextProps.detail)){
			let {detail}=nextProps;
			State.getNewsDate(detail.id);
		}


	}
	componentWillUnmount(){
		State.newsDetail='';
	}
	onCancel=()=>{
		let {onCancel}=this.props;
		onCancel && onCancel();
	}
	


	render() {

		
		return (
			<div className="g-new-list">
					<div className="u-title-box">
					<DrawerTitle title ='查看新闻' onCancel = {this.onCancel}/>
					</div>
					<CircleStyleTwo num="1" info="新闻基本信息">
						<KrField
							style={{width:548}}
							type="labelText"
							inline={false}
							value={State.newsDate.title}
							label="新闻标题"
					 	/>
					 	<KrField
							style={{width:260,marginRight:25}}
							type="labelText"
							inline={false}
							value={State.newsDate.publishedTime}
							label="发布时间"
					 	/>
						 <KrField
							style={{ width: 548 }}
							name="teamName"
							type="labelText"
							value={State.newsDate.teamName}
							label="团队信息"
						/>
					 	<KrField
							style={{width:260}}
							type="labelText"
							inline={false}
							value={State.newsDate.orderNum}
							label="排序号"
					 	/>
						 
					 	 <KrField 
						 		style={{width:260,marginRight:25,marginBottom:10}}
						 		name="publishedStatus" 
						 		type="labelText"
								inline={false}
								value={State.newsDate.publishedStatus=='PUBLISHED'?'发布':'未发布'}
						 		label="发布状态"
						 />
	                    <KrField 
		                		style={{width:260,marginBottom:10}}
		                		name="stickStatus" 
		                		type="labelText"
								inline={false}
								value={State.newsDate.stickStatus=='STICKED'?'置顶':'未置顶'}
		                		label="置顶状态"
	                	/>
						<KrField
							style={{width:548,height:20}}
							type="labelText"
							inline={false}
							label="阅读人数"
					 	/>
						 <KrField 
						 		style={{width:130,marginRight:25,marginBottom:10}}
						 		name="webReadCount" 
						 		type="labelText"
								inline={false}
								value={State.newsDate.webReadCount}
						 		label="WEB"
						 />
	                    <KrField 
		                		style={{width:130,marginBottom:10}}
		                		name="appReadCount" 
		                		type="labelText"
								inline={false}
								value={State.newsDate.appReadCount}
		                		label="APP"
	                	/>
						<KrField 
		                		style={{width:130,marginBottom:10}}
		                		name="baseReadCount" 
		                		type="labelText"
								inline={false}
								value={State.newsDate.baseReadCount}
		                		label="基数"
	                	/>
			                   
	                	<KrField
								style={{width:548}}
								name="newsDesc"
								type="labelText"
								inline={false}
								label="新闻简介"
								value={State.newsDate.newsDesc}
						/>
						<div className="u-photo-box">
								<span className="u-photo-title">新闻列表图片</span>
								<div className="u-photo-img-box" style={{width:390,height:161,marginLeft:15}}>
									<img src={State.newsDate.photoUrl} style={{width:'100%',height:'100%'}}/>
								</div>
						</div>
						<KrField
								style={{width:548}}
								name="newsDesc"
								type="labelText"
								inline={false}
								label="文章关联社区"
								value={State.newsDate.relateCmtName?State.newsDate.relateCmtName:'无'}
						/>
					</CircleStyleTwo>
					<CircleStyleTwo num="2" info="新闻详细信息" circle="bottom">
						<div style={{width:560}}>
							{State.newsDate.newsContent && ReactHtmlParser(State.newsDetail)}
						</div>
					</CircleStyleTwo>
			   
			</div>

		);
	}
}

export default ViewNewList = reduxForm({
	form: 'viewNewList',
})(ViewNewList);

