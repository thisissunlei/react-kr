import React from 'react';
import './index.less';
import SliderTree from'../../../SliderTree'
import Button from '../../../Button'
import {Http} from 'kr/Utils'
export default class TreeDialog extends React.Component{
	constructor(props,context){
		super(props,context)
		this.state = {
			detail:{
				orgName:''
			},
            letfData:this.props.letfData ||[],
			rightData:this.props.rightData||[],

		
			

		}
		this.leftSearch();
		
	}

	
	onSumit = () =>{
		const {rightData} = this.state;
		let {onSubmit} = this.props;

		console.log(rightData,">>>>>>")
		onSubmit && onSubmit(rightData[0])
		
	}
	onCancel = () =>{
		 const {onCancel} = this.props;
		 onCancel && onCancel();
	}
	deletList = () => {
		let letfData = [].concat(this.state.letfData,this.state.rightData);
		let rightData = [];
		this.setState({
			letfData,
			rightData,
		})
	}
	listRender = () =>{
		const {rightData} = this.state;
		
		let rightList  = rightData.map((item,index)=>{
			if(!item.isSearch){
				return null;
			}	
			return <div className = "everyHave">
					{item.label}
					<span className="ui-oa-del" onClick = {this.deletList}></span>
			  </div>
	
		})
		return rightList;
		
	}
    

    leftCheckClick = (event, index) =>{

    }
	leftLiClick = (item,index) =>{
		let letfData = [].concat(this.state.letfData,this.state.rightData);
		let rightData = letfData.splice(index,1);
		this.setState({
			letfData,
			rightData,
		})
		
	}
	leftSearch = (event) =>{
		let searchKey = event?event.target.value :'';
		
		let letfData = [].concat(this.state.letfData);
		let searchData = letfData.map((item,index)=>{
			if(item.label.indexOf(searchKey) !=-1 ){
				item.isSearch = true;
			}else{
				item.isSearch = false;
			}
			return item;
		})
		this.setState({
			letfData : searchData,
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
        const {control,letfData} = this.state;
		
		

         let leftArr = letfData.map((item,index)=>{
			if(!item.isSearch){
				return null;
			}
            return <div
						className = "everyHave" 
                        key={index} 
                        onClick={() =>{
                            this.leftLiClick(item,index)
                        }}
                    >
                            {
                                control=='double'&&
                                <input type="checkBox"  
                                    onClick={(event) =>{
                                        this.leftCheckClick(event,index)
                                    }}
                                />
                            }
                        {item.label}
                    </div>
        })  
		return leftArr;
    }
	render(){
       let {isList} = this.state;
		return (
            <div className = "tree-dialog" style = {{position:"relative",textAlign:"center"}}>

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
