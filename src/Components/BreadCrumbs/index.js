import React  from 'react';

import './index.less';

export default class TitleList extends React.Component {

	static displayName = 'TitleList';

	static defaultProps = {
		hide:false
	}

	static propTypes = {
		/**
		*
		*/
		children: React.PropTypes.node,
		/**
		*是否隐藏
		*/
		hide:React.PropTypes.bool
	};

	constructor(props){
		super(props);
	}


	  render() {

		  const {hide} = this.props;

		  if(hide){
			  return null;
		  }

		  return null;

		return (

		  <div className="titlelist">
			<span>当前位置：</span>
			{this.props.children.map((item)=>{
				return <span key={item} className="list">{item}</span>
			})}
		  </div>

		);
	  }

}
