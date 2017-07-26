import React from 'react';
import {reduxForm,change}  from 'redux-form';
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
import {Store} from 'kr/Redux';
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
            Store.dispatch(change('OpenCard','cardNo',response.cardNo?response.cardNo:''))
        }).catch(function (err) {
            Message.error(err.message);
        });
    }
     onSubmit=(values)=>{
        const {onSubmit,employees}=this.props;
        let {cardInfo} = this.state;
        var form = Object.assign({},values);
        form.name = employees.name;
        form.cardId = cardInfo.cardId||"";
        form.ssoId = cardInfo.ssoId;
        form.mobilePhone = employees.mobilePhone;
        form.isBound=cardInfo.isBound;
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
        
		return(

			<div>
              <form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:20}}>
               
                <KrField grid={1}
                            style={{width:262,marginLeft:28}}
                            name="name"
                            component="labelText"
                            value = {employees.name} 
                            label="姓名"
						/>
                 <KrField grid={1}
                            style={{width:262,marginLeft:28}}
                            value = {employees.mobilePhone} 
                            component="labelText"
                            label="手机号"
                            name="mobilePhone"
						/>
                 <div className='m-member-card'><KrField grid={1}
                            style={{width:262,marginLeft:28}}
                            name="cardNo"
                            component="input"
                            label="会员卡号"
                            inline={true}
                            requireLabel={true}
					    /></div>

			   <Grid style={{marginTop:26,marginBottom:5}}>
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

    if(!values.cardNo){
      errors.cardNo='请填写会员卡号'; 
    }
    
	return errors
}

export default reduxForm({ form: 'OpenCard',validate})(OpenCard);