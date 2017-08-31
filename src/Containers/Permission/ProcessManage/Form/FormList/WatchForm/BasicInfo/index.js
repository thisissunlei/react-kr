import React from 'react';
import {
  KrField,
  Button,
  FdTabel,
	FContent,
	FRow,
} from 'kr-ui';
import {
	Store
} from 'kr/Redux';
import {
	reduxForm,
	change
} from 'redux-form';
import './index.less';
var tableData = [
	{name:'1liu',age:12,date:1504160863},
	{name:'2liu',age:13,date:1504160863},
	{name:'3liu',age:14,date:1504160863},
	{name:'4liu',age:15,date:1504160863},
	{name:'5liu',age:16,date:1504160863},
	]
class BasicInfo  extends React.Component{

	constructor(props,context){
		super(props, context);

	}

  componentDidMount(){
    Store.dispatch(change('BasicInfo','tableData',tableData));
  }

  onSubmit=()=>{

  }

  editOpen=()=>{
    const {editOpen}=this.props;
    editOpen && editOpen();
  }

  allClose=()=>{
    const {allClose}=this.props;
    allClose && allClose();
  }

	render(){

    let {handleSubmit}=this.props;

		return(

			<div className='basic-form'>
        <div>
  				 <KrField component="labelText" grid={1/2} label="表单名称" value='123' defaultValue="无" inline={false}/>
           <KrField component="labelText" grid={1/2} label="表单表名" value='123' defaultValue="无" inline={false}/>
           <KrField component="labelText" grid={1/2} label="表单类型" value='123' defaultValue="无" inline={false}/>
           <KrField component="labelText" grid={1/2} label="表单分类" value='123' defaultValue="无" inline={false}/>
           <KrField component="labelText" grid={1} label="是否启用" value='123' defaultValue="无" inline={false}/>
           <KrField component="labelText" grid={1} label="描述" value='123' defaultValue="无" inline={false}/>
        </div>

        <div className='edit-btn'>
          <Button
              label="编辑"
              type='button'
              onTouchTap={this.editOpen}
          />
        </div>

        <div className='pic-mask'>
          <span className='pic-mask-first'></span>
          <span>引用记录</span>
          <span className='pic-mask-last'></span>
        </div>

        <form onSubmit={handleSubmit(this.onSubmit)} style={{width:544,marginTop:16,marginLeft:-20}}>
					<FdTabel
						name = "tableData"
						isFold = {true}
		 				initFoldNum = "10"
					>
						<FRow name = "age" label = "引用表单" />
						<FRow name = "name" label = "引用位置" />
						<FRow type='date' name='date' label='最近一次使用时间' format="yyyy-mm-dd hh:MM:ss" />

					</FdTabel>

				</form>


      </div>
		);
	}

}

export default reduxForm({
	form: 'BasicInfo'
})(BasicInfo);
