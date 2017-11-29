import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {mobxForm}  from 'kr/Utils/MobxForm';
import {
	KrField,
	Button,
	Grid,
	Row,
	Col,
  DrawerTitle,
  ButtonGroup
} from 'kr-ui';
import State from './State';
class NewAddCode  extends React.Component{

	constructor(props,context){
		super(props, context);
	}


	componentDidMount(){
		const {$form} = this.props;
		var values = {
					enable:'ENABLE',
		}
		$form.initialize(values);
	}

  onSubmit=(values)=> {
		values.id='';
		values.pid=State.searchParams.pid;
	  const {
		   onSubmit
		} = this.props;
		onSubmit && onSubmit(values);
	}

	onCancel=()=> {
	   const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}


	render(){

    const {handleSubmit}=this.props;

		return(

	  <div className='m-new-code'>
      <form onSubmit={handleSubmit(this.onSubmit)}>
           <div className="title" style={{marginBottom:"30px",marginLeft:'-40px'}}>
          <DrawerTitle title ='新增代码分类' onCancel = {this.onCancel}/>
           </div>
            <KrField type='hidden' name="id"/>
						<KrField type='hidden' name="pid"/>
            <KrField grid={1/2} style={{marginTop:1,width:262}} name="pname" component="labelText"  label="父分类"
            inline={false} value={State.parentName}/>
            <KrField grid={1/2} style={{width:262,marginLeft:28}}  name="codeNo" component="input" label="代码编码" requireLabel={true}/>
            <KrField grid={1/2} style={{width:262}}  name="codeName" component="input" label="代码名称" requireLabel={true}/>
            <KrField grid={1/2} style={{width:262,marginLeft:28}}  name="sort" component="input" label="排序号"  requireLabel={true}/>
            <KrField grid={1/2} name="enable" component="group" label="状态" >
                <KrField name="enable" grid={1/2} label="启用" type="radio" value="ENABLE" />
                <KrField name="enable" grid={1/2} label="未启用" type="radio" value="DISENABLE"/>
            </KrField>

            <Grid style={{marginTop:7,marginBottom:5,marginLeft:-24}}>
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
    let numberNotZero=/^[0-9]*[1-9][0-9]*$/;


    if(!values.codeName){
      errors.codeName='请输入代码名称';
    }

    if(!values.codeNo){
      errors.codeNo='请输入代码编码';
    }

    if(!values.sort){
      errors.sort='请输入排序号';
    }
    //排序号
   if(values.sort&&!numberNotZero.test(values.sort)){
     errors.sort='请输入正整数';
   }

		return errors
}
export default mobxForm({ form: 'NewAddCode',validate})(NewAddCode);
