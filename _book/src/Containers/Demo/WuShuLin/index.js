import React from 'react';
import {reduxForm} from 'redux-form';
import {
	KrField,
} from 'kr-ui';
import './index.less';
class WuShuLin extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state={
			open:false,
	    }


    }



	componentDidMount() {

	}

	liOver=()=>{
      this.setState({
      	 open:true,
      })
	}
	liOut=()=>{
	  this.setState({
      	 open:false
      })
	}




	render() {

		let {open,widthState}=this.state;


        var hour=[];
        var minute=['00','10','20','30','40','50'];
        for(var i=0;i<25;i++){
           if(i<10){
             i='0'+i;
           }
          hour.push(i);
        }

       var progress='20';


		return (
			<div>
               <form>
			       <KrField name="aa" component="selectTime" />
			       	<h1>sdfsdf</h1>

			       <KrField name="bb" component="file" />


			   </form>

              <li className="loading-progress" style={{position:'relative'}}>
                 <span className="progress" style={{width:`${progress}%`,height:'30px',position:'absolute',top:0}}></span>
                 <span style={{display:'block',position:'absolute',top:33}}>{progress}%</span>
              </li>
		</div>


		);
	}
}

export default reduxForm({ form: 'WuShuLin'})(WuShuLin);
