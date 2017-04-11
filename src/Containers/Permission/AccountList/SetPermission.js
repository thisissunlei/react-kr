import React from 'react';
import {Actions, Store} from 'kr/Redux';
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

class EditAccount extends React.Component {

    static PropTypes = {
        detail: React.PropTypes.object,
        onCancel: React.PropTypes.func,
    }
    constructor(props, context) {
        super(props, context);
        this.onCancel = this.onCancel.bind(this);
    }
    componentDidMount() {
        let {detail} = this.props;
        let initialValues = {};
        initialValues = detail;
        Store.dispatch(initialize('EditAccount', initialValues));
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
    		Store.dispatch(Actions.callAPI('findRoleData',{id:id})).then(function(response) {
    		  _this.setState({
    				roleList: response.roleList
    			});
    		}).catch(function(err) {

    		});
    }
    renderData=(item,index)=>{
    	return (
    		<div key={index}>
    			<Checkbox
    					style={{display:'block',textAlign:'left',lineHeigitemht:'32px',color:'#333'}}
    					label={item.name}
    					checked={item.ownFlag==1?true:false}
    					onCheck={this.checked(item,index)}
    			/>

    		</div>
    	);
    }
    checked=()=>{

      if (checked.indexOf(false) == -1) {
        extendObservable(_this, {
            allCheck: true
        })
    } else {
        extendObservable(_this, {
            allCheck: false
        })
    }
    }
    onSubmit = (form) => {
        const {detailFuc} = this.props;
        var _this = this;
        console.log("form", form);
        let {detail} = this.props;
        Store.dispatch(Actions.callAPI('editUserRole', {}, {
            id: detail.id,
            accountName: form.accountName,
            email: form.email,
            realName: form.realName,
            mobilePhone: form.mobilePhone
        })).then(function(response) {
            Message.success('修改成功')
        }).catch(function(err) {
            Message.error(err.message);
        });
    }
    render() {

      let {roleList}=this.state;
      return(
        <div className="g-SetPermission">
            <div className="leftSec">
              <Checkbox label="全选" style={{color:'#333'}} onCheck={this.allSelect}/>
              {roleList.map((item,index)=>{return this.renderData(item,index)})}
            </div>
            <div className="rightSec">
              <Checkbox label="全选" style={{color:'#333'}} onCheck={this.allSelect}/>
              {roleList.map((item,index)=>{return this.renderData(item,index)})}
            </div>
        </div>
        );
    }

}
EditAccount = reduxForm({form: 'EditAccount'})(EditAccount);

export default EditAccount;
