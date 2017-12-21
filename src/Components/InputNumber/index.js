import React from 'react';
import './index.less';
export default class InputNumber extends React.Component {

	static displayName = 'InputNumber';

	constructor(props){
        super(props);
        this.state={
           other:''
        }
        this.min=props.min||1;
        this.max=props.max||100;
        this.num=this.min;
        this.changeData=this.min;
        
    }
    
    refresh=()=>{
        this.setState({
            other:+new Date()
        })
    }

    toProps=(data)=>{
        const {change}=this.props;
        change && change(data);
    }

    minus=()=>{
       if(this.num==this.min){
           return ;
       }
       this.num=!this.num?this.min:parseInt(this.num)-1
       this.toProps(this.num);
       this.refresh();
    }
    
    add=()=>{
        if(this.num==this.max){
            return ;
        }
        this.num=!this.num?this.min:parseInt(this.num)+1
        this.toProps(this.num);
        this.refresh();
    }

    inputChange=(e)=>{
      var val=e.target.value;
      let g=/^-?\d+$/;
      if((!val&&val!=0)||(val&&(g.test(val))||val==0)){
           this.changeData=val?parseInt(val):this.changeData;
           this.num=val!=''?(val>=this.max?this.max:val||val<=this.min?this.min:val):'';
           this.toProps(this.num);
      }else{
           this.num=this.changeData;
           this.toProps(this.num);
      }
      this.refresh();
      if(!this.num){
        var _this=this;
        setTimeout(function() {
            _this.num=_this.min;
            _this.toProps(this.num);
            _this.refresh();
        },30);
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
