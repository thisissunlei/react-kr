import React,{Component} from 'react';
import { connect } from 'react-redux';
import './index.less';
import {
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
} from 'kr-ui';

export default class Initialize  extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			isClassName:false,
		}
	}

	render(){

		return(
			<div className="print-Intention">
						<p>意向条款</p>
						<p>一、甲乙双方同意本意向仅作为双方的意向性法律文件，双方应于本意向书所约定的日期内签订正式的《入驻服务协议》，以
								明确双方权利、义务。如乙方未在规定时间内签署《入驻服务协议》的，则定金不予退还，如甲方未在规定时间内签署《入驻
								服务协议》的，应双倍返还乙方定金。
						</p>
						<p>二、双方因履行本意向书发生争议，应友好协商解决；协商不成的任一方均有权向甲方所在地有管辖权的人民法院提起诉讼。</p>
						<p>三、本意向书自甲乙双方签字、盖章(签章)且乙方交付定金后生效，一式三份，甲方执二份，乙方执一份（签署《入驻服务协
								议》时乙方向甲方出示），具有同等法律效力。
						</p>
						<div className={`print-text ${this.state.isClassName?'fixed-height':'auto-height'}`}>
							<span>四、双方其他约定内容：</span>
							<p className="text-content"></p>
							<span className="border-b one-text"></span>
							<span className="border-b two-text"></span>
							<span className="border-b three-text"></span>
							<span className="border-b four-text"></span>
						</div>

			</div>



		);
	}

}
