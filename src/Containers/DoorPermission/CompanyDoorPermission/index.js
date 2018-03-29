import React from 'react';
import {
	Title,
	Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn,TableFooter,
	Button,
	Section,
	Dialog,
	Message,
	Grid,Row,
	ListGroup,ListGroupItem,
	Tooltip,
	Drawer ,
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import './index.less';


import SearchGroupForm from './SearchGroupForm';
import EmptyPage from './EmptyPage';


import AuthorizationEquipment from '../MemberDoorPermmision/AuthorizationEquipment';


import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class DoorGroupManage extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			companyId : '',
			doorTypeOptions : []
		}
	}

	componentDidMount(){
		this.getBasicListOption();
	}


	changeCompany=(item)=>{
		this.setState({
			companyId: item.id
		})
	}

	getBasicListOption=()=>{
		let that = this;
		Http.request('getWarningType',{}).then(function(response) {
			var arrNew = [],doorTypeArrNew=[];
			if(response.DoorType){
				for (var i=0;i<response.DoorType.length;i++){
					
					doorTypeArrNew[i] = {
						label:response.DoorType[i].desc,
						value:response.DoorType[i].value
					}
				}
			}
	
			that.setState({
				doorTypeOptions: doorTypeArrNew
			})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	




	render() {
		let {
			doorTypeOptions,
		} = this.state;
		let {companyId} = this.state;
		let memberDetailInfo = {id:companyId};
		return (
		    <div className="door-permission-manage  search-company-permmision" style={{width:"100%",minHeight:'910',backgroundColor:"#fff"}} >
				<Title value="门禁权限管理"/>
				<Section title={`查询客户权限`} description="" >
					<SearchGroupForm  changeCompany={this.changeCompany}/>
					{
						companyId 
						?
						<AuthorizationEquipment memberDetailInfo={memberDetailInfo} granteeId={companyId} doorTypeOptions={doorTypeOptions} granteeType="CUSTOMER" companyId={companyId}/> 
						:<EmptyPage/>
					}

					
				</Section>
			</div>
		);

	}

}
