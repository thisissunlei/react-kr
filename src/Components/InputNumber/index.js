import React from 'react';
import './index.less';
export default class InputNumber extends React.Component {

	static displayName = 'InputNumber';

	constructor(props){
        super(props);
        this.state={
            num:parseInt(props.min)||1,
        }
        this.changeData=parseInt(props.min)||1;
    }
    

    minus=()=>{
       let {num}=this.state;
       var min=parseInt(this.props.min)||1;
       if(num==min){
           return ;
       }
       this.setState({
           num:!num&&num!=0?this.changeData-1:num-1,
       })
    }

    add=()=>{
        let {num}=this.state;
        var max=parseInt(this.props.max)||100;
        if(num==max){
            return ;
        }
        this.setState({
            num:!num&&num!=0?this.changeData+1:num+1,
        })
    }

    inputChange=(e)=>{
      var val=e.target.value;
      this.changeData=parseInt(this.props.min)?parseInt(this.props.min):1;
      let {num}=this.state;
      let g=/^-?\d+$/;
      if((!val&&val!=0)||(val&&(g.test(val))||val==0)){
          this.changeData=val?parseInt(val):this.changeData;
          this.setState({
              num:val
          })
      }else{
         var _this=this;
         setTimeout(function() {
            _this.setState({
                num:_this.changeData
            })
         },50); 
      }
    }
    
    
	render() {

        let {min,max}=this.props;
        let {num}=this.state;
        console.log('num-0',num);
        var noMinus=min?(num==min?'no-minus':''):(num==1?'no-minus':'');
        var noAdd=max?(num==max?'no-minus':''):(num==100?'no-minus':'');

		return ( 
            <div className='u-input-number'>
                <div className={`u-number-minus ${noMinus}`} onClick={this.minus}>-</div>
                 <input className='u-number-input' onChange={this.inputChange} value={num}/>
                <div className={`u-number-minus num-right  ${noAdd}`} onClick={this.add}>+</div>
            </div>
       );

	}

}
