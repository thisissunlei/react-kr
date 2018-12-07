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
}import React from 'react';
import {
	toJS
} from 'mobx';
import {DateFormat} from 'kr/Utils';
import {reduxForm,initialize,change,FieldArray,reset} from 'redux-form';
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
	ButtonGroup,
    DrawerTitle,
    Message,
    Dialog
} from 'kr-ui';
import './index.less';
import State from '../State';

@observer
class CommunityButton extends React.Component {
    constructor(){
        super()
        this.state ={
            selectArr:[
                {value:'Grapefruit',label:"Grapefruit"},
                {value:'lime',label:"lime"},
                {value:'Coconut',label:"Coconut"},
            ],
            needSyncCommunity: '2',
            projects:[],
            used:false,
            showWarnOne:false
        }
    }
    componentDidMount(){
        let {selectArr} = this.state;
        State.getRelatedCommunity()
   
    }


    handleChange=(event)=>{
        this.setState({
            needSyncCommunity: event.target.value,
            showWarnOne:event.target.value==1?true:false
        }, ()=> {
            console.log(this.state.needSyncCommunity);
        
        });
        State.needSyncCommunity = event.target.value==='2'?false:true
    }
    addItem=(e)=>{
        console.log(e)

        this.chipData = this.state.projects;
        const chipToDelete = this.chipData.map((chip) => chip.label).indexOf(e.label);
        if(chipToDelete!=-1){
            return
        }
        console.log('add======')
        this.chipData.push(e)
        this.setState({
            projects: this.chipData,
            used:this.chipData.length>1?true:false,
            needSyncCommunity:'2'
        })
        this.setStateData(this.chipData,'2')
    }

    renderCommunity=()=>{
        let arr = State.projects.map((i,item)=> {
            return <span>{item.label} <span>X</span></span>
         })
         
         return (<div>
             {
                arr
             }
         </div>)
    }

    deletItem=(value)=>{
        this.chipData = this.state.projects;
		const chipToDelete = this.chipData.map((chip) => chip.label).indexOf(value.label);
		this.chipData.splice(chipToDelete, 1);
        console.log('chipData',this.chipData)
        this.setState({
            projects:this.chipData,
            used:this.chipData.length>1?true:false,
            needSyncCommunity:'2'
        })
        if(this.chipData.length==0){
            Store.dispatch(reset('CommunityButton'));
        }
        this.setStateData(this.chipData,'2')
    }
    setStateData=(arr,bool)=>{
        State.projects = arr;
        State.needSyncCommunity = bool==='2'?false:true
    }

    onSubmit = (values) => {
        console.log('onsubmit',values)
        State.stepStatus = 2;
    }
    nextStep=()=>{
        State.stepStatus = 2;
    }

    onCancel = () =>{
        console.log('==========')
    }

    whiteClose = () =>{
        this.setState({
            showWarnOne:false
        })
    }

    render() {
      let {selectArr ,projects,used,showWarnOne} = this.state;
      const {handleSubmit} = this.props;
      console.log('step1--->',State.projects)


        return (
            <div className='community'>
			   
                    <div className="community-button-label"><span style={{color:'red',position:'absolute',left:0,top:'5px'}}>*</span>关联项目</div>
                    <div style={{margin:'10px 0 10px 12px;'}}>
                        { projects.map(item=>{
                            return <span key={item.value} className="project-item">{item.label} <span className="icon-close" onClick={()=>{this.deletItem(item)}}></span></span>
                        })}
                    </div>
                <form  style={{paddingLeft:9}} onSubmit={handleSubmit(this.onSubmit)} onClick={this.closemm} >
                    <KrField  grid={1/2}  name="needSyncCommunity" type="select"  style={{width:262}} label="" 
                    options={toJS(State.communityList)} onChange={this.addItem}
                    ></KrField>
                    <div className="community-button-label"><span style={{color:'red',position:'absolute',left:0,top:'5px'}}>*</span>关联项目数据</div>
                    <div className="communitybutton-input" style={{border:'none'}}>
                        <input type='radio'  type="radio"  value="1" checked={1 == this.state.needSyncCommunity} onChange={this.handleChange} disabled={used}/>是
                        <span style={{width:'30px',display:'inline-block'}}></span>
                        <input type='radio'  type="radio"  value="2" checked={2 == this.state.needSyncCommunity} onChange={this.handleChange} />否
                    </div>
                    <Grid style={{marginTop:30}}>
                        <Row>
                        <Col md={12} align="center">
                            <ButtonGroup>
                            <div  className='list-btn-center'> <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel}/></div>
                            <Button  label="确定" type="submit"/>
                            
                            </ButtonGroup>
                        </Col>
                        </Row>
                    </Grid>
                </form>
            
                <Dialog
					title="提示信息"
					onClose={this.whiteClose}
					open={showWarnOne}
					contentStyle ={{ width: '666px',height:'385px'}}
					overflow="auto"
					>
                    <p>所选项目信息将同步至当前社区，是否确认提交</p>	
					<p>当前所选项目信息已同步到xxx社区，清闲取消关联数据</p>
										
				</Dialog>
            </div>
        )
    }
}
const validate = values =>{
console.log('======')
    const errors = {};
    if(!values.needSyncCommunity){
        errors.needSyncCommunity='请选择关联项目';
    }
    return errors
}
export default reduxForm({ form: 'CommunityButton',validate})(CommunityButton);