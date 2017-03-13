import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';

import {
	Section,
	PlanMap,
	Dialog,
	Button,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'kr-ui';

export default class ZhangQu extends Component {

	constructor(props, context) {
		super(props, context);
		this.state={
			open:false,
			openArray:[
         
        {
            "cityName":"测试内容6",
            "code":"",
            "openDate":"2017-02-20",
            "opened":true,
            "orderNum":38141,
        },
        {
            "cityName":"测试内容7",
            "code":"",
            "openDate":"2017-02-20",
            "opened":true,
            "orderNum":38141,
        },

        ],
        oldArry:[
        {
            "cityName":"测试内容6",
            "code":"",
            "openDate":"2017-02-20",
            "opened":true,
            "orderNum":38141,
        },
        {
            "cityName":"测试内容7",
            "code":"",
            "openDate":"2017-02-20",
            "opened":true,
            "orderNum":38141,
        },

         ]
		}

	}

	componentWillMount(){
	  let {openArray}=this.state;		
        if(openArray&&openArray.length>5){
            this.setState({
            	openArray:openArray.slice(0,5),
            	open:true
            })    	
        }else{
        	this.setState({
        		open:false
        	})
        }     	
	}

    componentWillReceiveProps(){
    	let {openArray}=this.state;
       if(openArray&&openArray.length>5){
            this.setState({
            	openArray:openArray.slice(0,5),
            	open:true
            })    	
        }else{
        	this.setState({
        		open:false
        	})
        }     	        
    }

	addClick=()=>{
      let {oldArry,openArray}=this.state;
	   this.setState({
	  	 openArray:oldArry
	    })
	}

	minusClick=()=>{
      let {oldArry,openArray}=this.state;
	   this.setState({
	  	 openArray:oldArry.slice(0,5)
	    })
	}
   

    addRender=()=>{
    	    var _this=this;
            let add='';
             add=(<div onClick={_this.addClick}>X</div>)
            return add
        }

    minusRender=()=>{
    	 var _this=this;
            let minus='';
             minus=(<div onClick={_this.minusClick}>-</div>)
            return minus
    }


	render() {

		let {openArray,open}=this.state;
		 
 
		return (
			<div style={{marginTop:'100px'}}>
			 {open&&this.addRender()}
			 {open&&this.minusRender()}
			  <Table displayCheckbox={false} >
							<TableHeader>
									<TableHeaderColumn>类别</TableHeaderColumn>
									<TableHeaderColumn>编号／名称</TableHeaderColumn>
									<TableHeaderColumn>单价（元／月）</TableHeaderColumn>
									<TableHeaderColumn>起始日期</TableHeaderColumn>
									<TableHeaderColumn>结束日期</TableHeaderColumn>
							</TableHeader>
							<TableBody>

							{

								openArray&& openArray.map((item,index)=>{


								return (
									<TableRow key={index}>
										<TableRowColumn>{item.cityName}</TableRowColumn>
										<TableRowColumn>{item.code}</TableRowColumn>
										<TableRowColumn>{item.openDate}</TableRowColumn>
										<TableRowColumn>{item.opened}</TableRowColumn>
										<TableRowColumn>{item.orderNum}</TableRowColumn>
									</TableRow>
								);
								})
							}

							</TableBody>
						</Table>
			  

			</div>

		);
	}
}
