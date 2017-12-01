import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {KrField,Grid,Row,Button,ListGroup,ListGroupItem,Loading,Message} from 'kr-ui';
import './index.less';
import $ from 'jquery';
import {Http,DateFormat} from 'kr/Utils';
import State from './State';
import {
	observer
} from 'mobx-react';
@ observer
export default class EquipmentDetail extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
		}
	}

	componentDidMount(){
		
		
	}


	render(){
		let {detail} = this.props;
		let {showReported,showDesired} = this.state;
		
		return (
			<div className="detail-dialog">
				
				<KrField
					style={{width:310}}
					component="labelText"
					inline={true}
					label="打印机名称："
					value={ detail.printerName}

				/>

				<KrField
					style={{width:310}}
					component="labelText"
					inline={true}
					label="打印机别名："
					value={ detail.alias}

				/>

				<KrField
					style={{width:310}}
					component="labelText"
					inline={true}
					label="社区名称："
					value={ detail.communityName}

				/>


				<KrField
					style={{width:310}}
					component="labelText"
					inline={true}
					label="打印机位置："
					value={ detail.location}

				/>	

				<KrField
					style={{width:310}}
					component="labelText"
					inline={true}
					label="读卡器名称："
					value={ detail.readerName}

				/>

				<KrField
					style={{width:310}}
					component="labelText"
					inline={true}
					label="序列号："
					value={ detail.serialNo}

				/>

				
				<KrField
					style={{width:310}}
					component="labelText"
					inline={true}
					label="创建人："
					value={ detail.creatorName}

				/>
				<KrField
					style={{width:310}}
					component="labelText"
					inline={true}
					label="创建时间："
					value={ DateFormat(detail.ctime, "yyyy-mm-dd HH:mm:ss")}

				/>
							
				
				
				
				
				<KrField
					style={{width:310}}
					component="labelText"
					inline={true}
					label="最后一次更新时间："
					value={DateFormat(detail.utime, "yyyy-mm-dd HH:mm:ss") }

				/>

		  	</div>
		);
	}
}











