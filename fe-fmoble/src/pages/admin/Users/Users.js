import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Space, Table, Tag } from "antd";
import { getListUser } from "../../../functions/user";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];

const Users = () => {
  const data = [
    getUser.map(item) =>({
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    })
  ];
  const [getUser, setListUser] = useState([]);
  useEffect(() => {
    getListUser().then((res) => {
      console.log("res", res);
      setListUser(res);
    });
  }, []);
  console.log("users", getUser);
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Users;
