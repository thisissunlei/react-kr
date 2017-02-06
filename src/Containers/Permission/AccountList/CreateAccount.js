import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
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
  ListGroup,
  ListGroupItem
} from 'kr-ui';

export default class Initialize  extends Component{

	constructor(props,context){
		super(props, context);

	}
onCancel=()=>{
  const {
    onCancel
  } = this.props;
  onCancel && onCancel()
}


	render(){

		return(

			<div>
        <form style={{width:'100%',textAlign:'center'}}>
          <KrField
              label="登录名："
              style={{textAlign:'center'}}
              requireLabel={true}
              heightStyle={{height:42,marginLeft:'17px',width:222}}
              name="loginName"
              component="input"
              type="text"
              inline={true}
              placeholder="请输入登录名"
          />
          <KrField
              label="姓名："
              style={{width:320,marginTop:20}}
              requireLabel={true}
              heightStyle={{height:42,marginLeft:16,width:222}}
              name="idName"
              component="input"
              inline={true}
              type="text"
              placeholder="请输入姓名"
          />
          <KrField
              label="手机号："
              style={{textAlign:'center',marginTop:20}}
              heightStyle={{height:42,marginLeft:'17px',width:222}}
              name="loginName"
              component="input"
              inline={true}
              type="text"
              placeholder="请输入手机号"
          />
          <KrField
              label="邮箱："
              style={{width:320,marginTop:20,marginBottom:20}}
              heightStyle={{height:42,marginLeft:16,width:222}}
              name="idName"
              component="input"
              inline={true}
              type="text"
              placeholder="请输入电子邮箱"
          />
          <ListGroup>
            <ListGroupItem style={{paddingLeft:17,paddingRight:40,paddingTop:20,paddingBottom:6}}>
                <Button
                    label="确定"
                    type="submit"
                    width={90}
                    height={36}
                    fontSize={14}
                />
            </ListGroupItem>
            <ListGroupItem style={{paddingTop:20,paddingBottom:6}}>
                <Button
                    label="取消"
                    cancle={true}
                    type="button"
                    onTouchTap={this.onCancel}
                    width={90}
                    height={34}
                    fontSize={14}
                />
            </ListGroupItem>
          </ListGroup>

        </form>
			</div>
		);
	}

}
