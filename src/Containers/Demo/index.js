import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import {
	Checkbox,
	DatePicker,
	Form,
	KrField,
	Table,
	Tabs,
	Tab,
 	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	FontIcon,
	SearchForms,
	Title,
	Input,
	CheckboxGroup,
	RadioGroup,
	Message,
	Tooltip,
	KrForm,
	DemoComponent,
	Field,
	FieldControl,
	InputDate,
	SnackTip
} from 'kr-ui';

import {
	FlatButton,
} from 'material-ui';
import './index.less';

import LocationMap from 'kr-ui/Global/LocationMap';

import {List, ListItem} from 'material-ui/List';

import { hashHistory ,History} from 'react-router';

export default class Demo extends Component{

	 static contextTypes = {
	  	router: React.PropTypes.object.isRequired
    }

	constructor(props,context){
		super(props, context);

		this.state = {
			userNameDefaultValue:''
		}

	}

	componentDidMount(){
		/*
		this.setState({
			userNameDefaultValue:'aahahh'
		});
		*/
	}



	show = ()=>{

		console.log('click');


		Message.show('hahaha 爱的范德萨发几块了');
	}

ll=(values)=>{
	console.log(values,"???");
}

	list=(value)=>{
		console.log('city',value);
	}



	render(){
		return(
			<div>

					<Section title="demo" description="" >
					    <SnackTip style={{'background':'#69bbf0'}} title='snack'/>
						<KrField grid={1/2} label='city' component='city' onSubmit={this.list}/>

						<KrField oldText={"123"} label="订单名称" inline="inline" alignRight={true} component="editLabelText" save={this.ll} />
						<KrForm name="demoForm" onSubmit={function(values){
									console.log('values',values);
							}} >


									<FieldControl name="d23233" label="选择城市" component="group"  requiredValue={true} errors={{requiredValue:'请填写时间'}} >
												<FieldControl name="d23233" label="北京" component="checkbox" />
											<FieldControl name="d23233" label="上海" component="checkbox" />
												<FieldControl name="d23233" label="深圳" component="checkbox"/>
								</FieldControl>


								<FieldControl name="d233" label="选择城市" component="group"  requiredValue={true} errors={{requiredValue:'请填写时间'}} >
												<FieldControl grid={1/2} name="d23" component="date"  contentStyle={{paddingLeft:0}}/>
											<FieldControl  grid={1/2} name="d2"  component="date" />
							</FieldControl>

									<FieldControl name="d" label="单选" component="radio"  requiredValue={true} errors={{requiredValue:'请填写时间'}}/>

									<FieldControl name="de" label="其它" component="searchPersonel" requiredValue={true} errors={{requiredValue:'请填写时间'}}/>

									<FieldControl name="dame" label="其它" component="select" requiredValue={true} errors={{requiredValue:'请填写时间'}} options={[{label:'请选择',value:''},{label:'北京',value:'1'}]}/>


								<FieldControl name="de2ame" label="其它" component="date" requiredValue={true} errors={{requiredValue:'请填写时间'}}/>

							<FieldControl name="demn22ame" label="其它:" component="file"  requiredValue={true} errors={{requiredValue:'必填'}}/>

						<FieldControl name="demn3322342ame" type="text" label="其它" component="input"/>
							<FontIcon
						      className="icon-basis"
						      style={{marginRight:'20px',color:'#499df1',fontSize:20}}
						    />


						 <FlatButton icon={<FontIcon className={'icon-basis'} />} style={{color:'#499df1',height:36,width:100}} />

							 </KrForm>
                             
                        

					</Section>
			</div>

		);

	}

}
