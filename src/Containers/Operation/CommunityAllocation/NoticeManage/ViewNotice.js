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
	Button,
	Message
} from 'kr-ui';
import './index.less';


class ViewNotice extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			ifCity:false,
			infoList:[],
			
		}
		this.getInfo();
	}
	
	componentDidMount() {
        
    }
   
	getInfo=()=>{
		var _this=this;
		const {detail}=this.props;
		Http.request('get-findDetail',{topicId:detail.topicId}).then(function(response) {
			if(response.clusterType=='COMMUNITY'){
				_this.setState({
					ifCity:true
				})
			}else {
				_this.setState({
					ifCity:false
				})
			}
			_this.setState({
				infoList:response
			})
			
			
		}).catch(function(err) {
			Message.error(err.message);
		});	
	}

	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	
	
	render() {
			
			let {
				infoList,
				ifCity,
			}=this.state;
			
		
		return (
			<div className="g-create-notice">
				<div className="u-create-title">
						<div className="title-text">公告详情</div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
				<form>

							<KrField
								style={{width:260,margintop:20}}
								label="群组类型"
								inline={false} 
								component="labelText"
								value={infoList.clusterType=='COMMUNITY'?'社区群组':'全国群组'}
								
						 	/>
						 	{ifCity?<KrField  
					 			grid={1/2}
					 			style={{width:262,marginLeft:25}} 
					 			label="所属社区" 
					 			inline={false} 
								component="labelText"
								value={infoList.cmtName}
						 		
						 	/>:''}
						 	<KrField
								style={{width:260,margintop:20}}
								label="所属群组"
								inline={false} 
								component="labelText"
								value={infoList.clusterName}
								
						 	/>
						 	<KrField
								style={{width:548}}
								label="群组描述"
								maxSize={500}
								inline={false} 
								component="labelText"
								value={infoList.topicContent}

							/>
						<div className="u-img-list">
							<div className="u-list-title">公告图片</div>
							{infoList.imgUrl&&infoList.imgUrl.map((item,index)=>{
								return <img src={item}  key={index}/>
							})}
						</div>
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
		form: 'viewNotice',
		
	})(ViewNotice);
