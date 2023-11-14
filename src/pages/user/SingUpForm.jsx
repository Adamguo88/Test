import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Form, Row, Col, Input, Radio, Checkbox, Select, Button } from "antd";
import { useWatchForm } from "ahooks/UseWatchForm";

export default function SingUpForm() {
  const [form] = Form.useForm();

  const location = useLocation();
  const [isData, setIsData] = useState(null);
  const [isHide, setIsHide] = useState({});
  const getTemplateData = useSelector((state) => state.NewRelease.template);

  const { relation } = useWatchForm(isData?.template, form);

  // const result = Form.useWatch([], form);
  // console.log(result);

  const onFinish = (values) => {
    console.log(values);
  };

  const onValuesChange = (values) => {
    if (relation.length >= 1) {
      const getValuesKey = Object.keys(values)?.[0];
      const isRelationItem = relation.find((item) => item.id === getValuesKey);
      if (!!isRelationItem) {
        const getValue = Object.values(values)?.[0];
        const { relationID, relationValue } = isRelationItem.relation;
        if (relationValue === getValue) {
          setIsHide((data) => ({
            ...data,
            [relationID]: {
              hide: true,
            },
          }));
        } else {
          setIsHide((data) => ({
            ...data,
            [relationID]: {
              hide: false,
            },
          }));
        }
      }
    }
  };

  useEffect(() => {
    const search = location.search?.split("?templateID=")[1];
    const getData = getTemplateData.find((item) => item.id === search);
    setIsData(getData);
  }, [location, getTemplateData]);
  return (
    <div className="max-width1500 mr-auto">
      <div className="mt-20">
        <Form form={form} layout="vertical" className="width100" onFinish={onFinish} onValuesChange={onValuesChange}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <span className="fz-20 fw-900">{isData?.templateName}</span>
            </Col>
            <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
              <Form.Item
                name="name"
                label="姓名"
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
            <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
              <Form.Item
                name="phone"
                label="聯絡電話"
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
            <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
              <Form.Item
                name="gender"
                label="性別"
                rules={[
                  {
                    required: true,
                    message: "此欄位不得為空",
                  },
                ]}
              >
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
            {isData?.template?.map((template, index) => {
              return (
                <Col span={8} key={index}>
                  {template.type === "Input" ? (
                    <Form.Item
                      label={template.ud}
                      name={template.id}
                      rules={[
                        {
                          required: template.required,
                          message: "此欄位不得為空",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  ) : null}
                  {template.type === "Radio" ? (
                    <Form.Item
                      label={template.title}
                      name={template.id}
                      rules={[
                        {
                          required: template.required,
                          message: "此欄位不得為空",
                        },
                      ]}
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
                      name={template.id}
                      rules={[
                        {
                          required: template.required,
                          message: "此欄位不得為空",
                        },
                      ]}
                    >
                      <Checkbox.Group className="flex">
                        {template.options.map((ch) => {
                          return (
                            <Checkbox className="templateCheckbox" key={ch.value} value={ch.value}>
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
                      name={template.id}
                      rules={[
                        {
                          required: template.required,
                          message: "此欄位不得為空",
                        },
                      ]}
                      hidden={template?.openRelation ? isHide[template.id]?.hide : false}
                    >
                      <Select options={template.options} />
                    </Form.Item>
                  ) : null}
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
