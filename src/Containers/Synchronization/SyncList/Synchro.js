import React from 'react';
import {reduxForm,initialize} from 'redux-form';
import {Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Message,
	ListGroup,
	ListGroupItem,
	ButtonGroup,
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHeaderColumn,
	TableRowColumn,
	Pagination
} from 'kr-ui';
import {
	observer
} from 'mobx-react';
import {DateFormat,Http} from 'kr/Utils';
import './index.less';
import State from './State';
@observer
export default class Synchro extends React.Component {

	constructor(props) {
		super(props);
		
	}
	componentDidMount(){
	}
	componentWillMount() {
	}
	onSubmit=(value)=>{
		State.getSyncList(value);
		
	}
	onPageChange=(page)=>{
		console.log('page',page)
		let value = {
			page:page
		};
		State.getSyncList(value);
	}
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel()
	}
	

	render() {
		let communityInfoFloorList = [{value:1,label:'1'}]
		let {handleSubmit} = this.props;
		let rowFootStyle ={
			marginTop:30
		}
		return (
		<div className="m-synchro-system">
			<div className="u-title-box">
				<img className="u-title-img" src={require('./images/activity.svg')} />
				<span className="u-title-text">手动同步</span>
				<span className="u-close-page" onClick={this.onCancel}>
					<img 
						src={require('./images/closeIMG.svg')} 
						className="u-close-page-img"
					 />
				</span>
			</div>
			<form name="planTable" onSubmit={handleSubmit(this.onSubmit)} className="form-list">
				<KrField
							name="interfaceAdd"
							type="text"
							component="input"
							label="接口地址 ：  "
							style={{marginRight:20,width:260}}
							grid={1/3}
							inline={true}

					 	/>
                <KrField 
                	name="remark" 
                	grid={1/3} 
                	component="input"  
                	label="备注：  " 
                	inline={true} 
                	style={{marginRight:20,width:260}}
                	/>
                <Button  label="同步" type="submit"  width={60}/>
            </form>

            {State.result.load && 
            	<div className="m-sync-result">
            		导入完成【成功：{State.result.success}条，失败：<span style={{color:'red'}}>{State.result.fail}</span>条】
            	</div>
            }

             {!!State.synchroList.length && <Table
	            displayCheckbox={false}
					  >
		            <TableHeader>
		              <TableHeaderColumn>序号</TableHeaderColumn>
		              <TableHeaderColumn>时间</TableHeaderColumn>
		              <TableHeaderColumn>状态</TableHeaderColumn>
		              <TableHeaderColumn>内容</TableHeaderColumn>
		          	</TableHeader>
				<TableBody className='noDataBody' >
					{State.synchroList.map((item,index)=>{
			        		return (
				        		<TableRow key={index}>
					                <TableRowColumn><span className="tableOver">{item.order}</span></TableRowColumn>
					                <TableRowColumn><span className="tableOver">{DateFormat(item.syncTime,'yyyy/MM/dd')}</span></TableRowColumn>
					                <TableRowColumn><span className="tableOver">{item.status}</span></TableRowColumn>
					                <TableRowColumn><span className="tableOver">{item.content}</span></TableRowColumn>
					            </TableRow>
					          	);
			        	})}
				</TableBody>
			</Table>}
           {/* !!State.pages.page && <div className='footPage' style={rowFootStyle}><Pagination  totalCount={State.pages.totalCount} page={State.pages.page} pageSize={State.pages.pageSize} onPageChange={this.onPageChange}/></div>*/}

				
		</div>


		);
	}
}

Synchro = reduxForm({
    form: 'Synchro'
})(Synchro);

