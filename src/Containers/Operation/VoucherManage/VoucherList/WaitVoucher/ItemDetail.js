import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector,
	initialize
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';

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
} from 'kr-ui';
import './index.less';


export default class ItemDetail extends Component {

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
    console.log(this.props.detail,"sdafs");
    var _this = this;
    var id = this.props.detail.id
    Store.dispatch(Actions.callAPI('get-fince-info', {
            finaVerifyId: id
        }, {})).then(function(response) {
            _this.setState({infoList: response})
            console.log(response);
        }).catch(function(err) {});

	}
  onCancel = () => {
        let {onCancel} = this.props;
        onCancel && onCancel();
    }
	renderFileName=()=>{
		this.fileList.map((item, value) => {
			return (
				<div key={index}>{item}</div>
			)
		});
	}
	render() {
    let {infoList} = this.state;
		console.log(this.state.infoList);
		return (
			<div className="u-audit-add">
			     <div className="u-audit-add-title">
			     	<span className="u-audit-add-icon"></span>
			     	<span>凭证详情</span>
			     	<span className="u-audit-close" style={{
								marginRight: 40
						}} onTouchTap={this.onCancel}></span>
			     </div>

					 <div style={{marginLeft:50,marginTop:25}}>
						 <KrField grid = {1 / 2}  name="customerId" inline={false} component="labelText" label="签约方名称" value={infoList.company}/>
						 <KrField grid = {1 / 2}  component="labelText" inline={false} label="订单起止" value={infoList.mainBillDate}/>
						 <KrField grid = {1 / 2} component="labelText" inline={false} label="公司主体" value={infoList.corporationName}/>
						 <KrField grid = {1 / 2}  name="payName" component="labelText" label="收款方式" inline={false} value={infoList.payWay}/>
						 <KrField grid = {1 / 2} name="accountId" component="labelText" inline={false} value={infoList.accountNum} label="我司账户"/>
						 <KrField grid = {1}  name="remark" component="labelText" inline={false} defaultValue={infoList.remark} label="备注" maxSize={100}/>
					 </div>


			</div>


		);
	}
}
