import React from 'react';
import DictionaryConfigs from 'kr/Configs/dictionary';
import {
	KrField,
	CheckTable,
	FdRow,
	Section,
	IconTip,
	TextDic,
	Checkbox,
	AllCheck,
	Button,
	Dialog,
	Toolbars,
	Toolbar
} from 'kr-ui';
import {
	Actions,
	Store,
	connect
} from 'kr/Redux';
import {
	reduxForm,
	change
} from 'redux-form';
import {
	LocationChoice
} from 'kr/PureComponents';
import './index.less';
import Add from './Add';

class EditTable  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			openAdd:false,
		}
	}

	onClick=()=>{
      this.setState({
		openAdd:!this.state.openAdd
	  })
	  Store.dispatch(change('EditTable','countyId',38));
	  Store.dispatch(change('EditTable','businessBegin','10:30'));
	  Store.dispatch(change('EditTable','codeMore',[{label:'123',value:'1',checked:true},{label:'456',value:'2',checked:false}]));
	}
	
	delSwidth=()=>{
		this.onClick();
	}

	delSubmit=(values)=>{

	}
	
	render(){
		
		
		return(

			<div>
<<<<<<< HEAD
			   <form onSubmit={handleSubmit(this.onSubmit)}>
			            <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="name"
                            component="searchAll"
                            label="社区名称"
                            requireLabel={true}
							inline={false}
							url='customerDataAddList'
						/>

						<KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="code"
                            component="searchSelect"
                            label="编码"
                            requireLabel={true}
							inline={false}
							url='customerDataAddList'
						/>


						<KrField 
						  grid={1/2} 
						  label="所属区县" 
						  name="countyId"  
						  style={{width:262,marginLeft:16,position:'relative',zIndex:5}} 
						  component="city" 
						  requireLabel={true}
						  isStore={true}
						/>

						<div onClick={this.openClick}>点击</div>


						{
							mainInfo.map((item,index)=>{

								return <div className='main-form' style={{marginTop:20}}>

									<div className='main-name'>
									<span>主表-</span>
									<span>{item.name}</span>
									<span>({item.tableName})</span>
									</div>


									     <CheckTable
												name ={`config${index}`}
												isFold = {false}
												initFoldNum={1000}
												isSingle={true}
											>

											<FdRow name = "name" label = "字段显示名" />
											<FdRow name = "isHere" label = "是否显示" checkbox={true}/>
											<FdRow name = "isEdit" label = "是否编辑"  checkbox={true}/>
											<FdRow name = "isDelete" label = "是否删除" checkbox={true}/>
										</CheckTable>
								</div>
							})
						}



						<KrField 
							grid={1/2} 
							style={{width:262,marginLeft:28}}  
							name="codeMore" 
							component="moreRadio" 
							label="多选" 
							requireLabel={true}
						 />

						 <KrField 
						   component="selectTime" 
						   label='营业时间' 
						   style={{width:140,zIndex:5,marginLeft:16}} 
						   name='businessBegin' 
						   isStore={true}
						   requireLabel={true}
						 />
						 <KrField 
						   component="selectTime" 
						   label='营业时间' 
						   style={{width:140,zIndex:5,marginLeft:16}} 
						   name='businessBegin' 
						   isStore={true}
						   requireLabel={true}
						 />

						

						

						<Button  label="确定" type="submit"/>
			   </form>

			   <Dialog
						title = "选择工位" 
						onClose={this.openAddCommunity}
						open={this.state.openStation}
						contentStyle ={{ width: '666px',height:'auto'}}
					>
					<LocationChoice 
						communityId = {1} 
						url='stage-detail-search'   
						selectTitle='agreement'   
						onClose = {this.openAddCommunity} 
						onSubmit = {this.onStationSubmit} />
=======
			    <div onClick={this.onClick}>点击</div>
				{/*开通门禁*/}
				<Dialog
					title="删除职务"
					onClose={this.delSwidth}
					open={this.state.openAdd}
					contentStyle ={{ width: '700px',height:'auto'}}
				>
					<Add
						onCancel={this.delSwidth}
						onSubmit={this.delSubmit}
					/>
>>>>>>> cf9054c
				</Dialog>
				<KrField 
					component="address" 
					label='什么鬼' 
					style={{width:140,zIndex:5,marginLeft:16}} 
					name='businessBegin' 
					isStore={true}
					requireLabel={true}
				/>
			</div>
		);
	}
}

export default reduxForm({
	form: 'EditTable'
})(EditTable);
