import React from 'react';
import {
	KrField,
	Button,
	Section,
	Grid,
	Row,
	Col,
	ListGroupItem,
	ListGroup,
	Dialog,
	SearchForms,
	KrDate,
	Drawer,
	Message
} from 'kr-ui';
import {
	Http
} from "kr/Utils";
import './index.less';
import FirstMenu from './FirstMenu';
export default class DealNewThings extends React.Component {

	constructor(props,context){
		super(props, context);
        this.state={
            thingsType:[{"name":"打我的"},{"name":"打你的"},{"name":"打他的"}],
            newThings:[{"name":"打我的","children":[{"name":"打我的"},{"name":"打我的"},{"name":"打我的"}]},{"name":"打你的","children":[{"name":"打我的"},{"name":"打我的"},{"name":"打我的"}]},{"name":"打他的","children":[{"name":"打我的"},{"name":"打我的"},{"name":"打我的"}]}],
        }
	}

  componentDidMount() {
    //this.updateData();
    //this.renderAddWhite();
  }
  //渲染色块
  renderThingsType=(item,index)=>{
    var imageNum = (index+1)%7;
    if (imageNum == 0){
      imageNum = 7;
    }
    // var style = {
    //   'background':'url('+require("./images/b"+imageNum+".svg")+') no-repeat center'
    // };
    return (
      <div onClick={() =>{
          this.toLabour(item)
        }} className="item" key={index}>
        <span className={`top-circle class-${imageNum}`} >
          <span>{item.name.substring(0,2)}</span>
        </span>
        <span className="item-text">
          {item.name}
        </span>
        <span className="close">

        </span>
      </div>
    )
  }
  renderNewThings=(item,index)=>{
    return (
        <FirstMenu key={index} detail={item} onSubmit={this.updateData}/>
    )
  }
  toLabour=(item)=>{

  }
  render() {
    //console.log(this.state.addLastLineDimArr);
   
    return (
      <div className="g-deal-newthings">
        <Section borderBool={false} title="我的常用">
            <div className="first-main">
                {this.state.thingsType.map((item,index)=>{
                    return this.renderThingsType(item,index)
                })}
            </div>
            
        </Section>
        <Section borderBool={false} title="新办事宜">
            <div className="second-main">
                {this.state.newThings.map((item,index)=>{
                    return this.renderNewThings(item,index)
                })}
            </div>
        </Section>
      </div>
    );
  }
}
