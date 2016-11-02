import React from 'react';

import './index.less';

export default class  GroupComponent extends React.Component {


	constructor(props){
		super(props)
	}

	render(){

		let {requireLabel,label,children} = this.props;

			return (
					<div className="form-item-wrap">
								<div className="form-item">
								<label className="form-label"> 
									{requireLabel?<span className="require-label">*</span>:null} {label}:
								</label>
								<div className="form-main">
								<div className="form-input-main">
								<div className="form-input">
									{children}
								</div>
								</div>
								</div>
							</div>	
						</div>
				);
	}
}
