import React from 'react';
import {
	Button,
  Row,
  Col,
  FdTabel,
	FContent,
	FRow,
	Toolbar,
	Toolbars,
	Dialog
} from 'kr-ui';
import {
	Store,
} from 'kr/Redux';
import {
	reduxForm,
	change
} from 'redux-form';
import AddDetail from './AddDetail';
import EditDetail from './EditDetail';
import DeleForm from './DeleForm';
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
		this.state={
			openAddDetail:false,
			openEditDetail:false,
			openDelForm:false
		}
	}

  componentDidMount() {
 	 Store.dispatch(change('TextInfo','tableData',tableData));
  }

 onSubmit=()=>{

 }

//新增明细
 openAddDetail=()=>{
    this.setState({
			openAddDetail:!this.state.openAddDetail
		})
 }

 //编辑明细
 openEditDetail=()=>{
	 this.setState({
		openEditDetail:!this.state.openEditDetail
	})
 }

//删除明细表
 deleForm=()=>{
  this.setState({
		openDelForm:!this.state.openDelForm
	})
 }


 addText=()=>{

 }

	render(){

    let {handleSubmit}=this.props;

		return(

			<div className='watch-text'>
          <Row style={{marginBottom:11,position:'relative',zIndex:5,marginTop:20}}>

            <Col
              style={{float:'left'}}
            >
              <Button
                label="新建明细表"
                type='button'
                onTouchTap={this.openAddDetail}
              />
            </Col>

					</Row>

            <form onSubmit={handleSubmit(this.onSubmit)}>

              <div className='main-form' style={{marginTop:20}}>

                  <div className='main-name'>
                   <span>主表-</span>
                   <span>123</span>
                   <span>(456)</span>
                  </div>


											<FdTabel
		        						name = "tableData"
		        						isFold = {false}
		                    toolbar={true}
		                    batchDel={true}
		                    checkbox={true}
		        					>

											<Toolbars>
														<Toolbar label='新增字段' rightSpac='14px' iconClass='add-text' iconClick={this.addText} />	
											</Toolbars>

		        						<FRow name = "age" label = "字段名称"/>
		        						<FRow name = "name" label = "字段显示名"/>
		        						<FRow name = "other" label = "表现形式"/>
		        						<FRow name = "select" label = "字段类型"/>
		        						<FRow label = "操作" type='operation' component={(item)=>{
		        							 return <div style={{color:'#499df1',cursor:'pointer'}}>编辑</div>
		        						}}/>
		        					</FdTabel>
                </div>


								<div className='main-form detail-form' style={{marginTop:20}}>

	                  <div className='main-name'>
	                   <span>明细表-</span>
	                   <span>123</span>
	                   <span>(456)</span>
	                  </div>

												
												<FdTabel
			        						name = "tableData"
			        						isFold = {false}
			                    toolbar={true}
			                    batchDel={true}
			                    checkbox={true}
			        					>	
													<Toolbars>
														<Toolbar label='编辑' rightSpac='14px' iconClass='edit-form' iconClick={this.openEditDetail} />
														<Toolbar label='删除明细表' rightSpac='14px' iconClass='del-form' iconClick={this.deleForm} />
														<Toolbar label='新增字段' rightSpac='14px' iconClass='add-text' iconClick={this.addText} />	
													</Toolbars>
													
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

						   {/*新建明细表*/}
			          <Dialog
			          title="新建明细表单"
			          onClose={this.openAddDetail}
			          open={this.state.openAddDetail}
			          contentStyle ={{ width: '666px',height:'auto'}}
			          >
			            <AddDetail
			                onCancel={this.openAddDetail}
			                onSubmit={this.onSearchUpperSubmit}
			            />
			        </Dialog>

							{/*编辑明细表*/}
							 <Dialog
							 title="编辑明细表单"
							 onClose={this.openEditDetail}
							 open={this.state.openEditDetail}
							 contentStyle ={{ width: '666px',height:'auto'}}
							 >
								 <EditDetail
										 onCancel={this.openEditDetail}
										 onSubmit={this.onSearchUpperSubmit}
								 />
						 </Dialog>

						 {/*删除明细表*/}
							<Dialog
							title="提示"
							onClose={this.deleForm}
							open={this.state.openDelForm}
							contentStyle ={{ width: '446px',height:'auto'}}
							>
								<DeleForm
										onCancel={this.deleForm}
										onSubmit={this.onSearchUpperSubmit}
								/>
						</Dialog>

			</div>
		);
	}

}

export default reduxForm({
	form: 'TextInfo'
})(TextInfo);
