import React from 'react';
import KrField from '../../KrField';
import {
	toJS
} from 'mobx';
import DictionaryConfigs from 'kr/Configs/dictionary';
import TabelEdit from '../../FieldTabel/TabelEdit';
import FRow from '../../FieldTabel/FRow';
import Message from '../../Message';
import {reduxForm,change,initialize}  from 'redux-form';
import {
	Store
} from 'kr/Redux';
import '../index.less';

import {
	observer,
	inject
} from 'mobx-react';

@inject("TextDicModel")
@observer
export default class Text  extends React.Component{

	constructor(props,context){
        super(props, context);
        this.state={
            component:null,
            other:''
        }
        this.models=null;
    }
    
    
    componentDidMount(){
        let {TextDicModel}=this.props;
        if(toJS(TextDicModel.oldDetail).sourceType&&(toJS(TextDicModel.oldDetail).inputType=='SELECT'||toJS(TextDicModel.oldDetail).inputType=='CHECK')){
          this.commonPublic(toJS(TextDicModel.oldDetail).sourceType);        
        }
    }

    clearModel=()=>{
        this.models=null;	  
    }
    
   
    commonPublic=(param)=>{         
        if(param=='PUBLIC_DICT'){     
            this.models=this.sourceRender();
        }else if(param=="CUSTOM"){     
            this.models=this.selfRender();
        }else{
            this.models=null;
        }
        this.setState({
            other:+new Date()
        })
    }

    

    selfRender=()=>{
        return  (
            <div style={{marginLeft:12}}>
                <TabelEdit
                    name = "itemListStr"
                    toolbar = {true}
                    checkbox = {true}
                >
                    <FRow name = "label"  type = "tableEdit"  label = "选项文字" />
                    <FRow name = "value" type = "tableEdit" label = "选项值" />
                    <FRow name = "orderNum" type = "tableEdit" label = "排序号" />
                    <FRow name = "isDefault" marking = "tab-field" type = "checkBox" label = "是否默认" />
                </TabelEdit>
            </div>
        )
    }

    sourceChange=(param)=>{
        this.commonPublic(param.value);
	}

    sourceRender=(publicValue)=>{
            return <KrField grid={1/2}
                        style={{width:262,marginLeft:30}}
                        name="sourceOrgin"
                        component="SearchSourceOrigin"
                        label="数据来源"
                        value={publicValue}
                        requireLabel={true}
                    />
 	  }

    inputTextRender=()=>{
        this.clearModel();
        return <KrField
                    grid={1/2}
                    style={{width:262,marginBottom:5}}
                    name="wstext"
                    component="input"
                    label="文本长度"
                    requireLabel={true}
                    marking={true}
                   
                />
    }

    floatTextRender=()=>{
        this.clearModel();
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
        this.clearModel();
        return <KrField
                    grid={1/2}
                    style={{width:262,marginBottom:5}}
                    name="wsheight"
                    component="input"
                    label="高度"
                    marking={true}
                />
    }

    buttonRender=()=>{
        this.clearModel();
        return (
            <div>
                <KrField
                    grid={1/2}
                    style={{width:262,marginBottom:5}}
                    name="wsradio"
                    component="select"
                    label="按钮类型"
                    options={[{label:'分部',value:'wsfen'},{label:'部门',value:'wsbu'},{label:'职务',value:'wszhi'},{label:'职级',value:'wsji'},{label:'人员',value:'wsren'}]}
                    requireLabel={true}
                />
                <div className='m-form-radio'><KrField grid={1/2} style={{width:262,marginLeft:'30px'}} name="wsenabled" component="group" label="是否多选" requireLabel={true}>
                    <KrField name="wsbtnEnabled" label="是" type="radio" value='true' />
                    <KrField name="wsbtnEnabled" label="否" type="radio" value='false' />
                </KrField></div>
            </div>
        )
    }


    fileRender=()=>{
        this.clearModel();
        return <div>
                    <KrField
                    grid={1/2}
                    style={{width:262,marginBottom:5}}
                    name="wsfile"
                    component="input"
                    label="文件大小(单位:k)"
                    requireLabel={true}
                    marking={true}
                />
                <div className='m-form-radio'> <KrField grid={1/2} style={{width:262,marginLeft:'30px'}} name="wsenabled" component="group" label="多文件上传 " requireLabel={true}>
                        <KrField marking = "text" name="wsenabled" label="允许" type="radio" value='true' />
                        <KrField marking = "text" name="wsenabled" label="禁止" type="radio" value='false' />
                    </KrField></div>
             </div>
    }

		picRender=()=>{
            this.clearModel();
			return <div>
                    <KrField
                        grid={1/2}
                        style={{width:262,marginBottom:5}}
                        name="wspicFile"
                        component="input"
                        label="文件大小(单位:k)"
                        requireLabel={true}
                        marking={true}
                    />
                    <div className='m-form-radio'> 
                        <KrField grid={1/2} style={{width:262,marginLeft:'30px'}} name="wsenabled" component="group" label="多文件上传 " requireLabel={true}>
                            <KrField name="wsPicEnabled" label="允许" type="radio" value='true' />
                            <KrField name="wsPicEnabled" label="禁止" type="radio" value='false' />
                        </KrField>
                    </div>
                    <KrField
                        grid={1/2}
                        style={{width:262,marginBottom:5}}
                        name="wspicWidth"
                        component="input"
                        label="图片宽度(单位:px)"
                        marking={true}
                    />
                    <KrField
                        grid={1/2}
                        style={{width:262,marginBottom:5,marginLeft:30}}
                        name="wspicHeight"
                        component="input"
                        label="图片高度(单位:px)"
                        marking={true}
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
               

				return(
					<div style={{display:'inline-block'}}>
		                {this.typeRender(label)}
						{this.models}
					</div>
		);
	}
}
