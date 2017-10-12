import React from 'react';

import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	change
} from 'redux-form';

import {
	Actions,
	Store,
	connect
} from 'kr/Redux';

import {
	KrField,
    ButtonGroup,
    Button
} from 'kr-ui';

class RadioBug extends React.Component {


	constructor(props) {
		super(props);
	}

	 onCancel=()=>{
		 const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	 }

    onSubmit=(values)=>{
		const {
			onSubmit
		} = this.props;
		console.log("KKKKKK",values)
		onSubmit && onSubmit();
	}
	componentDidMount() {
		Store.dispatch(change('RadioBug','wsenabled',false));
	}



	render() {


		let {handleSubmit}=this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit)} >
				<KrField grid={1/2} style={{width:262,marginLeft:'30px'}} name="wsenabled" component="group" label="多文件上传 " requireLabel={true}>
                    <KrField name="wsenabled" label="允许" type="radio" value={true} />
                    <KrField name="wsenabled" label="禁止" type="radio" value={false} />
                </KrField>
                 <ButtonGroup>
                    <Button  label="确定" type="submit"/>
                    <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
                </ButtonGroup>
			</form>

		);
	}
}

export default reduxForm({
	form: 'RadioBug'
})(RadioBug);

  