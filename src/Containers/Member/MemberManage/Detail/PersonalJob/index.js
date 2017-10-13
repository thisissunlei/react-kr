import React from 'react';

import './index.less';
import {
	KrField,
} from 'kr-ui';
export default class BasicInfo extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	static defaultProps = {

	}

	static PropTypes = {

	}

	constructor(props, context) {
		super(props, context);
	}
	componentDidMount() {

	}
	render() {
		let {detail} = this.props;
		let workInfo = detail;
		return (

			<div className='personJob-detail-order'>

						<KrField grid={1/3} alignRight={true} label="公司:" component="labelText"  value={workInfo.companyName} defaultValue="无" style={{marginRight:'20px'}}/>	
			           

			          	{/*<KrField grid={1/3}  alignRight={true} component="labelText"  label="工位号:" value={workInfo.stationCode} defaultValue="无" />*/}

								 <KrField grid={1/3}  alignRight={true} component="labelText"  label="社区:" value={workInfo.communityName} defaultValue="无" />

								 <KrField grid={1/3} alignRight={true} label="职位:" component="labelText" value={workInfo.job} defaultValue="无" style={{marginLeft:'-20px'}}/>

			           {/*<KrField grid={1/3} alignRight={true} label="入驻氪空间状态:" component="labelText"  value={workInfo.customerCompany} defaultValue="无"/>*/}

			           

			</div>

		)

	}

}
