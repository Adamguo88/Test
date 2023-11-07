import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Space } from "antd";

import { useSelector } from "react-redux/es/hooks/useSelector";

export default function BackMenu({ setIsShowTemplate }) {
  const navigate = useNavigate();
  const getTemplate = useSelector((state) => state.AddTemplate.template);

  const [isTemplate, setIsTemplate] = useState([]); //儲存check狀態

  const getCheckTemplate = (values) => {
    console.log(values);
    setIsShowTemplate(values);
  };

  useEffect(() => {
    setIsTemplate(getTemplate);
  }, [getTemplate]);
  return (
    <div
      style={{
        width: "256px",
        maxWidth: "256px",
        height: "calc( 100vh - 46px )",
        backgroundColor: "#001529",
        color: "white",
        padding: "10px 15px",
      }}
    >
      <Button
        type="primary"
        block
        onClick={() => navigate("/back/addForm")}
        className="mb-10"
      >
        新增模板
      </Button>
      <Checkbox.Group
        className="width100"
        style={{
          color: "white",
        }}
        onChange={getCheckTemplate}
      >
        {isTemplate.map((item, index) => {
          return (
            <Space.Compact className="width100 flex justifyBetween" key={index}>
              <Checkbox value={item.template}>{item.title}</Checkbox>
              <Button
                type="primary"
                onClick={() => {
                  navigate(`/back/addForm?templateID=${item.id}`);
                }}
              >
                編輯
              </Button>
            </Space.Compact>
          );
        })}
      </Checkbox.Group>
    </div>
  );
}
