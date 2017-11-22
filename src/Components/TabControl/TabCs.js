import React from 'react';
import {
    TabTitle,
    TabFirst,
    TabProcess,
    TabIcon
} from './Title'
import './index.less'
import {
    isArray,
    isObject
} from 'kr/Utils'
export default class TabCs extends React.Component {
    constructor(props,context){
		super(props, context);
        this.state = {
            labels : [],
            showIndex:0,
        }
	}
   
    getLabels = () =>{
        const {children} = this.props;
        var newChildren = this.toArray(children);
        let labels = newChildren.map((item,index)=>{
            
            return item.props.label;
        })
        return labels;
       
       
       
    }
    toArray = (children) =>{
        let newChildren = [];
        if(isObject(children)){
            newChildren.push(children);
        }else if(isArray(children)){
            children.map((item,index)=>{
                if(item){
                    if(isArray(item)){
                        newChildren.push(...item);
                    }else{
                        newChildren.push(item);
                    }
                }
            })
        }
        return newChildren;
    }
    titleClick = (label,index) =>{
       this.setState({
           showIndex:index,
       })
    }
    
    componentWillReceiveProps (nextProps) {
        this.setState({
            showIndex:0,
        })
    }
    
    tabRender = () =>{
        const {children} = this.props;
        var child=[];
        
        var newChildren = this.toArray(children);
        newChildren.map((item,index)=>{
          if(item && item.props){
            child.push(item)
          }else if(item && item[0]){
            item.map((item,index)=>{
              child.push(item)
            })
          }
        })
        const {showIndex} = this.state;
        let tab = child.map((item,index)=>{
            if(index == showIndex){
                return item;
            }
        })
        return tab;
    }

	render() {
        const {children,isDetail,label} = this.props;
        const {labels,showIndex} = this.state;

		return (
            <div className = "ui-oa-tabs">
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
                    active = {showIndex}
                />}
                {this.tabRender()}
            </div>
		);

	}

}
