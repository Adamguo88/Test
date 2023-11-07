import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Dropdown } from "antd";

const items = [
  {
    key: "1",
    label: "linePay",
  },
  {
    key: "2",
    label: "全支付",
  },
  {
    key: "1",
    label: "ETC",
  },
];
export default function Registered() {
  const [isShowRelease, setIsShowRelease] = useState([]);

  useEffect(() => {
    const fakeData = [
      {
        templateName: "寵物展",
        status: "1",
        pay: ["linePay", "全支付", "ETC"],
      },
      {
        templateName: "飲料展",
        status: "0",
        pay: ["linePay", "全支付", "ETC"],
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
