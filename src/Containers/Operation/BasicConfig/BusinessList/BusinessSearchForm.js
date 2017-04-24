
import React, {Component, PropTypes} from 'react';
import {Actions,Store,connect} from 'kr/Redux';
import {
	observer
} from 'mobx-react';

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
import {mobxForm}  from 'kr/Utils/MobxForm';
import './index.less';

 class BusinessSearchForm extends Component{



	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
		this.state={
			type:"",
      name:"",
      no:"",
		}
	}

	componentDidMount(){
	 	 // Store.dispatch(change('NewCustomerList','hasOffice','NOHAS'));
		 // Store.dispatch(change('NewCustomerList','hasOffice','NO'));
    const {$form,searchContent} = this.props;
    $form.change('searchType',searchContent.searchType);
    $form.change('searchKey',searchContent.searchKey);


	}
	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();

	}

  keyWorldChange = (value) => {
    let {type} = this.state;
    if(type == "CODING"){
      this.setState({
        name:"",
        no:value,
      })

    }
    if(type == "NAME"){
      this.setState({
        name:value,
        no:"",
      })
    }
  }

  typeChange = (value) =>{
    let {type} = this.state;
    type = value.value == "CODING" ? "CODING":"NAME";
    this.setState({
      type:type
    })
  }

  //确定按钮
  onSubmit = (values) =>{
    let {name,no} = this.state;
    values.name = name;
    values.no = no;
  	let {onSubmit} = this.props;
  	onSubmit && onSubmit(values);
  }
	//将区县id绑定到from上
	cityValue=(value)=>{
			const {$form} = this.props;
			$form.change('districtId',value);
	}
	render(){
		const { handleSubmit} = this.props;
		return (

			<form  onSubmit={handleSubmit(this.onSubmit)} style={{marginLeft:25,marginTop:30}}  >
        <div style = {{display:"inline-block",width:295,marginTop:17}}>
          <div className="KKKK" style = {{display:"inline-block",width:100}}>
            <KrField name="searchType" type="select"  label=""
                options={[{label:"商圈编码",value:"CODING"},{label:"商圈名称",value:"NAME"}]}
                onChange = {this.typeChange}
            />
          </div>
          <div className="KKKK" style = {{display:"inline-block",width:160}}>
            <KrField name="searchKey" component='input' inline={false} onChange = {this.keyWorldChange} placeholder='请输入关键字'/>
          </div>

        </div>
          <KrField grid={1/2} right={34} label="区县" name="districtId"  style={{marginTop:4}} component="city"  requireLabel={false} onSubmit={this.cityValue}/>
          <KrField  grid={1/2} right={34} style={{marginTop:4}}  name="enable" type="select"  label="客户分类"
  				    options={[{label:"全部",value:" "},{label:"启用",value:"ENABLE"},{label:"禁用",value:"DISENABLE"}]}
  				/>
          <Grid style={{marginTop:17,marginBottom:5,marginLeft:-24}}>
            <Row>
              <Col md={12} align="center">
                <ButtonGroup>
                  <div  className='ui-btn-center'><Button  label="确定" type="submit"/></div>
                  <div style={{marginLeft:15,display:"inline-block"}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} /></div>
                </ButtonGroup>
              </Col>
            </Row>
          </Grid>
			</form>
		);
	}
}
const validate = values =>{
	const errors = {};

	return errors;
}
export default mobxForm({ form: 'BusinessSearchForm',validate})(BusinessSearchForm);
