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

class EditPostType  extends React.Component{

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

			<div className='m-add-post'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>

                       <KrField grid={1/2}
                            style={{width:262,display:'block'}}
                            name="name"
                            component="input"
                            label="职级名称"
                            requireLabel={true}
						/>
                        <KrField grid={1/2}
                            style={{width:262,display:'block'}}
                            name="typeId"
                            component="select"
                            label="职务分类"
                            requireLabel={true}
						/>

                        <KrField grid={1/2}
                            style={{width:262,display:'block'}}
                            name="level"
                            component="input"
                            label="等级"
                            requireLabel={true}
						/>
                         <KrField style={{width:262,display:'block'}} name="enabled" component="group" label="职级状态" requireLabel={true}>
 							 <KrField name="enabled" label="启用" type="radio" value='1' />
 							 <KrField name="enabled" label="停用" type="radio" value='0' />
 						</KrField>

                        <KrField grid={1} label="职级描述" name="descr" heightStyle={{height:"78px",width:'542px'}}  component="textarea"  maxSize={30} placeholder='请输入描述' style={{width:517}} lengthClass='list-len-textarea'/>

                        
                       <Grid style={{marginTop:10,marginBottom:5,marginLeft:-50}}>
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

export default reduxForm({ form: 'EditPostType',validate})(EditPostType);