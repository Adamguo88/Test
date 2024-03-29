import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddNewTemplate } from "redux/actions/AddTemplate";
import {
  Button,
  Form,
  Row,
  Col,
  Input,
  Select,
  Modal,
  Space,
  Checkbox,
  Switch,
  Radio,
} from "antd";
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
export default function AddForm() {
  const getReduxTemplate = useSelector((state) => state.AddTemplate.template);

  const modelRef = useRef();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  // ------------------------新增----------------------------
  const [isAddModal, setIsAddModal] = useState(false);
  const [IsAddList, setIsAddList] = useState([]);
  const [isShowComponents, setIsShowComponents] = useState(null);
  const addModal = {
    showModal: (item) => {
      setIsAddModal(true);
      setIsEditModalData(item);
    },
    handleOk: () => {
      setIsAddModal(false);
      setIsEditModalData(null);
    },
    handleCancel: () => {
      setIsAddModal(false);
      setIsEditModalData(null);
    },
  };
  modelRef.current = addModal;
  // ----------------------------------------------------

  // ------------------------編輯----------------------------
  const [isEditModalData, setIsEditModalData] = useState(null);
  const [isEditID, setIsEditID] = useState(null);

  // ----------------------------------------------------

  const addNewTemplate = (values) => {
    const templateData = {
      id: isEditID,
      title: values.templateTitle,
      template: [...IsAddList],
    };
    dispatch(setIsAddNewTemplate(templateData));
    alert("即將自動跳轉回首頁");
    navigate(-1);
  };

  useEffect(() => {
    if (IsAddList.length >= 1) {
      const AddComponents = IsAddList.map((item, index) => {
        if (item.type === "Input") {
          return (
            <React.Fragment key={index}>
              <Col span={18}>
                <Form.Item label={item.title} name={item.type + index + 1}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Space.Compact block>
                  <Button
                    type="primary"
                    onClick={() => {
                      modelRef.current.showModal(item);
                    }}
                  >
                    編輯
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsAddList((data) => {
                        return data.filter(
                          (template) => template.id !== item.id
                        );
                      });
                    }}
                  >
                    刪除
                  </Button>
                </Space.Compact>
              </Col>
            </React.Fragment>
          );
        }
        if (item.type === "Radio") {
          return (
            <React.Fragment key={index}>
              <Col span={18}>
                <Form.Item label={item.title} name={item.type + index + 1}>
                  <Radio.Group>
                    {item.options.map((radio) => {
                      return (
                        <Radio value={radio.value} key={radio.value}>
                          {radio.label}
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Space.Compact block>
                  <Button
                    type="primary"
                    onClick={() => {
                      modelRef.current.showModal(item);
                    }}
                  >
                    編輯
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsAddList((data) => {
                        return data.filter(
                          (template) => template.id !== item.id
                        );
                      });
                    }}
                  >
                    刪除
                  </Button>
                </Space.Compact>
              </Col>
            </React.Fragment>
          );
        }
        if (item.type === "Checkbox") {
          return (
            <React.Fragment key={index}>
              <Col span={18}>
                <Form.Item label={item.title} name={item.type + index + 1}>
                  <Checkbox.Group className="flex">
                    {item.options.map((item) => {
                      return (
                        <Checkbox
                          className="templateCheckbox"
                          key={item.value}
                          value={item.value}
                        >
                          {item.label}
                        </Checkbox>
                      );
                    })}
                  </Checkbox.Group>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Space.Compact block>
                  <Button
                    type="primary"
                    onClick={() => {
                      modelRef.current.showModal(item);
                    }}
                  >
                    編輯
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsAddList((data) => {
                        return data.filter(
                          (template) => template.id !== item.id
                        );
                      });
                    }}
                  >
                    刪除
                  </Button>
                </Space.Compact>
              </Col>
            </React.Fragment>
          );
        }
        if (item.type === "Select") {
          return (
            <React.Fragment key={index}>
              <Col span={18}>
                <Form.Item label={item.title} name={item.type + index + 1}>
                  <Select options={item.options} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Space.Compact block>
                  <Button
                    type="primary"
                    onClick={() => {
                      modelRef.current.showModal(item);
                    }}
                  >
                    編輯
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsAddList((data) => {
                        return data.filter(
                          (template) => template.id !== item.id
                        );
                      });
                    }}
                  >
                    刪除
                  </Button>
                </Space.Compact>
              </Col>
            </React.Fragment>
          );
        }
        return null;
      });
      console.log(AddComponents);
      setIsShowComponents(AddComponents);
    } else {
      setIsShowComponents(null);
    }
  }, [IsAddList]);

  useEffect(() => {
    const getTemplateID = location.search?.split("?templateID=")[1];
    const getReduxData = getReduxTemplate.find(
      (item) => item.id === getTemplateID
    );
    if (!!getReduxData) {
      const AddComponents = getReduxData?.template?.map((item, index) => {
        if (item.type === "Input") {
          return (
            <React.Fragment key={index}>
              <Col span={18}>
                <Form.Item label={item.title} name={item.type + index + 1}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Space.Compact block>
                  <Button
                    type="primary"
                    onClick={() => {
                      modelRef.current.showModal(item);
                    }}
                  >
                    編輯
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsAddList((data) => {
                        return data.filter(
                          (template) => template.id !== item.id
                        );
                      });
                    }}
                  >
                    刪除
                  </Button>
                </Space.Compact>
              </Col>
            </React.Fragment>
          );
        }
        if (item.type === "Radio") {
          return (
            <React.Fragment key={index}>
              <Col span={18}>
                <Form.Item label={item.title} name={item.type + index + 1}>
                  <Radio.Group>
                    {item.options.map((radio) => {
                      return (
                        <Radio value={radio.value} key={radio.value}>
                          {radio.label}
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Space.Compact block>
                  <Button
                    type="primary"
                    onClick={() => {
                      modelRef.current.showModal(item);
                    }}
                  >
                    編輯
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsAddList((data) => {
                        return data.filter(
                          (template) => template.id !== item.id
                        );
                      });
                    }}
                  >
                    刪除
                  </Button>
                </Space.Compact>
              </Col>
            </React.Fragment>
          );
        }
        if (item.type === "Checkbox") {
          return (
            <React.Fragment key={index}>
              <Col span={18}>
                <Form.Item label={item.title} name={item.type + index + 1}>
                  <Checkbox.Group className="flex">
                    {item.options.map((item) => {
                      return (
                        <Checkbox
                          className="templateCheckbox"
                          key={item.value}
                          value={item.value}
                        >
                          {item.label}
                        </Checkbox>
                      );
                    })}
                  </Checkbox.Group>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Space.Compact block>
                  <Button
                    type="primary"
                    onClick={() => {
                      modelRef.current.showModal(item);
                    }}
                  >
                    編輯
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsAddList((data) => {
                        return data.filter(
                          (template) => template.id !== item.id
                        );
                      });
                    }}
                  >
                    刪除
                  </Button>
                </Space.Compact>
              </Col>
            </React.Fragment>
          );
        }
        if (item.type === "Select") {
          return (
            <React.Fragment key={index}>
              <Col span={18}>
                <Form.Item label={item.title} name={item.type + index + 1}>
                  <Select options={item.options} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Space.Compact block>
                  <Button
                    type="primary"
                    onClick={() => {
                      modelRef.current.showModal(item);
                    }}
                  >
                    編輯
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsAddList((data) => {
                        return data.filter(
                          (template) => template.id !== item.id
                        );
                      });
                    }}
                  >
                    刪除
                  </Button>
                </Space.Compact>
              </Col>
            </React.Fragment>
          );
        }
        return null;
      });
      setIsEditID(getTemplateID);
      setIsShowComponents(AddComponents);
      setIsAddList(getReduxData?.template);
      // console.log(getReduxData?.template);
      form.setFieldsValue({
        templateTitle: getReduxData.title,
      });
    }
  }, [location, getReduxTemplate, form]);

  return (
    <div className="width100 flex">
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
          className="width100 height100 p-10-15"
          style={{
            position: "sticky",
            top: 0,
          }}
        >
          <Button type="primary" onClick={() => navigate(-1)} block>
            返回
          </Button>
        </div>
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
              <Button type="primary" onClick={() => addModal.showModal()}>
                新增問項
              </Button>
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
            {isShowComponents?.map((item, index) => {
              return <React.Fragment key={index}>{item}</React.Fragment>;
            })}

            <Col span={24} className="flex justifyEnd">
              <Button type="primary" htmlType="submit">
                送出
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <AddComponent
        isModalOpen={isAddModal}
        handleOk={addModal.handleOk}
        handleCancel={addModal.handleCancel}
        setIsAddList={setIsAddList}
        isEditModalData={isEditModalData}
      />
    </div>
  );
}

