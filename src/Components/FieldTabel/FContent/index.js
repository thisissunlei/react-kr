import React from 'react';
import KrDate from '../../KrDate';
export default class FContent extends React.Component {


  constructor(props) {
    super(props);
  }


  rowCheck = (event) =>{
    const {index,onCheck} = this.props;
    onCheck && onCheck(index,event.target.checked);

  }
  contentRender = () =>{
    const {data,detail,checkbox} = this.props;
    var doms = detail.map((item,index)=>{
			if (item.type == 'date' && !(item.component)) {
				return (
					<td>
						<KrDate value={data[item.name]} format={item.format} />
					</td>
				);
			}

      if (item.type === 'operation' && typeof (item.component) === 'function'){

         return (
          <td>
              {
                item.component()
              }
          </td>
        );
      }
      return (
        <td>
          {item.checkbox && <input
              key={index}
              type="checkbox"
              onChange={(event) =>{
                  this.onCheck(event,item,index)
              }}
              checked = {item.checked ? "checked":""}
          />}
          {data[item.name]}
        </td>
      )
    })
    if(checkbox){
      doms.unshift(
         <td>
              <input
                    type="checkbox"
                    onChange={(event) =>{
                        this.rowCheck(event)
                    }}
                    checked = {data.checked ? "checked":""}
                />
            </td>
      )
    }
    return doms;
  }

  render() {
    return (
      <tr>
        {this.contentRender()}
      </tr>
    );
  }
}
