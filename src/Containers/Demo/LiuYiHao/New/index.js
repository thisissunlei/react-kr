import React from 'react';
import {
	KrField,
    TabCs,
    TabC,
	MoveSelect
} from 'kr-ui';
import {
	numberToSign
} from 'kr/Utils';
import {
	LocationChoice,
	FromsConfig
} from 'kr/PureComponents';
import {reduxForm} from 'redux-form';
import EditTable from './EditTable';
import EditFiled from './EditFiled'
import RadioBug from './RadioBug';
class New extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			isOpen:false
		}
	}
	// var elems = '<table class="main-table"><tbody><tr class="firstRow"><td width="537" valign="top" style="word-break: break-all;">姓名</td><td width="537" valign="top" style="word-break: break-all;">年龄</td><td width="537" valign="top" style="word-break: break-all;">性别</td></tr><tr><td width="537" valign="top" style="word-break: break-all;">{{name}}</td><td width="537" valign="top" style="word-break: break-all;">{{age}}</td><td width="537" valign="top" style="word-break: break-all;">{{sex}}</td></tr><tr><td width="537" valign="top"><br/></td><td width="537" valign="top"><br/></td><td width="537" valign="top"><br/></td></tr></tbody></table><p><br/><br/><br/></p><p><br/></p><table class="money-detail"><tbody><tr class="firstRow"><td width="537" valign="top" style="word-break: break-all;">明细名</td><td width="537" valign="top" style="word-break: break-all;">明细年龄</td><td width="537" valign="top" style="word-break: break-all;">明细性别</td></tr><tr><td width="537" valign="top" style="word-break: break-all;">{{name}}</td><td width="537" valign="top" style="word-break: break-all;">{{age}}</td><td width="537" valign="top" style="word-break: break-all;">{{sex}}</td></tr></tbody></table><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p>`img`<br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p>';


	componentDidMount() {}

	render() {
		let {isOpen} = this.state;
		return (
			<div style = {{height:2000,background:"#fff"}}>
				<MoveSelect />
			</div>
		);
	}
}
export default reduxForm({ form: 'New'})(New);