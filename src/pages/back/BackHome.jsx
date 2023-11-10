import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Radio, Button, Checkbox, Select } from "antd";
import { useDispatch } from "react-redux";
import { setNewTemplate } from "redux/actions/NewRelease";
import BackMenu from "./Menu/BackMenu";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
export default function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const watchPayType = Form.useWatch("payType", form);

  const [isShowTemplate, setIsShowTemplate] = useState([]);
  const [isPaySelect, setIsPaySelect] = useState(false);

  const [isSaveDrag, setIsSaveDrag] = useState({ start: {}, end: {} });

  const releaseTemplate = (values) => {
    const sendTemplate = {
      id: v4(),
      templateName: values.templateName,
      payType: values.payType,
      template: isShowTemplate,
    };
    dispatch(setNewTemplate(sendTemplate));
    alert("新增成功");
    navigate("/user");
  };
  const handleChange = (values) => {
    console.log(values);
    console.log(isShowTemplate);
  };

  const handleDragList = {
    tableDragStart: (_, id, index) => {
      setIsSaveDrag((data) => ({ ...data, start: { ...id, key: index } }));
    },
    tableDragOver: (e) => {
      e.preventDefault();
    },
    tableDrag: (e, id, index) => {
      e.preventDefault();
      setIsSaveDrag((data) => ({ ...data, end: { ...id, key: index } }));
    },
  };

  useEffect(() => {
    const startID = isSaveDrag.start.id;
    const endID = isSaveDrag.end.id;

    if (startID === endID || !startID || !endID) {
      return;
    }
    // console.log(isSaveDrag);
    const cacheData = isShowTemplate;
    [cacheData[isSaveDrag?.start?.key], cacheData[isSaveDrag?.end?.key]] = [
      cacheData[isSaveDrag?.end?.key],
      cacheData[isSaveDrag?.start?.key],
    ];
    setIsShowTemplate(cacheData);
    setIsSaveDrag({ start: {}, end: {} });
  }, [isSaveDrag, isShowTemplate]);

  useEffect(() => {
    if (watchPayType === "1") {
      setIsPaySelect(true);
      form.setFieldsValue({
        payList: "1",
      });
    } else {
      setIsPaySelect(false);
    }
  }, [watchPayType, form]);

  useEffect(() => {
    form.setFieldsValue({
      payType: "2",
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
          onValuesChange={handleChange}
        >
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <span className="fz-20 fw-800">基本資料</span>
            </Col>
            <Col span={24}>
              <Form.Item
                label="活動名稱"
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
            {isPaySelect ? (
              <Col span={24}>
                <Form.Item label="繳費類型" name="payList">
                  <Checkbox.Group
                    className="templateCheckbox"
                    style={{ color: "black" }}
                    options={[
                      {
                        label: "全支付",
                        value: "1",
                      },
                      {
                        label: "綠界",
                        value: "2",
                      },
                    ]}
                  ></Checkbox.Group>
                </Form.Item>
              </Col>
            ) : null}

            <Col span={24}>
              <div
                style={{
                  height: "2px",
                  background: "black",
                }}
              ></div>
              <span className="fz-24 fw-900">預覽</span>
            </Col>
            {isShowTemplate?.map((template, index) => {
              return (
                <Col
                  span={8}
                  key={index}
                  className="btn-pointer"
                  draggable={isShowTemplate?.length !== 1}
                  onDrop={(e) => handleDragList.tableDrag(e, template, index)}
                  onDragStart={(e) =>
                    handleDragList.tableDragStart(e, template, index)
                  }
                  onDragOver={(e) =>
                    handleDragList.tableDragOver(e, template, index)
                  }
                >
                  {template.type === "Input" ? (
                    <Form.Item
                      label={template.title}
                      name={template.id}
                    >
                      <Input />
                    </Form.Item>
                  ) : null}
                  {template.type === "Radio" ? (
                    <Form.Item
                      label={template.title}
                      name={template.id}
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
                      name={template.id}
                    >
                      <Select options={template.options} />
                    </Form.Item>
                  ) : null}
                </Col>
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
