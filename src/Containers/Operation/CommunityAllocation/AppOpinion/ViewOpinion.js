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
	DrawerTitle,
	Button,
	Message,
	KrDate,
} from 'kr-ui';
import {PhotoSwipeGallery} from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';
import './index.less';


export default class ViewOpinion extends React.Component {


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
	getThumbnailContent = (item) => {
		return (
		  <img src={item.src} width={90} height={90}/>
		);
	  }
	
	
	render() {
			
			let {
				infoList,
				ifCity,
			}=this.state;
			let {detail}=this.props;
			let items = [];
			if(infoList.imgUrl){
				items = infoList.imgUrl.map((item,value) => {
					return(
						{
							src: item,
							w: 900,
							h: 900,
						}
					)
				});
			}
			
		return (
			<div className="g-create-opinoin">
				<div className="u-create-title">
					<DrawerTitle title ='反馈详情' onCancel = {this.onCancel}/>
				</div>
				{infoList.handled == 1?
				<div className="u-table-list">
                    <table className="u-table">
                      <thead>
                        <tr>
                            <th width={100}>处理时间</th>
                            <th width={100}>处理人</th>
                            <th width={100}>处理状态</th>
                            <th width={270}>备注</th>
                        </tr>
                      </thead>
                        <tbody>
                            <tr>
                                <td><KrDate value={infoList.handleTime}/></td>
                                <td>{infoList.handler}</td>
                                <td>{infoList.handled == 1
                                        ? <span className="u-font-green">已处理</span>
                                        : <span className="u-font-red">未处理	</span>}</td>
                                <td>{infoList.resultDesc}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            	:''}
				<form>

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
					 			style={{width:548}}
					 			label="内容" 
					 			inline={false} 
								component="labelText"
								value={infoList.content?infoList.content:"无"}
						 	/>
						 	
							<div className="u-photo-box">
								<span className="u-photo-title">图片</span>
								<div style={{marginLeft:15}}>
								  
									<PhotoSwipeGallery items={items}  options={{index:0,Share:false}} thumbnailContent={this.getThumbnailContent}/>
								  
								</div>
							</div>
						<Grid style={{marginTop:50,width:'81%'}}>
						<Row >
						<Col md={12} align="center">
							<ButtonGroup>
								<Button  label="取消" cancle={true} type="button"  onClick={this.onCancel}/>
							</ButtonGroup>
						  </Col>
						</Row>
						</Grid>
						
				</form>
			</div>
		);
	}
}


// export default reduxForm({
// 		form: 'viewOpinion'
// 	})(ViewOpinion);
