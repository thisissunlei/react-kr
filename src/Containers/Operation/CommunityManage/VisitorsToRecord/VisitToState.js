
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

 class VisitToState extends Component{



	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
		this.state={
			
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
    
    console.log(values,"PPPPPPPP")
    
  	let {onSubmit} = this.props;
  	onSubmit && onSubmit(values);
  }

  onSearchSubmit = (values) =>{
    
    this.setState({
      searchType:values.value,
      searchKey:values.content,
    })
  }

	render(){
		const { handleSubmit,select} = this.props;
		return (

		<form  onSubmit={handleSubmit(this.onSubmit)} style={{marginLeft:25,marginTop:30}}  >
            <KrField  label="是否到访" name="visitStatus" style={{marginLeft:25,marginRight:13}} component="group" requireLabel={true} >
							<KrField name="visitStatus" label="未到访" type="radio" value="UNVISIT"  style={{marginTop:5}}/>
							<KrField name="visitStatus" label="已到访" type="radio" value="VISIT"  style={{marginTop:5}}/>
						</KrField>
						<KrField name="id" style={{display:"none"}}/>

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
export default mobxForm({ form: 'VisitToState',validate})(VisitToState);
