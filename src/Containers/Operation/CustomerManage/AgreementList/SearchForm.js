import React, {
	Component,
	PropTypes
} from 'react';

import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	change
} from 'redux-form';
import dateFormat from 'dateformat';
import {
	Actions,
	Store,
	connect
} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
import {
	Section,
	KrField,
	Grid,
	Row,
	Col,
	Button,
	KrDate,
	DotTitle,
	ButtonGroup,
	Paper,
	ListGroup,
	ListGroupItem,
	SearchDateForm,
	SearchForms,
	Message
} from 'kr-ui';
import './index.less';
import State from './State';
@observer
class SearchForm extends Component {
	

	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		var dt = new Date(); 
		let currentYear = dt.getFullYear();
		
		this.state = {
			startValue:'',
			endValue:''
		}
	}


	onSubmit(form) {

		// let {
		// 	page,
		// 	pageSize,
		// 	communityids,
		// 	ids,
		// 	formValues,
		// 	istip
		// } = this.state

		// formValues = {
		// 	type: form.filter || 'BILL',
		// 	value: form.content,
		// 	communityids: communityids || 0,
		// 	page: page,
		// 	pageSize: pageSize

		// }

		// const {
		// 	onSubmit
		// } = this.props;
		// onSubmit && onSubmit(formValues, istip);



	}
	selectCommunity(personel) {
		let id = 0;
		if (!personel) {
			this.setState({
				communityids: 0
			})
		} else {
			id = personel.value;
			this.setState({
				communityids: personel.value,
			})
		}

		// this.context.onSetCommunity(id);
		const {
			onChange
		} = this.props;ss
	}
	onStartChange=(startD)=>{
		console.log('999ffffstart',startD);
        let start=Date.parse(dateFormat(startD,"yyyy-mm-dd hh:MM:ss"));
        let end=Date.parse(dateFormat(State.searchParams.createDateEnd,"yyyy-mm-dd hh:MM:ss"))
        this.setState({
        	startValue:startD

        },function () {

        	if(start>end){
	         Message.error('开始时间不能大于结束时间');
	          return ;
	        }
	        let startDate=this.state.startValue;
	    	State.searchParams = Object.assign({}, State.searchParams, {createDateBegin:this.state.startValue,createDateEnd:this.state.endValue||State.searchParams.createDateEnd});
	    	State.ajaxListData(State.searchParams);
        })
    }
    onEndChange=(endD)=>{
        let start=Date.parse(dateFormat(State.searchParams.createDateBegin,"yyyy-mm-dd hh:MM:ss"));
        let end=Date.parse(dateFormat(endD,"yyyy-mm-dd hh:MM:ss"));
        this.setState({
        	endValue:endD

        },function () {

        	if(start>end){
	         Message.error('开始时间不能大于结束时间');
	          return ;
	        }
	        let endDate=this.state.endValue;
	    	State.searchParams = Object.assign({}, State.searchParams, {createDateBegin:this.state.startValue||State.searchParams.createDateBegin,createDateEnd:this.state.endValue,});
            State.ajaxListData(State.searchParams);
        })

    }



	render() {

		

		return (
			
			<form name="searchForm" className="m-agreementList-searchForm" style={{height:30 }}>
				{/*<KrField  name="wherefloor"  grid={1/2} component="select" label="所在楼层" options={optionValues.floorList} multi={true} requireLabel={true} left={60}/>*/}
				<div className="searchForm-col" style={{marginTop:"7px"}}>
				    <SearchForms placeholder='请输入公司名称' searchFilter={[{label:'公司名称',value:'1'},{label:'社区',value:'2'}]} onSubmit={this.onSearchSubmit}/>
				</div>
				<div className="searchForm-col" style={{marginTop:"0px",marginRight:10}}>
					<KrField grid={1/2} label="" name="createDateBegin" style={{marginLeft:28,width:"253px"}}  component="date" inline={true} onChange={this.onEndChange} placeholder={State.searchParams.createDateBegin}/>
				</div>
				<div className="searchForm-col" style={{marginTop:"-40px",position:"relative",left:30,top:50}}>
					<span>至</span>
				</div>

				<div className="searchForm-col" style={{marginTop:"0px"}}>
					<KrField grid={1/2} label="" name="createDateEnd" style={{marginLeft:28,width:"253px"}} component="date"  inline={true} onChange={this.onStartChange} placeholder={State.searchParams.createDateEnd}/>

				</div>
				<div className="searchForm-col" style={{marginTop:"8px",marginRight:"-38px"}}>
					<span>时间:</span>
				</div>
			
			</form>



		);
	}
}

export default reduxForm({
	form: 'SearchForm'
})(SearchForm);
