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
    		let id=this.props.detail.id;
    	  Http.request('findRoleData',{userSsoId:id}).then((response)=> {
    		  this.setState({
    				roleList: response.groupList
    			});
    		}).catch((err)=> {
          Message.error(err.message);
    		});

    }
    renderData=(item,index)=>{
      if(item.roles.length){
        return (
          <div key={index} style={{display:'flex',margin:"10px",width:'1000px',flexWrap:'wrap'}}>
            <div style={{width:'8%',fontWeight:'bold'}}>{item.groupName}</div>
            <div style={{display:'flex',flexWrap:'wrap',width:'90%'}}>
                {item.roles.map((v,i)=>{
                   let disabled = (v.id==39|| v.id == 79)?true:false;
                  return 	 <Checkbox
                    style={{display:'inline-block',minWidth:'210px',lineHeigitemht:'32px',color:'#333'}}
                    label={v.name}
                    checked={v.ownFlag==1?true:false}
                    readOnly={disabled}
                    key={i}
                    onCheck={this.checked.bind(this,v,i)}
                /> 
                }) }
            </div>
          </div>
        );
      }
    }
    checked=(item,index)=>{
      let {roleList} = this.state;
      var checked = [];
      if(item.ownFlag==0){
        item.ownFlag=1;
      }else{
        item.ownFlag=0;
      }
      this.setState({roleList})
    }
  
    onSubmit = () => {
        let {roleList} = this.state;
        const {detail,onSubmit} = this.props;
        var idList = [];
        roleList.map((item, index) => {
            item.roles.map((v,i)=>{
              if(v.ownFlag==1){
                idList.push(v.id);
              }
            })
        })

        Http.request('editUserRole', {}, {
          id:detail.id,
          roleIds:idList
        }).then((response) =>{
            Message.success('修改成功')
            onSubmit();
        }).catch((err) =>{
            Message.error(err.message);
        });
    }
    render() {
      let {roleList}=this.state;
      return(
        <div className="g-SetPermission">
            <div style={{textAlign:'left',marginTop:20}}>
              {/* <Checkbox label="全选" style={{display:'block',color:'#333'}} onCheck={this.allSelect} checked={this.state.allCheck}/> */}
              {roleList.map((item,index)=>{return this.renderData(item,index)})}
            </div>
            <ListGroup>
                <ListGroupItem style={{
                    paddingLeft: 400,
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
