import React from 'react';
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
	Tabs,
	Tab,
	ListGroup,
	ListGroupItem,
	CheckPermission
} from 'kr-ui';
import State from './State';
import {DateFormat} from 'kr/Utils';
import {reduxForm,initialize} from 'redux-form';
import SearchList from './SearchList';
import FailList from './FailList';
import SuccessList from './SuccessList';
import {
	observer
} from 'mobx-react';
import './index.less';

@observer
export default class Journal extends React.Component {

	constructor(props, context) {
		super(props, context);
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
	onSubmit=()=>{
		console.log('0000')
	}
	openSearchUpperDialog=()=>{
		console.log('=====')
		State.openSearch = !State.openSearch;
	}
	onSearchSubmit=()=>{
		console.log('dddd')
	}
	onSearchContentSubmit=(value)=>{
		console.log(value)
	}
	

	render() {

		let {handleSubmit} = this.props;
		return (
			    <div>
					<Title value="日志列表"/>
					<Section title="日志列表"  >
					<Row style={{marginBottom:12,marginTop:-4,zIndex:6,position:'relative'}}>
						  <Col  align="right" style={{marginTop:0,float:"right",marginRight:-10}}>
						          <ListGroup>
						            <ListGroupItem><SearchForms placeholder='请输入查询内容' onSubmit={this.onSearchContentSubmit}/></ListGroupItem>
						            <ListGroupItem><Button searchClick={this.openSearchUpperDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'3'}}/></ListGroupItem>
						          </ListGroup>
					      </Col>
						  
			        </Row>
					<Tabs className="tabs">
						<Tab label="失败记录">
						   <FailList />
						</Tab>
						<Tab label="成功记录" >
						  <SuccessList />
						</Tab>
					</Tabs>
		            <Dialog
							title="高级查询"
							open={State.openSearch}
							modal={true}
							autoScrollBodyContent={true}
							autoDetectWindowHeight={true}
							onClose={this.openSearchUpperDialog}>
								<SearchList onSubmit={this.onSearchSubmit} onCancel={this.openSearchUpperDialog}/>
					    </Dialog>
					</Section>
					


				</div>
		);

	}

}
Journal = reduxForm({
    form: 'Journal'
})(Journal);
