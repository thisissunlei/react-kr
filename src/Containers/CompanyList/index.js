import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import './index.less';


import Loading from '../../Components/Loading';

class CompanyList extends Component{

	constructor(props){
		super(props);

		console.log('this',this.props);

		this.props.dispatch({type:'SET_COMPANYS_FILTER_ALL'});

	}



	getCompnayItem(item,index){


		return (

		<div className="company-item" key={index}>

			<div className="item-title">
				<img src={item.company.logo} width="50" height="50" alt="" />
			</div>

			<div className="item-title">
			<h4 className="name">{item.company.name}</h4>
			<span className="brief">{item.company.brief}</span>
			</div>

			<div className="item-title">

			{item.founder.name}

			</div>
			<div className="item-title">

			</div>
			<div className="item-title"></div>
			<div className="item-title"></div>
			<div className="item-title"></div>
			<div className="item-title"></div>

			</div>
		);

	}

	render(){


		if(this.props.companys_fetch.status == 'loading'){
			return( <Loading/>); 
		}

		const CompanyListFilter = ()=>{

			return (

<div className="m-filter">

			<div className="container">

			<div className="tab-navs">

			<ul>
			<li className="item-nav">融资中</li>
			<li className="item-nav">融资完成</li>
			<li className="item-nav">全部公司</li>
			</ul>

			</div>

			<div className="tab-content">

			</div>

			</div>

			</div>
			);
		}

		const CompanyListResult  = (props)=>{

			return (

<div className="m-result">

			<div className="container">

			<div className="tab-title">

			<ul>
				<li className="item-title">公司</li>
				<li className="item-title"></li>
				<li className="item-title">创始人</li>
				<li className="item-title">行业</li>
				<li className="item-title">所在地</li>
				<li className="item-title">本轮融资</li>
				<li className="item-title">氪指数</li>
			</ul>


			</div>

			<div className="tab-content">



			

			{this.props.companys.map((item,index)=>this.getCompnayItem(item,index))}
			
			

			

			</div>


			</div>

			</div>
			);

		};

		return (

			<div className="g-company-list">
				<CompanyListFilter/>
				<CompanyListResult companys={this.props.companys}/>
			</div>
		);
	}



}





function mapStateToProps(state){

	return {
		companys:state.companys,
		companys_fetch:state.companys_fetch
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(Object.assign({},actionCreators),dispatch);
}

export default connect(mapStateToProps)(CompanyList);

