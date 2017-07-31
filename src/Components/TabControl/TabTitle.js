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
	}
    componentDidMount(){
       
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
            let defaultStyel = index == active ? _this.active : _this.init;
            let style=index == active?_this.acStyle:_this.inStyle
            return (<span key = {index} 
                    onClick = {()=>{
                        this.titleClick(item,index);
                    }}
                    style={style}
                    className={defaultStyel}
                    >
                        {item}
                    </span>)
        })
        return titles;
    }
	render() {
        const {children,justify} = this.props;
        
		return (
            <div>
                 {this.titleRender()}   
            </div>
		);

	}

}