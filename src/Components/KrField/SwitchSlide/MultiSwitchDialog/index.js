import React from 'react';
import './index.less';
import SliderTree from'../../../SliderTree'
import Button from '../../../Button'
import {Http} from 'kr/Utils'
export default class MultiSwitchDialog extends React.Component{
	constructor(props,context){
		super(props,context)
		this.state = {
			detail:{
				orgName:''
			},
            leftData:this.initData(this.props.leftData ||[],this.props.rightData||[]),
			rightData:this.props.rightData||[],
		}
		this.leftSearch();
	}

	
	onSumit = () =>{
		const {rightData} = this.state;
		let {onSubmit} = this.props;
		onSubmit && onSubmit(rightData[0])
		
	}
	onCancel = () =>{
		 const {onCancel} = this.props;
		 onCancel && onCancel();
	}
	deletList = (index) => {
		let leftData = [].concat(this.state.leftData);
		console.log(leftData,index);
		leftData[index].visable=false;
		this.setState({
			leftData,
		})
	}
	listRender = () =>{
		const {leftData} = this.state;
		
		let rightList  = leftData.map((item,index)=>{
			if(!item.isSearch){
				return null;
			}	
			if(item.visable){
				return <div className = "everyHave">
							{item.label}
							<span className="ui-oa-del" onClick = {this.deletList.bind(this,index)}></span>
					</div>
			}
			
	
		})
		console.log('rightList',rightList);
		return rightList;
		
	}
    

    leftCheckClick = (event, index) =>{

    }
	initData=(data,rightData)=>{
		var param = data.map((item,index)=>{
			//改变这里
			if(item){
				item.visable=false;
			}
			for(var i=0;i<rightData.length;i++){
				if(rightData[i].value==item.value){
					item.visable=true;
				}
			}
			return item;
		})
		return param;
	}
	leftLiClick = (item,index) =>{
		let leftData = [].concat(this.state.leftData);
		console.log(leftData);
		leftData[index].visable = true;		
		this.setState({
			leftData,
		})
		
	}
	leftSearch = (event) =>{
		let searchKey = event?event.target.value :'';
		
		let leftData = [].concat(this.state.leftData);
		let searchData = leftData.map((item,index)=>{
			if(item.label.indexOf(searchKey) !=-1 ){
				item.isSearch = true;
			}else{
				item.isSearch = false;
			}
			return item;
		})
		this.setState({
			leftData : searchData,
		})
	}
	rightSerch = (event) =>{
		let searchKey = event?event.target.value :'';
		
		let rightData = [].concat(this.state.rightData);
		let searchData = rightData.map((item,index)=>{
			if(item.label.indexOf(searchKey) !=-1 ){
				item.isSearch = true;
			}else{
				item.isSearch = false;
			}
			return item;
		})
		this.setState({
			rightData : searchData,
		})
	}

    renderLeft = () =>{
        const {control,leftData} = this.state;
		
		

         let leftArr = leftData.map((item,index)=>{
			if(!item.isSearch){
				return null;
			}
			if(!item.visable){
				return <div
						className = "everyHave" 
                        key={index} 
                        onClick={() =>{
                            this.leftLiClick(item,index)
                        }}
                    >
                            {/*{
                                control=='double'&&
                                <input type="checkBox"  
                                    onClick={(event) =>{
                                        this.leftCheckClick(event,index)
                                    }}
                                />
                            }*/}
                        {item.label}
                    </div>
			}
            
        })  
		return leftArr;
    }
	render(){
       let {isList} = this.state;
		return (
            <div className = "switch-dialog" style = {{position:"relative",textAlign:"center"}}>

				<div className = "tree-content">
					<div className = "content-left">
						<div className = "serch">
							<input type="text" placeholder="请输入关键字搜索" onChange = {this.leftSearch}/>
							<span className = "oa-search-icon search-icon"></span>
						</div>
						<div className = "tree-content-left-right">

                                {this.renderLeft()}
						</div>
					</div>
					<div className = "content-right" >
						<div className = "serch">
							<input type="text" placeholder="请输入关键字搜索" onChange = {this.rightSerch} />
							<span className = "oa-search-icon search-icon"></span>
						</div>
						<div className = "tree-content-left-right">
							{ this.listRender()}
						</div>
					</div>
				</div>
			  <div className = "tree-dialog-bottom" style = {{textAline:"center"}}>
			  		<span className = "botton" style = {{color:'#499DF1'}} onClick = {this.onSumit}>确定</span>
					<span className = "botton" onClick = {this.onCancel} >取消</span>	
			  </div>
        </div>
        )
	 }
 }
