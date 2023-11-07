import React, { useState } from "react";
import SingUp from "./SingUp";
import Registered from "./Registered";
import { Button, Space } from "antd";

export default function Home() {
  const [isComponents, setIsComponents] = useState("1");
  return (
    <div className="width100 height100vh">
      <div className="max-width1500 mr-auto">
        <div className="width100 mt-20">
          <Space.Compact block>
            <Button
              type={isComponents === "1" ? "primary" : "default"}
              onClick={() => setIsComponents("1")}
            >
              報名
            </Button>
            <Button
              type={isComponents === "2" ? "primary" : "default"}
              onClick={() => setIsComponents("2")}
            >
              已報名
            </Button>
          </Space.Compact>
          {isComponents === "1" ? <SingUp /> : <Registered />}
        </div>
      </div>
    </div>
  );
}
