import React from 'react';

import './index.less';

export default class CircleStyleTwo extends React.Component {

	static displayName = 'CircleStyleTwo';

	static defaultProps = {
		num: 1,
		info: '',
		circle: 'center',

	}

	static propTypes = {
		/**
		 * num
		 */
		num: React.PropTypes.any,
		/**
		 * info 文字描述
		 */
		info: React.PropTypes.string,
		/**
		 * circle center:圆圈在中间 bottom:圆圈在底部
		 */
		circle: React.PropTypes.string,
		/**
		 * style 样式
		 */
		style: React.PropTypes.object,

	};

	constructor(props) {
		super(props);
	}

	render() {

		let {
			num,
			info,
			circle,
			children,
			style,
			...other
		} = this.props;

		if (circle == 'center') {

			return (
				<div className="ui-detailContents" style={style}>
					<div className="ones"><p>{num}</p><div className="txts"><span className="u-border"></span><span  className="u-info-txt"> {info}</span></div></div>
					<div className="circles"><div className="circ"></div></div>
					{children}
			</div>
			);

		}

		if (circle == 'bottom') {

			return (
				<div className="ui-textInfos" style={style}>
					<div className="ones"><p>{num}</p><div className="txts"><span className="u-border"></span><span  className="u-info-txt"> {info}</span></div></div>
					<div className="circles"><div className="circ"></div></div>
					{children}
			</div>
			);

		}


	}
}
