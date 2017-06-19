import React  from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {
	Title
} from 'kr-ui';
import Baidu from 'kr/Utils/Baidu';
import MerchantsData from './MerchantsData';

import {DateFormat} from "kr/Utils";



//import PanelsDic from './PanelsDic';

export default class BussinessPanel  extends React.Component{

	static displayName = 'BussinessPanel';

	constructor(props,context){
		super(props, context);
	}

	componentDidMount() {
		const {groupId} = this.props;
		Baidu.trackEvent('集团经营','访问');
	}

	renderGroupComponent = ()=>{
				var  yesterday = new Date(new Date().getTime() - 86400000);
			    yesterday = DateFormat(yesterday,"yyyy-mm-dd");
				var today = new Date();
				today = DateFormat(today,"yyyy-mm-dd");

				var renderComponent = [];

	                 var props={};
						props.yesterday=yesterday;
						props.today=today;

						var merchants='';
						merchants=(<MerchantsData {...props}/>)
						renderComponent.push(merchants);
			

				return renderComponent;
	}


	render(){

		return(
			<div>
			    <Title value="数据统计"/>
			       {this.renderGroupComponent()}
			</div>
		);
	}
}
