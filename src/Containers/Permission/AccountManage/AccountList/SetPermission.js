import React from 'react';
import {Actions, Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {reduxForm, formValueSelector, change,initialize} from 'redux-form';
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
    Message,
    Col,
    Dialog,
    ListGroup,
    ListGroupItem
} from 'kr-ui';
import './DataPermission.less';

export default class SetPermission extends React.Component {

    static PropTypes = {
        detail: React.PropTypes.object,
        onCancel: React.PropTypes.func,
    }
    constructor(props, context) {
        super(props, context);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
          allCheck:false,
          roleList:[],
          idList:[],
        }
    }
    componentDidMount() {
      this.getInfo();
    }
    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel()
    }
    getInfo=()=>{

    		let {roleList}=this.state;
    		console.log('sdafsdafsadf',this.props.detail);
    		let id=this.props.detail.id;
    		var _this = this;
    	Http.request('findRoleData',{id:id}).then(function(response) {
    		  _this.setState({
    				roleList: response.roleList
    			});
    		}).catch(function(err) {

    		});

    }
    renderData=(item,index)=>{
      console.log("sdfa",item);
    	return (
    		<div key={index} style={{textAlign:'left',display:'inline-block',marginLeft:20}}>
    			<Checkbox
    					style={{display:'block',textAlign:'left',lineHeigitemht:'32px',color:'#333'}}
    					label={item.name}
    					checked={item.ownFlag==1?true:false}
    					onCheck={this.checked.bind(this,item,index)}
    			/>
    		</div>
    	);
    }
    checked=(item,index)=>{
      let {roleList} = this.state;
      var checked = [];
      if(item.ownFlag==0){
        item.ownFlag=1;
      }else{
        item.ownFlag=0;
      }
      console.log(this.state.roleList);
      roleList.map((item, index) => {
        checked.push(item.ownFlag);
      })
      if (checked.indexOf(0) == -1) {
        this.setState({
          allCheck:true,
        })
      } else {
        this.setState({
          allCheck:false,
        })
      }
    }
    //点击全选
  	allSelect = () => {
      var _this = this;
      var id = [];
      let {roleList}=this.state;
      var list;
      _this.setState({
        allCheck:!_this.state.allCheck,
      },function(){
        console.log("trueOrfalse",_this.state.allCheck);
        if (_this.state.allCheck) {
          list=roleList.map((item, index) => {
                item.ownFlag = 1;
                return item;
            })
          } else {
            list=roleList.map((item, index) => {
                  item.ownFlag = 0;
                  return item;
              })
         }
         this.setState({
           roleList:list
         })
      })
  	}
    onSubmit = () => {
        let {roleList} = this.state;
        const {detail,onSubmit} = this.props;
        var idList = [];
        roleList.map((item, index) => {
          if(item.ownFlag==1){
            idList.push(item.id);
          }
        })
        console.log("idList",idList);
        Http.request('editUserRole', {}, {
          id:detail.id,
          roleIds:idList
        }).then(function(response) {
            Message.success('修改成功')
            onSubmit();
        }).catch(function(err) {
            Message.error(err.message);
        });

    }
    render() {
      let {roleList}=this.state;
      return(
        <div className="g-SetPermission">
            <div style={{textAlign:'left',marginTop:20}}>
              <Checkbox label="全选" style={{display:'block',color:'#333'}} onCheck={this.allSelect} checked={this.state.allCheck}/>
              {roleList.map((item,index)=>{return this.renderData(item,index)})}
            </div>
            <ListGroup>
                <ListGroupItem style={{
                    paddingLeft: 170,
                    paddingRight: 40,
                    paddingTop: 20,
                    paddingBottom: 6
                }}>
                    <Button label="确定" type="submit" onClick={this.onSubmit} width={90} height={36} fontSize={14}/>
                </ListGroupItem>
                <ListGroupItem style={{
                    paddingTop: 20,
                    paddingBottom: 6
                }}>
                    <Button label="取消" cancle={true} type="button" onTouchTap={this.onCancel} width={90} height={34} fontSize={14}/>
                </ListGroupItem>
            </ListGroup>
        </div>
        );
    }

}
