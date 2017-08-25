import React from 'react';
import {
    TabTitle,
    TabFirst,
    TabProcess,
    TabIcon
} from './Title'
import './index.less'
export default class TabCs extends React.Component {
    constructor(props,context){
		super(props, context);
        this.state = {
            labels : [],
            showIndex:0,
        }
	}
    componentDidMount(){
       
    }
    getLabels = () =>{
        const {children} = this.props;
        let labels = children.map((item,index)=>{
            return item.props.label;
        })
        return labels;
    }
    titleClick = (label,index) =>{
       this.setState({
           showIndex:index,
       })
    }
    tabRender = () =>{
        const {children} = this.props;
        const {showIndex} = this.state;
        let tab = children.map((item,index)=>{
            if(index == showIndex){
                return item;
            }
        })
        return tab;
    }

	render() {
        const {children,isDetail,label} = this.props;
        const {labels} = this.state;
        
		return (
            <div class = "ui-oa-tabs">
                {isDetail=='role'&&<TabTitle
                    labels = {this.getLabels()} 
                    onSubmit = {this.titleClick} 
                />}

                 {isDetail=='detail'&&<TabFirst
                    labels = {this.getLabels()} 
                    onSubmit = {this.titleClick} 
                />}

                {isDetail=='process'&&<TabProcess
                    labels = {this.getLabels()} 
                    onSubmit = {this.titleClick} 
                />}
                {isDetail=='iconTab'&&<TabIcon
                    labels = {this.getLabels()} 
                    label = {label}
                    onSubmit = {this.titleClick} 
                />}
                
                {this.tabRender()}
            </div>
		);

	}

}