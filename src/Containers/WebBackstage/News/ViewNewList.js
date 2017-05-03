import React from 'react';
import {
	ReactHtmlParser
} from "kr/Utils";
import {reduxForm} from 'redux-form';
import {
	KrField,
	CircleStyleTwo
} from 'kr-ui';
import './index.less';


class ViewNewList extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			
		}
		
	}
	onCancel=()=>{
		let {onCancel}=this.props;
		onCancel && onCancel();
	}
	


	render() {

		
		return (
			<div className="g-new-list">
					<div className="u-title-box">
						<img className="u-title-img" src={require('./images/activity.svg')} />
						<span className="u-title-text">查看新闻</span>
						<span className="u-close-page" onClick={this.onCancel}>
							<img 
								src={require('./images/closeIMG.svg')} 
								className="u-close-page-img"
							 />
						</span>
					</div>
					<CircleStyleTwo num="1" info="新闻基本信息">
						<KrField
							style={{width:548}}
							type="labelText"
							inline={false}
							value=""
							label="新闻标题"
					 	/>
					 	<KrField
							style={{width:260,marginRight:25}}
							type="labelText"
							inline={false}
							value=""
							label="发布时间"
					 	/>
					 	<KrField
							style={{width:260}}
							type="labelText"
							inline={false}
							value=""
							label="排序号"
					 	/>
					 	 <KrField 
						 		style={{width:260,marginRight:25,marginBottom:10}}
						 		name="publishedStatus" 
						 		type="labelText"
								inline={false}
								value=""
						 		label="发布状态"
						 />
	                    <KrField 
		                		style={{width:260,marginTop:5,marginBottom:5}}
		                		name="stickStatus" 
		                		type="labelText"
								inline={false}
								value=""
		                		label="置顶状态"
	                	/>
			                   
	                	<KrField
								style={{width:548}}
								name="newsDesc"
								type="labelText"
								inline={false}
								label="新闻简介"
						/>
						<div className="u-photo-box">
								<span className="u-photo-title">新闻列表图片</span>
								<div className="u-photo-img-box" style={{width:390,height:230,marginLeft:15}}>
									<img src="" style={{width:'100%',height:'100%'}}/>
								</div>
						</div>
					</CircleStyleTwo>
					<CircleStyleTwo num="2" info="新闻详细信息" circle="bottom">
						{ReactHtmlParser(State.detailContent)}
					</CircleStyleTwo>
			   
			</div>

		);
	}
}

export default ViewNewList = reduxForm({
	form: 'viewNewList',
})(ViewNewList);

