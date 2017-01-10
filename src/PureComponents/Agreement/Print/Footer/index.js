import React, {
	Component
} from 'react';

import './index.less';

export default class Footer extends Component {

	constructor(props, context) {
		super(props, context);

	}


	render() {

		return (

			<div className="ui-print-Footer">

						<p>双方证实上述内容属实，并已阅读及同意本页和背页所载之协议</p>
						<p className="print-Bottom">氪空间&ensp;<span className="dott"></span>&ensp;让办公更简单<span className="tel">Tel：400-807-3636</span></p>

			</div>
		);
	}

}
