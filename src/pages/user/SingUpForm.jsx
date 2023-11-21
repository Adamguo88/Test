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

  // 自定義ahooks，主要功能用於，當我拿到(API)之後，使用useWatchForm篩選，判斷這筆(API)是否有關聯表單，有的話返回所有的關聯表單的list
  const { relation } = useWatchForm(isData?.template, form); // 獲取有關聯表單的form value

  // const result = Form.useWatch([], form);
  // console.log(result);

  const onFinish = (values) => {
    console.log(values);
  };

  const onValuesChange = (values) => {
    // 當每次form 發生變化的時候監聽，此次的form表單裡面的值是否有關聯表單
    if (relation.length >= 1) {
      // 如果有的話，篩選判斷發生當前變化form的值(key)，是否包含在我的ahooks值裡面
      const getValuesKey = Object.keys(values)?.[0];
      const isRelationItem = relation.find((item) => item.id === getValuesKey);

      // 如果當前變化的值，包含在我的ahooks裡面的話
      if (!!isRelationItem) {
        console.log(values);
        const getValue = Object.values(values)?.[0];
        // isRelationItem.relation -> 獲得所有資料中有關聯表單的值，並且獲取 【relationID(關聯表單的lable), relationValue('值')】
        const { relationID, relationValue } = isRelationItem.relation;
        // 如果關聯表單中的值(relationValue) 等於 我當前的values，表示【隱藏】當前關聯表單中的選單
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
