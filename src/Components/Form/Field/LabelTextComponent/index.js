import React from 'react';
import KrDate from '../../../Date';

import WrapComponent from '../WrapComponent';
import Button from '../../../Button';

import './index.less';
import dateFormat from 'dateformat';
export default class LabelTextComponent extends React.Component {


	static defaultProps = {
		inline: true
	}
	static PropTypes = {
		inline: React.PropTypes.bool,
		requireBlue: React.PropTypes.bool,
		alignRight: React.PropTypes.bool,
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
		} = this.props;

		if (type == 'date') {
			return (

				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} requireBlue={requireBlue} alignRight={alignRight}>
							<span className="ui-label-text" >
								<span>
									<KrDate.Format value={value} />
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
					<span className="ui-label-text" > {value || defaultValue} </span>
				</WrapComponent>

		);
	}
}