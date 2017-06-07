import React from 'react';
import './index.less';
export default class TitleList extends React.Component {

	static displayName = 'TitleComponent';

	constructor(props){
		super(props);
        this.state = {
            topTopElem:'',
        }
	}
    toTopClick = () =>{
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    }
   
	render() {

		var {value} = this.props;

		return ( <div className = "ui-to-top" onClick = {this.toTopClick}></div>);

	}

}
