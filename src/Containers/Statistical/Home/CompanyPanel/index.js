import React  from 'react';
import {
	Title,
	CheckPermission
} from 'kr-ui';
import {DateFormat} from "kr/Utils";
import Baidu from 'kr/Utils/Baidu';
import NotOpenPanel from './NotOpenPanel';
import OpenPanel from './OpenPanel';
//import PanelsDic from './PanelsDic';

export default class CompanyPanel  extends React.Component{

	static displayName = 'CompanyPanel';

	constructor(props,context){
		super(props, context);
	}

	componentDidMount() {
		const {groupId} = this.props;
		Baidu.trackEvent('集团经营','访问');
	}


	render(){
                var  yesterday = new Date(new Date().getTime() - 86400000);

			    yesterday = DateFormat(yesterday,"yyyy-mm-dd");
				var today = new Date();
			    today = DateFormat(today,"yyyy-mm-dd");

			    var props={};	
                    props.yesterday=yesterday;
					props.today=today;

		return(
			<div>
			        <Title value="数据统计"/>
					<CheckPermission  operateCode="business_open" > 
						<OpenPanel {...props}/>
					</CheckPermission>
					<CheckPermission  operateCode="business_notopen" > 
						<NotOpenPanel {...props}/>
					</CheckPermission>
			</div>
		);
	}
}
