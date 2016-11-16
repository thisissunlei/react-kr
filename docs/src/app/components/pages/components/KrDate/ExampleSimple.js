import React from 'react';

import {
  KrDate
} from 'kr-ui';


export default class AppBarExampleSimple extends React.Component{


    render(){


        return (

            <div>
             <KrDate value="" defaultValue="无" format="yyyy-mm-dd"/>
            </div>
        );
    }

}
