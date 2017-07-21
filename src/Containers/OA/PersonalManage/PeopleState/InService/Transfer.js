import React from 'react';
import {reduxForm}  from 'redux-form';
import {
    KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button
} from 'kr-ui';
import {Http} from 'kr/Utils'

class Transfer extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state = {
            department:'',
            departmentLis:''
        }
        this.getDepartmentList()
	}
    //获取部门列表
    getDepartmentList = () =>{
        const _this = this;
        Http.request("getDepartmentList").then(function (response) {
            _this.setState({
                
                departmentLis: [{label:"主动被动",value:"INITIATIVE"},{label:"被动",value:"PASSIVITY"}],
            });
        }).catch(function (err) {
            Message.error(err.message);
        });
    }
    
     onSubmit=(values)=>{
        const {onSubmit}=this.props;
        onSubmit && onSubmit(values);
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }
    componentWillReceiveProps(nextProps){
        let {department} = this.state;
        if(nextProps.department != department){
            this.setState({
                department:nextProps.department,
            })
        }

    }

	render(){
        let {department,departmentList} = this.state;
        let {handleSubmit}=this.props;

		return(

			<div>
              <form onSubmit={handleSubmit(this.onSubmit)}>
               
                <KrField grid={1}
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="labelText"
                            label="原部门:"
                            value = {department}
                            requireLabel={true}
						/>
                 <KrField grid={1}
                            style={{width:262,marginLeft:28}}
                            name="depId"
                            component="select"
                            label="部门:"
                            inline={true}
                            requireLabel={true}
                            options={departmentList}
					    />

			   <Grid style={{marginTop:17,marginBottom:5}}>
                            <Row>
                                <Col md={12} align="center">
                                <ButtonGroup>
                                    <div  style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit"/></div>
                                    <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
                                </ButtonGroup>
                                </Col>
                            </Row>
                </Grid>
             </form>
			</div>
		);
	}
}

const validate = values =>{
	const errors = {};
    
	return errors
}

export default reduxForm({ form: 'Transfer',validate})(Transfer);