import React from 'react';
import './index.less';
export default class InputNumber extends React.Component {

	static displayName = 'InputNumber';

	constructor(props){
        super(props);
        this.state={
           other:''
        }
        this.min=props.defaultValue||props.min||1;
        this.max=props.max||100;
        this.num=this.min;
        this.changeData=this.min;
        
    }
    componentWillMount(){
        let {elemKey}=this.props;
        this.toProps(this.num,elemKey);
    }
    
    refresh=()=>{
        this.setState({
            other:+new Date()
        })
    }

    toProps=(data,elemKey)=>{
        const {change}=this.props;
        change && change(data,elemKey);
    }

    minus=()=>{
       if(this.num==this.min){
           return ;
       }
       this.num=!this.num?this.min:parseInt(this.num)-1
       let {elemKey}=this.props;
       this.toProps(this.num,elemKey);
       this.refresh();
    }
    
    add=()=>{
        if(this.num==this.max){
            return ;
        }
        this.num=!this.num?this.min:parseInt(this.num)+1
        let {elemKey}=this.props;
        this.toProps(this.num,elemKey);
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
           this.toProps(this.min,elemKey);
      }else{
           this.num=this.changeData;
           this.toProps(this.num,elemKey);
      }
      this.refresh();
      var _this=this;
      if(_this.num==''){
        setTimeout(function() {     
            _this.num=_this.min;
            _this.toProps(_this.num,elemKey);
            _this.refresh();
        },1000);
      }
    }
    
    
	render() {
        
        let {min,max}=this.props;
        var noMinus=min?(this.num<=min?'no-minus':''):(this.num<=1?'no-minus':'');
        var noAdd=max?(this.num>=max?'no-minus':''):(this.num>=100?'no-minus':'');

		return ( 
            <div className='u-input-number'>
                <div className={`u-number-minus ${noMinus}`} onClick={this.minus}>-</div>
                 <input className='u-number-input' onChange={this.inputChange} value={this.num}/>
                <div className={`u-number-minus num-right  ${noAdd}`} onClick={this.add}>+</div>
            </div>
       );

	}

}
