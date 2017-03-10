import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
import {
	DateFormat
} from 'kr/Utils';
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
	Dialog,
	Drawer,
	Tabs,
	Tab,
	Tooltip,
	ButtonGroup,
	KrDate

} from 'kr-ui';
import './index.less'
@observer
class WatchCommunityList extends Component{

	constructor(props,context){
		super(props, context);
		

	}
	onSubmit = (values) => {
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	
	

	
	render(){
        

		let evenStyle={width:'280px',marginLeft:-10}
		let oddStyle={width:'290px',marginLeft:-10}

		let detail={

		}

		let hasOffice={

		}

		let unifyStyle={

		}
		let uniStyle={

		}
		

		let tooltipTextStyle={maxWidth:"224px",whiteSpace:"normal",wordWrap:"break-word",height:"auto",lineHeight:"22px",overflow:"hidden"};
		
		return(
	      <div className="m-lookCustomerList m-newMerchants" style={{paddingLeft:8}}>
		      	<div className="title" >
					<div><span className="look-new-icon"></span><label className="title-text">123</label></div>
					<div className="look-close" onClick={this.onCancel}></div>
				</div>    
		  

	      <div className="m-LookDetailed" style={{marginTop:8}}>
		    
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="客户来源:" style={oddStyle} component="labelText" value='123' inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="意向工位数:" style={evenStyle} component="labelText" value='123' inline={true}/></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="联系人姓名:" style={oddStyle} component="labelText" value='123' inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="意向工位类型:" style={evenStyle} component="labelText" value='123' inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="联系人电话:" style={oddStyle} component="labelText" value='123' inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="意向工位价格:" style={evenStyle} component="labelText" value='123' inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="联系人邮箱:" style={oddStyle} component="labelText" value='123' inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="意向入驻社区:" style={evenStyle} component="labelText" value='123' inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="联系人微信:" style={oddStyle} component="labelText" value='123' inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="预计入驻时间:" style={evenStyle} component="labelText" value='123'  inline={true} /></li>

				<div className="bottomWire"></div>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="公司名称:" style={oddStyle} component="labelText" value='123' inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="融资轮次:" style={evenStyle} component="labelText" value='123' inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="公司规模:" style={oddStyle} component="labelText" value='123' inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="融资金额:" style={evenStyle} component="labelText" value='123' inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="办公室情况:" style={oddStyle} component="labelText" value='123' inline={true} /></li>
				{/*{isDeadline&&<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="到期时间:" style={evenStyle} component="labelText" value={DateFormat(detail.deadline,"yyyy-mm-dd")} inline={true} /></li>}*/}
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="项目名称:" style={evenStyle} component="labelText" value='123' inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="所属地区:" style={oddStyle} component="labelText" value='123' inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="项目类型:" style={evenStyle} component="labelText" value='123' inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="详细地址:" style={oddStyle} component="labelText" value='123' inline={true} /></li>
				<li className="everyText"><span className="blueDrop"></span><KrField grid={1/2} label="公司网址:" style={evenStyle} component="labelText" value='123' inline={true} /></li>
				<li className="everyText" style={{width:660,marginTop:7,paddingLeft:0}}><span className="blueDrop" style={{height:5}}></span><span style={{display:"inline-block",paddingLeft:5}}>公司简介:</span>
					<p style={{padding:"0 10px 0 15px",color:"#666666"}}>123</p>
				</li>
				<li className="everyText" style={{width:660,paddingLeft:0}}><span className="blueDrop" style={{height:5}}></span><span style={{display:"inline-block",paddingLeft:5}}>备注:</span>
					<p style={{padding:"0 10px 0 15px",color:'#666'}}>123</p>
				</li>
				<div style={{textAlign: "center",marginTop:15}}><Button className='d-editBtn' label="编辑" type="submit" style={{margin:"auto",minWidth:'80px',height:'30px'}}  /></div>
				
					
			</div>	
			
	      </div>

		);
	}

}
export default WatchCommunityList