const AddChildren = {
  Input: {
    placeholder: "預設文字",
    isRequire: "是否為必填",
  },
  Radio: {
    labelList: "新增選項",
    isRequire: "是否為必填",
  },
  Checkbox: {
    labelList: "新增選項",
    isRequire: "是否為必填",
  },
  Select: {
    labelList: "新增選項",
    isRequire: "是否為必填",
  },
};
export function AddComponent({
  isModalOpen,
  handleOk,
  handleCancel,
  setIsAddList,
  isEditModalData,
}) {
  const [form] = Form.useForm();
  const getAddType = Form.useWatch("addType", form);

  const [isAddChildren, setIsAddChildren] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const addFormItem = (value) => {
    const AddData = {
      id: v4(),
      type: value.addType,
      required: !!value.IsRequired ? true : false,
      title: value.addTypeName,
      options: value?.items
        ? value?.items?.map((item) => {
            return {
              label: item.name,
              value: item.name,
            };
          })
        : [],
    };
    if (isEdit) {
      console.log(AddData);
      setIsAddList((data) => {
        return data.map((item) => {
          if (item.title === AddData.title && item.type === AddData.type) {
            return AddData;
          }
          return item;
        });
      });
    } else {
      setIsAddList((data) => [...data, AddData]);
    }

    handleOk();
  };

  useEffect(() => {
    if (getAddType === "Input") {
      const InputComponent = () => {
        return (
          <>
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label={AddChildren[getAddType].isRequire}
                name="IsRequired"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </>
        );
      };
      setIsAddChildren(InputComponent);
    }
    if (getAddType === "Radio") {
      const RadioComponent = () => {
        return (
          <>
            <Col span={24}>
              <Form.List name="items">
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
                    <Button type="primary" onClick={() => add()} block>
                      新增選項
                    </Button>
                  </div>
                )}
              </Form.List>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label={AddChildren[getAddType].isRequire}
                name="IsRequired"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </>
        );
      };
      setIsAddChildren(RadioComponent);
    }
    if (getAddType === "Checkbox") {
      const CheckboxComponent = () => {
        return (
          <>
            <Col span={24}>
              <Form.List name="items">
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
                    <Button type="primary" onClick={() => add()} block>
                      新增選項
                    </Button>
                  </div>
                )}
              </Form.List>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label={AddChildren[getAddType].isRequire}
                name="IsRequired"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </>
        );
      };
      setIsAddChildren(CheckboxComponent);
    }
    if (getAddType === "Select") {
      const SelectComponent = () => {
        return (
          <>
            <Col span={24}>
              <Form.List name="items">
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
                    <Button type="primary" onClick={() => add()} block>
                      新增選項
                    </Button>
                  </div>
                )}
              </Form.List>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label={AddChildren[getAddType].isRequire}
                name="IsRequired"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </>
        );
      };
      setIsAddChildren(SelectComponent);
    }
  }, [getAddType]);

  useEffect(() => {
    form.resetFields();
    if (!!isEditModalData) {
      form.setFieldsValue({
        addType: isEditModalData.type,
        addTypeName: isEditModalData.title,
        IsRequired: isEditModalData.required,
      });
      if (isEditModalData.type === "Input") {
        const InputComponent = () => {
          return (
            <>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  label={AddChildren[getAddType].isRequire}
                  name="IsRequired"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </>
          );
        };
        setIsAddChildren(InputComponent);
      }
      if (isEditModalData.type === "Radio") {
        const RadioComponent = () => {
          return (
            <>
              <Col span={24}>
                <Form.List name="items" initialValue={isEditModalData.options}>
                  {(fields = isEditModalData.options, { add, remove }) => (
                    <div className="width100">
                      {fields.map((field) => {
                        return (
                          <Space.Compact block key={field.key}>
                            <Form.Item
                              label={`新增選項`}
                              name={[field.name, "name"]}
                              className="width100"
                              initialValue={
                                isEditModalData?.options?.[field?.key]?.value
                              }
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
                      <Button type="primary" onClick={() => add()} block>
                        新增選項
                      </Button>
                    </div>
                  )}
                </Form.List>
              </Col>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  label={AddChildren[getAddType].isRequire}
                  name="IsRequired"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </>
          );
        };
        setIsAddChildren(RadioComponent);
      }
      if (isEditModalData.type === "Checkbox") {
        const CheckboxComponent = () => {
          return (
            <>
              <Col span={24}>
                <Form.List name="items" initialValue={isEditModalData.options}>
                  {(fields = isEditModalData.options, { add, remove }) => (
                    <div className="width100">
                      {fields.map((field) => {
                        return (
                          <Space.Compact block key={field.key}>
                            <Form.Item
                              label={`新增選項`}
                              name={[field.name, "name"]}
                              className="width100"
                              initialValue={
                                isEditModalData?.options?.[field?.key]?.value
                              }
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
                      <Button type="primary" onClick={() => add()} block>
                        新增選項
                      </Button>
                    </div>
                  )}
                </Form.List>
              </Col>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  label={AddChildren[getAddType].isRequire}
                  name="IsRequired"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </>
          );
        };
        setIsAddChildren(CheckboxComponent);
      }
      if (isEditModalData.type === "Select") {
        const SelectComponent = () => {
          return (
            <>
              <Col span={24}>
                <Form.List name="items" initialValue={isEditModalData.options}>
                  {(fields, { add, remove }) => (
                    <div className="width100">
                      {fields.map((field) => {
                        return (
                          <Space.Compact block key={field.key}>
                            <Form.Item
                              label={`新增選項`}
                              name={[field.name, "name"]}
                              className="width100"
                              initialValue={
                                isEditModalData?.options?.[field?.key]?.value
                              }
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
                      <Button type="primary" onClick={() => add()} block>
                        新增選項
                      </Button>
                    </div>
                  )}
                </Form.List>
              </Col>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  label={AddChildren[getAddType].isRequire}
                  name="IsRequired"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </>
          );
        };
        setIsAddChildren(SelectComponent);
      }
      setIsEdit(true);
    } else {
      form.setFieldsValue({
        addType: "Input",
      });
    }
  }, [form, isEditModalData]);

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      keyboard={false}
      maskClosable={false}
      closeIcon={false}
      footer={null}
      destroyOnClose={true}
      forceRender={true}
      width="90%"
    >
      <Form form={form} onFinish={addFormItem}>
        <Row gutter={[12, 12]} className="width100">
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="選擇類型"
              name="addType"
              rules={[
                {
                  required: true,
                  message: "此欄位不得為空",
                },
              ]}
            >
              <Select options={addType} />
            </Form.Item>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="欄位名稱"
              name="addTypeName"
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
          {isAddChildren}

          <Col span={24} className="flex-center">
            <Button className="mr-5" onClick={handleCancel}>
              取消
            </Button>

            <Button type="primary" className="ml-5" htmlType="submit">
              {!isEdit ? "新增" : "編輯"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
