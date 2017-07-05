import React, {
	 
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';

import {
	SearchForms,
	KrField
} from 'kr-ui';


class SearchForm extends React.Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	onSubmit(value) {
		let form = {};

		form.pageSize = 20;
		form.page = 1;
		form.corporationName = value.content;
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);
	}

	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
	onChange = (values) =>{
		const {onChange} = this.props;
		onChange && onChange(values)
	}

	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;

		return (
			<div className = 'm-lessor-manage-search-form'>
				 <KrField grid={1/2} 
                            name="intentionCommunityId" 
                            component='searchCommunityAll' 
                            style ={{width:220,marginBottom:"-18px"}} 
                            label="社区：" 
							inline={true}  
							onChange = {this.onChange}
                            requireLabel={false}
						
                           
                        />
				<SearchForms onSubmit={this.onSubmit} />

			</div>

			
		);
	}
}


export default reduxForm({
	form: 'searchForm'
})(SearchForm);
