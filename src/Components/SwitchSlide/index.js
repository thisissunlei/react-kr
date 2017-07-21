import React from 'react';
import './index.less';
export default class SwitchSlide extends React.Component {

	constructor(props, context) {
		super(props, context);
        this.state={
		  leftArr:['w','s','g'],
		  rightArr:[]
		}
    }



	componentDidMount() {
        this.setState({
           leftArr:this.props.leftData 
        })
	}


    leftClick=(index)=>{
       let {control}=this.props;
       let {leftArr,rightArr}=this.state;
       if(control=='single'){
           let leftRemove=leftArr.splice(index,1);
	       var rightOne=rightArr[0]
		   rightArr=[];
		   rightArr.push(leftRemove);
	       leftArr.push(rightOne);
       }else if(control=='double'){
	       let leftRemove=leftArr.splice(index,1);  
	       rightArr.push(leftRemove);
       } 
	   this.setState({
		   leftArr,
		   rightArr
	   })
	}


	rightClick=(index)=>{
	  let {leftArr,rightArr}=this.state;
	  let rightRemove=rightArr.splice(index,1);  
	   leftArr.push(rightRemove);
	   this.setState({
		   leftArr,
		   rightArr
	   })
	}


	render() {

        let {leftArr,rightArr}=this.state;

		return (
			<div>
              <div className='w-left'>
			  	 <ul>
					   {
						 leftArr.map((item,index)=>{
							return <li key={index} onClick={this.leftClick.bind(this,index)}>{item}</li>
						 })  
					   }
				 </ul>
			  </div>
			  <div className='w-right'>

				  <ul>
					   {
						 rightArr.map((item,index)=>{
							return <li key={index} onClick={this.rightClick.bind(this,index)}>{item}</li>
						 })  
					   }
				 </ul>

			  </div>
		    </div>
		);
	}
}


