import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Row,
  Col,
  Input,
  Space,
  Switch,
  Radio,
  Checkbox,
  Select,
} from "antd";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddNewTemplate } from "redux/actions/AddTemplate";

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
  const getReduxTemplateData = useSelector(
    (state) => state.AddTemplate.template
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [editForm = form] = Form.useForm();

  const [isSample, setIsSample] = useState([]);
  const [isEditTemplate, setIsEditTemplate] = useState({});

  // ---------------------------------bate---------------------------------
  const [isDragWidth, setIsDragWidth] = useState(false);
  const [isWidth, setIsWidth] = useState({ main: "", edit: 400 });
  const mainWidth = useRef();
  const editWidth = useRef();
  // ---------------------------------bate---------------------------------

  // 新增狀態
  const handleAddTemplate = (values) => {
    const defaultOptions =
      values === "Input" ? [] : [{ label: "預設", value: "預設" }];
    const templateData = {
      id: v4(),
      type: values,
      required: false,
      options: defaultOptions,
      title: values,
    };
    setIsSample((data) => [templateData, ...data]);
  };
  // 送出模板
  const addNewTemplate = (values) => {
    const addTemplate = {
      id: values.templateID,
      title: values.templateTitle,
      template: isSample,
    };
    dispatch(setIsAddNewTemplate(addTemplate));
    alert("即將自動跳轉回首頁");
    navigate(-1);
  };
  // 點擊中間模板 -> 跳出最右側編輯畫面
  const handleEditTemplate = (template) => {
    setIsEditTemplate(template);
    editForm.resetFields();
    editForm.setFieldsValue({
      ...template,
      options: template.options.length <= 0 ? [0] : template.options,
    });
  };
  // 監聽右側模板 發生變化
  const handleChangeFormTemplate = ({ openRelation, relationWithWho }) => {
    if (openRelation === true) {
      setIsEditTemplate((data) => ({ ...data, openRelation }));
    }
    if (openRelation === false) {
      setIsEditTemplate((data) => ({ ...data, openRelation }));
    }
    if (relationWithWho) {
      editForm.setFieldsValue({
        relationWithOptions: [],
      });
      const relationWithOptions = isSample.find(
        (item) => item.title === relationWithWho
      );
      setIsEditTemplate((data) => ({
        ...data,
        relationWithWho,
        relationWithOptions,
      }));
    }
  };
  // 完成最右側編輯
  const handleEditFormTemplate = (values) => {
    const findData = isSample.map((item) => {
      if (item.id === values.id) {
        const {
          options,
          required,
          title,
          openRelation,
          relationWithOptions,
          relationWithWho,
        } = values;
        const newOptions = !options
          ? []
          : options.map((option) => ({
              ...option,
              label: option.value,
            }));
        return {
          ...item,
          required,
          title,
          options: newOptions,
          openRelation: openRelation || false,
          relationWithOptions: relationWithOptions || false,
          relationWithWho: relationWithWho || false,
        };
      }
      if (!!values.openRelation && item.id === values.relationWithWho) {
        return {
          ...item,
          relation: {
            relationSwitch: true,
            relationID: values.id,
            relationValue: values.relationWithOptions,
          },
        };
      }
      return item;
    });
    console.log(findData);
    setIsSample(findData);
    setIsEditTemplate({});
  };
  // 刪除預覽模板
  const handleDeleteTemplate = (id) => {
    const deleteData = isSample.filter((item) => item.id !== id);
    setIsSample(deleteData);
  };

  // 調整大小
  const handelAutoWidth = {
    mouseDown: (e) => {
      console.log("start", e.pageX);
      setIsDragWidth(true);
    },
    mouseMove: (e) => {
      if (isDragWidth) {
        const newIsWidth = {
          ...isWidth,
          edit: document.body.clientWidth - e.pageX,
        };
        setIsWidth(newIsWidth);
      }
    },
    mouseLeave: () => {
      // console.log("觸發", "leave");
      setIsDragWidth(false);
    },
    mouseUp: () => {
      if (isDragWidth) {
        console.log("觸發", "up");
        setIsDragWidth(false);
      }
    },
  };

  useEffect(() => {
    const search = location.search?.split("templateID=")?.[1];
    const findData = getReduxTemplateData.find((item) => item.id === search);

    if (!!findData) {
      setIsSample(findData.template);
      form.setFieldsValue({
        templateID: findData.id,
        templateTitle: findData.title,
      });
    }
  }, [location, getReduxTemplateData, form]);

  useEffect(() => {
    const width = {
      main: mainWidth.current.offsetWidth,
      edit: editWidth.current.offsetWidth,
    };
    setIsWidth(width);
  }, []);

  return (
    <div
      className="width100 flex"
      onMouseMove={handelAutoWidth.mouseMove}
      onMouseUp={handelAutoWidth.mouseUp}
      onMouseLeave={handelAutoWidth.mouseLeave}
    >
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
            maxHeight: "calc(100vh - 46px)",
            position: "sticky",
            top: 0,
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
      </div>

      <div
        ref={mainWidth}
        className="p-10-15"
        style={{
          // width: "calc(100% - 256px - 256px)",
          width: `calc(100% - 256px - ${isWidth.edit}px)`,
        }}
      >
        <Form form={form} onFinish={addNewTemplate}>
          <Row gutter={[12, 12]} className="width100">
            <Col span={24}>
              <Form.Item name="templateID" hidden>
                <Input disabled />
              </Form.Item>
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

              {isSample?.map((item) => {
                return (
                  <Col
                    span={24}
                    key={item.id}
                    className="width100 flex  p-10"
                    onClick={() => handleEditTemplate(item)}
                  >
                    <Col span={21}>
                      {item.type === "Input" ? (
                        <div className="width100 flex flex-column">
                          <Form.Item
                            className="margin0"
                            label={item.title}
                            name={item.id + "-Golden-Template-Title"}
                          >
                            <Input />
                          </Form.Item>
                        </div>
                      ) : null}
                      {item.type === "Radio" ? (
                        <div className="width100 flex flex-column">
                          <Form.Item
                            className="margin0"
                            label={item.title}
                            name={item.id + "-Golden-Template-Title"}
                          >
                            <Radio.Group options={item.options} />
                          </Form.Item>
                        </div>
                      ) : null}
                      {item.type === "Checkbox" ? (
                        <div className="width100 flex flex-column">
                          <Form.Item
                            className="margin0"
                            label={item.title}
                            name={item.id + "-Golden-Template-Title"}
                          >
                            <Checkbox.Group
                              className="templateCheckbox"
                              options={item.options}
                            />
                          </Form.Item>
                        </div>
                      ) : null}
                      {item.type === "Select" ? (
                        <div className="width100 flex flex-column">
                          <Form.Item
                            className="margin0"
                            initialValue={item.options?.[0]?.value}
                            label={item.title}
                            name={item.id + "-Golden-Template-Title"}
                          >
                            <Select options={item.options} />
                          </Form.Item>
                        </div>
                      ) : null}
                    </Col>
                    <Col span={3} className="flex justifyEnd alignStart">
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
            </Col>

            <Col span={24} className="flex justifyEnd">
              <Button type="primary" htmlType="submit">
                送出
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      <div
        className="dragAnimation"
        style={{
          width: "20px",
          cursor: "e-resize",
        }}
        onMouseDown={handelAutoWidth.mouseDown}
      >
        <div
          style={{
            borderLeft: "3px solid #001529",
            width: "1px",
            height: "100%",
          }}
        />
      </div>
      <div
        ref={editWidth}
        style={{
          width: `${isWidth.edit}px`,
          maxWidth: `${isWidth.edit}px`,
          minHeight: "calc( 100vh - 46px )",
          maxHeight: "calc( 100vh - 0px )",
          // backgroundColor: "#001529",
          // borderLeft: "3px solid #001529",
          color: "white",
          overflow: "hidden scroll",
          position: "sticky",
          top: "0px",
          padding: "10px 15px",
        }}
      >
        <div className="width100 height100">
          {!!isEditTemplate?.id ? (
            <Form
              form={editForm}
              onFinish={handleEditFormTemplate}
              onValuesChange={handleChangeFormTemplate}
            >
              <Row gutter={[24, 24]}>
                <Col
                  span={24}
                  style={{
                    minHeight: "calc(100vh - 150px)",
                  }}
                >
                  {isEditTemplate.type === "Input" ? (
                    <>
                      <Form.Item name="id" hidden>
                        <Input disabled />
                      </Form.Item>
                      <Form.Item
                        className="edit-template"
                        label="選單名稱"
                        name="title"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        className="edit-template"
                        label="是否必填"
                        name="required"
                        valuePropName="checked"
                      >
                        <Switch />
                      </Form.Item>
                    </>
                  ) : null}
                  {isEditTemplate.type === "Radio" ? (
                    <>
                      <Form.Item name="id" hidden>
                        <Input disabled />
                      </Form.Item>
                      <Form.Item
                        className="edit-template"
                        label="選單名稱"
                        name="title"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        className="edit-template"
                        label="是否必填"
                        name="required"
                        valuePropName="checked"
                      >
                        <Switch />
                      </Form.Item>
                      <Form.List name="options">
                        {(fields, { add, remove }) => (
                          <div className="width100">
                            {fields.map((field) => {
                              return (
                                <Space.Compact block key={field.key}>
                                  <Form.Item
                                    label={`新增選項`}
                                    name={[field.name, "value"]}
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
                    </>
                  ) : null}
                  {isEditTemplate.type === "Checkbox" ? (
                    <>
                      <Form.Item name="id" hidden>
                        <Input disabled />
                      </Form.Item>
                      <Form.Item
                        className="edit-template"
                        label="選單名稱"
                        name="title"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        className="edit-template"
                        label="是否必填"
                        name="required"
                        valuePropName="checked"
                      >
                        <Switch />
                      </Form.Item>
                      <Form.List name="options">
                        {(fields, { add, remove }) => (
                          <div className="width100">
                            {fields.map((field) => {
                              return (
                                <Space.Compact block key={field.key}>
                                  <Form.Item
                                    label={`新增選項`}
                                    name={[field.name, "value"]}
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
                    </>
                  ) : null}
                  {isEditTemplate.type === "Select" ? (
                    <>
                      <Form.Item name="id" hidden>
                        <Input disabled />
                      </Form.Item>
                      <Form.Item
                        className="edit-template"
                        label="選單名稱"
                        name="title"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        className="edit-template"
                        label="是否必填"
                        name="required"
                        valuePropName="checked"
                      >
                        <Switch />
                      </Form.Item>
                      <Form.List name="options">
                        {(fields, { add, remove }) => (
                          <div className="width100">
                            {fields.map((field) => {
                              return (
                                <Space.Compact block key={field.key}>
                                  <Form.Item
                                    label={`新增選項`}
                                    name={[field.name, "value"]}
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

                      <div
                        style={{
                          border: "2px solid black",
                          marginTop: "20px",
                          marginBottom: "20px",
                        }}
                      />
                      <Form.Item
                        label="開啟關聯"
                        name="openRelation"
                        className="mt-10"
                        valuePropName="checked"
                      >
                        <Switch />
                      </Form.Item>

                      <Form.Item
                        label="關聯主項"
                        name="relationWithWho"
                        className="mt-10"
                        hidden={!isEditTemplate.openRelation}
                      >
                        <Select
                          options={[
                            ...new Set(
                              isSample
                                .filter((item) => item.id !== isEditTemplate.id)
                                .map((item) => ({
                                  label: item.title,
                                  value: item.id,
                                }))
                            ),
                          ]}
                        />
                      </Form.Item>
                      <Form.Item
                        label="選項"
                        name="relationWithOptions"
                        className="mt-10"
                        hidden={
                          !isEditTemplate.openRelation ||
                          !isEditTemplate.relationWithWho
                        }
                      >
                        <Select
                          options={[
                            ...new Set(
                              isSample.find(
                                (item) =>
                                  item.id ===
                                  editForm.getFieldsValue("relationWithWho")
                                    .relationWithWho
                              )?.options
                            ),
                          ]}
                        />
                      </Form.Item>
                    </>
                  ) : null}
                </Col>
                <Col span={24} className="mt-10 mb-10">
                  <Form.Item className="margin0 flex justifyEnd alignEnd">
                    <Button type="primary" htmlType="submit">
                      修改
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          ) : null}
        </div>
      </div>
    </div>
  );
}
