import React from 'react';
import './index.less';
import {
	toJS
} from 'mobx';
import KrField from '../KrField';
import DictionaryConfigs from 'kr/Configs/dictionary';
import Text from './Text';
import {reduxForm,change,initialize}  from 'redux-form';
import {
	Store
} from 'kr/Redux';
import {
	observer,
	inject
} from 'mobx-react';

@inject("TextDicModel")
@observer
export default class TextDic extends React.Component{

	static displayName = 'TextDic';

	constructor(props,context){
        super(props, context);
        this.state={
            watchSecond:false,
            watchThree:false 
        }
        this.inputType=[];
        this.componentType=[];
        this.componentItem=[];
        this.threeLabel='';
        this.control=false;
        this.clearText={
            sourceType:'',
            wspicHeight:'',
            wspicWidth:"",
            wsenabled:"true",
            wsfile:'',
            wstext:'',
            wsfloat:'',
            wsheight:'',
            wsbtnEnabled:'true',
            wspicFile:"",
            wsPicEnabled:"true",
            wsradio:"",
            wsMaxLength:''
        }
    }


  
    componentWillMount(){
        this.inputType=DictionaryConfigs.ERP_InputType;
        this.componentType=DictionaryConfigs.ERP_ComponentType;
    }
    

    componentDidMount(){
        let {isEdit,TextDicModel}=this.props;
        if(isEdit){
            this.setState({
                watchSecond:true,
                watchThree:true
             })
             this.nextArrRender(toJS(TextDicModel.oldDetail).inputType,this.componentType);
             this.threeLabel=toJS(TextDicModel.oldDetail).compType;
        }
    }

    
    typeChange=(param)=>{  
      let {TextDicModel}=this.props;
      this.setState({
        watchSecond:true,
        watchThree:false
      })
      Store.dispatch(change('AddText','compType',''));
      this.nextArrRender(param.value,this.componentType);
      TextDicModel.inputType=param.value;
      if(toJS(TextDicModel.oldDetail).inputType=='TIME'&&toJS(TextDicModel.oldDetail).inputType==toJS(param.value)){
        Store.dispatch(change('EditText','compType',toJS(TextDicModel.oldDetail).compType)); 
      }else{
        Store.dispatch(change('EditText','compType',''));
      }
    }



    nextArrRender=(name,selectName)=>{
        var nextRender=[];
        selectName.map((item,index)=>{
            var list={};
            if(item.value.slice(0,name.length)==name){
                if(name=='TEXT'&& item.value!=='TEXT_AREA_TEXT'&&item.value!=='TEXT_AREA_RICH'){           
                    list.value=item.value;
                    list.label=item.desc;
              }else if(name!='TEXT'){
                    list.value=item.value;
                    list.label=item.desc;
              }else{
                    return null
                }
            }else{
                return null
            }
            nextRender.push(list);
        })
        this.componentItem=nextRender;
       }
    

    
    clearWs=()=>{
        for(var item in this.clearText){
            Store.dispatch(change('EditText',item,this.clearText[item])); 
        }
    }


    giveWs=()=>{
        let {TextDicModel}=this.props;
        var paraSetting={};
        var params=toJS(TextDicModel.oldDetail);
        if(params.setting){
            var setting=JSON.parse(params.setting);
             setting.map((item,index)=>{
                for(var index in item){ 
                    paraSetting[index]=item[index];
                }
             })
         }
        for(var item in this.clearText){
            Store.dispatch(change('EditText',item,paraSetting[item]?paraSetting[item]:this.clearText[item])); 
        }
    }
    

    classChange=(param)=>{
        
       let {TextDicModel}=this.props;
       this.setState({
         watchThree:true
       })
       this.threeLabel=param.value;
       TextDicModel.comType=param.value;
       if(toJS(TextDicModel.oldDetail).inputType!=toJS(TextDicModel.inputType)||toJS(TextDicModel.oldDetail).compType!=param.value){
           this.clearWs();
       }else{
           if(toJS(TextDicModel.oldDetail).inputType=='SELECT'||toJS(TextDicModel.oldDetail).inputType=='CHECK'){
             this.clearWs();
           }else{
             this.giveWs(); 
           }
       }
       TextDicModel.itemStr=1;
    }
    


	render(){

       let {watchSecond,watchThree}=this.state;

        var seleInt=[];
        this.inputType.map((item,index)=>{
           var list={};
           list.label=item.desc;
           list.value=item.value;
           seleInt.push(list);
        })
        

		return (

                <div style={{display:'inline-block'}}>
                   <KrField
                            grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="inputType"
                            component="select"
                            label="表现形式"
                            options={seleInt}
                            onChange={this.typeChange}
                            requireLabel={true}
                    />
                    {watchSecond&&<KrField
                        grid={1/2}
                        style={{width:262,marginBottom:5,marginLeft:'30px'}}
                        name="compType"
                        component="select"
                        label="类型"
                        options={this.componentItem}
                        onChange={this.classChange}
                        requireLabel={true}
                    />}
                    {watchThree&&<Text 
                       label={this.threeLabel}
                    />}
                </div>

		);
	}
}
