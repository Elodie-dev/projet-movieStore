import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    if(column.path === "isAdmin") return item.isAdmin ? "Admin" : "Utilisateur";
    return _.get(item, column.path);
  };

  createKey = (i, column) => {
    return i + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item, i) => (
          <tr key={i}>
            {columns.map((column) => (
              <td key={this.createKey(i, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
