import React, {Component, PropTypes} from 'react';

import CompanyListFilter from './Filter';
import CompanyListResult from './Result';

import './index.less';


export default class CompanyList extends Component {

    constructor(props) {
        super(props);
    }

	render() {

		return (

			<div className="g-compnay-list">

				<CompanyListFilter/>
				<CompanyListResult companys={[]}/>

			</div>

		);
	}
}





