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

class AddPostList  extends React.Component{

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

			<div className='oa-post-list'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
                      <div className="title" style={{marginBottom:"30px"}}>
                            <div><span className="new-icon"></span><label className="title-text">新增用户</label></div>
                            <div className="person-close" onClick={this.onCancel}></div>
                      </div>

                       <KrField 
                            style={{width:262}}
                            name="area"
                            component="input"
                            label="职务名称"
                            requireLabel={true}
						/>
                        <KrField
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="input"
                            label="编码"
                            requireLabel={true}
						/>

                         <KrField style={{width:262}} name="enable" component="group" label="是否启用" requireLabel={true}>
 							 <KrField name="enable" label="启用" type="radio" value='1' />
 							 <KrField name="enable" label="不启用" type="radio" value='0' />
 						</KrField>

                         {/*部门和职位*/}
                         <KrField
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="input"
                            label="姓名"
                            requireLabel={true}
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

export default reduxForm({ form: 'AddPostList',validate})(AddPostList);