import React from 'react';
import {
	Button
} from 'kr-ui';
import {
	reduxForm,
	change
} from 'redux-form';
import './index.less';
export default class AllCheck  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			other:''
		}
        this.getData=[];
        this.config=this.props.config
	}
    
	componentDidMount() {
		
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.config!=this.props.config){
			this.config=nextProps.config;
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
			  <div onClick={this.deleteFn} className='ui-all-select'>删除</div>	
			  <div onClick={this.addFn} className='ui-all-select'>添加</div>	
			  <div onClick={this.noSameCheck} className='ui-all-select'>反选</div>	
			  <div onClick={this.allCheck} className='ui-all-select'>全选</div>
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

