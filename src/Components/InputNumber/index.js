import React from 'react';
import './index.less';
export default class InputNumber extends React.Component {

	static displayName = 'InputNumber';

	constructor(props){
        super(props);
        this.state={
           other:''
        }
        this.min=props.defaultMin||props.min||1;
        this.max=props.defaultMax||props.max||100;
        this.num=this.min;
        this.changeData=this.min;
        
    }
    componentWillMount(){
        let {elemKey}=this.props;
        this.outTransfer(this.num,elemKey);
    }
    
    //刷新
    refresh=()=>{
        this.setState({
            other:+new Date()
        })
    }
    
    //向外传递
    outTransfer=(data,elemKey)=>{
        const {change}=this.props;
        change && change(data,elemKey);
    }

    minus=()=>{
       if(this.num==this.min){
           return ;
       }
       this.num=!this.num?this.min:parseInt(this.num)-1
       let {elemKey}=this.props;
       this.outTransfer(this.num,elemKey);
       this.refresh();
    }
    
    add=()=>{
        if(this.num==this.max){
            return ;
        }
        this.num=!this.num?this.min:parseInt(this.num)+1
        let {elemKey}=this.props;
        this.outTransfer(this.num,elemKey);
        this.refresh();
    }

    inputChange=(e)=>{
      let {elemKey}=this.props;
      var val=e.target.value;
      let g=/^-?\d+$/;
      if((!val&&val!=0)||(val&&(g.test(val))||val==0)){
           this.changeData=val?parseInt(val):this.changeData;
           if(val!=''){
               if(val>=this.max){
                 this.num=this.max
               }else if(val<=this.min){
                 this.num=this.min
               }else{
                 this.num=val
               }  
           }else{
               this.num='';
           }  
      }else{
           this.num=this.changeData;   
      }
      this.outTransfer(this.num,elemKey);
      this.refresh();
    }
    
    inputBlur=()=>{
        let {elemKey}=this.props;
        if(this.num==''){
            this.num=this.changeData;   
            this.outTransfer(this.changeData,elemKey);
            this.refresh();
        }
    }
    
    
	render() {
        
        let {min,max}=this.props;
        var noMinus=min?(this.num<=min?'no-minus':''):(this.num<=1?'no-minus':'');
        var noAdd=max?(this.num>=max?'no-minus':''):(this.num>=100?'no-minus':'');

		return ( 
            <div className='u-input-number'>
                <div className={`u-number-minus ${noMinus}`} onClick={this.minus}>-</div>
                 <input className='u-number-input' onChange={this.inputChange} value={this.num} onBlur={this.inputBlur}/>
                <div className={`u-number-minus num-right  ${noAdd}`} onClick={this.add}>+</div>
            </div>
       );

	}

}
