import React from 'react';
import KrDate from '../../KrDate';

import WrapComponent from '../WrapComponent';
import Button from '../../Button';
import Tooltip from '../../Tooltip';

import './index.less';

import ReactTooltip from 'react-tooltip'

export default class LabelTextComponent extends React.Component {


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
		// console.log(value,"LLLLLLL")
		if (tooltip && type != 'date' && type != 'link') {
			return (
				<WrapComponent label={label} wrapStyle={style} inline={inline} requireBlue={requireBlue} alignRight={alignRight} requireLabel={requireLabel}>
					<span className="ui-label-text" data-tip data-for={`${tooltip}`}> {value || defaultValue}
						<ReactTooltip id={`${tooltip}`}>
							<p style={{margin:0}}>{tooltip}</p>
						</ReactTooltip>
					</span>
				</WrapComponent>
			);
		}
		if (type == 'date') {
			return (

				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} requireBlue={requireBlue} alignRight={alignRight}>
							<span className="ui-label-text" >
								<span>
									<KrDate value={value} />
								</span>
							</span>
					</WrapComponent>
			);
		}


		if (type == 'link') {
			return (
				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} requireBlue={requireBlue} alignRight={alignRight}>
					<span className="ui-label-text" >
						<a  href={href} className='label-text-href' title={value}>{value}</a>
					</span>
				</WrapComponent>
			);
		}

		return (

			<WrapComponent label={label} wrapStyle={style} inline={inline} requireBlue={requireBlue} alignRight={alignRight} requireLabel={requireLabel}>
					<span className="ui-label-text" style={colorStyle}>{value || defaultValue}
                       {toolTrue&&value!=''&&defaultValue!='无'&&<Tooltip offsetTop={10} place='top'>{value || defaultValue}</Tooltip>}
					</span>
				</WrapComponent>

		);
	}
}
