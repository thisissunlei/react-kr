import React from 'react';
import {	
	KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button
} from 'kr-ui';
import {reduxForm}  from 'redux-form';
import './index.less';

class EditFamily  extends React.Component{

	constructor(props,context){
		super(props, context);
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

		return(

			<div className='m-person'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
                      <div className="title" style={{marginBottom:"30px"}}>
                            <div><span className="new-icon"></span><label className="title-text">编辑家庭成员</label></div>
                            <div className="person-close" onClick={this.onCancel}></div>
                      </div>

                       <KrField grid={1/2}
                            style={{width:262}}
                            name="name"
                            component="input"
                            label="成员"
                            requireLabel={true}
						/>

                          <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="called"
                            component="selecTemployees"
                            label="称谓"
                            requireLabel={true}
                             otherType="resourceRelation"
						/>
                        
                        <KrField grid={1/2}
                            style={{width:262}}
                            name="idCard"
                            component="input"
                            label="身份证"
						/>
                        
                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="company"
                            component="input"
                            label="工作单位"
                             requireLabel={true}
						/>
                        <KrField grid={1/2}
                            style={{width:262}}
                            name="position"
                            component="input"
                            label="职务"
                            requireLabel={true}
						/>
                        

                        <KrField grid={1/2}
								style={{width:262,marginLeft:28}}
								name="address"
								component="input"
								label="地址"
                                requireLabel={true}
						 />

                         <KrField grid={1/2}
                            style={{width:262}}
                            name="contractPhone"
                            component="input"
                            label="联系电话"
						/>

                       
                        <Grid style={{marginTop:17,marginBottom:5,marginLeft:-50}}>
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

export default reduxForm({ form: 'EditFamily',validate})(EditFamily);