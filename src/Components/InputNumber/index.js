import React from 'react';
import './index.less';
export default class InputNumber extends React.Component {

	static displayName = 'InputNumber';

	constructor(props){
        super(props);
        this.state={
            num:props.min||1,
            noMinus:'',
            noAdd:'',
        }
        this.changeData=''
    }


    minus=()=>{
       let {num}=this.state;
       var min=this.props.min||1;
       if(num==min){
           this.setState({
             noMinus:'no-minus'
           })
           return ;
       }
       this.setState({
           num:!num?this.changeData-1:num-1,
           noMinus:''
       })
    }

    add=()=>{
        let {num}=this.state;
        var max=this.props.max||100;
        if(num==max){
            this.setState({
                noAdd:'no-minus'
            })
            return ;
        }
        this.setState({
            num:!num?this.changeData+1:num+1,
            noAdd:''
        })
    }

    inputChange=(e)=>{
      let {num}=this.state;
      this.changeData=num;
      let g=/^-?\d+$/; 
      if(!e.target.value||e.target.value&&(g.test(e.target.value))){
        this.setState({
            num:e.target.value
        })
      }else{
        this.setState({
            num:this.props.min||1
        })
      }
    }

    
    
	render() {

        let {min,max}=this.props;
        let {num,noMinus,noAdd}=this.state;
       

		return ( 
            <div className='u-input-number'>
                <div className={`u-number-minus ${noMinus}`} onClick={this.minus}>-</div>
                 <input className='u-number-input' onChange={this.inputChange} value={num} onblur={this.onBlur}/>
                <div className={`u-number-minus num-right  ${noAdd}`} onClick={this.add}>+</div>
            </div>
       );

	}

}
