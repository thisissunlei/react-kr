import React from 'react';
import {
	Http,
	ReactHtmlParser
} from 'kr/Utils';
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
	Message,
	KrDate,
} from 'kr-ui';
import './index.less';


class ViewOpinion extends React.Component {


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
		Http.request('opinion-detail',{id:detail.id}).then(function(response) {
			
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
			<div className="g-create-opinoin">
				<div className="u-create-title">
						<div className="title-text">反馈详情</div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
				<form style={{paddingLeft:90}}>

							<KrField
								style={{width:260}}
								label="姓名"
								inline={false} 
								component="labelText"
								value={infoList.mbrName}
								
						 	/>
						 	<KrField
								style={{width:260}}
								label="手机号"
								inline={false} 
								component="labelText"
								value={infoList.phone}
								
						 	/>
						 	
						 	<KrField  
					 			grid={1/2}
					 			style={{width:260}} 
					 			label="所属社区" 
					 			inline={false} 
								component="labelText"
								value={infoList.cmtName}
						 		
						 	/>
						 	<KrField
								style={{width:260}}
								label="创建时间"
								inline={false} 
								component="labelText"
								value={
									< KrDate 
										style = {{marginTop:5}} 
										value = {
						                    infoList.ctime
						                }
               							format = "yyyy-mm-dd hh:MM:ss" />
								}

							/>
						 	<KrField  
					 			grid={1/2}
					 			style={{width:260}} 
					 			label="内容" 
					 			inline={false} 
								component="labelText"
								value={infoList.address}
						 	/>
						 	
							<div className="u-photo-box">
								<span className="u-photo-title">图片</span>
								<div className="u-photo-img-box">
								  {
									infoList.imgUrl?infoList.imgUrl.map((item,index)=>{
										<img src={item} key={index} />
									}):'无'
								  }
									
									
								</div>
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
		form: 'viewOpinion'
	})(ViewOpinion);
