import mobx, {
	observable,
	action,
} from 'mobx';
import {reduxForm,initialize} from 'redux-form';
import {Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import {Message} from 'kr-ui';
let State = observable({
	openCreate:false
});

State.getNewsDate = action(function(id) {
	var _this = this;
	Http.request('get-news-detail', {id:id}).then(function(response) {
		_this.newsDate=response;
		_this.newsDetail = response.newsContent;
		Store.dispatch(initialize('editNewList',response));
	}).catch(function(err) {
		Message.error(err.message);
	});

});



module.exports = State;
