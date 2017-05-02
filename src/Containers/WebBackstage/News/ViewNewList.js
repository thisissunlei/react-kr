import React from 'react';
import {
	Http
} from "kr/Utils";
import {
	KrField,
	
} from 'kr-ui';
import './index.less';


export default class ViewNewList extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			
		}
		
	}
	onCancel=()=>{
		let {onCancel}=this.props;
		onCancel && onCancel();
	}
	


	render() {

		
		return (
			<div className="g-new-list">
				<div className="u-title-box">
						<img className="u-title-img" src={require('./images/activity.svg')} />
						<span className="u-title-text">查看新闻</span>
						<span className="u-close-page" onClick={this.onCancel}>
							<img 
								src={require('./images/closeIMG.svg')} 
								className="u-close-page-img"
							 />
						</span>
					</div>
			   
			</div>

		);
	}
}



