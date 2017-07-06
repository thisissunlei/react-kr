import React from 'react';
import {Http} from 'kr/Utils';
import { reduxForm} from 'redux-form';
import {
	SearchForms,
	KrField
} from 'kr-ui';
import './index.less';


export default class SearchForm extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			
		}

	}
	onSubmit=(form)=>{
		let {onSubmit} = this.props;
		onSubmit && onSubmit(form);
	}
	selectCommunity=(form)=>{
		let {onChange} = this.props;
		onChange && onChange(form);
	}
	
	render() {
		
		return (
			 <form name="searchForm" className="g-integration-searchform" style={{marginBottom:10,marginTop:12,height:45}}>
				<SearchForms 
						onSubmit={this.onSubmit} 
						placeholder="请输入客户名称" 
						style={{marginTop:5}} 
				/>
				<KrField 
						name="community"   
						component="searchCommunityAll" 
						label="社区" 
						style={{width:260}} 
						options='' 
						onChange={this.selectCommunity} 
				/>
			</form>
		);
	}
}

SearchForm = reduxForm({
	form: 'searchForm'
})(SearchForm);