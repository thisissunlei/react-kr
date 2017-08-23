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
		Http.request('get-notice-detail',{id:detail.id}).then(function(response) {
			
			if(response.type==0){
				_this.setState({
					ifCity:true
				})
			}else{
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
				<form style={{paddingLeft:90}}>

							<KrField
								style={{width:548}}
								label="公告标题"
								inline={false} 
								component="labelText"
								value={infoList.title}
								
						 	/>
						 	<KrField
								style={{width:260,margintop:20}}
								label="公告类型"
								inline={false} 
								component="labelText"
								value={infoList.type=='1'?'全国公告':'社区公告'}
								
						 	/>
						 	{ifCity?<KrField  
					 			grid={1/2}
					 			style={{width:260,margintop:20}} 
					 			label="所属社区" 
					 			inline={false} 
								component="labelText"
								value={infoList.cmtName}
						 		
						 	/>:''}
						 	
						 	<KrField
								style={{width:260,margintop:20}}
								label="发布时间"
								maxSize={500}
								inline={false} 
								component="labelText"
								value={
									< KrDate 
										style = {{marginTop:5}} 
										value = {
						                    infoList.publishTime
						                }
               							format = "yyyy-mm-dd hh:MM:ss" />
								}

							/>
							<div className="u-notice-con">
								<div>公告内容</div>
								{infoList.richText && ReactHtmlParser(infoList.richText)}
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
