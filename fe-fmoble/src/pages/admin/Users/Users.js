import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Space, Table, Tag } from "antd";
import dateFormat from "dateformat";

import { getListUser } from "../../../functions/user";

const Users = () => {
  const [getUser, setListUser] = useState([]);
  useEffect(() => {
    getListUser().then((res) => {
      console.log("res", res);
      setListUser(res);
    });
  }, []);
  console.log("users", getUser);

  const data = getUser?.map((u, i) => {
    return {
      key: i + 1,
      name: u?.name,
      email: u?.email,
      address: u?.address,
      createdAt: dateFormat(u?.createdAt, "dd/mm/yyyy - HH:MM"),
      tags: [u?.role],
    };
  });
  // {
  //   key: "2",
  //   name: "Jim Green",
  //   age: 42,
  //   address: "London No. 1 Lake Park",
  //   tags: ["nice"],
  // },
  // {
  //   key: "3",
  //   name: "Joe Black",
  //   age: 32,
  //   address: "Sydney No. 1 Lake Park",
  //   tags: ["cool", "teacher"],
  // },

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: 50,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 70,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      width: 270,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      // width: 340,
    },
    {
      title: "role",
      key: "tags",
      dataIndex: "tags",
      width: 100,
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            console.log("tag", tag);
            let color = tag === "admin" ? "geekblue" : "green";
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
      title: "Ngày tạo tài khoản",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 200,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Link>
            <Button danger>Cập nhật</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Users;
