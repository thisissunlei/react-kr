import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Table,
	TableBody,
	TableHeader,
  CheckboxGroup,
  Checkbox,
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
import './DataPermission.less';

export default class DataPermission extends Component{

	constructor(props,context){
		super(props, context);
    this.state = {
      mainbilltypeList: [],
      citySelect:false,
    }
	}
  componentDidMount() {

    var _this = this;
    Store.dispatch(Actions.callAPI('getMainBillTypeList')).then(function(response) {

      const mainbilltypeList = response.mainbilltypeList

      mainbilltypeList.map(function(item, index) {
        item.label = item.mainBillTypeDesc;
        item.value = item.mainBillTypeValue;
        return item;
      });

      _this.setState({
        mainbilltypeList
      });

    }).catch(function(err) {
      Notify.show([{
        message: '报错了',
        type: 'danger',
      }]);
    });


  }
onCancel=()=>{
  const {
    onCancel
  } = this.props;
  onCancel && onCancel()
}
allSelect=()=>{
  console.log(111);
  this.setState({
    citySelect:!this.state.citySelect,
  })
}

	render(){

		return(

			<div className="g-DataPermission">
          <div className="leftSec">
            <Checkbox label="全选" style={{color:'#333'}} onCheck={this.allSelect}/>
            <CheckboxGroup
                style={{display:'block',textAlign:'left',lineHeight:'32px',color:'#333'}}
                name="123123sadf"
                options={this.state.mainbilltypeList}
                checked={this.state.citySelect}
            />
          </div>
			</div>
		);
	}

}
