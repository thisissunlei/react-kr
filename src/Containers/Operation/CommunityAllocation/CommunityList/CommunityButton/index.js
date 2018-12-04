import React from 'react';
import './index.less'

export default class CommunityButton extends React.Component {
    constructor(){
        super()
        this.state ={
            selectArr:[
                {value:'Grapefruit',name:"Grapefruit"},
                {value:'lime',name:"lime"},
                {value:'Coconut',name:"Coconut"},
            ],
            radioValue: '1'
        }
    }
    componentDidMount(){
        let {selectArr} = this.state;
   
    }
    getSelect=()=>{
        let {selectArr} = this.state;
        let arr = selectArr.map((i,item)=> {
            return <option value={i.value} key={i.value}>{i.name}</option>
         })
         
         return (<div>
             {
                arr
             }
         </div>)
    }

    handleChange=(event)=>{
        this.setState({radioValue: event.target.value}, ()=> {
            console.log(this.state.radioValue);
        
        });
    }

    render() {
      
        return (
            <div className='community'>
                <div className="community-button-label"><span style={{color:'red',position:'absolute',left:0,top:'5px'}}>*</span>关联项目</div>
                <select className="communitybutton-input" type="text">
                    {this.getSelect()}
                </select>
                <div className="community-button-label"><span style={{color:'red',position:'absolute',left:0,top:'5px'}}>*</span>关联项目数据</div>
                <div className="communitybutton-input">
                    <input type='radio'  type="radio"  value="1" checked={1 == this.state.radioValue} onChange={this.handleChange} />是
                    <input type='radio'  type="radio"  value="2" checked={2 == this.state.radioValue} onChange={this.handleChange} />否
                </div>
            </div>
        )
    }
}