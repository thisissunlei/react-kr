import React from 'react';
import {
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button,
    KrField,
    Message
} from 'kr-ui';
import {Http} from 'kr/Utils';
import {reduxForm}  from 'redux-form';

 class Leave extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state = {
            departureTypes: [{label:"主动被动",value:"INITIATIVE"},{label:"被动",value:"PASSIVITY"}],
        }
        this.getDepartureType();
	}
    //获取离职类型
    getDepartureType = () =>{
        const _this = this;
        Http.request("getDepartureType").then(function (response) {
            _this.setState({
                // departureTypes: responses,
                departureTypes: [{label:"主动被动",value:"INITIATIVE"},{label:"被动",value:"PASSIVITY"}],
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


	render(){
        let {handleSubmit}=this.props;
        let {departureTypes} = this.state;

		return(

			<div style={{marginTop:'35px'}}>
             <form onSubmit={handleSubmit(this.onSubmit)}>
              <KrField grid={1/2}
                        style={{width:262,marginLeft:28}}
                        name="area"
                        component="select"
                        label="离职类型"
                        requireLabel={true}
                        options={departureTypes}
				/>
               <KrField grid={1} label="离职原因" name="arround" heightStyle={{height:"78px",width:'500px'}}  component="textarea"  maxSize={30} placeholder='请输入描述' style={{width:517,marginLeft:'28px'}} lengthClass='list-len-textarea'/>
			   <Grid>
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

export default reduxForm({ form: 'Leave',validate})(Leave);