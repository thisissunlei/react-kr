import React,{Component} from 'react';


import Map from './Map';
import './index.less';

export default class PlanMapAll extends Component{
	
	constructor(props){
		super(props);
        this.map = null;
        this.isInit = false;
	}



    init = (initializeConfigs)=>{

        if(this.isInit){
            return ;
        }
        if(!initializeConfigs || !initializeConfigs.hasOwnProperty('backgroundImageUrl')){
            return;
        }

        this.map = new Map('mapAPP',initializeConfigs);

        this.isInit = true;
    }

   
    componentDidMount(){

       this.init(this.props.initializeConfigs); 
       
    }

    componentWillReceiveProps(nextProps){
         this.init(nextProps.initializeConfigs);
        if(nextProps.fileData){
          this.file(nextProps.fileData);
        }
          //this.sameSize(nextProps.sameSize);
          //this.scaleSize(nextProps.scaleSize);
        
    }
    
    file=(file)=>{
      this.map.setBackgroundImage(file);
    }

    sameSize=(same)=>{
       this.map.setStationToSame(same,function(code,message){
        if(code<0){
        alert('请选择工位');
        document.getElementById("sizeCheckbox").checked=false;
       }
      })
    }

    scaleSize=(scale)=>{
      this.map.setScale(scale);
    }

	render(){  
	   
       return(
            <div id="mapAPP" className='m-map-main'>
              
            </div>
       	)
	}
}













