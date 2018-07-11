

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

import {DateFormat} from 'kr/Utils';
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer
class OpenLogForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			searchParams:{
			},
		}
	}
	componentDidMount(){
		
	}
	onSubmit=(values)=>{
		

	}

	changeCommunity=(value)=>{
		State.houseConifigListParams={
            cmtId: value.cmtId || '111111',
            page:1,
            pageSize:10
		}
	}

	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} className="search-form-second-door" style={{float:"right"}}>
				<ListGroup>
					<ListGroupItem>
						<span className="community-list">
							<KrField  name="communityId" component="SearchCommunityHouseConfig" label="社区名称：" inline={true} style={{width:254}}  className="community-id" onChange={this.changeCommunity}/>
						</span>
					</ListGroupItem>
				</ListGroup>
			</form>
		);
	}
}
export default OpenLogForm = reduxForm({
	form: 'OpenLogForm',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(OpenLogForm);
