import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import $ from 'jquery';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
  Message
} from 'kr-ui';
import './index.less';
export default class NodeFormwork extends Component{

	constructor(props){
		super(props);
		this.state={
			showSection:false
		}

	}
	componentDidMount(){
		  var ue = UE.getEditor('container',{
            initialFrameWidth :'',
			initialFrameHeight: '502'
			
		  });
			 var editor=new UE.Editor();
			
	}
	render(){
		return (
			<div className="node-formwork">
				<div className="textbox-top">
                  <span>新建模板-html模式</span>
                  <div className="kr-top">
                       <span><button className="confirm">确认</button></span>
                        <span><button className="save">取消</button></span>
                  </div>
                </div>
				<div className="container-right">
                 
				</div>
				 <script id="container" name="content" type="text/plain">
			  <table>
    <tbody>
        <tr className="firstRow" name='td1'>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
        </tr>
        <tr>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
        </tr>
        <tr >
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
        </tr>
        <tr>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
        </tr>
        <tr >
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
        </tr>
        <tr>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
        </tr>
        <tr >
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
        </tr>
        <tr >
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
        </tr>
        <tr >
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
        </tr>
    </tbody>
</table>
<p>
    <br/>
</p>
 </script>
	 </div>
		);
	}
}

