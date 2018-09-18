
import React from 'react';

import {Actions, Store} from 'kr/Redux';
import {
	Http
} from "kr/Utils";
import {
    KrField,
    Button,
    ButtonGroup,
    Grid,
    Row,
    Col,
    Dialog,
    DrawerTitle
} from 'kr-ui';
import './index.less';
import {reduxForm, formValueSelector, change,initialize} from 'redux-form';
class Editdialog extends React.Component {
    static PropTypes = {
        detail: React.PropTypes.object,
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }
    constructor(props, context) {
        super(props, context);
		this.state={
			infoList:{},
			ModuleList: [],
			childModule: [],
			childModuleList: [],
			ModuleId: '',
			moduleVoList: [],
		}
		this.getModuleList();
	//	this.getResourcesData();
    }
    componentDidMount() {

        var _this = this;
        var id = this.props.detail.id;
        Http.request('op-code-detail', {
                id: id
            },{}).then( (response)=> {
				Store.dispatch(initialize('editdialog', response));
				this.setState({
					infoList:response,
				},()=>{
					let {
						detail
					} = this.props;
					var moduleVoList = response.moduleVoList.map((item, index) => {
						item.label = item.name;
						item.value = item.id;
						return item;
					})
					var EditDate = detail;
					EditDate.module = moduleVoList[0];
					if (moduleVoList[1]) {
						EditDate.moduleChild = moduleVoList[1];
						var arr = [];
						arr.push(moduleVoList[1])
						_this.setState({
							childModule: arr
						})
					}
					if (moduleVoList[2]) {
						EditDate.moduleChildList = moduleVoList[2];
						var arr1 = [];
						arr1.push(moduleVoList[2])
						_this.setState({
							childModuleList: arr1,
							ModuleId:moduleVoList[2].id
						})
					}
					Store.dispatch(initialize('editdialog', EditDate));
					//Store.dispatch(change('editdialog', 'moduleChild', ''));
				});
            }).catch(function(err) {});

	}
	//存储模块Id
	onSetModuleId = (item) => {
		this.setState({
			ModuleId: item.id
		})
	}
	getModuleList = () => {
		let {
			Params
		} = this.state;
		var _this = this;
		Http.request('getModule', Params, {}).then(function(response) {
			var ModuleList = response.ssoModuleList.map((item, index) => {
				item.value = item.id;
				item.label = item.name;
				return item;
			})
			_this.setState({
				ModuleList: ModuleList
			})
		}).catch(function(err) {

		});
	}
	onSelect = (item) => {
		var _this = this;
		Store.dispatch(change('editdialog', 'moduleChild', ''));
		Store.dispatch(change('editdialog', 'moduleChildList', ''));
		this.setState({
			Params: {
				parentId: item && item.id
			}
		}, function() {
			Http.request('getModule', _this.state.Params, {}).then(function(response) {
				if (response.ssoModuleList.length > 0) {
					var ModuleList = response.ssoModuleList.map((item, index) => {
						item.value = item.id;
						item.label = item.name;
						return item;
					})
					_this.setState({
						childModule: ModuleList,
						childModuleList: []
					})
				} else {
					_this.setState({
						ModuleId: item.id,
						childModule: response.ssoModuleList,
						childModuleList: []
					})
				}
			}).catch(function(err) {

			});
		})

	}
	onSelectChild = (item) => {
		var _this = this;
		Store.dispatch(change('editdialog', 'moduleChildList', ''));
		
		this.setState({
			Params: {
				parentId: item && item.id
			}
		}, function() {
			Http.request('getModule', _this.state.Params, {}).then(function(response) {
				if (response.ssoModuleList.length > 0) {
					var ModuleList = response.ssoModuleList.map((item, index) => {
						item.value = item.id;
						item.label = item.name;
						return item;
					})
					_this.setState({
						childModuleList: ModuleList
					})
				} else {
					_this.setState({
						ModuleId: item.id,
						childModuleList: response.ssoModuleList
					})
				}

			}).catch(function(err) {

			});
		})

	}
	renderModule = () => {
		let {
			childModule
		} = this.state;
		return (
			<KrField name="moduleChild"  style={{width:220}}  component="select" label="" options={childModule} inline={true} onChange={this.onSelectChild}/>
		)


	}
	renderchildModule = () => {
		let {
			childModuleList
		} = this.state;
		return (
			<KrField name="moduleChildList"  style={{width:220}}  component="select" label="" options={childModuleList} inline={true}  onChange={this.onSetModuleId}/>
		)


	}

    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel()
    }
    onSubmit = (form) => {
		let {
			detail
		} = this.props;
		//console.log(form,'form');
		let{ModuleId} =  this.state;
		const {onSubmit} = this.props;
		let params = {...form,moduleId:ModuleId};
	//	console.log(params,'params');
        onSubmit && onSubmit(params);
    }

    render() {
        const {handleSubmit} = this.props;
		let {
			ModuleList,
			childModule,
			childModuleList
		} = this.state;
        return (

            <div className="g-opcode-create">
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:670,marginTop:30,paddingLeft:40,paddingRight:40}}  >
                  <DrawerTitle title ="编辑业务" onCancel = {this.onCancel}/>

				<KrField
    						 left={42}
    	 					 name="name"
                			 requireLabel={true}
    	 					 style={{marginTop:4}}
    	 					 label="名称"
    						 component="input"
							 inline={true}
							 maxLength={15}
    	 		/>
               <KrField
    						 left={42}
    	 					 style={{marginTop:4}}
    	 					 label="编码"
							 name="codeName"
							 component="labelText"
							 value={this.state.infoList.codeName}
							 inline={true}
							 requireLabel={true}
							 maxLength={50}
    	 		/>
				{/*<KrField
						style={{width:360,marginLeft:40,marginBottom:2,marginRight:200}}
						name="enableFlag"
						component="group"
						label="是否启用"
						inline={true}
						requireLabel={true}
				>
					<KrField
							name="enableFlag"
							label="是"
							type="radio"
							value="1"
					/>
						<KrField
							name="enableFlag"
							label="否"
							type="radio"
							value="0"
					/>
				</KrField>*/}
				<KrField
                  grid={1}
                  left={42}
                  name="desc"
                  component="textarea"
				  maxSize={300}
				  requireLabel={true}
                  style={{marginTop:4,height:130}}
                  label="备注"
                />
					<div className="u-operations-menu">
						<KrField
								name="module"
								style={{width:310,marginLeft:14}}
								component="select"
								label="所属菜单"
								options={ModuleList}
								inline={true}
								requireLabel={true}
								onChange={this.onSelect}
						/>
						{childModule.length>0?this.renderModule():''}
						{childModuleList.length>0?this.renderchildModule():''}
					</div>
                <Row style={{marginTop:80,marginBottom:15}}>
      					<Col md={12} align="center">
      						<ButtonGroup>
      							<div className='ui-btn-center'>
      								<Button
      										label="确定"
      										type="submit"
      										height={34}
      										width={90}
      								/>
      							</div>
      							<Button
      									label="取消"
      									type="button"
      									onTouchTap={this.onCancel}
      									cancle={true}
      									height={33}
      									width={90}
      							/>
      						</ButtonGroup>

      					 </Col>
      					 </Row>
              </form>
            </div>
        );
    }

}
const validate = values => {

	const errors = {}
	if (!values.name) {
		errors.name = '请输入名称';
	}
    if (!values.codeName) {
		errors.codeName = '请选择编码';
	}
 
    if (!values.enableFlag) {
		errors.enableFlag = '请选择是否启用';
	}
	if (!values.desc) {
		errors.desc = '请填写备注';
	}
	return errors;
}
export default reduxForm({
	form: 'editdialog',
  enableReinitialize: true,
  validate,
	keepDirtyOnReinitialize: true,
})(Editdialog);
