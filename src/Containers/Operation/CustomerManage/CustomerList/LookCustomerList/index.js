import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
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
	Drawer

} from 'kr-ui';
import State from './State';
@observer
class LookMerchants extends Component{

	constructor(props,context){
		super(props, context);

	}
	render(){
		return(
      <div className="m-lookMerchants">
        <div >
            <h1>查看数据</h1>
            <KrField style={State.messageBarStyle} component="labelText" label="属性编码" value={"12"}/>
            <KrField style={State.messageBarStyle} component="labelText" label="属性编码" value={"12"}/>
            <KrField style={State.messageBarStyle} component="labelText" label="属性编码" value={"12"}/>
            <KrField style={State.messageBarStyle} component="labelText" label="属性编码" value={"12"}/>
            <KrField style={State.messageBarStyle} component="labelText" label="属性编码" value={"12"}/>
            <KrField style={State.messageBarStyle} component="labelText" label="属性编码" value={"12"}/>
            <KrField style={State.messageBarStyle} component="labelText" label="属性编码" value={"12"}/>
            <KrField style={State.messageBarStyle} component="labelText" label="属性编码" value={"12"}/>
            <KrField style={State.messageBarStyle} component="labelText" label="属性编码" value={"12"}/>
            <KrField style={State.messageBarStyle} component="labelText" label="属性编码" value={"12"}/>
            <KrField style={State.messageBarStyle} component="labelText" label="属性编码" value={"12"}/>
            <KrField style={State.messageBarStyle} component="labelText" label="属性编码" value={"12"}/>
            <KrField style={State.messageBarStyle} component="labelText" label="属性编码" value={"12"}/>
            <KrField style={State.messageBarStyle} component="labelText" label="属性编码" value={"12"}/>
        </div>
      </div>

		);
	}

}
export default LookMerchants;
