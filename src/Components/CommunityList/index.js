import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import Input from '../Input'
import './index.less';
export default class CommunityList extends Component {
	// static displayName = 'CircleStyle';
	static defaultProps = {
		num: 1,
		info: '',
		circle: 'center',
	}
	static propTypes = {
		/**
		 * num
		 */
		// num: React.PropTypes.any,
		/**
		 * info 文字描述
		 */
		// info: React.PropTypes.string,
		/**
		 * style 样式
		 */
		// style: React.PropTypes.object,
	};
	constructor(props) {
		super(props);
		this.state = {
			openChildCommunityList:false
		}
	}
	componentWillReceiveProps(nextProps) {
	}
	showChildCommunity=()=>{
		this.setState(
			openChildCommunityList = !this.state.openChildCommunityList,
		)
	}
	render() {
		let {
			style,
			...other
		} = this.props;
		let childCommunityList ={};
		childCommunityList.display = openChildCommunityList?'block':'none';
		return (
			<div className="ui-community-list-box" style={style}>
				<div className="ui-community-list-left">
					<Input placeholder={"输入查找关键字"}/>
					<div className="ui-community-list-all">
						<div className="ui-community-list-title">
							<span>全部社区</span>
							<span></span>	
						</div>
						<div className="ui-community-list-all-table">
							<ul>
								<li onclick={this.showChildCommunity}>北京
									<ul >
										<li>北京大街社区</li>
										<li>北京科技产业园社区</li>
									</ul>
								</li>
								<li>上海</li>
								<li>杭州</li>
								<li>武汉</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="ui-community-list-right"></div>
			</div>
		);
		
	}
}