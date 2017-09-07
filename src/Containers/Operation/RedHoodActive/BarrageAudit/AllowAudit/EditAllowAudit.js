import React from 'react';
import {
	KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button
} from 'kr-ui';
import {reduxForm,change}  from 'redux-form';
import {Store} from 'kr/Redux';



class EditAllowAudit extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state = {
            jobTypes:[],
            isType :false,
            photoUrl:props.photoUrl || ''
        }
	}

    componentDidMount(){
        Store.dispatch(change('EditAllowAudit','status','right'))
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
        let {handleSubmit} = this.props;
		return(

			<div className='edit-audit'>
				 <form  onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:7}}>
                    <KrField grid={1/2}
                        label="是否通过"
                        name="status"
                        style={{width:225,marginLeft:60,marginTop:25}}
                        component="group"
                        requireLabel={true}
                        inline = {true}
                    >
                        <KrField name="status" label="通过" type="radio" value="right" />
                        <KrField name="status" label="不通过" type="radio" value="reject" />
                    </KrField>
                    <Grid style={{marginTop:45,marginRight:40}}>
                        <Row>
                            <Col md={12} align="center">
                                <ButtonGroup>
                                    <div style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit" /></div>
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

export default reduxForm({ form: 'EditAllowAudit',validate})(EditAllowAudit);
