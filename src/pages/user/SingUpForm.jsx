import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Form, Row, Col, Input, Radio, Checkbox, Select, Button } from "antd";

export default function SingUpForm() {
  const [form] = Form.useForm();
  const location = useLocation();
  const [isData, setIsData] = useState(null);
  const getTemplateData = useSelector((state) => state.NewRelease.template);

  const onFinish = (values) => {
    console.log(values);
  };

  useEffect(() => {
    const search = location.search?.split("?templateID=")[1];
    const getData = getTemplateData.find((item) => item.id === search);
    setIsData(getData);
  }, [location, getTemplateData]);
  return (
    <div className="max-width1500 mr-auto">
      <div className="mt-20">
        <Form
          form={form}
          layout="vertical"
          className="width100"
          onFinish={onFinish}
        >
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <span className="fz-20 fw-900">{isData?.templateName}</span>
            </Col>
            <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
              <Form.Item name="name" label="姓名">
                <Input />
              </Form.Item>
            </Col>
            <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
              <Form.Item name="phone" label="聯絡電話">
                <Input />
              </Form.Item>
            </Col>
            <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
              <Form.Item name="gender" label="性別">
                <Radio.Group
                  options={[
                    {
                      label: "男",
                      value: "1",
                    },
                    {
                      label: "女",
                      value: "0",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            {isData?.template?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {item?.template?.map((template, i) => {
                    return (
                      <Col span={8} key={i}>
                        {template.type === "Input" ? (
                          <Form.Item
                            label={template.title}
                            name={template.type + index + 1}
                          >
                            <Input />
                          </Form.Item>
                        ) : null}
                        {template.type === "Radio" ? (
                          <Form.Item
                            label={template.title}
                            name={template.type + index + 1}
                          >
                            <Radio.Group>
                              {template.options.map((radio) => {
                                return (
                                  <Radio value={radio.value} key={radio.value}>
                                    {radio.label}
                                  </Radio>
                                );
                              })}
                            </Radio.Group>
                          </Form.Item>
                        ) : null}
                        {template.type === "Checkbox" ? (
                          <Form.Item
                            label={template.title}
                            name={template.type + index + 1}
                          >
                            <Checkbox.Group className="flex">
                              {template.options.map((ch) => {
                                return (
                                  <Checkbox
                                    className="templateCheckbox"
                                    key={ch.value}
                                    value={ch.value}
                                  >
                                    {ch.label}
                                  </Checkbox>
                                );
                              })}
                            </Checkbox.Group>
                          </Form.Item>
                        ) : null}
                        {template.type === "Select" ? (
                          <Form.Item
                            label={template.title}
                            name={template.type + index + 1}
                          >
                            <Select options={template.options} />
                          </Form.Item>
                        ) : null}
                      </Col>
                    );
                  })}
                </React.Fragment>
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