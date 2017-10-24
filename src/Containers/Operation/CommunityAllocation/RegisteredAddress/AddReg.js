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
import './index.less';

class AddReg  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

    componentDidMount(){
        
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

			<div className='m-reg-add'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
                      <div className="title" style={{marginBottom:"30px"}}>
                            <div style={{marginLeft:-40}}><span className="new-icon-add"></span><label className="title-text">新建注册地址</label></div>
                            <div className="person-close" onClick={this.onCancel}></div>
                      </div>

                       <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="name"
                            component="select"
                            label="社区名称"
                            requireLabel={true}
                            options={[{label:'123',value:'1'},{label:'456',value:'2'}]}
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginLeft:29,marginBottom:5}}
                            name="num"
                            component="input"
                            label="数量"
                            requireLabel={true}
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="status"
                            component="select"
                            label="状态"
                            requireLabel={true}    
                            options={[{label:'可以',value:'true'},{label:'不可以',value:'false'}]}
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginLeft:29,marginBottom:5}}
                            name="style"
                            component="select"
                            label="编号方式"
                            requireLabel={true}
                            options={[{label:'1',value:'1'},{label:'2',value:'2'}]}
						/>

                        <KrField grid={1} label="地址模版" name="desc" heightStyle={{height:"78px",width:'544px'}} style={{width:552}} component="textarea"  maxSize={100} placeholder='请输入地址模版'  lengthClass='reg-len-textarea'/>


                       <Grid style={{marginBottom:5,marginLeft:-42}}>
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

export default reduxForm({ form: 'AddReg',validate})(AddReg);