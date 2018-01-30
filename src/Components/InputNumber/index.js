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

    //增减事件
    plusAndMinus=(type,compare)=>{
        let {elemKey}=this.props;
        if(this.num==compare){
            return ;
        }
        this.num=(!this.num&&this.num!=0)?this.min:(type=='minus'?parseInt(this.num)-1:parseInt(this.num)+1)
        this.outTransfer(this.num,elemKey);
        this.refresh();
    }


    inputChange=(e)=>{
      let {elemKey}=this.props;
      var val=e.target.value;
      let digital=/^-?\d+$/;
      if(!val||(val&&(digital.test(Number(val))))||val=='-'){
           if(val!=''&&val!='-'){
               if(Number(val)>=this.max){
                 this.num=this.max
               }else if(Number(val)<=this.min){
                 this.num=this.min
               }else{
                 this.num=Number(val)
               } 
           }else{
               this.num=val;
           } 
           this.changeData=(val!=''&&val!='-')?this.num:this.changeData;  
      }else{
           this.num=this.changeData; 
      }
      this.outTransfer(this.num,elemKey);
      this.refresh();
    }
    
    inputBlur=()=>{
        let {elemKey}=this.props;
        if(!this.num||this.num=='-'){
            this.num=this.changeData;   
            this.outTransfer(this.changeData,elemKey);
            this.refresh();
        }
    }
    
    
	render() {

        let {height,inputWidth,label}=this.props;

        var noMinus=this.num<=this.min?'no-minus':'';
        var noAdd=this.num>=this.max?'no-minus':'';

		return ( 
            <div className='u-input-number' style={height?{height:height,lineHeight:height-2+'px'}:{}}>
                <div className={`u-number-minus ${noMinus}`} onClick={(event)=>{
                    this.plusAndMinus('minus',this.min)
                }}>-</div>
                <input className='u-number-input' style={inputWidth?{width:inputWidth}:{}} onChange={this.inputChange} value={this.num} onBlur={this.inputBlur}/>
                <div className={`u-number-minus num-right  ${noAdd}`} onClick={(event)=>{
                    this.plusAndMinus('plus',this.max)
                }}>+</div>
                
                {label&&<span style={{paddingLeft:10}}>{label}</span>}
            </div>
       );

	}

}
