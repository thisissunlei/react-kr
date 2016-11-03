import React from 'react';
import KrDate from '../../../Date';

import WrapComponent from '../WrapComponent';

import './index.less';

export default class LabelTextComponent extends React.Component {


	static PropTypes = {
		inline: React.PropTypes.bool,
		requireBlue: React.PropTypes.bool,
		alignRight:React.PropTypes.bool
	}

	constructor(props) {
		super(props)
	}

	render() {

		let {
			className,
			label,
			value,
			requireBlue,
			style,
			defaultValue,
			type,
			requireLabel,
			inline,
			alignRight
		} = this.props;

		if (type == 'date') {
			return (
				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={true} requireBlue={requireBlue} alignRight={alignRight}>
							<span className="ui-label-text" >
								{value && <KrDate.Format value={value} /> }
								{!value && defaultValue}
							</span>
						</WrapComponent>
			);
		}

		return (

			<WrapComponent label={label} wrapStyle={style} inline={true} requireBlue={requireBlue} alignRight={alignRight}>
					<span className="ui-label-text" > {value || defaultValue} </span>
				</WrapComponent>

		);
	}
}