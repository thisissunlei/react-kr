

import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,change,reset} from 'redux-form';
import {Http} from 'kr/Utils';

import {
	KrField,
	Button,
	ListGroup,
	ListGroupItem,
	Message,
	
} from 'kr-ui';
import './index.less';
import {DateFormat} from 'kr/Utils';
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer



class SearchGroupForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
		}
	}
	componentDidMount(){
		
		
	}
	onSubmit=(values)=>{
		
		
	}

	onChangeCommunity=(item)=>{
		let {changeCompany} = this.props;
		changeCompany && changeCompany(item);
	}

	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		let {logTypeOptions} = this.state;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} className="door-permission-group-search search-company-permmision">
				<ListGroup className="fir-list">
					
					<ListGroupItem>
						<span style={{paddingLeft:80}}>
							<KrField name="customerId" 
								component="searchSmartHardCompany" 
								label="" 
								style={{width:237}}
								inline={true}
								onChange = {this.onChangeCommunity}
							/>
						</span>
					</ListGroupItem>
					
					
				</ListGroup>
			</form>
		);
	}
}
export default SearchGroupForm = reduxForm({
	form: 'SearchGroupForm',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(SearchGroupForm);
