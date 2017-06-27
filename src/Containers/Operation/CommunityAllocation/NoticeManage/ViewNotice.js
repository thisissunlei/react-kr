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
			groupList:[
				{label:'全国群组',value:'COUNTRYWIDE'},
				{label:'社区群组',value:'COMMUNITY'}
			],
			ifCity:false,
			requestURI :'http://optest01.krspace.cn/api/krspace-finance-web/activity/upload-pic',
		}
		
	}
	
	componentDidMount() {
        
    }
   
	
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	
	
	render() {
			
			let {
				groupList,
				ifCity,
			}=this.state;
			
		
		return (
			<div className="g-create-notice">
				<div className="u-create-title">
						<div className="title-text">新建公告</div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
				<form>

							<KrField
								style={{width:260,margintop:20}}
								label="群组类型"
								inline={false} 
								component="labelText"
								value=''
								
						 	/>
						 	{ifCity?<KrField  
					 			grid={1/2}
					 			style={{width:262,marginLeft:25}} 
					 			label="所属社区" 
					 			inline={false} 
								component="labelText"
								value=''
						 		
						 	/>:''}
						 	<KrField
								style={{width:260,margintop:20}}
								label="所属群组"
								inline={false} 
								component="labelText"
								value=''
								
						 	/>
						 	<KrField
								style={{width:548}}
								label="群组描述"
								maxSize={500}
								inline={false} 
								component="labelText"
								value=''

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
		form: 'viewNotice',
		
	})(ViewNotice);
