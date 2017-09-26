import React from 'react';
import KrField from '../../KrField';
import DictionaryConfigs from 'kr/Configs/dictionary';
import TabelEdit from '../../FieldTabel/TabelEdit';
import FRow from '../../FieldTabel/FRow';
import Message from '../../Message';


export default class Text  extends React.Component{

	constructor(props,context){
        super(props, context);
        this.state={
            component:null,
            models:null,
        }
    }

    componentDidMount(){
        let {getEdit}=this.props;
        if(getEdit.sourceType=='PUBLIC_DICT'){
            this.setState({
                models:this.sourceRender(getEdit.sourceOrgin),
            })
        }
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.getEdit.sourceType=='PUBLIC_DICT'){
                this.setState({
                    models:this.sourceRender(nextProps.getEdit.sourceOrgin),
                }) 
        }
    }

    sourceChange=(param)=>{
			if(param.value=="PUBLIC_DICT"){
				 this.setState({
                    models:this.sourceRender(),
				 })
			 }else{
				 this.setState({
                    models:null,
				 })
			 }
			 const {onChange}=this.props;
			 onChange && onChange(param);
		}

    sourceRender=(publicValue)=>{
        let {sourceCome}=this.props;
        sourceCome.map((item,index)=>{
            item.value=''+item.value;
        })
            return <KrField grid={1/2}
                        style={{width:262,marginLeft:30}}
                        name="sourceOrgin"
                        component="select"
                        label="数据来源"
                        value={publicValue}
                        options={sourceCome}
                        requireLabel={true}
                    />
 	  }

    inputTextRender=()=>{
        return <KrField
                grid={1/2}
                style={{width:262,marginBottom:5}}
                name="wstext"
                component="input"
                label="文本长度"
                requireLabel={true}
            />
    }

    floatTextRender=()=>{
        return <KrField
                grid={1/2}
                style={{width:262,marginBottom:5}}
                name="wsfloat"
                component="select"
                label="小数位数"
                options={[{label:'1',value:'1'},{label:'2',value:'2'},{label:'3',value:'3'},{label:'4',value:'4'}]}
                requireLabel={true}
            />
    }

    heightRender=()=>{
        return <KrField
                grid={1/2}
                style={{width:262,marginBottom:5}}
                name="wsheight"
                component="input"
                label="高度"
            />
    }

    buttonRender=()=>{
        return <div>
                <KrField
                    grid={1/2}
                    style={{width:262,marginBottom:5}}
                    name="wsradio"
                    component="select"
                    label="按钮类型"
                    options={[{label:'1',value:'1'},{label:'2',value:'2'},{label:'3',value:'3'},{label:'4',value:'4'}]}
                    requireLabel={true}
                />
                <KrField grid={1/2} style={{width:262,marginLeft:'30px'}} name="wsenabled" component="group" label="是否多选" requireLabel={true}>
                    <KrField name="wsenabled" label="是" type="radio" value='true' />
                    <KrField name="wsenabled" label="否" type="radio" value='false' />
                </KrField>
            </div>
    }


    fileRender=()=>{
        return <div>
                    <KrField
                    grid={1/2}
                    style={{width:262,marginBottom:5}}
                    name="wsfile"
                    component="input"
                    label="文件大小(单位:k)"
                    requireLabel={true}
                />
                    <KrField grid={1/2} style={{width:262,marginLeft:'30px'}} name="wsenabled" component="group" label="多文件上传 " requireLabel={true}>
                        <KrField name="wsenabled" label="允许" type="radio" value='true' />
                        <KrField name="wsenabled" label="禁止" type="radio" value='false' />
                    </KrField>
             </div>
    }

		picRender=()=>{
			return <div>
                    <KrField
                            grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="wspicWidth"
                            component="input"
                            label="图片宽度(单位:px)"
                    />
                    <KrField
                            grid={1/2}
                            style={{width:262,marginBottom:5,marginLeft:30}}
                            name="wspicHeight"
                            component="input"
                            label="图片高度(单位:px)"
                    />
				 </div>
		}

    dateRender=()=>{
        return <KrField grid={1/2}
                    style={{width:262}}
                    name="wsdate"
                    component="date"
                    label="日期"
                />
    }

    timeRender=()=>{
        let {getEdit}=this.props;
        var time='';
        if(getEdit.setting){
            var setting=JSON.parse(getEdit.setting);
            setting.map((item,index)=>{
               for(var index in item){
                time=item[index];
               }
            })
        }
        return <KrField 
          component="selectTime" 
          label='时间'
          timeNum={time}  
          style={{width:262}} 
          name='wsdate'/>
    }

    dateTimeRender=()=>{
        let {getEdit}=this.props;
        var time='';
        if(getEdit.setting){
            var setting=JSON.parse(getEdit.setting);
            setting.map((item,index)=>{
               for(var index in item){
                time=item['wstime'];
               }
            })
        }
        return <div style={{width:262,padding:0}}>
                        <KrField
                            name="wsdate"
                            component="date"
                            style={{width:170}}
                            requireLabel={true}
                            label='日期时间'
                        />
                        <KrField
                            name="wstime"
                            component="selectTime"
                            timeNum={time}
                            style={{width:80,marginTop:14,zIndex:10}}
                         />
				</div>
    }



    sourceType=()=>{
        var source=DictionaryConfigs.ERP_SourceType;
        var seleInt=[];
        source.map((item,index)=>{
           var list={};
           list.label=item.desc;
           list.value=item.value;
           seleInt.push(list);
        })
        return <KrField grid={1/2}
                    style={{width:262}}
                    name="sourceType"
                    component="select"
                    label="来源类型"
                    onChange={this.sourceChange}
                    options={seleInt}
                    requireLabel={true}
                />
    }

    typeRender=(value)=>{
        var component={};
        let _this=this;
        switch (value){
          case 'TEXT_TEXT':{
              component = _this.inputTextRender()
              break;
          }
          case 'TEXT_INTEGER':{
              component = _this.inputTextRender()
              break;
          }
          case 'TEXT_FLOAT':{
              component = _this.floatTextRender()
              break;
          }
          case 'TEXT_MONEY_TRANSFER':{
              component = _this.floatTextRender()
              break;
          }
          case 'TEXT_MONEY_QUARTILE':{
              component = _this.floatTextRender()
              break;
          }
          case 'TEXT_AREA_TEXT':{
              component = _this.heightRender()
              break;
          }
          case 'TEXT_AREA_RICH':{
              component = _this.heightRender()
              break;
          }
          case 'BUTTON_BROWES':{
              component = _this.buttonRender()
              break;
          }
          case 'FILE_FILE':{
                component = _this.fileRender()
                break;
          }
          case 'FILE_PHOTO':{
                component = _this.picRender()
                break;
          }
          case 'TIME_DATE':{
                component = _this.dateRender()
                break;
          }
          case 'TIME_TIME':{
                component = _this.timeRender()
                break;
          }
          case 'TIME_DATETIME':{
                component = _this.dateTimeRender()
                break;
          }
        case 'SELECT_SELECT':{
                    component = _this.sourceType()
                    break;
        }
        case 'SELECT_SEARCH':{
                    component = _this.sourceType()
                    break;
        }
        case 'CHECK_RADIO':{
                    component = _this.sourceType()
                    break;
        }
        case 'CHECK_CHECK':{
                    component = _this.sourceType()
                    break;
        }
          default:{
              component = null;
          }
        }
       return component
    }




	render(){

                let {label}=this.props;
                let {models}=this.state;
                

				return(

					<div style={{display:'inline-block'}}>
		                {this.typeRender(label)}
						{models}
					</div>
		);
	}
}
