import React from 'react';
import {Store} from 'kr/Redux';
import {
	Title,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Dialog,
	Tooltip,
	Drawer,
	SearchForms,
	Section,
	KrField,
	Row,
	Col,
	Grid,
	ListGroup,
	ListGroupItem,
	CheckPermission
} from 'kr-ui';
import State from './State';
import {DateFormat,Http} from 'kr/Utils';
import {reduxForm,initialize} from 'redux-form';
// import NewCreateSystem from './NewCreateSystem';
// import EditSystem from './EditSystem';
// import Synchro from './Synchro';
import {
	observer
} from 'mobx-react';
import './index.less';

@observer
export default class Journal extends React.Component {

	constructor(props, context) {
		super(props, context);
		console.log('searchList',this.props.params)
		this.state = {
			systemList:[],
			mainList:[]
		}
	}

	componentDidMount(){
		this.getMainpartList();
		this.getSystemList();
		let {params} = this.props;
		params.mainId += '';
		params.systemId +="" ;
		console.log('=======',params);
		Store.dispatch(initialize('Journal', params));
	}

	getSystemList=()=>{
		let _this = this;
		Http.request('system-select-list',{}).then(function(response) {
			response = response.map((item)=>{
				let obj = item;
				obj.label = item.name;
				obj.value = item.id + '';
				return obj
			})
			_this.setState({
				systemList:response
			})
		}).catch(function(err) {
			Message.error('失败');
		});

	}
	getMainpartList=()=>{
		let _this = this;
		Http.request('main-select-list',{}).then(function(response) {
			response = response.map((item)=>{
				let obj = item;
				obj.label = item.name;
				obj.value = item.id + '';
				return obj
			})
			_this.setState({
				mainList:response
			})
		}).catch(function(err) {
			Message.error('失败');
		});

	}

	openNewCreat=()=>{
		State.createSystem = true;
	}
	NewCreateCancle=()=>{
		State.createSystem = false;
	}
	openEditSystem=()=>{
		State.openEditSystem = true;
	}
	closeEditSystem=()=>{
		State.openEditSystem = false;
	}
	editSystemSubmit=()=>{
		console.log('submit')
	}
	openSynchro=()=>{
		State.openSynchro = true;
	}
	closeSynchro=()=>{
		State.openSynchro = false;
	}
	onSubmit=(values)=>{
		let {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel()
	}
	
	componentWillReceiveProps(nextProps) {
		if(this.props.params != nextProps.params){
			console.log(nextProps.params)
			Store.dispatch(initialize('Journal', nextProps.params));
		}
	}
	

	render() {
		let options = [{label:'定时',value:'TIMING'},{label:'手动',value:'MANUAL'}]
		let {handleSubmit} = this.props;
		let {systemList,mainList} = this.state;
		return (
			<div style={{marginTop:30}}>
			<form className="m-new-create m-new-dialog-create" onSubmit={handleSubmit(this.onSubmit)} >
					<KrField 
						name="systemId" 
						component="select" 
						label="同步系统" 
						grid={1/2}
						right={34}
						options={systemList}  
						/>
					<KrField 
						grid={1/2}  
						name="mainpartId" 
						type="select" 
						label="同步主体" 
						right={34}
						options={mainList}
						component="select" />
					<KrField 
						grid={1/2}  
						name="mode" 
						type="input" 
						label="同步方式"
						right={34} 
						options={options}
						component="select" />
					<KrField grid={1/2}  
						name="content" 
						type="input" 
						label="同步内容" 
						right={34}
						component="input" />
					<KrField grid={1/1}  component="group" label="同步时间" style={{marginTop:3}}>
						<div className='ui-listDate'>
							<ListGroup>
								<ListGroupItem><div className='ui-date-start' style={{width:260}} ><KrField  style={{width:260,marginLeft:-10,marginTop:2}} name="beginDate" component="date" /></div></ListGroupItem>
									<div style = {{display:"inline-block",marginTop:20}} className='ui-line-down'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
								<ListGroupItem><div className='ui-date-end'><KrField name="endDate" style={{width:260,marginTop:2}} component="date" /></div></ListGroupItem>
							</ListGroup>
		                </div>
					</KrField>
					<Grid style={{paddingBottom:20,textAlign:"center",paddingTop:20}}>
						<Row>
							<ListGroup>
								<ListGroupItem style={{textAlign:'right',paddingRight:15}}><Button  label="确定" type="submit" width={81} height={30} fontSize={16}/></ListGroupItem>
								<ListGroupItem style={{textAlign:'left',paddingLeft:15}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}  width={81} height={30} fontSize={16}/></ListGroupItem>
							</ListGroup>
						</Row>
					</Grid>

			</form>
			</div>
		);

	}

}
Journal = reduxForm({
    form: 'Journal'
})(Journal);
