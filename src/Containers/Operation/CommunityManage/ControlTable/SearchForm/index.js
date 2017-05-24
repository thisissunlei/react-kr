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
            communityIdList:[]
        }
        this.getcommunity();
	}

    getcommunity = () => {
        let _this = this;
        let {communityIdList} = this.state;
        Http.request('getCommunity').then(function(response) {

            communityIdList = response.communityInfoList.map(function(item, index) {

                item.value = item.id;
                item.label = item.name;
                return item;
            });
            _this.setState({
                communityIdList,
            });


        }).catch(function(err) {



        });
	}

   //搜索下拉
	onSearchSubmit=(value)=>{
      const {
			onSearchSubmit
		} = this.props;
		onSearchSubmit && onSearchSubmit(value);
	}
	//合同类型
   contractChange=(value)=>{
		   const {
		   contractChange
	     } = this.props;
	    contractChange && contractChange(value);
	 }
    //日期开始
	 onStartChange=(value)=>{
      const {
			onStartChange
		} = this.props;
		onStartChange && onStartChange(value);
    }
    //日期结束
     onEndChange=(value)=>{
      const {
			onEndChange
		} = this.props;
		onEndChange && onEndChange(value);
     }


	render() {
        const {communityIdList} = this.state;
		let {todayDate}=this.props;

		let options=[
		 {label:'公司名称',value:'company'},
		 {label:'城市',value:'city'},
		 {label:'社区',value:'community'},
		 {label:'销售员',value:'people'},
		 {label:'录入人',value:'write'},
		]

		return (

				<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
                        <KrField grid={1/2} 
                            name="intentionCommunityId" 
                            component='searchCommunityManage' 
                            style ={{width:335,marginTop:3}} 
                            label="社区:" inline={true}  
                            placeholder='请输入社区名称' 
                            requireLabel={false}
                        
                            options={communityIdList}
                        />
                    <SearchForms onSubmit={this.onSerchSubmit} placeholder="请输入被访公司名称"  style={{marginTop:5,zIndex:10000}} />
                </form>


		);
	}
}

export default reduxForm({
	form: 'SearchFormControlTable'
})(SearchFormControlTable);
