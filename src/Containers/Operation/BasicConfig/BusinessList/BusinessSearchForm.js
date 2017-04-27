
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
	Message,
  SearchForm
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
      name:"",
      no:"",
		}
	}

	componentDidMount(){
	 	 // Store.dispatch(change('NewCustomerList','hasOffice','NOHAS'));
		 // Store.dispatch(change('NewCustomerList','hasOffice','NO'));
    // const {$form,searchContent} = this.props;
    // $form.change('searchType',searchContent.searchType);
    // $form.change('searchKey',searchContent.searchKey);


	}
	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();

	}

  
  //确定按钮
  onSubmit = (values) =>{
    let {name,no} = this.state;
    console.log("+++++++",this.state.name,"===",no,"<<<<<<",values,this.state);

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

  onSearchSubmit = (values) =>{
    console.log(values,"KKKKK")
    if(values.value==="NAME"){
    
       console.log("NAME",values.content)
      this.setState({
        name:values.content,
        no:""
      },function(){
        console.log("newName",this.state.name)
      })
    }else{
      this.setState({
        name:"",
        no:values.content
      })
    }
  }
	render(){
		const { handleSubmit} = this.props;
		return (

			<form  onSubmit={handleSubmit(this.onSubmit)} style={{marginLeft:25,marginTop:30}}  >
        
          <SearchForm placeholder='请输入关键字' 
            searchFilter={[{label:"商圈编码",value:"CODING"},{label:"商圈名称",value:"NAME"}]} 
            style={{width:262,marginTop:35,marginLeft:-1,marginBottom:15}} 
            defaultFilter='NAME'
            onChange = {this.onSearchSubmit}
          />
          <KrField grid={1/2} right={34} label="区县" name="districtId"  style={{marginTop:4}} component="city"  requireLabel={false} onSubmit={this.cityValue}/>
          <KrField  grid={1/2} right={34} style={{marginTop:4}}  name="enable" type="select"  label="是否启用"
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
