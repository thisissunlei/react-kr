import React from 'react'; 
import './index.less';

export default class Footer extends React.Component {

	render() {

		const style = {
			height: 90,
			width: 90,
			margin: 10,
			textAlign: 'center',
		};

		return (
			<div className="g-footer no-print">
				<p> © 2011~2016 36氪 | 京ICP备12031756号 | 京公网安备11010802012285号 </p>
			</div>
		);

	}



}