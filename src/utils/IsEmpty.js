// 判斷對象-是否都是空值
export function isEmpty(value) {
  return Object.values(value).every((item) => !!item);
}
