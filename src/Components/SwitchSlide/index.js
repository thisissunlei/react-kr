import React from 'react';
import './index.less';
export default class SwitchSlide extends React.Component {

	constructor(props, context) {
		super(props, context);
        this.state={
		  //左边的数据
		  leftArr:['w','s','g'],
		  //左边的旧数据
		  leftOldArr:[],
		  //右边的数据
		  rightArr:[],
		  //右边的旧数据
		  rightOldArr:[],
		  //左侧的搜索数据
		  leftChangeValue:'',
		  //右侧的搜索数据
		  rightChangeValue:''
		}
    }



	componentDidMount() {
        this.setState({
           leftArr:this.props.leftData,
		   leftOldArr:this.props.leftData
        })
	}
    
	//点击左单选框
	leftCheckClick=(event,index)=>{
	   let {control}=this.props;
       let {leftArr,rightArr}=this.state;
	   let leftRemove=leftArr[index];
	   var right=rightArr;
	   if(event.target.checked){
	      right=right.concat(leftRemove);
	   }else{
		  right.map((item,index)=>{
			if(item==leftRemove){
				right.splice(index,1);
			}
		  })
	   }
	   this.setState({
		   leftArr,
		   rightArr:right,
		   rightOldArr:right,
		   leftOldArr:leftArr
	   })
	}
    
	//点击左li
	leftLiClick=(event,index)=>{
	   let {control}=this.props;
       let {leftArr,rightArr}=this.state;
       if(control=='single'){
           let leftRemove=leftArr.splice(index,1);
	       var rightOne=rightArr[0]
		   rightArr=[];
		   rightArr.push(leftRemove);
		   if(rightOne){
			 leftArr.concat(rightOne);
		   }     
	    this.setState({
		   leftArr,
		   rightArr,
		   rightOldArr:rightArr,
		   leftOldArr:leftArr
	    })
      }
	}


    //点击右边内容
	rightClick=(index)=>{
	  let {leftArr,rightArr}=this.state;
	  let {control}=this.props;
	  if(control=='single'){
		 let rightRemove=rightArr.splice(index,1);  
	     var left=leftArr.concat(rightRemove);
		 console.log('leftbbb',left,leftArr);
		 this.setState({
		   leftArr:left,
		   rightArr,
		   rightOldArr:rightArr,
		   leftOldArr:left
	    })
	  }else if(control=='double'){
		  rightArr.splice(index,1); 
		  this.setState({
		   rightArr,
		   rightOldArr:rightArr,
	    })
	  }
	}
   
   //左上的搜索
	onLeftChange=(event)=>{
		this.setState({
		   leftChangeValue:event.target.value
		})
	}
    
	//左上的搜索确定
	leftSearchClick=()=>{
	   let {leftChangeValue,leftArr,leftOldArr}=this.state;
	   console.log('left',leftOldArr);
	   var newLeftArr=[];
	   if(!leftChangeValue){
		  newLeftArr=leftOldArr; 
	   }else{
		  leftOldArr.map((item,index)=>{
			if(item.indexOf(leftChangeValue)!=-1){  
				newLeftArr.push(item)
			}
	     })
	   }
	   this.setState({
		  leftArr:newLeftArr 
	   })
	}
    
	//右上的搜索
    onRightChange=(event)=>{
		this.setState({
		   rightChangeValue:event.target.value
		})
	}

	//右上的搜索确定
	rightSearchClick=()=>{
	   let {rightArr,rightChangeValue,rightOldArr}=this.state;

	   var newRightArr=[];
	   if(!rightChangeValue){
		  newRightArr=rightOldArr; 
	   }else{
		  rightOldArr.map((item,index)=>{
			if(item.indexOf(rightChangeValue)!=-1){ 
				 newRightArr.push(item)
			}
	     })
	   }
	   this.setState({
		  rightArr:newRightArr 
	   })
	}


	render() {

        let {leftArr,rightArr}=this.state;

		return (
			<div>
			  <div className='search-top'>
				  <div className='search-left'>
					    <span onClick={this.leftSearchClick}>left</span>
				  		<input type="text" onChange = {this.onLeftChange} className="search-val" />
				  </div>
				  <div className='search-right'>
					    <span onClick={this.rightSearchClick}>right</span>
				  		<input type="text" onChange = {this.onRightChange} className="search-val" />
				  </div>
			  </div>
              <div className='w-left'>
			  	 <ul>
					   {
						 leftArr.map((item,index)=>{
							return <li key={index} onClick={(event) =>{
										 this.leftLiClick(event,index)
									 }}>
								     {this.props.control=='double'&&<input type="checkBox"  onClick={(event) =>{
										 this.leftCheckClick(event,index)
									 }}/>}
									 {item}
							       </li>
						 })  
					   }
				 </ul>
			  </div>
			  <div className='w-right'>

				  <ul>
					   {
						 rightArr.map((item,index)=>{
							return <li key={index} onClick={this.rightClick.bind(this,index)}>
								   <span>{item}</span>
								   <span className='right-close'></span>
								   </li>
						 })  
					   }
				 </ul>
			  </div>
		    </div>
		);
	}
}


