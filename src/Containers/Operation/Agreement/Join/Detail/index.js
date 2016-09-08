import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import Section from 'kr-ui/Section';

import {Row,Col} from 'kr-ui/Grid';

import {GridList, GridTile} from 'material-ui/GridList';

export default class Basic extends Component {

	constructor(props,context){
		super(props, context);
	}

  componentWillMount() {

  }

  render() {


    return (

      <div>
					<Section title="入驻协议书" description=""> 

						<Row>
							<Col>hahhaah</Col>
							<Col>hahhaah</Col>
						</Row>

					</Section>

      </div>
    );
  }
}
