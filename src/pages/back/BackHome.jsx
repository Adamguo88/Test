import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Radio, Button, Checkbox, Select } from "antd";
import { useDispatch } from "react-redux";
import { setNewTemplate } from "redux/actions/NewRelease";
import BackMenu from "./Menu/BackMenu";
import { v4 } from "uuid";
export default function Index() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isShowTemplate, setIsShowTemplate] = useState([]);

  const releaseTemplate = (values) => {
    const sendTemplate = {
      id: v4(),
      templateName: values.templateName,
      payType: values.payType,
      template: isShowTemplate,
    };
    dispatch(setNewTemplate(sendTemplate));
  };

  useEffect(() => {
    form.setFieldsValue({
      payType: "1",
    });
  }, [form]);

  return (
    <div className="width100 flex">
      <BackMenu setIsShowTemplate={setIsShowTemplate} />
      <div
        style={{
          width: "calc(100vw - 256px)",
          padding: "10px 15px",
          height: "100%",
        }}
      >
        <Form
          form={form}
          layout="vertical"
          className="width100"
          onFinish={releaseTemplate}
        >
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <span className="fz-20 fw-800">基本資料</span>
            </Col>
            <Col span={24}>
              <Form.Item
                label="問卷名稱"
                name="templateName"
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
            {/* <Col span={8}>
              <Form.Item name="name" label="姓名">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="phone" label="聯絡電話">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
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
            </Col> */}
            <Col span={24}>
              <Form.Item label="繳費類型" name="payType">
                <Radio.Group
                  options={[
                    {
                      label: "立即",
                      value: "1",
                    },
                    {
                      label: "審核",
                      value: "2",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <div
                style={{
                  height: "2px",
                  background: "black",
                }}
              ></div>
              <span className="fz-24 fw-900">預覽</span>
            </Col>
            {isShowTemplate?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {item?.map((template, i) => {
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

            <Col span={24} className="width100 flex justifyEnd">
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
