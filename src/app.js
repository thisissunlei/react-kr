import React from 'react';
import { Router, Route, Link,IndexRoute,browserHistory} from 'react-router';

import Home from './Components/Home';
import About from './Components/About';

import Header from './Components/Global/Header';

import ReactDOM from 'react-dom';

const App = React.createClass({

	render() {

		return (
			<div>
				<Header/>
				{this.props.children}
			</div>
		)
	}
})


ReactDOM.render((

	<Router history={browserHistory} >

	<Route path="/" component={App}>

	<IndexRoute component={Home}/>

	<Route path="about" component={About}/>
	<Route path="index" component={Home}/>



	</Route>

	</Router>
), document.getElementById('app'))



