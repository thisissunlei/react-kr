import React from 'react';
import KrDate from '../../KrDate';

import WrapComponent from '../WrapComponent';
import Button from '../../Button';
import Tooltip from '../../Tooltip';

import './index.less';

import ReactTooltip from 'react-tooltip';

export default class LabelComponent extends React.Component {


	static defaultProps = {
		inline: true,
		tooltip: ''
	}
	static PropTypes = {
		inline: React.PropTypes.bool,
		requireBlue: React.PropTypes.bool,
		alignRight: React.PropTypes.bool,
		tooltip: React.PropTypes.string
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
            input,
			defaultValue,
			type,
			requireLabel,
			inline,
			alignRight,
			format,
			href,
			colorStyle,
			tooltip,
			toolTrue
		} = this.props;
		
       

		return (

			<WrapComponent label={label} wrapStyle={style} inline={inline} requireBlue={requireBlue} alignRight={alignRight} requireLabel={requireLabel}>
					<span  style={colorStyle}>
                        {input.value}
                    </span>
                    <input type="text" style = {{display:"none"}}/>
				</WrapComponent>
		);
	}
}
