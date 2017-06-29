import React  from 'react';
import {
	Title
} from 'kr-ui';
import {DateFormat} from "kr/Utils";
import Baidu from 'kr/Utils/Baidu';
import MerchantsData from './MerchantsData';
//import PanelsDic from './PanelsDic';

export default class BussinessPanel  extends React.Component{

	static displayName = 'BussinessPanel';

	constructor(props,context){
		super(props, context);
	}

	componentDidMount() {
		const {groupId} = this.props;
	}

	componentDidUpdate(){
        const {tab} = this.props;
        if(tab == 'bus'){
		  Baidu.trackEvent('集团经营','访问');
		} 
    }


	render(){

		      var  yesterday = new Date(new Date().getTime() - 86400000);
			       yesterday = DateFormat(yesterday,"yyyy-mm-dd");
				   var today = new Date();
				    today = DateFormat(today,"yyyy-mm-dd");

				    var renderComponent = [];

	                 var props={};
						props.yesterday=yesterday;
						props.today=today;
						props.tab=this.props.tab;
			

		return(
			<div>
			    <Title value="数据统计"/>
			     <MerchantsData {...props}/>
			</div>
		);
	}
}
