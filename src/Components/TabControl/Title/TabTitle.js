import React from 'react';
export default class TabTitle extends React.Component {
    constructor(props,context){
		super(props, context);
        this.state = {
           active:0
        }
        this.init ='ui-line-init ui-tab-control';
        this.active ='ui-line-active ui-tab-control';
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
        let width=(1/labels.length)*100;
        let titles = labels.map((item,index)=>{
            let defaultStyel =  _this.init;
            if(!this.tabsLineWidth){
                defaultStyel = index==0 ?_this.active:_this.init;
            }
            if(item.readOnly){
                return (
                    <span
                      key = {index} 
                      style={index==active?
                        {color:'#499df1',fontSize:'16px',width:width+'%'}:
                        {color:'#ccc',fontSize:'16px',width:width+'%'}}
                        className={defaultStyel}
                    >
                        {item.label}
                    </span>
                )
            }
                return (<span 
                    
                        key = {index} 
                        onClick = {()=>{
                            this.titleClick(item,index);
                        }}
                        style={index==active?
                        {color:'#499df1',fontSize:'16px',width:width+'%'}:
                        {color:'#666',fontSize:'16px',width:width+'%'}}
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