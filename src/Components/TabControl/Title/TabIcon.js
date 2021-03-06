import React from 'react';
import './css/tabIcon.less'
export default class TabIcon extends React.Component {
    constructor(props,context){
		super(props, context);
        this.state = {
           active:0
        }
        this.init ='tabs-icon-init';
        this.active ='tabs-icon-active';
	}
    componentDidMount() {
        
        
    }
    componentWillReceiveProps(nextProps) {
        const {active} = this.state;

        if(nextProps.active != active){
             this.setState({
                active:nextProps.active
            })
       
        }
       
       
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
        var label=[];
        labels.map((item,index)=>{
          if(typeof item == 'object'){
            for(var index in item){
              label.push(item[index]);
            }
          }else{
             label.push(item);
          }
        })
        const {active} = this.state;
        const _this=this;
        let titles = label.map((item,index)=>{
            let defaultStyel = index==active ?_this.active:_this.init;
            return (<span
                        key = {index}
                        onClick = {()=>{
                            this.titleClick(item,index);
                        }}

                        className={defaultStyel}
                        style = {{
                            marginLeft:index==0 ? 0 : 7
                        }}
                    >
                        {item}
                    </span>)
        })

        return titles;
    }
	render() {
        const {children,justify,label} = this.props;
		return (
            <div
                className = "tabs-title-icon"
            >
                 <div className = "icon">{label && label.substring(0,2)}</div>
                 <div className = "content">
                     <div className = "title-text">{label}</div>
                     <div className = "title-content">
                         {this.titleRender()}
                     </div>

                 </div>
            </div>
		);

	}

}
