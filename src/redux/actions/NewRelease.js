import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
const initialState = {
  template: [
    {
      id: v4(),
      templateName: "測試模板1",
      payType: "1",
      template: [
        {
          title: "文字模板",
          template: [
            {
              options: [],
              required: true,
              title: "Email",
              type: "Input",
            },
          ],
        },
        {
          title: "Radio模板",
          template: [
            {
              options: [
                {
                  label: "選項1",
                  value: "1",
                },
                {
                  label: "選項2",
                  value: "2",
                },
              ],
              required: true,
              title: "選擇Radio",
              type: "Radio",
            },
          ],
        },
        {
          title: "CheckBox模板",
          template: [
            {
              options: [
                {
                  label: "選項1",
                  value: "1",
                },
                {
                  label: "選項2",
                  value: "2",
                },
              ],
              required: true,
              title: "測試Checkbox",
              type: "Checkbox",
            },
          ],
        },
        {
          title: "食物模板",
          template: [
            {
              options: [
                {
                  label: "葷",
                  value: "1",
                },
                {
                  label: "素",
                  value: "2",
                },
              ],
              required: true,
              title: "選擇葷素",
              type: "Select",
            },
          ],
        },
        {
          title: "房型模板",
          template: [
            {
              options: [
                {
                  label: "雙人房",
                  value: "1",
                },
                {
                  label: "單人房",
                  value: "2",
                },
              ],
              required: true,
              title: "選擇房型",
              type: "Select",
            },
          ],
        },
      ],
    },
  ],
};

const store = createSlice({
  name: "NewRelease",
  initialState,
  reducers: {
    setNewTemplate(state, action) {
      const data = action.payload;
      console.log(data);
      state.template = [data, ...state.template];
    },
  },
});

export const { setNewTemplate } = store.actions;
export default store.reducer;
