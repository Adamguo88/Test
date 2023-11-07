import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "./loading.css";

export default function Loading() {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 100,
        color: "black",
      }}
      spin
    />
  );
  return (
    <div
      className="api-loading"
      style={{ height: "calc(100vh - 64px - 51px - 82px - 80px - 100px)" }}
    >
      <Spin indicator={antIcon} />
    </div>
  );
}
