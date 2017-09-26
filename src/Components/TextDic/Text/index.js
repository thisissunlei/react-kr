import React from 'react';
import KrField from '../../KrField';
import DictionaryConfigs from 'kr/Configs/dictionary';
import TabelEdit from '../../FieldTabel/TabelEdit';
import FRow from '../../FieldTabel/FRow';
import Message from '../../Message';
import {reduxForm,change,initialize}  from 'redux-form';
import {
	Store
} from 'kr/Redux';

export default class Text  extends React.Component{

	constructor(props,context){
        super(props, context);
        this.state={
            component:null,
            models:null,
        }
        this.isCommon=false;
    }

    commonPublic=(param,sourceOrgin)=>{
        if(param=='PUBLIC_DICT'){
            this.setState({
                models:this.sourceRender(sourceOrgin),
            })
        }else if(param=="CUSTOM"){
            this.setState({
               models:this.selfRender(),
            })
        }else{
           this.setState({
               models:null,
            }) 
        }
    }

    componentDidMount(){
        let {getEdit,isCommon}=this.props;
        if(isCommon){
            return;
        }
        this.commonPublic(getEdit.sourceType,getEdit.sourceOrgin);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isCommon&&!this.isCommon){
           Store.dispatch(change('EditText','sourceType',''));
           this.setState({
              models:null,
           }) 
        }
        if(this.isCommon||nextProps.isCommon){
            return;
        }
        this.commonPublic(nextProps.getEdit.sourceType,nextProps.getEdit.sourceOrgin);
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
                    <FRow name = "isDefault" type = "checkBox" label = "是否默认" />
                </TabelEdit>
            </div>
        )
    }

    sourceChange=(param)=>{
            this.isCommon=true;
            this.commonPublic(param.value,'');
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
                    marking={true}
                />
    }

    buttonRender=()=>{
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
                <KrField grid={1/2} style={{width:262,marginLeft:'30px'}} name="wsenabled" component="group" label="是否多选" requireLabel={true}>
                    <KrField name="wsenabled" label="是" type="radio" value='true' />
                    <KrField name="wsenabled" label="否" type="radio" value='false' />
                </KrField>
            </div>
        )
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
                    marking={true}
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
                            name="wsfile"
                            component="input"
                            label="文件大小(单位:k)"
                            requireLabel={true}
                            marking={true}
                        />
                            <KrField grid={1/2} style={{width:262,marginLeft:'30px'}} name="wsenabled" component="group" label="多文件上传 " requireLabel={true}>
                                <KrField name="wsenabled" label="允许" type="radio" value='true' />
                                <KrField name="wsenabled" label="禁止" type="radio" value='false' />
                    </KrField>
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
                let {models}=this.state;
                

				return(

					<div style={{display:'inline-block'}}>
		                {this.typeRender(label)}
						{models}
					</div>
		);
	}
}
