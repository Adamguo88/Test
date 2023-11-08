import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
const initialState = {
  template: [
    {
      id: v4(),
      title: "文字模板",
      template: [
        {
          id: v4(),
          options: [],
          required: true,
          title: "Email",
          type: "Input",
        },
      ],
    },
    {
      id: v4(),
      title: "Radio模板",
      template: [
        {
          id: v4(),
          options: [
            {
              label: "選項1",
              value: "選項1",
            },
            {
              label: "選項2",
              value: "選項2",
            },
          ],
          required: true,
          title: "選擇Radio",
          type: "Radio",
        },
      ],
    },
    {
      id: v4(),
      title: "CheckBox模板",
      template: [
        {
          id: v4(),
          options: [
            {
              label: "選項1",
              value: "選項1",
            },
            {
              label: "選項2",
              value: "選項2",
            },
          ],
          required: true,
          title: "測試Checkbox",
          type: "Checkbox",
        },
      ],
    },
    {
      id: v4(),
      title: "食物模板",
      template: [
        {
          id: v4(),
          options: [
            {
              label: "葷",
              value: "葷",
            },
            {
              label: "素",
              value: "素",
            },
          ],
          required: true,
          title: "選擇葷素",
          type: "Select",
        },
      ],
    },
    {
      id: v4(),
      title: "房型模板",
      template: [
        {
          id: v4(),
          options: [
            {
              label: "雙人房",
              value: "雙人房",
            },
            {
              label: "單人房",
              value: "單人房",
            },
          ],
          required: true,
          title: "選擇房型",
          type: "Select",
        },
      ],
    },
  ],
};

const store = createSlice({
  name: "AddTemplate",
  initialState,
  reducers: {
    setIsAddNewTemplate(state, action) {
      const data = action.payload;
      console.log(data); // 傳進來的參數
      // console.log(state,'state');        // initialState的值
      // console.log(action,'action');      // 傳入 type 和 payload(傳進來參數)
      if (!data.id) {
        state.template = [...state.template, { ...data, id: v4() }];
      } else {
        const findData = state.template.map((item) => {
          if (item.id === data.id) {
            return data;
          }
          return item;
        });
        state.template = [...findData];
      }
    },
  },
});

export const { setIsAddNewTemplate } = store.actions;
export default store.reducer;
