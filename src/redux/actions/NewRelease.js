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
          id: v4(),
          options: [],
          required: true,
          title: "Email",
          type: "Input",
        },
        {
          id: v4(),
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
        {
          id: v4(),
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
        {
          id: v4(),
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
        {
          id: v4(),
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
    {
      id: v4(),
      templateName: "2023/11/09 - 午餐",
      payType: "2",
      template: [
        {
          id: v4(),
          options: [
            {
              label: "招牌鍋貼10顆 - 65元",
              value: "招牌鍋貼10顆 - 65元",
            },
            {
              label: "招牌鍋貼10顆 - 66元",
              value: "招牌鍋貼10顆 - 66元",
            },
            {
              label: "辣味鍋貼10顆 - 66元",
              value: "辣味鍋貼10顆 - 66元",
            },
            {
              label: "咖哩鍋貼10顆 - 66元",
              value: "咖哩鍋貼10顆 - 66元",
            },
            {
              label: "玉米鍋貼10顆 - 66元",
              value: "玉米鍋貼10顆 - 66元",
            },
            {
              label: "蔬食鍋貼10顆 - 70元",
              value: "蔬食鍋貼10顆 - 70元",
            },
          ],
          required: true,
          title: "鍋貼類",
          type: "Checkbox",
        },
        {
          id: v4(),
          options: [
            {
              label: "招牌水餃10顆 - 65元",
              value: "招牌水餃10顆 - 65元",
            },
            {
              label: "韭菜水餃10顆 - 66元",
              value: "韭菜水餃10顆 - 66元",
            },
            {
              label: "辣味水餃10顆 - 66元",
              value: "辣味水餃10顆 - 66元",
            },
            {
              label: "咖哩水餃10顆 - 66元",
              value: "咖哩水餃10顆 - 66元",
            },
            {
              label: "玉米水餃10顆 - 66元",
              value: "玉米水餃10顆 - 66元",
            },
            {
              label: "蔬食水餃10顆 - 70元",
              value: "蔬食水餃10顆 - 70元",
            },
            {
              label: "鮮蝦水餃10顆 - 100元",
              value: "鮮蝦水餃10顆 - 100元",
            },
          ],
          required: true,
          title: "水餃類",
          type: "Checkbox",
        },
        {
          id: v4(),
          options: [
            {
              label: "清燉牛肉麵 - 168元",
              value: "清燉牛肉麵 - 168元",
            },
            {
              label: "紅肉牛肉麵 - 168元",
              value: "紅肉牛肉麵 - 168元",
            },
            {
              label: "麻辣牛肉麵 - 178元",
              value: "麻辣牛肉麵 - 178元",
            },
          ],
          required: true,
          title: "牛肉麵",
          type: "Checkbox",
        },
        {
          id: v4(),
          options: [
            {
              label: "玉米湯餃 - 87元",
              value: "玉米湯餃 - 87元",
            },
            {
              label: "酸辣湯餃 - 87元",
              value: "酸辣湯餃 - 87元",
            },
            {
              label: "(細)乾麵 - 39元",
              value: "(細)乾麵 - 39元",
            },
            {
              label: "(細)麻醬乾麵 - 49元",
              value: "(細)麻醬乾麵 - 49元",
            },
            {
              label: "(粗)招牌乾麵 - 49元",
              value: "(粗)招牌乾麵 - 49元",
            },
            {
              label: "(粗)紹辣乾麵 - 55元",
              value: "(粗)紹辣乾麵 - 55元",
            },
            {
              label: "(細)湯麵 - 39元",
              value: "(細)湯麵 - 39元",
            },
            {
              label: "(細)酸辣湯麵 - 64元",
              value: "(細)酸辣湯麵 - 64元",
            },
          ],
          required: true,
          title: "湯麵/乾麵",
          type: "Checkbox",
        },
        {
          id: v4(),
          options: [
            {
              label: "珍珠抄手(紅油) - 55元",
              value: "珍珠抄手(紅油) - 55元",
            },
            {
              label: "珍珠抄手(和風) - 55元",
              value: "珍珠抄手(和風) - 55元",
            },
            {
              label: "菜肉大抄手(紅油) - 69元",
              value: "菜肉大抄手(紅油) - 69元",
            },
            {
              label: "菜肉大抄手(和風) - 69元",
              value: "菜肉大抄手(和風) - 69元",
            },
          ],
          required: true,
          title: "抄手類",
          type: "Checkbox",
        },
        {
          id: v4(),
          options: [
            {
              label: "酸辣湯 - 35元",
              value: "酸辣湯 - 35元",
            },
            {
              label: "玉米濃湯 - 35元",
              value: "玉米濃湯 - 35元",
            },
            {
              label: "旗魚花枝丸湯 - 35元",
              value: "旗魚花枝丸湯 - 35元",
            },
            {
              label: "蕈菇湯 - 35元",
              value: "蕈菇湯 - 35元",
            },
            {
              label: "蘿蔔排骨湯 - 35元",
              value: "蘿蔔排骨湯 - 35元",
            },
            {
              label: "珍珠餛飩湯 - 45元",
              value: "珍珠餛飩湯 - 45元",
            },
            {
              label: "菜肉大餛飩湯 - 55元",
              value: "菜肉大餛飩湯 - 55元",
            },
          ],
          required: true,
          title: "湯類",
          type: "Checkbox",
        },
        {
          id: v4(),
          options: [
            {
              label: "白豆漿 - 20元",
              value: "白豆漿 - 20元",
            },
            {
              label: "黑豆漿 - 20元",
              value: "黑豆漿 - 20元",
            },
            {
              label: "無糖豆漿 - 20元",
              value: "無糖豆漿 - 20元",
            },
            {
              label: "真傳紅茶 - 20元",
              value: "真傳紅茶 - 20元",
            },
            {
              label: "寒天真傳紅茶 - 45元",
              value: "寒天真傳紅茶 - 45元",
            },
          ],
          required: true,
          title: "飲料",
          type: "Checkbox",
        },
        {
          id: v4(),
          options: [
            {
              label: "滷蛋 - 15元",
              value: "滷蛋 - 15元",
            },
            {
              label: "皮蛋豆腐 - 40元",
              value: "皮蛋豆腐 - 40元",
            },
            {
              label: "家常小菜(拼盤) - 40元",
              value: "家常小菜(拼盤) - 40元",
            },
            {
              label: "滷花生配豬耳朵 - 40元",
              value: "滷花生配豬耳朵 - 40元",
            },
            {
              label: "滷花生配豆干 - 40元",
              value: "滷花生配豆干 - 40元",
            },
            {
              label: "香滷花生 - 40元",
              value: "香滷花生 - 40元",
            },
            {
              label: "清爽漬黃瓜 - 35元",
              value: "清爽漬黃瓜 - 35元",
            },
            {
              label: "黃金豆腐 - 35元",
              value: "黃金豆腐 - 35元",
            },
            {
              label: "柚香蘿蔔 - 40元",
              value: "柚香蘿蔔 - 40元",
            },
            {
              label: "燙青菜 - 35元",
              value: "燙青菜 - 35元",
            },
            {
              label: "燉蘿蔔 - 35元",
              value: "燉蘿蔔 - 35元",
            },
            {
              label: "和風秋葵 - 35元",
              value: "和風秋葵 - 35元",
            },
            {
              label: "薄鹽毛豆 - 35元",
              value: "薄鹽毛豆 - 35元",
            },
            {
              label: "台式泡菜 - 30元",
              value: "台式泡菜 - 30元",
            },
            {
              label: "韓式泡菜 - 30元",
              value: "韓式泡菜 - 30元",
            },
            {
              label: "黃金泡菜 - 30元",
              value: "黃金泡菜 - 30元",
            },
          ],
          required: true,
          title: "小菜類",
          type: "Checkbox",
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
