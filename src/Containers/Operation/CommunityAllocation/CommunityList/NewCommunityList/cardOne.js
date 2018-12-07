import React from 'react';
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
            showWarnOne:false,
            showWarnTwo:false,
        }
    }
    componentDidMount(){
        let {selectArr} = this.state;
        State.getRelatedCommunity()
   
    }


    handleChange=(event)=>{
        let {projects} = this.state;
        let showWarn = true;
        if(projects.length ==1){
            showWarn = projects[0].canSelect;
        }
        
        this.setState({
            needSyncCommunity: event.target.value,
            showWarnOne:(!showWarn&&event.target.value==1)?true:false
        }, ()=> {
            console.log(this.state.needSyncCommunity);
            State.needSyncCommunity = event.target.value==='2'?false:true
        });
        
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
        if(this.state.needSyncCommunity=='1'){
            this.setState({
                showWarnTwo:true
            })
            return
        }
        State.stepStatus = 2;
    }
    nextStep=()=>{
        State.stepStatus = 2;
    }

    onCancel = () =>{
        State.switchNewCommunityList();
        console.log('==========')
    }

    whiteClose = () =>{
        this.setState({
            showWarnOne:false
        })
    }
    closeDialog=()=>{
        this.setState({
            showWarnOne : false
        })
    }
    onsubmitDialg=()=>{
        State.stepStatus = 2;
        this.setState({
            showWarnTwo:false
        })
    }
    onCancelDialg=()=>{
        this.setState({
            showWarnTwo:false
        })
    }
    render() {
      let {selectArr ,projects,used,showWarnOne,showWarnTwo} = this.state;
      const {handleSubmit} = this.props;
      let cname = ''
      console.log('step1--->',State.projects)
      if(projects.length===1){
        cname = projects[0].communityName;
      }


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
					contentStyle ={{ width: '666px',height:'215px',textAlign:'center'}}
					overflow="auto"
					>

					<p style={{color:'#333',margin:'36px 0'}}>当前所选项目信息已同步到{cname}，清闲取消关联数据</p>
                    <Button  label="关闭" type="button" onTouchTap={this.closeDialog}/>
				</Dialog>


                <Dialog
					title="提示信息"
					onClose={this.onCancelDialg}
					open={showWarnTwo}
					contentStyle ={{ width: '666px',height:'215px',textAlign:'center'}}
					overflow="auto"
					>

                    <p  style={{color:'#333',margin:'36px 0'}}>所选项目信息将同步至当前社区，是否确认提交</p>	
                    <Grid style={{marginTop:30}}>
                        <Row>
                        <Col md={12} align="center">
                            <ButtonGroup>
                            <div  className='list-btn-center'><Button  label="确定" type="button" onTouchTap={this.onsubmitDialg}/> </div>
                            <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancelDialg}/>
                            </ButtonGroup>
                        </Col>
                        </Row>
                    </Grid>
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