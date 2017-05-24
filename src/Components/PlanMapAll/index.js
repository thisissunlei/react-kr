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
            return ;
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

          this.stationCanvas(nextProps.stationObj);
          this.sameSize(nextProps.sameSize,nextProps.floorChange);
          this.scaleSize(nextProps.scaleSize);
          this.deleteStation();
          this.save();
         
    }
    
    file=(file)=>{
      this.map.setBackgroundImage(file);
    }

    sameSize=(same,change)=>{
      if(!this.map){
          return ;
      }
       this.map.setStationToSame(same,function(code,message){
        if(code<0&&change){
        alert('请选择工位');
        document.getElementById("sizeCheckbox").checked=false;
       }
      })
    }

    scaleSize=(scale)=>{
      if(!this.map){
          return ;
      }
      this.map.setScale(scale);
    }

   stationCanvas=(data)=>{
      if(!this.map){
          return ;
      }
      this.map.createStation(data);
   }

   save=()=>{
       const {
			save
		} = this.props;
       if(!this.map){
           return ;
       }
       this.map.save(function(data){
         save && save(data);
       })
   }
   
  deleteStation=()=>{
     const {
			onRemove
		} = this.props;
       if(!this.map){
           return ;
       }
       this.map.onRemove(function(data){
         onRemove && onRemove(data);
      }) 
  }


	render(){  
	   
       return(
            <div className='m-map-main'>
                <div className='m-inner-main' id="mapAPP">
                </div>
            </div>
       	)
	}
 }













