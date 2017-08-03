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
import DeleteDialog from './DeleteDialog';
import FirstMenu from './FirstMenu';
export default class DealNewThings extends React.Component {

	constructor(props,context){
		super(props, context);
        this.state={
            thingsType:[{"name":"打我的"},{"name":"打你的"},{"name":"打他的"}],
            newThings:[{"name":"打我的","children":[{"name":"打我的"},{"name":"打我的"},{"name":"打我的"}]},{"name":"打你的","children":[{"name":"打我的"},{"name":"打我的"},{"name":"打我的"}]},{"name":"打他的","children":[{"name":"打我的"},{"name":"打我的"},{"name":"打我的"}]}],
            openDelete:false,
        }
	}

  componentDidMount() {
    this.updateData();
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
      <div onClick={()=>{
            this.toLabour(item)
          }} className="item" key={index}>
        <span className={`top-circle class-${imageNum}`} >
          <span>{item.name.substring(0,2)}</span>
        </span>
        <span className="item-text">
          {item.name}
        </span>
        <span className="close" onClick={(event)=>{
            event.stopPropagation();
            this.toDelete(item)
          }}>

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
  //移除部分
  openDelete=()=>{
    this.setState({
      openDelete:!this.state.openDelete,
    })
  }
  toDelete=(item)=>{
      var _this = this;
      // Http.request('get-menu-list', {

      //       },{id:item.id}).then(function(response) {
        //         _this.updateData();
      //       }).catch(function(err) {});
  }
  updateData=()=>{
		    var _this = this;
			// Http.request('process-common', {

      //       },{}).then(function(response) {
      //           _this.setState({thingsType: response.items},function(){
					
      //           })
      //       }).catch(function(err) {});
      // Http.request('process-new-request', {

    //       },{}).then(function(response) {
    //           _this.setState({newThings: response.items},function(){
        
    //           })
    //       }).catch(function(err) {});
    
	}
  render() {
   
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
        <Dialog 
                title="新建机构维度" 
                modal={true} 
                open={this.state.openDelete} 
                onClose={this.openDelete} 
                contentStyle={{
                    width: 374
                }}
        >
                <DeleteDialog onSubmit={this.onDeleteSubmit} onCancel={this.openDelete} />
        </Dialog>
      </div>
    );
  }
}
