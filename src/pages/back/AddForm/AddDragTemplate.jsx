import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Row, Col, Input, Space, Switch } from "antd";
import { v4 } from "uuid";

const addType = [
  {
    label: "文字框",
    value: "Input",
  },
  {
    label: "單選框",
    value: "Radio",
  },
  {
    label: "多選框",
    value: "Checkbox",
  },
  {
    label: "選擇欄",
    value: "Select",
  },
];
export default function AddDragTemplate() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [isSample, setIsSample] = useState([]);

  const handleAddTemplate = (values) => {
    const templateData = {
      id: v4(),
      type: values,
      required: false,
      options: [],
    };
    setIsSample((data) => [templateData, ...data]);
  };

  const addNewTemplate = (values) => {
    console.log(values);
    console.log(isSample);
  };
  const handleDeleteTemplate = (id) => {
    const deleteData = isSample.filter((item) => item.id !== id);
    setIsSample(deleteData);
  };

  return (
    <div className="width100 flex">
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
          onClick={() => navigate(-1)}
          block
          className="mt-5 mb-5"
        >
          返回
        </Button>
        {addType.map((item) => {
          return (
            <Button
              key={item.value}
              type="primary"
              block
              className="mt-5 mb-5"
              onClick={() => handleAddTemplate(item.value)}
            >
              新增{item.label}
            </Button>
          );
        })}
      </div>
      <div
        className="p-10-15"
        style={{
          width: "calc(100% - 256px)",
        }}
      >
        <Form form={form} onFinish={addNewTemplate}>
          <Row gutter={[12, 12]} className="width100">
            <Col span={24}>
              <Button type="primary">新增問項</Button>
            </Col>
            <Col span={24} className="flex flex-column">
              <Form.Item
                name="templateTitle"
                label="模板名稱"
                className="margin0"
                rules={[
                  {
                    required: true,
                    message: "此欄位不得為空",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <div
                className="mt-10 mb-10"
                style={{
                  height: "2px",
                  background: "black",
                }}
              />
            </Col>
            <Col span={24}>
              <span className="fz-26 fw-800">預覽模板</span>
            </Col>

            {isSample?.map((item, index) => {
              return (
                <Col
                  span={24}
                  key={item.id}
                  className="width100 flex newTemplateBorder p-10"
                >
                  <Col span={18}>
                    {item.type === "Input" ? (
                      <div className="width100 flex flex-column">
                        <span className="fz-18 fw-900">類型:{item.type}</span>
                        <Form.Item
                          label="選單名稱"
                          name={item.id + "-Golden-Template-Title"}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="是否必填"
                          name={item.id + "-Golden-Switch"}
                          valuePropName="checked"
                        >
                          <Switch
                            onChange={(value) => {
                              const change = isSample;
                              isSample[index].required = value;
                              setIsSample(change);
                            }}
                          />
                        </Form.Item>
                      </div>
                    ) : null}
                    {item.type === "Radio" ? (
                      <div className="width100 flex flex-column">
                        <span className="fz-18 fw-900">類型:{item.type}</span>
                        <Form.Item
                          label="選單名稱"
                          name={item.id + "-Golden-Template-Title"}
                        >
                          <Input />
                        </Form.Item>
                        <Form.List
                          name={item.id + "-Golden-" + item.type}
                          initialValue={
                            item.options.length <= 0 ? [0] : item.options
                          }
                        >
                          {(fields, { add, remove }) => (
                            <div className="width100">
                              {fields.map((field) => {
                                return (
                                  <Space.Compact block key={field.key}>
                                    <Form.Item
                                      label={`新增選項`}
                                      name={[field.name, "name"]}
                                      className="width100"
                                      rules={[
                                        {
                                          required: true,
                                          message: "此欄位不得為空",
                                        },
                                      ]}
                                    >
                                      <Input />
                                    </Form.Item>
                                    {field.name === 0 ? null : (
                                      <Button
                                        type="primary"
                                        onClick={() => remove(field.name)}
                                      >
                                        刪除
                                      </Button>
                                    )}
                                  </Space.Compact>
                                );
                              })}
                              <Button type="primary" onClick={() => add()}>
                                新增欄位
                              </Button>
                            </div>
                          )}
                        </Form.List>
                        <Form.Item
                          label="是否必填"
                          name={item.id + "-Golden-Switch"}
                          valuePropName="checked"
                        >
                          <Switch
                            onChange={(value) => {
                              const change = isSample;
                              isSample[index].required = value;
                              setIsSample(change);
                            }}
                          />
                        </Form.Item>
                      </div>
                    ) : null}
                    {item.type === "Checkbox" ? (
                      <div className="width100 flex flex-column">
                        <span className="fz-18 fw-900">類型:{item.type}</span>
                        <Form.Item
                          label="選單名稱"
                          name={item.id + "-Golden-Template-Title"}
                        >
                          <Input />
                        </Form.Item>
                        <Form.List
                          name={item.id + "-Golden-" + item.type}
                          initialValue={
                            item.options.length <= 0 ? [0] : item.options
                          }
                        >
                          {(fields, { add, remove }) => (
                            <div className="width100">
                              {fields.map((field) => {
                                return (
                                  <Space.Compact block key={field.key}>
                                    <Form.Item
                                      label={`新增選項`}
                                      name={[field.name, "name"]}
                                      className="width100"
                                      rules={[
                                        {
                                          required: true,
                                          message: "此欄位不得為空",
                                        },
                                      ]}
                                    >
                                      <Input />
                                    </Form.Item>
                                    {field.name === 0 ? null : (
                                      <Button
                                        type="primary"
                                        onClick={() => remove(field.name)}
                                      >
                                        刪除
                                      </Button>
                                    )}
                                  </Space.Compact>
                                );
                              })}
                              <Button type="primary" onClick={() => add()}>
                                新增欄位
                              </Button>
                            </div>
                          )}
                        </Form.List>
                        <Form.Item
                          label="是否必填"
                          name={item.id + "-Golden-Switch"}
                          valuePropName="checked"
                        >
                          <Switch
                            onChange={(value) => {
                              const change = isSample;
                              isSample[index].required = value;
                              setIsSample(change);
                            }}
                          />
                        </Form.Item>
                      </div>
                    ) : null}
                    {item.type === "Select" ? (
                      <div className="width100 flex flex-column">
                        <span className="fz-18 fw-900">類型:{item.type}</span>
                        <Form.Item
                          label="選單名稱"
                          name={item.id + "-Golden-Template-Title"}
                        >
                          <Input />
                        </Form.Item>
                        <Form.List
                          name={item.id + "-Golden-" + item.type}
                          initialValue={
                            item.options.length <= 0 ? [0] : item.options
                          }
                        >
                          {(fields, { add, remove }) => (
                            <div className="width100">
                              {fields.map((field) => {
                                return (
                                  <Space.Compact block key={field.key}>
                                    <Form.Item
                                      label={`新增選項`}
                                      name={[field.name, "name"]}
                                      className="width100"
                                      rules={[
                                        {
                                          required: true,
                                          message: "此欄位不得為空",
                                        },
                                      ]}
                                    >
                                      <Input />
                                    </Form.Item>
                                    {field.name === 0 ? null : (
                                      <Button
                                        type="primary"
                                        onClick={() => remove(field.name)}
                                      >
                                        刪除
                                      </Button>
                                    )}
                                  </Space.Compact>
                                );
                              })}
                              <Button type="primary" onClick={() => add()}>
                                新增欄位
                              </Button>
                            </div>
                          )}
                        </Form.List>
                        <Form.Item
                          label="是否必填"
                          name={item.id + "-Golden-Switch"}
                          valuePropName="checked"
                        >
                          <Switch
                            onChange={(value) => {
                              const change = isSample;
                              isSample[index].required = value;
                              setIsSample(change);
                            }}
                          />
                        </Form.Item>
                      </div>
                    ) : null}
                  </Col>
                  <Col span={6} className="flex justifyEnd alignStart">
                    <Button
                      type="primary"
                      danger
                      onClick={() => handleDeleteTemplate(item.id)}
                    >
                      刪除
                    </Button>
                  </Col>
                </Col>
              );
            })}

            <Col span={24} className="flex justifyEnd">
              <Button type="primary" htmlType="submit">
                送出
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
