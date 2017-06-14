import React, { Component } from 'react';

import './index.less';
import { Map } from 'kr/Utils';
export default class PlanMapAll extends Component {

    constructor(props) {
        super(props);
        this.map = null;
        this.isInit = false;
    }



    init = (initializeConfigs) => {

        const {onRemove,onScaleMap} = this.props;
        if (this.isInit) {
            return;
        }

        if (!initializeConfigs || !initializeConfigs.hasOwnProperty('backgroundImageUrl')) {
            return;
        }
        
        this.map = Map('mapAPP', initializeConfigs);

        this.map.onRemove(onRemove);
        this.map.onScaleMap(onScaleMap);

        this.isInit = true;
    }

    componentWillUnmount(){
        this.isInit = false;
        if (!this.map) {
            return;
        }
        this.map.destory();
    }


    componentDidMount() {
        //this.init(this.props.initializeConfigs);
    }

    setBackgroundImage = (file)=>{
        if (!this.map) {
            return;
        }
        this.map.setBackgroundImage(file);
    }

    setScale = (scale)=>{
        if (!this.map) {
            return;
        }
        this.map.setScale(scale);
    }


    newMap = (initializeConfigs)=>{

        if(this.map){
            this.map.destory();
        }
         this.isInit = false;
         this.init(initializeConfigs);
    }
   


    setStationToSame=(checked,callback)=>{
        if (!this.map) {
            return;
        }
        this.map.setStationToSame(checked,callback);
    }

    createStation = (data) => {
        if (!this.map) {
            return;
        }
        this.map.createStation(data);
    }
    

    save = (callback) => {
        if (!this.map) {
            return;
        }
        this.map.save(function (data) {
            callback && callback(data);
        });
    }

    ready=(callback)=>{
        if (!this.map) {
            return;
        }
        this.map.ready(function (data) {
            callback && callback(data);
        }); 
    }

    onRemove = (callback) => {

        if (!this.map) {
            return;
        }
        this.map.onRemove(function (data,station) {
            callback && callback(data,station);
        });
    }



    render() {

        return (
            <div className='m-map-main'>
                <div className='m-inner-main' id="mapAPP">
                </div>
            </div>
        )
    }
}













