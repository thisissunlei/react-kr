import React from 'react';
import KrDate from '../../../Date';

import WrapComponent from '../WrapComponent';

import './index.less';

export default class  LabelTextComponent extends React.Component {


	constructor(props){
		super(props)
	}

	render(){

		let {className,label,value,style,defaultValue,type,requireLabel} = this.props;

			if(type == 'date'){
					return (
						<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel}>
							<span className="text" >
								{value && <KrDate.Format value={value} /> }
								{!value && defaultValue}
							</span>
						</WrapComponent>
						);
			}

			return (

				<WrapComponent label={label} wrapStyle={style}>
					<span className="text" > {value || defaultValue} </span>
				</WrapComponent>

		);
	}
}
