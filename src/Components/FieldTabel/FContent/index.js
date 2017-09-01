import React from 'react';
import KrDate from '../../KrDate';
export default class FContent extends React.Component {


  constructor(props) {
    super(props);
  }

  //格式处理
  onFormatData = (value)=>{

		const {onFormatData} = this.props;

		if(typeof onFormatData === 'function'){
				value = onFormatData(value);
		}
		return value;
	}


  renderValue = (value,itemData,options,defaultValue)=>{

		let oldValue = value;

    //数据格式处理
    value = this.onFormatData(value);

		if (options && options.length) {
			options.map(function(item, index) {
				if (item.value == value) {
					value = item.label;
				}
			});
		}

		if(typeof component === 'function'){
		 	return component(value,oldValue,itemData);
		}

		return value ||defaultValue;

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
					<td key = {index}>
						<KrDate value={data[item.name]} format={item.format} />
					</td>
				);
			}

      if (item.type === 'operation' && typeof (item.component) === 'function'){
         return (
          <td>
              {
                item.component(data)
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
          {this.renderValue(data[item.name],data,item.options,item.defaultValue)}
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
