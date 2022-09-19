import { getData } from "../api";

export const GetItemMultiSelect = async (url, dbColumn) => {
  const res = await getData(url);
  if (res?.isEmpity !== true) {
    const filter = res.map((e) => {
      if (dbColumn?.item1 && dbColumn?.subItem1 && dbColumn?.item2) {
        return {
          id: e.id,
          name: `${e[dbColumn.item1][dbColumn.subItem1]} #${e[dbColumn.item2]}`,
        };
      } else {
        return {
          id: e.id,
          name: e[dbColumn],
        };
      }
    });

    return filter;
  }

  if (res?.isEmpity === true) {
    return res;
  }
};
