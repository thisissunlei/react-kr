
import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'kr-ui/../Redux/Actions';

import PlanManage from './PlanManage';
import NotifyManage from './NotifyManage';
import CollectManage from './CollectManage';
import MemoManage from './MemoManage';
import SNSActivityManage from './SNSActivityManage';
import CompanyInstitutionManage from './CompanyInstitutionManage';
import TodoManage from './TodoManage';
import {
	Loading,
} from 'kr-ui';

import './index.less';

import {
	GridList,
} from 'material-ui';

//import Loading from '../../../Components/Loading';

class Home extends React.Component{

	constructor(props,context){
		super(props, context);

		this.state = {
			open:false,
			loading:true,
		}


		var {actions} = this.props;

		actions.callAPI('demo',{},{});

	}


	componentDidMount() {

		var _this = this;

		setTimeout(function(){
			_this.setState({
				loading:false
			});
		},1000);
	}

	handleToggle(){

		this.setState({open: !this.state.open});

		var {actions,sidebar_nav} = this.props;

		actions.switchSidebarNav(!!!sidebar_nav.switch_value);

	}


	render() {



		if(this.state.loading){
			return(<Loading/>);
		}

		const styles = {
			root: {
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'space-around',
			},
			gridList: {
				overflowY: 'auto',
				marginBottom: 24,
				paddingLeft:30,
				paddingRight:30,
				marginLeft:'auto',
				marginRight:'auto'
			},
		};

		return (

			<div>


			<div className="main">
				<div className="l-sidebar">

					<PlanManage/>
					<NotifyManage/>

				</div>

				<div className="r-sidebar">

					<CollectManage/>

					<div className="r-sidebar-body">
						<div className="body-item">
							<MemoManage/>
						</div>
						<div className="body-item">
							<TodoManage/>
						</div>
					</div>

					<div className="r-sidebar-body">
						<div className="body-item">
							<SNSActivityManage/>
						</div>
						<div className="body-item">
							<CompanyInstitutionManage/>
						</div>
					</div>
				</div>
			</div>







	</div>

		);
	}
}





function mapStateToProps(state){

	return {
		sidebar_nav:state.sidebar_nav,
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
