

import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,change,reset} from 'redux-form';
import {Http} from 'kr/Utils';

import {
	KrField,
	Grid,
	Row,
	Button,
	Notify,
	ListGroup,
	ListGroupItem,
	SearchForm,
	Message,
	SearchForms
} from 'kr-ui';

import './index.less';

import {DateFormat} from 'kr/Utils';
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer



class DoorWarnForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			logTypeOptions : [],
			searchParams:{

			},
		}
	}
	componentDidMount(){
	
		
	}
	onSubmit=(values)=>{
		
		
		State.printerManageListParams = {
			communityId:values.communityId || '',
	        serialNo :values.serialNo || '',
	        alias :values.alias || '',
	        readerName : values.readerName || '',
	        printerName :values.printerName || '',
			pageSize : '15',
	        page : 1,
	        dateNow : new Date()
		}
	}

	onClearAll=()=>{
		Store.dispatch(reset('DoorWarnForm',''));
		State.printerManageListParams = {
			communityId:'',
	        serialNo :'',
	        alias :'',
	        readerName : '',
	        printerName :'',
			pageSize : '15',
	        page : 1,
		}

	}

	
	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
	 
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} className="print-manage-search">
				<ListGroup className="fir-list">
				
					<ListGroupItem >
						
						<KrField 
							name="printerName" 
							type="text" 
							label="打印机名称：" 
							inline={true}
							requireLabel={false} 
							
						/>
					</ListGroupItem>
					<ListGroupItem >
						
						<KrField 
							name="alias" 
							type="text" 
							label="打印机别名：" 
							inline={true}
							requireLabel={false} 
							
						/>
					</ListGroupItem>
					
					

					<ListGroupItem>
						<span className="community-box">
							<KrField name="communityId" 
								component="searchCommunityAll" 
								label="社区名称："  
								inline={true}
								style={{width:252}}
							/>
						</span>
					</ListGroupItem>

					<ListGroupItem >
						
						<KrField 
							name="readerName" 
							type="text" 
							label="读卡器名称：" 
							inline={true}
							requireLabel={false} 
							
						/>
					</ListGroupItem>
					
					<ListGroupItem >
						
						<KrField 
							name="serialNo" 
							type="text" 
							label="序列号：" 
							inline={true}
							requireLabel={false} 
							
						/>
					</ListGroupItem>
					
				</ListGroup>
				<div style={{float : "right"}}>
					<ListGroup style={{float : "right"}}>
						
						<ListGroupItem style={{margin:"0 10px"}}>
							<Button  label="搜索" type="submit"/>
						</ListGroupItem>
						<ListGroupItem >
							<Button  label="清空" type="button"  cancle={true} onTouchTap={this.onClearAll} />
						</ListGroupItem>
						
					</ListGroup>
				</div>
			</form>
		);
	}
}
export default DoorWarnForm = reduxForm({
	form: 'DoorWarnForm',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(DoorWarnForm);
