import React from 'react';
import {
	Button,
  Row,
  Col,
  FdTabel,
	FContent,
	FRow,
} from 'kr-ui';
import {
	Store,
} from 'kr/Redux';
import {
	reduxForm,
	change
} from 'redux-form';
import './index.less';
var tableData = [
	{name:'1liu',age:12,other:'1什么鬼',date:1504108800,select:'true'},
	{name:'2liu',age:13,other:'2什么鬼',date:1504108800,select:'true'},
	{name:'3liu',age:14,other:'3什么鬼',date:1504108800,select:'true'},
	{name:'4liu',age:15,other:'4什么鬼',date:1504108800,select:'false'},
	{name:'5liu',age:16,other:'5什么鬼',date:1504108800,select:'true'},
	]
class TextInfo  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

  componentDidMount() {
 	 Store.dispatch(change('TextInfo','tableData',tableData));
  }

 onSubmit=()=>{

 }

	render(){

    let {handleSubmit}=this.props;

		return(

			<div className='watch-text'>
          <Row style={{marginBottom:11,position:'relative',zIndex:5,marginTop:20}}>

            <Col
              style={{float:'left',marginBottom:20}}
            >
              <Button
                label="新建明细表"
                type='button'
                onTouchTap={this.openAddPersonal}
              />
            </Col>

            <form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:50}}>

              <div className='main-form'>

                  <div className='main-name'>
                   <span>主表-</span>
                   <span>123</span>
                   <span>(456)</span>
                  </div>

                  <div className='add-wrap'>
                    <span className='add-form'></span>
                    <span style={{marginTop:-12,display:'inline-block',verticalAlign:'middle'}}>新增字段</span>
                  </div>

        					<FdTabel
        						name = "tableData"
        						isFold = {false}
                    toolbar={true}
                    batchDel={true}
                    checkbox={true}
        					>
        						<FRow name = "age" label = "字段名称"/>
        						<FRow name = "name" label = "字段显示名"/>
        						<FRow name = "other" label = "表现形式"/>
        						<FRow name = "select" label = "字段类型"/>
        						<FRow label = "操作" type='operation' component={(item)=>{
        							 return <div style={{color:'#499df1',cursor:'pointer'}}>编辑</div>
        						}}/>
        					</FdTabel>
              </div>

    				</form>

        </Row>


			</div>
		);
	}

}

export default reduxForm({
	form: 'TextInfo'
})(TextInfo);
