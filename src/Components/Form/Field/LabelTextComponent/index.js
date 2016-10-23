import React from 'react';

export default class  LabelTextComponent extends React.Component {


	constructor(props){
		super(props)
	}

	render(){

		let {className,label,value,style} = this.props;

			return (

				<div className="form-item-wrap" style={style}>
					 <div className="label-item">
						<label className="form-label">{label}:</label>
						<div className="form-main">
						<div className="form-input-main">
						<div className="form-input">
						<span className="text" >
									{value}
											</span>
										</div>
									</div>
								</div>
					  </div>
				</div>

				);
	}
}
