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

class EditWork  extends React.Component{

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
                            <div><span className="new-icon"></span><label className="title-text">编辑工作经历</label></div>
                            <div className="person-close" onClick={this.onCancel}></div>
                      </div>

                       <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="input"
                            label="公司名称"
                            requireLabel={true}
						/>

                          <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="input"
                            label="职务"
                             requireLabel={true}
						/>
                        
                        <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="date"
                            label="开始时间"
						/>
                        
                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="date"
                            label="终止时间"
                             requireLabel={true}
						/>
                        <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="input"
                            label="联系人姓名"
                            requireLabel={true}
						/>

                        <KrField grid={1/2}
								style={{width:262,marginLeft:28}}
								name="floor"
								component="input"
								label="联系人电话"
                                requireLabel={true}
						 />
                        

                        <KrField grid={1/2}
								style={{width:262}}
								name="floor"
								component="input"
								label="联系人邮箱"
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

export default reduxForm({ form: 'EditWork',validate})(EditWork);