
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

 class VisitorsSearchForm extends Component{



	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
		this.state={
			searchType:"",
      searchKey:"",
      
		}
	}

	componentDidMount(){
	 	 


	}
	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();

	}

  
  //确定按钮
  onSubmit = (values) =>{
    let {searchType,searchKey} = this.state;
    values.searchType=searchType;
    values.searchKey=searchKey;
    
  	let {onSubmit} = this.props;
  	onSubmit && onSubmit(values);
  }
	//将区县id绑定到from上
	cityValue=(value)=>{
			const {$form} = this.props;
			$form.change('districtId',value);
	}

  onSearchSubmit = (values) =>{
    console.log(values,"KKKKK");
    this.setState({
      searchType:values.value,
      searchKey:values.content,
    })
  }

	render(){
		const { handleSubmit,select} = this.props;
		return (

			<form  onSubmit={handleSubmit(this.onSubmit)} style={{marginLeft:25,marginTop:30}}  >
        

          <SearchForm placeholder='请输入关键字' 
            searchFilter={[{label:"访客姓名",value:"NAME"},{label:"访客电话",value:"TEL"}]} 
            style={{width:262,marginTop:29,marginLeft:-1,display:"inline-block",marginBottom:15,marginRight:25}} 
            defaultFilter='NAME'
            onChange = {this.onSearchSubmit}
          />
          <KrField grid={1/2} right={34} label="访客类型" name="visitType"  style={{marginTop:4}} component="select"  requireLabel={false}
            onSubmit={this.cityValue}
            options={select.type}
          />

          <Grid style={{marginTop:17,marginBottom:5,marginLeft:-24}}>
            <Row>
              <Col md={12} align="center">
                <ButtonGroup>
                  <div style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit"/></div>
                  <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
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
export default mobxForm({ form: 'VisitorsSearchForm',validate})(VisitorsSearchForm);
