import React from 'react';
import {
	reduxForm,
	change
} from 'redux-form';
import './index.less';
import Button from '../Button';
export default class AllCheck  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			other:''
		}
        this.getData=[];
        this.config=props.config
	}
    
	componentDidMount() {

	}

	componentWillReceiveProps(nextProps){
		if(nextProps.config!=this.props.config){
			this.config=nextProps.config;
		}else{
			this.config=this.props.config;
		}
	}
    
	
	onChange=(event,item,index)=>{
		item.checked=!item.checked;
        this.getData=[];
		this.config.map((item,index)=>{
			 if(item.checked){
				this.getData.push(item);
			 }
        }) 
        this.refreshFn();
        const {onChange}=this.props;
		onChange && onChange(this.getData);
	}
    
    refreshFn=()=>{
        this.setState({
           other:+new Date()
        })
    }
    
    //全选
	allCheck=()=>{
		this.getData=[];
        this.config.map((item,index)=>{
             item.checked=true;
             this.getData.push(item);
		}) 
        this.refreshFn();
        const {allCheck}=this.props;
        allCheck && allCheck(this.getData);
	}
    
    //反选
	noSameCheck=()=>{
		this.getData=[];
		this.config.map((item,index)=>{
             item.checked=!item.checked;
             if(item.checked){
				this.getData.push(item);
			 }
		}) 
        this.refreshFn();
        const {noSameCheck}=this.props;
        noSameCheck && noSameCheck(this.getData);
	}
	
	deleteFn=()=>{
		const {deleteFn}=this.props;
        deleteFn && deleteFn();
	}

	addFn=()=>{
		const {addFn}=this.props;
        addFn && addFn();
	}
    
    
	render(){

     
		return(
           
			<div className='ui-check'>
				<Button  label="添加" type="button" onTouchTap={this.addFn} />
				<span style={{width:20,display:"inline-block"}}></span>
				<Button  label="删除" type="button" cancle={true} onTouchTap={this.deleteFn} />
				<div onClick={this.allCheck} className='ui-all-select' style={{marginLeft:20}}>全选</div>
				<span className='ui-all-select'>/</span>
				<div onClick={this.noSameCheck} className='ui-all-select'>反选</div>	
				<div className='ui-loop'>{
					this.config.map((item,index)=>{
					return <div key={index}>
							<input type="checkbox" 
								onChange={(event)=>{
									this.onChange(event,item,index)
								}}
								checked={item.checked}
								name={`check${index}`}
						/>{item.label}</div>
					})  
				}</div>
			</div>
		);
	}
}

