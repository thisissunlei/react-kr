import React from 'react';
import {
	Title,
	KrField,
	Tooltip,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	SearchForms,
	Dialog,
	Message,
	DivTitle,
	DotTitle,
	ListGroup,
	ListGroupItem,
	Grid,
	Row,
	Col,
	ButtonGroup,
	Notify
} from 'kr-ui';
import {
	observer
} from 'mobx-react';
import {
	CommonItem
} from 'kr/PureComponents/Agreement';
import {Actions,Store} from 'kr/Redux';
import {
	connect,
	ReduxFrom
} from 'kr/Redux';
import './index.less';
import {
	arrReverse
} from 'kr/Utils';
import ReactMixin from "react-mixin";
import AdvancedQuery from './AdvancedQuery';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import State from './State';
import { Field, FieldArray, reduxForm ,formValueSelector,change,initialize} from 'redux-form';

var tabelLength = 0;
var titleChecked = false;

@observer
@ReactMixin.decorate(LinkedStateMixin)

class MaChaoYue extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	constructor(props, context) {
		super(props, context);	
		this.state = {
			checkedArr:[],
			biaodan:['1111','222']
		}
	}
	componentDidMount() {
		let initialValues = {leaseEnddate:'2015-10-21',leaseBegindate:'2014-03-13',members:[{type:'1111',num:'11',money:'111'},{type:'222',num:'12',money:'1321'}]}
		Store.dispatch(initialize('joinCreateForm', initialValues));
	}
	rowCheck = (event,index) =>{

		
		var checkedArr = [].concat(this.state.checkedArr);
		var key = checkedArr.indexOf(index);
		
		if(event.target.checked){
			if(key===-1){
				checkedArr.push(index);
			}
		}else{
			if(key!==-1){
				checkedArr.splice(key,1);
				
			}
		}
		
		if(checkedArr.length === tabelLength){
			this.titleCheckbox.checked = true;
		}else{
			titleChecked = true;
			this.titleCheckbox.checked = false;
		}
		this.setState({
			checkedArr,
		})

	}
	addRow = (fields) =>{
		fields.push();
		
		setTimeout(()=>{

			if(titleChecked){
				this.allChecked();
				this.clearCheckBox(false);
			}
		},50)
	}
	removeRow=(fields)=>{
		let {checkedArr} = this.state;
		var newArr = arrReverse(checkedArr);
		if(newArr.length){
			this.clearCheckBox(true);
		}
		newArr.map((item,index)=>{
			fields.remove(item);
		})
		if(tabelLength == newArr.length){
			this.titleCheckbox.checked = false;
			titleChecked = false;
		}
		this.setState({
			checkedArr:[]
		})
	}
	clearCheckBox = (type) =>{
		for(let i = 0;i<tabelLength;i++){
			if(type){
				if(this["checkbox"+i]){
					this["checkbox"+i].checked = false;
				} 
			}else{
				this["checkbox"+i].checked = true;
			}
			
			
		}
	}
	allChecked = () =>{
		var checkedArr = [];
		for(let i=0;i<tabelLength;i++){
			checkedArr.push(i);
		}
		this.setState({
			checkedArr,
		})
	}
	handeOnCheck = (event) =>{
		var handeCheck=event.target.checked;
		console.log('handeOnCheck',handeCheck)
		var checkedArr = [];
		if(handeCheck){
			this.clearCheckBox(false);
			this.allChecked();
		}else{
			this.clearCheckBox(true);
			this.setState({
				checkedArr:[]
			})
			
		}
		
		titleChecked = handeCheck;
	
		
		
	}
	renderBrights=({fields})=>{
		const self = this;
		tabelLength = fields.length;
		return (
			<div className="ui-tables">
				 <Grid style={{marginTop:"-28px",marginBottom:"10px"}}>
					<Row>
						<Col align="right">
							<ButtonGroup>
								<Button label="添加优惠"  onTouchTap={() => {this.addRow(fields)}}  />
								<Button label="删除"  onTouchTap={() => {this.removeRow(fields)}}  />
						  </ButtonGroup>
						</Col>
					</Row>
				</Grid>
			<table>
				<thead>
				<tr className="hander">
					<td>
						<input onChange ={this.handeOnCheck} 
						ref = {(ref)=>{
							self.titleCheckbox = ref;
						}}
						name="mm"
						type="checkbox" 
					/></td>
					<td style={{width:100}}>优惠类型</td>
					<td>开始时间</td>
					<td style={{width:130}}>结束时间</td>
					<td style={{width:80}}>折扣</td>
					<td style={{width:100}}>优惠金额</td>
				</tr>
				</thead>
				<tbody>
				{
					this.renderTr(fields)
				}
				</tbody>

			</table>
			</div>




		)
	}
	renderTr=(fields)=>{
		let keyList = [{label:'免前',value:'1111'},{label:'折扣',value:'222'},{label:'免后',value:'3'}]
		let self = this;
		let {
			changeValues
		} = this.props;

		let {
			wherefloor,
			leaseBegindate,
			leaseEnddate
		} = changeValues;
		let {biaodan}= this.state;
		return(
		fields.map((member, index) =>{
					if(biaodan[index] == '222'){
					return(<tr key={index} className="hander">
					     <td style={{verticalAlign:'middle'}}>

					     <input type="checkbox"
						onChange = {(event)=>{
							self.rowCheck(event,index)
						}}
						ref = {(ref)=>{
							self["checkbox"+index] = ref;
						}}/></td>
				        <td >
					        <KrField
					          name={`${member}.type`}
					          type="text"
					          component='select'
					          options={keyList}
					          onChange={(event)=>{
							self.changeType(event,index,fields)
							}}/>
				        </td>
				        <td style={{textAlign:'center'}}>
					        <span style={{display:'inline-block',marginTop:'10px'}}>{leaseBegindate.substring(0,10)}</span>
				        </td>
				        <td style={{textAlign:'center'}}>
					        <span style={{display:'inline-block',marginTop:'10px'}}>{leaseEnddate.substring(0,10)}</span>

				        </td>
				        <td>
					        <KrField
					          name={`${member}.money`}
					          type="text"
					          component='text'
					          value={member.type}
					          onBlur={(event)=>{
								self.zhekou(event,fields,index)
								}}/>
				        </td>
				        <td  style={{textAlign:'center'}}>
				        	<KrField
					          name={`${member}.num`}
					          type="text"
					          component='text'/>
				        </td>
				      </tr>
				    )}else if(biaodan[index] == '1111'){
				    	return(
				    	<tr key={index} className="hander">
					     <td style={{verticalAlign:'middle'}}>
					     <input type="checkbox"
						onChange = {(event)=>{
							self.rowCheck(event,index)
						}}
						ref = {(ref)=>{
							self["checkbox"+index] = ref;
						}}/></td>
				        <td style={{verticalAlign:'top'}}>
					        <KrField
					          name={`${member}.type`}
					          type="text"
					          component='select'
					          options={keyList}
					          onChange={(event)=>{
							self.changeType(event,index,fields)
							}}/>
				        </td>
				       	<td style={{textAlign:'center'}}>
					        <span style={{display:'inline-block',marginTop:'10px'}}>{leaseBegindate.substring(0,10)}</span>
				        </td>
				        <td>
					        <KrField
					          name={`${member}.end`}
					          type="text"
					          style={{width:120}}
					          component='date'/>
				        </td>
				        <td>
					        <KrField
					          name={`${member}.money`}
					          type="text"
					          component='text'
					          value={member.type}/>
				        </td>
				        <td>
					        <KrField
					          name={`${member}.num`}
					          type="text"
					          component='text'/>
				        </td>
				      </tr>
				    )
				    }else if(biaodan[index] == '3') {
				    	return(
				    	<tr key={index} className="hander">
					     <td style={{verticalAlign:'middle'}}>
					     <input type="checkbox"
						onChange = {(event)=>{
							self.rowCheck(event,index)
						}}
						ref = {(ref)=>{
							self["checkbox"+index] = ref;
						}}/></td>
				        <td style={{verticalAlign:'top'}}>
					        <KrField
					          name={`${member}.type`}
					          type="text"
					          component='select'
					          options={keyList}
					          onChange={(event)=>{
							self.changeType(event,index,fields)
							}}/>
				        </td>
				        <td>
					        <KrField
					          name={`${member}.begin`}
					          type="text"
					          style={{width:120}}
					          component='date'
					          />
				        </td>
				        <td style={{textAlign:'center'}}>
					        <span style={{display:'inline-block',marginTop:'10px'}}>{leaseEnddate.substring(0,10)}</span>
				        </td>
				        <td>
					        <KrField
					          name={`${member}.money`}
					          type="text"
					          component='text'
					          value={member.type}/>
				        </td>
				        <td>
					        <KrField
					          name={`${member}.num`}
					          type="text"
					          component='text'/>
				        </td>
				      </tr>
				    )
				    }else {
				    	return(
				    	<tr key={index} className="hander">
					     <td style={{verticalAlign:'middle'}}>
					     <input type="checkbox"
						onChange = {(event)=>{
							self.rowCheck(event,index)
						}}
						ref = {(ref)=>{
							self["checkbox"+index] = ref;
						}}/></td>
				        <td style={{verticalAlign:'top'}}>
					        <KrField
					          name={`${member}.type`}
					          type="text"
					          component='select'
					          options={keyList}
					          onChange={(event)=>{
							self.changeType(event,index,fields)
							}}/>
				        </td>
				        <td>
					        <KrField
					          name={`${member}.begin`}
					          type="text"
					          style={{width:120}}
					          component='date'
					          />
				        </td>
				        <td>
					        <KrField
					          name={`${member}.end`}
					          type="text"
					          style={{width:120}}
					          component='date'/>
				        </td>
				        <td>
					        <KrField
					          name={`${member}.money`}
					          type="text"
					          component='text'
					          value={member.type}/>
				        </td>
				        <td>
					        <KrField
					          name={`${member}.num`}
					          type="text"
					          component='text'/>
				        </td>
				      </tr>
				    )
				    }


				})
		)


	}
	changeType=(e,index,fields)=>{
		let {biaodan} = this.state;
		let {changeValues} = this.props;
		let same = false;
		let sameFree = false;
		biaodan[index] = e.value;
		biaodan.map((item)=>{
			if(item == '222' && !same){
				same = true;
			}else if(item == '222' && same){
				Notify.show([{
					message: '只可以选择一次折扣',
					type: 'danger',
				}]);
				biaodan.splice(index,1)
				fields.remove(index);
			}else if(item == '1111' && !sameFree){
				sameFree = true
			}else if(item == '3' && !sameFree){
				sameFree = true;
			}else if(sameFree){
				Notify.show([{
					message: '折前和折后只可以选择一个',
					type: 'danger',
				}]);
				biaodan.splice(index,1)
				fields.remove(index);
			}
		})
		this.setState({
			biaodan
		},()=>{
			this.renderBrights({fields})
		})
		setTimeout(()=>{
			this.addRow(fields);
			fields.remove(tabelLength-1)

		},50)

		
		
	}
	zhekou=(e,fields,index)=>{
		let {changeValues} = this.props;
		fields.remove(index);
		fields.insert(index,{type:'222',num:'1234'})
	}
	onSubmit=(form)=>{
		// Store.dispatch(change('MaChaoYue', 'member', []));
	}


	render() {
		const {handleSubmit}=this.props;

		return (
			    <div style={{background: '#fff',height:1400}} className="demo-Machaoyue">
					<form onSubmit={handleSubmit(this.onSubmit)}>
					<KrField style={{width:343,marginLeft:25,position:"absolute"}} component="group" label="租赁期限" requireLabel={true}>
					<ListGroup>
						<ListGroupItem style={{width:'141',padding:0,marginLeft:'-10px',marginTop:'-10px'}}> <KrField name="leaseBegindate" style={{width:141}} component="date" onChange={this.onChangeLeaseBeginDate} simple={true}/></ListGroupItem>
						<ListGroupItem style={{width:'31',textAlign:'center',padding:0,marginLeft:10,marginTop:'-10px'}}><span style={{display:'inline-block',lineHeight:'60px',width:'31px',textAlign:'center',left:'10px',position:"relative"}}>至</span></ListGroupItem>
						<ListGroupItem style={{width:'141',padding:0,marginTop:'-10px'}}> <KrField style={{width:141}} name="leaseEnddate" component="date" onChange={this.onChangeLeaseEndDate} simple={true}/> </ListGroupItem>
					</ListGroup>
				</KrField>
					<DotTitle title='租赁明细' style={{marginTop:53,marginBottom:25,paddingLeft:0,paddingRight:0}}>
						<FieldArray name='members' component={this.renderBrights}/>

				    </DotTitle>
				    <Button  label="确定" type="submit"  />
			   	</form>
				</div>
		);

	}

}
const validate = values => {
  const errors = {}
  if (!values.members || !values.members.length) {
    errors.members = { _error: 'At least one member must be entered' }
  } else {
    const membersArrayErrors = []
    values.members.forEach((member, memberIndex) => {
      const memberErrors = {}
      if (!member || !member.type) {
        memberErrors.type = 'Required'
        membersArrayErrors[memberIndex] = memberErrors
      }
      if (!member || !member.num) {
        memberErrors.num = 'Requirsssed'
        membersArrayErrors[memberIndex] = memberErrors
      }
    })
    if(membersArrayErrors.length) {
      errors.members = membersArrayErrors
    }
  }
  return errors
}
const selector = formValueSelector('joinCreateForm');

MaChaoYue = reduxForm({
	form: 'joinCreateForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(MaChaoYue);

export default connect((state) => {

	let changeValues = {};

	changeValues.leaseBegindate = selector(state, 'leaseBegindate');
	changeValues.leaseEnddate = selector(state, 'leaseEnddate');
	changeValues.members = selector(state, 'members') || [];

	return {
		changeValues
	}

})(MaChaoYue);
