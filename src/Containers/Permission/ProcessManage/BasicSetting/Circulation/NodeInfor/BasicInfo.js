import React from 'react';
import {	
	KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button
} from 'kr-ui';
import {Http} from 'kr/Utils';
import {reduxForm,initialize}  from 'redux-form';
import {Store} from 'kr/Redux';
import './index.less';

export default class  BasicInfo extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state={
           
        }
	}

   
    onSubmit=(values)=>{
        const {onSubmit}=this.props;
        onSubmit && onSubmit(values);
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }

	render(){

        let {basicData}=this.props;
       
		return(

			<div className='m-node-basic'>
                       <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="name"
                            component="labelText"
                            label="节点名称"
                            inline={false}
                            value={basicData.name}
						/>
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:32,marginBottom:5}}
                            name="type"
                            component="labelText"
                            label="节点类型"
                            inline={false}
                            value={basicData.nodeTypeName}
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="property"
                            component="labelText"
                            label="节点属性"
                            inline={false}
                            value={basicData.nodePropertyName}
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginLeft:32,marginBottom:5}}
                            name="orderNum"
                            component="labelText"
                            label="显示顺序"
                            inline={false}
                            value={basicData.orderNum}
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="forceBack"
                            component="labelText"
                            label="强制收回"
                            inline={false}
                            value={basicData.forceBackName}
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginLeft:32,marginBottom:5}}
                            name="forceFinish"
                            component="labelText"
                            label="强制归档"
                            inline={false}
                            value={basicData.forceFinishName}
						/>

                        <KrField 
                            grid={1}
                            name="batchCommit"
                            component="labelText"
                            label="批量提交"
                            inline={false}
                            value={basicData.batchCommitName}
						/>

                        <KrField 
                            grid={1}
                            name="descr"
                            component="labelText"
                            label="节点描述"
                            inline={false}
                            value={basicData.descr}
						/>

                        <div className='basic-btn'>
                            <Button label="编辑" type='button' onTouchTap={this.openEditNode}/>
                        </div>
                     
			</div>
		);
    }
    openEditNode=()=>{
        const {openEditNode}=this.props;
        openEditNode && openEditNode();
    }
}
