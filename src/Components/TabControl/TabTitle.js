import React from 'react';
import './index.less';
export default class TabTitle extends React.Component {
    constructor(props,context){
		super(props, context);
        this.state = {
           active:0
        }
        this.init =this.props.initClass+' ui-tab-control';
        this.active =this.props.activeClass+' ui-tab-control';
        this.acStyle=this.props.acStyle;
        this.inStyle=this.props.inStyle;
        this.tabsLineWidth = 0;
	}
    componentDidMount(){
        this.tabsLineWidth = this.title.clientWidth
    }
    titleClick = (label,index) =>{
        this.setState({
            active:index
        })
        const {onSubmit} = this.props;
        onSubmit && onSubmit(label,index)
        
    }
    titleRender = () =>{
        const {labels} = this.props;
        const {active} = this.state;
        const _this=this;
        let titles = labels.map((item,index)=>{
            let defaultStyel =  _this.init;
            if(!this.tabsLineWidth){
                defaultStyel = index==0 ?_this.active:_this.init;
            }
            let style = _this.inStyle
            return (<span 
                   
                    key = {index} 
                    onClick = {()=>{
                        this.titleClick(item,index);
                    }}
                   
                    className={defaultStyel}
                    >
                        {item}
                    </span>)
        })
        
        return titles;
    }
	render() {
        const {children,justify,labels} = this.props;
        const {active} = this.state;
        let width = this.tabsLineWidth/labels.length
        let activeStyle = {width:width,left:active*width}
        if(!width){
           activeStyle = {left:active*width}
        }
       
		return (
            <div style = {{position:"relative"}}
             ref = {
                        (ref) =>{
                            this.title = ref;
                        }
                    }
            >
                 {this.titleRender()}   
                 <div className = "ui-oa-tabs-line" style = {activeStyle}></div>
            </div>
		);

	}

}