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
			
		}

	}
	
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	
	render() {
		
		return (
			<div className="g-create-group">
				<div className="u-create-title">
						<div><span className="u-create-icon"></span><label className="title-text">群组详情</label></div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
				<CircleStyleTwo num="1" info="头像信息">
					<KrField 
						name="photoUrl"
						component="newuploadImage"
						innerstyle={{width:392,height:161,padding:10}}
						photoSize={'570*212'}
						pictureFormat={'JPG,PNG,GIF'}
						pictureMemory={'500'}
						requestURI = ''
						label="群组头像"
						inline={false}
						/>
				</CircleStyleTwo>
				<CircleStyleTwo num="2" info="群组信息" circle="bottom">
					<KrField
						style={{width:260}}
						name="title"
						inline={false} 
						component="labelText"
						label="群组名称"
				 	/>
				 	<KrField
						style={{width:260,marginLeft:25}}
						name="title"
						inline={false} 
						component="labelText"
						label="群组类型"
				 	/>
				 	<KrField
						style={{width:260}}
						name="title"
						inline={false} 
						component="labelText"
						label="所属城市"
				 	/>
				 	<KrField
						style={{width:260,marginLeft:25}}
						name="title"
						inline={false} 
						component="labelText"
						label="所属社区"
				 	/>
				 	<KrField 
				 		style={{width:260,marginBottom:10}}
				 		name="publishedStatus" 
				 		label="允许退出群组"
				 		inline={false} 
						component="labelText"
						value=""
					 />   
					<KrField 
				 		style={{width:260,marginLeft:25,marginBottom:10}}
				 		name="publishedStatus"
				 		label="允许发帖"
						inline={false} 
						component="labelText"
						value=""
					 /> 
					<KrField 
				 		style={{width:260,marginBottom:10}}
				 		name="publishedStatus"
						inline={false} 
						component="labelText"
				 		label="是否推荐"
				 		value=""
					 />
		                    
					
					<KrField
						style={{width:260,marginLeft:25}}
						name="title"
						inline={false} 
						component="labelText"
						label="排序号"
						value=""
				 	/>
				 	<KrField
						style={{width:548}}
						name="newsDesc"
						inline={false} 
						component="labelText"
						label="群组描述"
						value=""
						
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

