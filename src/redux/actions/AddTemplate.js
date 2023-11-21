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
    {
      id: v4(),
      title: "八分雲集",
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
    {
      id: v4(),
      title: "麥當勞",
      template: [
        {
          id: v4(),
          options: [
            {
              label: "BLT 安格斯黑牛堡",
              value: "BLT 安格斯黑牛堡",
            },
            {
              label: "BLT 辣脆雞腿堡",
              value: "BLT 辣脆雞腿堡",
            },
            {
              label: "BLT 嫩煎雞腿堡",
              value: "BLT 嫩煎雞腿堡",
            },
            {
              label: "蕈菇安格斯黑牛堡",
              value: "蕈菇安格斯黑牛堡",
            },
            {
              label: "大麥克",
              value: "大麥克",
            },
            {
              label: "雙層牛肉吉事堡",
              value: "雙層牛肉吉事堡",
            },
            {
              label: "嫩煎雞腿堡",
              value: "嫩煎雞腿堡",
            },
            {
              label: "麥香雞",
              value: "麥香雞",
            },
            {
              label: "雙層麥香雞",
              value: "雙層麥香雞",
            },
            {
              label: "勁辣雞腿堡",
              value: "勁辣雞腿堡",
            },
            {
              label: "麥香魚",
              value: "麥香魚",
            },
            {
              label: "麥克雞塊(6塊)",
              value: "麥克雞塊(6塊)",
            },
            {
              label: "麥克雞塊(10塊)",
              value: "麥克雞塊(10塊)",
            },
            {
              label: "(原味)麥脆雞",
              value: "(原味)麥脆雞",
            },
            {
              label: "(辣味)麥脆雞",
              value: "(辣味)麥脆雞",
            },
          ],
          required: true,
          title: "主餐",
          type: "Select",
        },
        {
          id: 'm-2',
          options: [
            {
              label: "單點",
              value: "單點",
            },
            {
              label: "A餐 - 中薯+飲料",
              value: "A餐 - 中薯+飲料",
            },
            {
              label: "B餐 - 沙拉+熱飲",
              value: "B餐 - 沙拉+熱飲",
            },
            {
              label: "C餐 - 炸雞+飲料",
              value: "C餐 - 炸雞+飲料",
            },
            {
              label: "D餐 - 冰炫風+小薯+飲料",
              value: "D餐 - 冰炫風+小薯+飲料",
            },
            {
              label: "E餐 - 6塊雞塊+小薯+飲料",
              value: "E餐 - 6塊雞塊+小薯+飲料",
            },
            {
              label: "F餐 - 地瓜薯條+飲料",
              value: "F餐 - 地瓜薯條+飲料",
            },
          ],
          required: true,
          title: "副餐",
          type: "Select",
        },
        {
          id: 'm-3',
          options: [
            {
              label: "單點勿選",
              value: "單點勿選",
            },
            {
              label: "可口可樂",
              value: "可口可樂",
            },
            {
              label: "可口可樂 zero",
              value: "可口可樂 zero",
            },
            {
              label: "雪碧",
              value: "雪碧",
            },
            {
              label: "檸檬紅茶",
              value: "檸檬紅茶",
            },
            {
              label: "紅茶(無糖)",
              value: "紅茶(無糖)",
            },
            {
              label: "綠茶(無糖)",
              value: "綠茶(無糖)",
            },
          ],
          required: true,
          title: "飲料",
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
