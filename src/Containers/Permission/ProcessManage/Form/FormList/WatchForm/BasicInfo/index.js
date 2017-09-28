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
class BasicInfo  extends React.Component{

	constructor(props,context){
		super(props, context);

  }
  

  componentDidMount(){
    let {basicInfo}=this.props;
    Store.dispatch(change('BasicInfo','tableDataf',basicInfo.records));
  }

  componentWillReceiveProps(nextProps){
    Store.dispatch(change('BasicInfo','tableDataf',nextProps.basicInfo.records));
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

    let {handleSubmit,basicInfo}=this.props;

		return(

			<div className='basic-form'>
        <div>
  				 <KrField component="labelText" grid={1/2} label="表单名称" value={basicInfo.name} defaultValue="无" inline={false}/>
           <KrField component="labelText" grid={1/2} label="表单表名" value={basicInfo.tableName} defaultValue="无" inline={false}/>
           <KrField component="labelText" grid={1/2} label="表单类型" value={basicInfo.typeName} defaultValue="无" inline={false}/>
           <KrField component="labelText" grid={1/2} label="表单分类" value={basicInfo.purposeStr} defaultValue="无" inline={false}/>
           <KrField component="labelText" grid={1} label="是否启用" value={basicInfo.enabledStr} defaultValue="无" inline={false}/>
           <KrField component="labelText" grid={1} label="描述" value={basicInfo.descr} defaultValue="无" inline={false}/>
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
						name = "tableDataf"
						isFold = {true}
		 				initFoldNum = "10"
					>
						<FRow name = "importName" label = "引用位置" />
						<FRow type='date' name='lastUseTime' label='最近一次使用时间' format="yyyy-mm-dd hh:MM:ss" />

					</FdTabel>

				</form>


      </div>
		);
	}

}

export default reduxForm({
	form: 'BasicInfo'
})(BasicInfo);
