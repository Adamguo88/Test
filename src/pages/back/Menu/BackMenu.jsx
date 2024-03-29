import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Space } from "antd";

import { useSelector } from "react-redux/es/hooks/useSelector";

export default function BackMenu({ setIsShowTemplate }) {
  const navigate = useNavigate();
  const getTemplate = useSelector((state) => state.AddTemplate.template);

  const [isTemplate, setIsTemplate] = useState([]); //儲存check狀態

  const getCheckTemplate = (values) => {
    // console.log(values);
    setIsShowTemplate(values.flat(Infinity));
  };

  useEffect(() => {
    setIsTemplate(getTemplate);
  }, [getTemplate]);
  return (
    <div
      style={{
        width: "256px",
        maxWidth: "256px",
        minHeight: "calc( 100vh - 46px )",
        backgroundColor: "#001529",
        color: "white",
      }}
    >
      <div
        className="width100"
        style={{
          position: "sticky",
          top: "0px",
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
              <Space.Compact
                className="width100 flex justifyBetween"
                key={index}
              >
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

        <div
          className="mt-10 mb-10 fw-900 fz-18"
          style={{
            borderTop: "3px solid white",
            borderBottom: "3px solid white",
          }}
        >
          拖曳模板編輯
        </div>
        <Button
          type="primary"
          block
          onClick={() => navigate("/back/addDragTemplate")}
          className="mb-10"
        >
          測試拖曳模板
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
              <Space.Compact
                className="width100 flex justifyBetween"
                key={index}
              >
                <Checkbox value={item.template}>{item.title}</Checkbox>
                <Button
                  type="primary"
                  onClick={() => {
                    navigate(`/back/addDragTemplate?templateID=${item.id}`);
                  }}
                >
                  編輯
                </Button>
              </Space.Compact>
            );
          })}
        </Checkbox.Group>
      </div>
    </div>
  );
}
