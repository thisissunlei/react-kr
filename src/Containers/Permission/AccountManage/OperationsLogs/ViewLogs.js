import React from 'react';
import {
	Http
} from "kr/Utils";
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ListGroup,
	KrDate,
	ListGroupItem,
	SearchForms,
	ButtonGroup,
	CircleStyleTwo
} from 'kr-ui';
import './index.less';


export default class ViewLogs extends React.Component {

	static PropTypes = {
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
			infoList:[]
		}
	}

	componentDidMount() {
		var _this = this;
		var id = this.props.detail.id
		Http.request('getOpDet', {
						id: id
				}, {}).then(function(response) {
						_this.setState({infoList: response})
				}).catch(function(err) {});
	}
	onCancel = () => {
    let {onCancel} = this.props;
    onCancel && onCancel();
	}


	render() {

		let {
			totalCountMoney,
			payment,
			accountList,
			mainbillInfo,
			showName,
			customerId,
			infoList,
			topInfoList
		} = this.state;
		return (
			<div className="u-audit-add  u-audit-edit">
						<KrField
								style={{width:260}}
								component="labelText"
								label="主表id"
								inline={false}
								value={infoList.entityId}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								component="labelText"
								label="日志详情"
								inline={false}
								value={infoList.extra}
						/>
						<KrField
								style={{width:260}}
								component="labelText"
								inline={false}
								label="操作类型"
								value={infoList.OperateType}

						/>
						<KrField
								style={{width:260,marginLeft:25}}
								component="labelText"
								inline={false}
								label="批次号"
								value={infoList.batchNum}
						/>
						<KrField
								style={{width:260}}
								component="labelText"
								inline={false}
								label="日志id"
								value={infoList.id}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="payName"
								inline={false}
								component="labelText"
								label="业务名称"
								value={infoList.sourceName}
						/>
						<KrField
								style={{width:260}}
								name="accountNum"
								component="labelText"
								inline={false}
								label="日志"
								value={infoList.operateRecord}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="payAccount"
								inline={false}
								type="text"
								component="labelText"
								label="操作人"
								value={infoList.operater}
						/>
						<KrField
								style={{width:260}}
								name="payAccount"
								inline={false}
								type="text"
								component="labelText"
								label="系统名称"
								value={infoList.systemName}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="dealTime"
								inline={false}
								component="labelText"
								label="操作时间"
								value={< KrDate style = {{marginTop:5}} value = {
                    infoList.operateDate
                }
                format = "yyyy-mm-dd" />}
						/>
			</div>


		);
	}
}
