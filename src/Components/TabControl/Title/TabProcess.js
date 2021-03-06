import React from 'react';
export default class TabProcess extends React.Component {
    constructor(props,context){
		super(props, context);
        this.state = {
           active:0
        }
        this.init ='ui-init-process ui-tab-control';
        this.active ='ui-active-process ui-tab-control';
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
            let defaultStyel = index==active ?_this.active:_this.init;
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
        const {children,justify} = this.props;
		return (
            <div className="u-oa-process-setting"
            >
                 {this.titleRender()}   
            </div>
		);

	}

}