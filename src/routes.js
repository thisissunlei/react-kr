import React from 'react';

import { Router, Route, Link,IndexRoute,browserHistory} from 'react-router';




import Home from './Components/Home';
import About from './Components/About';


import CompanyIndex from './Components/Company';
import CompanyList from './Containers/CompanyList';


import Header from './Components/Global/Header';
import Footer from './Components/Global/Footer';


const App = React.createClass({

	render() {

		return (
			<div className="main-content">
				<Header/>
				{this.props.children}
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

		<Route path="about" component={About}/>
		<Route path="index" component={Home}/>

	</Route>

);
