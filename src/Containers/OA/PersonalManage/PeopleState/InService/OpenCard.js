import React from 'react';
import {reduxForm}  from 'redux-form';
import {
    KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button,
    Message
} from 'kr-ui';
import {Http} from 'kr/Utils';
class OpenCard extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state = {
            employees:{},
            cardInfo:{},
        }
	}
    componentDidMount(){
        const {employees}=this.props;
        var _this = this;
        Http.request("cardInfo",{resourceId:employees.id}).then(function (response) {
           _this.setState({
               cardInfo:response
           })
        }).catch(function (err) {
            Message.error(err.message);
        });
    }
     onSubmit=(values)=>{
        const {onSubmit,employees}=this.props;
        let {cardInfo} = this.state;
        var form = Object.assign({},values);
        form.name = employees.name;
        form.cardId = cardInfo.cardId;
        form.ssoId = cardInfo.ssoId;
        onSubmit && onSubmit(form);
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }
    componentWillReceiveProps(nextProps) {
        var flog = false;
        for(let i in nextProps.employees){
            if(nextProps.employees[i]){
                flog = true;
                break;
            }
        }
        if(flog){
             this.setState({
                employees:nextProps.employees,
            })
        }
       
    }

	render(){
       
        let {handleSubmit,employees}=this.props;
        console.log(employees);
		return(

			<div>
              <form onSubmit={handleSubmit(this.onSubmit)}>
               
                <KrField grid={1}
                            style={{width:262,marginLeft:28}}
                            name="name"
                            component="labelText"
                            value = {employees.name} 
                            label="姓名"
						/>
                 <KrField grid={1}
                            style={{width:262,marginLeft:28}}
                            value = {employees.phone} 
                            component="labelText"
                            label="手机号"
                            name="mobilePhone"
						/>
                 <KrField grid={1}
                            style={{width:262,marginLeft:28}}
                            name="cardNo"
                            component="input"
                            label="会员卡号"
                            
                            inline={true}
                            requireLabel={true}
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

export default reduxForm({ form: 'OpenCard',validate})(OpenCard);