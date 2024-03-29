import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Dropdown } from "antd";

const items = [
  {
    key: "1",
    label: "全支付",
  },
  {
    key: "2",
    label: "綠界",
  },
];
export default function Registered() {
  const [isShowRelease, setIsShowRelease] = useState([]);

  useEffect(() => {
    const fakeData = [
      {
        templateName: "寵物展",
        status: "1",
        pay: ["全支付", "綠界"],
      },
      {
        templateName: "飲料展",
        status: "0",
        pay: ["全支付", "綠界"],
      },
    ];
    setIsShowRelease(fakeData);
  }, []);
  return (
    <Row gutter={[24, 24]} className="pt-20 width100">
      {isShowRelease.map((item, index) => {
        return (
          <Col span={8} key={index}>
            <Card
              title={item.templateName}
              style={{
                borderColor: "black",
              }}
            >
              {item.status === "1" ? (
                <Button type="primary" disabled>
                  審核中
                </Button>
              ) : (
                <Dropdown menu={{ items }} placement="bottom">
                  <Button type="primary">支付方式</Button>
                </Dropdown>
              )}
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
