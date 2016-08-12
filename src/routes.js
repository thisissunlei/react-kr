import React from 'react';

import { Router, Route, Link,IndexRoute,browserHistory} from 'react-router';

import Home from './Components/Home';


import CompanyIndex from './Components/Company';
import CompanyList from './Containers/CompanyList';


import Header from './Components/Global/Header';
import Footer from './Components/Global/Footer';


const App = React.createClass({

	render() {

		return (
			<div>

				<Header/>

				<div className="container">
					{this.props.children}
				</div>

				<Footer/>

			</div>
		)
	}
})



export default(

	<Route path="/" component={App}>

	<IndexRoute component={CompanyList}/>

	<Route path="company" component={CompanyIndex}>
		<Route path="list" component={CompanyList}/>
	</Route>

	<Route path="index" component={Home}/>

	</Route>

);
