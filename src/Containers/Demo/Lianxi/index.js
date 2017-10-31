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
	Dialog
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

class EditTable  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			openStation:false
		}
	}

	onSubmit=(values)=>{
       console.log('values',values);
	}
  
	
	componentDidMount() {
		Store.dispatch(change('EditTable','config',[{name:'123',isHere:false,isEdit:false,isDelete:false},{name:'1234',isHere:false,isEdit:false,isDelete:false}]));
	}

	 //所属区县
	 cityValue=(communityId,cityId,city)=>{
		console.log('id',communityId,'co',cityId,'city',city);
	  }
	 
	  openClick=()=>{
		this.setState({
			openStation:!this.state.openStation
		})
	  }

	  openAddCommunity=()=>{
		  this.openClick();
	  }
    
	render(){
		
		let {handleSubmit}=this.props;

		let cityData='河北省／邢台市／任县';
		
		return(

			<div>
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
                            component="searchAll"
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
						  onSubmit={this.cityValue} 
						  requireLabel={true}
						  cityName={cityData}
						/>

						<div onClick={this.openClick}>点击</div>


						<CheckTable
								name ='config'
								isFold = {false}
								initFoldNum={1000}
								isSingle={true}
							>
								<FdRow name = "name" label = "字段显示名" />
								<FdRow name = "isHere" label = "是否显示" checkbox={true}/>
								<FdRow name = "isEdit" label = "是否编辑"  checkbox={true}/>
								<FdRow name = "isDelete" label = "是否删除" checkbox={true}/>
						</CheckTable>

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
				</Dialog>
			</div>
		);
	}
}

export default reduxForm({
	form: 'EditTable'
})(EditTable);
