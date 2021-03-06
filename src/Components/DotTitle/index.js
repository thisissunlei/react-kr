import React from 'react';
import './index.less';

export default class DotTitle extends React.Component {

	static propTypes = {
		/**
		 *标题
		 */
		title: React.PropTypes.string,
		/**
		 *子代元素
		 */
		children: React.PropTypes.any,
		/**
		 *样式
		 */
		style: React.PropTypes.object
	}

	render() {

		const {
			title,
			children,
			style
		} = this.props;

		return (
			<div className='ui-title' style={style}>
				<div className={children?'ui-heads':'ui-head'}>
					<span className='ui-title-mid'>{title}</span>
				</div>
				{children &&
						<div className='ui-body'>
							<div className='ui-body-inner'>
								{children}
							</div>
						</div>}
					</div>
		)
	}
}
