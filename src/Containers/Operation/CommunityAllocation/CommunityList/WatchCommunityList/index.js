import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {
	toJS
} from 'mobx';
import {reduxForm,formValueSelector,initialize,change,FieldArray} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	observer,
	mobx
} from 'mobx-react';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
	Message,
	ListGroup,
	ListGroupItem
} from 'kr-ui';
import './index.less';
import State from '../State';
@observer
 class WatchCommunityList extends Component{

	static PropTypes = {
		
	}

	constructor(props){
		super(props);
		this.state={
			openDown:true,
            openUp:false,
		}
	}
	onSubmit = (values) => {	
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
    }

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
   
 
 

	
	componentDidMount(){
      
	}

	componentWillReceiveProps(nextProps) {
		
	}
    
    
    
    //展开
    flagOpen=()=>{
      this.setState({
      	openDown:false,
        openUp:true,
      })
    }

    flagDown=()=>{
      this.setState({
      	openDown:true,
        openUp:false,
      })
    }
   

	render(){
       


         
       let {openDown,openUp}=this.state;

		const { error, handleSubmit, pristine, reset,dataReady,open} = this.props;

		return (
           <div className='m-newMerchants communityList-m' style={{paddingLeft:9}}>
				<div className="title">
						<div><span className="new-icon list-icon"></span><label className="title-text">社区详情</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>
				<div className="cheek">
							<div className="titleBar"><span className="order-number">1</span><span className="wire"></span><label className="small-title">基本信息</label></div>
							<div className="small-cheek">
									<KrField grid={1/2} label="社区名称"  component="labelText" style={{width:262,marginLeft:15}} inline={false} value={toJS(State.detailData.name)}/>

                                    <KrField grid={1/2} label="社区编码"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={toJS(State.detailData.code)}/>

                                    <KrField grid={1/2} label="社区面积"  style={{width:262,marginLeft:15}} inline={false} component="labelText" value={toJS(State.detailData.area)}></KrField>
                                    
                                    <KrField  grid={1/2}  style={{width:262,marginLeft:28}} component='labelText'  label="所属商圈" inline={false} value={toJS(State.detailData.businessAreaId)}
                                    />
                                    
                                    <KrField grid={1/2} label="所属区县"   style={{width:262,marginLeft:15}} component="labelText" inline={false} value={toJS(State.detailData.area)}/>
									
									<KrField grid={1/2} label="详细地址"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={toJS(State.detailData.area)}/>
									
								   	<KrField grid={1/2} label="社区坐标" component="labelText" style={{width:262,marginLeft:15}}  inline={false} value={toJS(State.detailData.area)}>			 
									</KrField>

                     
									<KrField grid={1/2} label="大厦名称"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={toJS(State.detailData.area)}/>
									<KrField grid={1/2} label="装修情况"  style={{width:262,marginLeft:15}} component="labelText" inline={false} value={toJS(State.detailData.area)}
									/>
									<KrField  grid={1/2}  style={{width:262,marginLeft:28}} component='labelText'  label="社区朝向" inline={false} value={toJS(State.detailData.area)}
									/>

									<KrField grid={1/2} label="标准层高" style={{width:262,marginLeft:15}} component="labelText" inline={false} value={toJS(State.detailData.area)}></KrField>
									<KrField grid={1/2} label="社区入口" style={{width:262,marginLeft:28}} component="labelText" inline={false} value={toJS(State.detailData.area)}></KrField>

									<KrField grid={1/2} label="客梯数量"  style={{width:262,marginLeft:15}} component="labelText" inline={false} value={toJS(State.detailData.area)}></KrField>
									<KrField grid={1/2} label="货梯数量"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={toJS(State.detailData.area)}></KrField>

									<KrField grid={1/2} label="得房率"  style={{width:262,marginLeft:15}} component="labelText" inline={false} value={toJS(State.detailData.area)}></KrField>
									<KrField grid={1/2} label="绿化率"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={toJS(State.detailData.area)}></KrField>
                                    <div className="middle-round"></div>
						</div>

						<div className="titleBar"><span className="order-number">2</span><span className="wire"></span><label className="small-title">运营信息</label></div>
						<div className="small-cheek">
	
								<KrField grid={1/2} label="社区状态"  style={{width:262,marginLeft:15}} component="labelText" inline={false} value={toJS(State.detailData.area)}/>
								<KrField grid={1/2} label="开业时间"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={toJS(State.detailData.area)}/>
								<KrField grid={1/2} label="签约开始时间"  style={{width:262,marginLeft:15}} component="labelText" inline={false} value={toJS(State.detailData.area)}/>
								<KrField grid={1/2} label="签约结束时间"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={toJS(State.detailData.area)}/>
                                <KrField grid={1/2} label="工位总数"  style={{width:262,marginLeft:15}} component="labelText" inline={false} value={toJS(State.detailData.area)}></KrField>
								<KrField grid={1/2} label="会议室总数"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={toJS(State.detailData.area)}></KrField>
							   
                               
                                 
                                

								
                                <KrField grid={1/2}  component="labelText" label="营业时间" style={{width:262,marginLeft:15}} inline={false} value={toJS(State.detailData.area)}>
								
								</KrField>
								


								<KrField grid={1/2} label="联系方式" style={{width:262,marginLeft:28}} component="labelText" inline={false} value={toJS(State.detailData.area)}/>
								

						        
                                {openDown&&<div><div className='commmunity-open'><div className='open-inner' onClick={this.flagOpen}><span className='list-text'>展开</span><span className='list-pic'></span></div></div>
                                <div className="end-round two-round"></div></div>}

						        {openUp&&<div><div className='commmunity-down'><div className='open-inner' onClick={this.flagDown}><span className='list-text'>收起</span><span className='list-pic'></span></div></div><div className="middle-round"></div></div>}	
						        
						</div>
                        
                        
                      {openUp&&<div>
						<div className="titleBar"><span className="order-number">3</span><span className="wire"></span><label className="small-title">官网信息</label></div>
						<div className="small-cheek" style={{paddingBottom:0}}>
							 <KrField grid={1/2} label="排序" component="labelText" style={{width:262,marginLeft:15}}  inline={false} value={toJS(State.detailData.area)}/>	
							 <KrField grid={1/2} label="官网显示状态"  style={{width:262,marginLeft:28}} component="labelText" inline={false} value={toJS(State.detailData.area)}>
					         </KrField>

					         <div className='speakInfo' style={{marginBottom:3}}><KrField grid={1} label="社区简介" style={{marginLeft:15}} heightStyle={{height:"140px",width:'543px'}}  component="labelText"   lengthClass='list-length-textarea' inline={false} value={toJS(State.detailData.area)}/></div>		
						     
						     
						</div>
						<div className="end-round"></div>
                     </div>}


				    </div>
						
			 </div>
		);
	}
}

export default reduxForm({ form: 'WatchCommunityList',enableReinitialize:true,keepDirtyOnReinitialize:true})(WatchCommunityList);
