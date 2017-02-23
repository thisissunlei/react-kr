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

import {
	Actions,
	Store,
	connect
} from 'kr/Redux';

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
	SearchForms
} from 'kr-ui';
import './index.less';
class SearchForm extends Component {
	

	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		var dt = new Date(); 
		let currentYear = dt.getFullYear();
		
		this.state = {
			searchParams: {
				groupId:this.props.groupId,
				startDate:this.props.todayDate,
				endDate:this.props.todayDate
			},
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

    	let {searchParams}=this.state;
        let start=Date.parse(dateFormat(startD,"yyyy-mm-dd hh:MM:ss"));


        let end=Date.parse(dateFormat(searchParams.endDate,"yyyy-mm-dd hh:MM:ss"))
        this.setState({
        	startValue:startD

        },function () {

        	if(start>end){
	         Message.error('开始时间不能大于结束时间');
	          return ;
	        }
	        let startDate=this.state.startValue;
	    	searchParams = Object.assign({}, searchParams, {startDate:this.state.startValue,endDate:this.state.endValue||searchParams.endDate});
	    	this.setState({
				searchParams
			},function(){
			console.log(searchParams,this.state.endValue,"uuu")

			});


        })
    }
    onEndChange=(endD)=>{
    	let {searchParams}=this.state;
        let start=Date.parse(dateFormat(searchParams.startDate,"yyyy-mm-dd hh:MM:ss"));
        let end=Date.parse(dateFormat(endD,"yyyy-mm-dd hh:MM:ss"));
        this.setState({
        	endValue:endD

        },function () {

        	if(start>end){
	         Message.error('开始时间不能大于结束时间');
	          return ;
	        }
	        let endDate=this.state.endValue;
	    	searchParams = Object.assign({}, searchParams, {startDate:this.state.startValue||searchParams.startDate,endDate:this.state.endValue,});
	    	this.setState({
				searchParams
			},function(){

			});

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
					<KrField grid={1/2} label="" name="inTime" style={{marginLeft:28,width:"213px"}}  component="date" inline={true}/>
				</div>
				<div className="searchForm-col" style={{marginTop:"-40px",position:"relative",left:30,top:50}}>
					<span>至</span>
				</div>

				<div className="searchForm-col" style={{marginTop:"0px"}}>
					<KrField grid={1/2} label="" name="inTime" style={{marginLeft:28,width:"213px"}} component="date"  inline={true}/>

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
