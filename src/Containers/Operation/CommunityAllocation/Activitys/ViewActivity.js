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
	DrawerTitle,
	KrDate,
} from 'kr-ui';
import './index.less';


class ViewNotice extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			ifCity:false,
			infoList:{},
			
		}
		this.getInfo();
	}
	
	componentDidMount() {
        
    }
   
	getInfo=()=>{
		var _this=this;
		const {detail}=this.props;
		Http.request('activity-detail',{id:detail.id}).then(function(response) {
			
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
			<div className="g-create-activity">
				<div className="u-create-title" style={{padding:'0 93px',paddingBottom:30,paddingLeft:40}}>
					<DrawerTitle title ='活动详情' onCancel = {this.onCancel}/>
				</div>
				<form style={{paddingLeft:90}}>

							<KrField
								style={{width:548}}
								label="活动标题"
								inline={false} 
								component="labelText"
								value={infoList.title}
								
						 	/>
						 	<KrField
								style={{width:260}}
								label="费用"
								inline={false} 
								component="labelText"
								value={infoList.cost=='0'?'免费':`￥${infoList.cost}`}
								
						 	/>
						 	<KrField
								style={{width:260}}
								label="活动类型"
								inline={false} 
								component="labelText"
								value={infoList.type=='1'?'全国活动':'社区活动'}
								
						 	/>
						 	{ifCity?<KrField  
					 			grid={1/2}
					 			style={{width:260}} 
					 			label="所属社区" 
					 			inline={false} 
								component="labelText"
								value={infoList.cmtName}
						 		
						 	/>:''}
						 	<KrField  
					 			grid={1/2}
					 			style={{width:260}} 
					 			label="地点" 
					 			inline={false} 
								component="labelText"
								value={infoList.site}
						 	/>
							 <KrField  
					 			grid={1/2}
					 			style={{width:260}} 
					 			label="地址" 
					 			inline={false} 
								component="labelText"
								value={infoList.address}
						 	/>
						 	<KrField  
					 			grid={1/2}
					 			style={{width:260}} 
					 			label="主办方" 
					 			inline={false} 
								component="labelText"
								value={infoList.sponsor}
						 	/>
						 	<KrField  
					 			grid={1/2}
					 			style={{width:260}} 
					 			label="是否置顶" 
					 			inline={false} 
								component="labelText"
								value={infoList.stick==1?'置顶':'不置顶'}
						 	/>
						 	<KrField  
					 			grid={1/2}
					 			style={{width:260}} 
					 			label="最大人数限制" 
					 			inline={false} 
								component="labelText"
								value={infoList.maxPerson==0?'无限制':infoList.maxPerson}
						 	/>
							 <KrField  
					 			grid={1/2}
					 			style={{width:260}} 
					 			label="点击量" 
					 			inline={false} 
								component="labelText"
								value={infoList.readCount==0?'0':infoList.readCount}
						 	/>
						 	
						 	<KrField
								style={{width:260}}
								label="开始时间"
								inline={false} 
								component="labelText"
								value={
									< KrDate 
										style = {{marginTop:5}} 
										value = {
						                    infoList.begin_time
						                }
               							format = "yyyy-mm-dd HH:MM:ss" />
								}

							/>
							<KrField
								style={{width:260}}
								label="结束时间"
								inline={false} 
								component="labelText"
								value={
									< KrDate 
										style = {{marginTop:5}} 
										value = {
						                    infoList.end_time
						                }
               							format = "yyyy-mm-dd HH:MM:ss" />
								}

							/>
							<div className="u-photo-box">
								<span className="u-photo-title">活动封面</span>
								<div className="u-photo-img-box" style={{width:300,height:400,marginLeft:15}}>
									<img src={infoList.imgUrl} style={{width:'100%',height:'100%'}}/>
								</div>
							</div>
							<div className="u-notice-con">
								<div>活动内容</div>
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
		form: 'viewNotice'
	})(ViewNotice);
