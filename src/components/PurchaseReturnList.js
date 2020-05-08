import React, { Component } from "react";
import { Table, Divider, Tag } from "antd";
import { NavLink } from "react-router-dom";
import { getPurchaseReturnHistory } from "../Api/ApiFetch";
import moment from "moment";
const styles = {
  _root: {
    padding: "1%"
  },
  _rootMain: {
    padding: "1%",
    background: "#FFFFFF",
    borderRadius: "5px",
    height: "80vh",
    overflowX: "auto"
  }
};

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];

type State = {
  vendorPurchaseHistoryTable: Array<Object>
};

export default class PurchaseReturnList extends Component {
  constructor() {
    super();
    this.state = {
      purchaseReturnHistory: []
    };
    this.columns = [
      {
        title: "S.No",
        dataIndex: "name",
        key: "name",
        render: (text, rowData, index) => <span>{index + 1}</span>
      },
      {
        title: "Product",
        dataIndex: "productName",
        key: "productName"
      },
      {
        title: "returnQuantity",
        dataIndex: "returnQuantity",
        key: "returnQuantity"
      },

      {
        title: "batchNo",
        dataIndex: "batchNo",
        key: "batchNo"
      },
      {
        title: "expiryDate",
        dataIndex: "expiryDate",
        key: "expiryDate",
        render: data => <span>{moment(data).format("DD-MM-YYYY")}</span>
      },
      {
        title: "amount",
        dataIndex: "amount",
        key: "amount"
      }
    ];
  }
  componentWillMount() {
    this.purchaseReturnHistoryListFunc();
  }

  purchaseReturnHistoryListFunc = () => {
    let startDate = 0,
      self = this;
    let endDate = 0;
    let purchaseReturnHistoryarr = [];
    let purchaseReturnHistoryObj: {};
    let purchaseReturnHistoryTable = [];
    let returnDetailObj = {},
      returnDetailArr = [];
    let purchaseReturnId = parseInt(this.getUrlVars()["purchaseReturnId"]);
    getPurchaseReturnHistory(purchaseReturnId, 0, 0, 0).then(response => {
      if (response != undefined && response.response != undefined) {
        purchaseReturnHistoryarr = response.response;
        purchaseReturnHistoryarr.forEach(function(data) {
          if (data.purchase.billRelation.length > 0) {
            data.returnDetail.forEach(function(iter) {
              purchaseReturnHistoryObj = {
                returnQuantity: iter.returnQuantity,
                expiryDate: iter.purchaseDetail.expiryDate,
                batchNo: iter.purchaseDetail.batchNo,
                productName: iter.purchaseDetail.product.productName,
                amount: iter.purchaseDetail.totalAmount
              };
              purchaseReturnHistoryTable.push(purchaseReturnHistoryObj);
            });
          }
        });
        this.setState({ purchaseReturnHistory: purchaseReturnHistoryTable });
      }
    });
  };

  getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function(m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  }

  render() {
    return (
      <div style={styles._root}>
        <div style={styles._rootMain}>
          <Table
            style={{ background: "#FFFFFF", border: "1px solid #e9e9e9" }}
            columns={this.columns}
            scroll={{ x: true }}
            dataSource={this.state.purchaseReturnHistory}
          />
        </div>
      </div>
    );
  }
}
