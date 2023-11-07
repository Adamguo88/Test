import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Row, Col, Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function SingUp() {
  const navigate = useNavigate();
  const getRelease = useSelector((state) => state.NewRelease.template);
  const [isShowRelease, setIsShowRelease] = useState([]);
  const singUp = (value) => {
    navigate(`/user/signUpFrom?templateID=${value}`);
  };
  useEffect(() => {
    setIsShowRelease(getRelease);
  }, [getRelease]);
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
              <Button type="primary" onClick={() => singUp(item.id)}>
                報名
              </Button>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
