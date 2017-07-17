import React, {
	Component,
	PropTypes
} from 'react';
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

export default class Home extends React.Component {

	constructor(props,context){
		super(props, context);
    this.state={
      dimension:[{name:'name1'},{name:'name2'},{name:'name3'},{name:'name4'},{name:'name5'},{name:'name6'},{name:'name7'}],
    }
	}

  componentDidMount() {

  }
  renderDimension=(item,index)=>{
    var imageNum = (index+1)%6;
    if (imageNum == 0){
      imageNum = 6;
    }

    var style = {
      'background':'url('+require("./images/b"+imageNum+".svg")+') no-repeat center'
    };
    return (
      <div className="item" key={index} style={style}>
        <span className="item-edit">
          
        </span>
        <span className="item-text">
          {item.name}
        </span>
      </div>
    )
  }
  render() {


    return (
      <div className="g-oa">
        <Section title="机构维度">
        			<div className="main">
                {this.state.dimension.map((item,index)=>{
                  return this.renderDimension(item,index);
                })}
              </div>
        </Section>
      </div>
    );
  }
}
