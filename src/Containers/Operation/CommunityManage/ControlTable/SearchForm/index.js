import React from 'react';
import {DateFormat,Http} from 'kr/Utils';
import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	change
} from 'redux-form';

import {
	Actions,
	Store,
	connect
} from 'kr/Redux';
import {
	KrField,
	SearchForms,
} from 'kr-ui';
import './index.less';
class SearchFormControlTable extends React.Component {


	constructor(props) {
		super(props);
        this.state={
            communityIdList:[],
			placeholder:'',
        }
        this.getcommunity();
	}

    getcommunity = () => {
        const _this = this;
		const {communityChange} = this.props;
        let {communityIdList} = this.state;
        Http.request('getCommunity').then(function(response) {

            communityIdList = response.communityInfoList.map(function(item, index) {

                item.value = item.id;
                item.label = item.name;
                return item;
            });
            _this.setState({
                communityIdList,
				placeholder:communityIdList[0].label
            });
			communityChange(communityIdList[0]);


        }).catch(function(err) {



        });
	}

	communityChange = (values) =>{
		this.refs.inputFilter.refs.realInput.value = ""
		const {communityChange} = this.props;
		communityChange && communityChange(values);
	}

	onSubmit = (values) =>{
		
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}

	render() {
        const {communityIdList,placeholder} = this.state;
		let {todayDate}=this.props;

		return (

				<form name="searchForm" className="search-form-control-table searchForm searchList" style={{marginBottom:10,height:45}}>
                        <KrField grid={1/2} 
                            name="intentionCommunityId" 
                            component='searchCommunityManage' 
                            style ={{width:335,marginTop:3}} 
                            label="社区:" inline={true}  
                            placeholder={placeholder} 
                            requireLabel={false}
							onChange = {this.communityChange}
                            options={communityIdList}
                        />
                    <SearchForms ref = "inputFilter" onSubmit={this.onSubmit}  placeholder="请输入客户名称"  style={{marginTop:5,zIndex:10000}} />
                </form>


		);
	}
}

export default reduxForm({
	form: 'SearchFormControlTable'
})(SearchFormControlTable);
