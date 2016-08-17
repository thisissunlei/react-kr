import React, {Component, PropTypes} from 'react';



import Header from './Components/Global/Header';
import Footer from './Components/Global/Footer';

export default class Master extends Component {
  componentWillMount() {
  }

  componentWillReceiveProps(nextProps, nextContext) {
  }

  render() {

    return (
      <div>
				<Header/>

				<div className="container">
					{this.props.children}
				</div>

				<Footer/>
      </div>
    );
  }
}

