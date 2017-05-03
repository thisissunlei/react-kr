import React from 'react';
import './index.less';

export default class DivTitle extends React.Component {

	static propTypes = {
		/**
		 *标题
		 */
		title: React.PropTypes.title,
		/**
		 *子代元素
		 */
		index: React.PropTypes.number,
		/**
		 *样式
		 */
		styleType: React.PropTypes.number,
		/**
		 *子代元素
		 */
		children: React.PropTypes.children,
	}

	render() {

		const {
			title,
			index,
			styleType,
			children
		} = this.props;
		let style={top: '50%'}

		return (
			<div className='ui-div-title'>

				
				<div className="ui-div-header">
					<span className="ui-div-index">{index}</span>
					<p className="header-line"></p>
					<span className="ui-div-name">{title}</span>
				</div>

				<div className="ui-div-big-circle" style={style}> 
					<span className="ui-div-circle"></span>
				</div>

				{children &&
					<div className='ui-div-body'>
						<div className='ui-body-inner'>
							{children}
						</div>
					</div>}
				
			</div>
		)
	}
}
