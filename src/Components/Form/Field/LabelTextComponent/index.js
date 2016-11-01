import React from 'react';
import KrDate from '../../../Date';

import './index.less';

export default class  LabelTextComponent extends React.Component {


	constructor(props){
		super(props)
	}

	render(){

		let {className,label,value,style,defaultValue,type} = this.props;

			if(type == 'date'){
					return (

						<div className="ui-label-text" style={style}>
							 <div className="label-item">
								{label && <label className="form-label">{label}:</label> }
								<div className="form-main">
								<div className="form-input-main">
								<div className="form-input">
									<span className="text" >
											{value && <KrDate.Format value={value} /> }
											{!value && defaultValue}
									</span>
												</div>
											</div>
										</div>
							  </div>
						</div>

						);
			}

			return (

				<div className="ui-label-text" style={style}>
					 <div className="label-item">
						<label className="form-label">{label}:</label>
						<div className="form-main">
						<div className="form-input-main">
						<div className="form-input">
							<span className="text" > {value || defaultValue} </span>
										</div>
									</div>
								</div>
					  </div>
				</div>

				);
	}
}
