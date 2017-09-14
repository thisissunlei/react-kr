import React from 'react';
import KrField from '../../KrField';
import TabelEdit from '../../FieldTabel/TabelEdit';
import FRow from '../../FieldTabel/FRow';

export default class Text  extends React.Component{

	constructor(props,context){
        super(props, context);
        this.state={
            component:null,
						model:null
        }
    }


    componentDidMount(){

    }

    sourceChange=(param)=>{
			if(param.value=='12'){
				 this.setState({
					 model:this.sourceRender()
				 })
			 }else{
				 this.setState({
					 model:null
				 })
			 }
			 const {onChange}=this.props;
			 onChange && onChange(param);
		}

		sourceRender=()=>{
 			 return <KrField grid={1/2}
 									 style={{width:262,marginLeft:30}}
 									 name="data"
 									 component="select"
 									 label="数据来源"
 									 options={[{'label':'性格','value':'123'}]}
 							 />
 	  }

    inputTextRender=()=>{
        return <KrField
                grid={1/2}
                style={{width:262,marginBottom:5}}
                name="name"
                component="input"
                label="文本长度"
                requireLabel={true}
            />
    }

    floatTextRender=()=>{
        return <KrField
                grid={1/2}
                style={{width:262,marginBottom:5}}
                name="name"
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
                name="namwww"
                component="input"
                label="高度"
            />
    }

    buttonRender=()=>{
        return <div>
                <KrField
                    grid={1/2}
                    style={{width:262,marginBottom:5}}
                    name="name"
                    component="select"
                    label="按钮类型"
                    options={[{label:'1',value:'1'},{label:'2',value:'2'},{label:'3',value:'3'},{label:'4',value:'4'}]}
                    requireLabel={true}
                />
                <KrField grid={1/2} style={{width:262,marginLeft:'30px'}} name="enabled" component="group" label="是否多选" requireLabel={true}>
                    <KrField name="enabled" label="是" type="radio" value='1' />
                    <KrField name="enabled" label="否" type="radio" value='0' />
                </KrField>
            </div>
    }


    fileRender=()=>{
        return <div>
                    <KrField
                    grid={1/2}
                    style={{width:262,marginBottom:5}}
                    name="name"
                    component="input"
                    label="文件大小(单位:k)"
                    requireLabel={true}
                />
                    <KrField grid={1/2} style={{width:262,marginLeft:'30px'}} name="enabled" component="group" label="多文件上传 " requireLabel={true}>
                        <KrField name="enabled" label="允许" type="radio" value='1' />
                        <KrField name="enabled" label="禁止" type="radio" value='0' />
                    </KrField>
             </div>
    }

		picRender=()=>{
			return <div>
									<KrField
											grid={1/2}
											style={{width:262,marginBottom:5}}
											name="name"
											component="input"
											label="图片宽度(单位:px)"
									/>
									<KrField
											grid={1/2}
											style={{width:262,marginBottom:5,marginLeft:30}}
											name="name"
											component="input"
											label="图片高度(单位:px)"
									/>
					 </div>
		}

    dateRender=()=>{
        return <KrField grid={1/2}
                    style={{width:262,marginLeft:30}}
                    name="entryDate"
                    component="date"
                    label="日期"
                />
    }



		sourceType=()=>{
			return <KrField grid={1/2}
									style={{width:262}}
									name="data"
									component="select"
									label="来源类型"
									onChange={this.sourceChange}
									options={[{'label':'公共字典','value':'12'},{'label':'自定义','value':'34'}]}
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
                component = _this.dateRender()
                break;
          }
           case 'TIME_DATETIME':{
                component = _this.dateRender()
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
				let {model}=this.state;

				return(

					<div style={{display:'inline-block'}}>
		                {this.typeRender(label)}
										{model}
					</div>
		);
	}

}
