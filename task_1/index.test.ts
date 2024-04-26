import { describe, it, expect } from "vitest";
import { decode, ignoredKeys } from ".";
import { encoded, translations } from "./data";

const mock1 = {
  test: [encoded[0]],
  result: {
    decoded: [
      {
        groupId: 783,

        areaId: "",
        departmentId: "Маркетинг",
        directionId: "",
        mediaTypeId: "",
        mediaId: "Диджитал",
        resellingId: "Нет",
        serviceTypeId: "Размещение",
        formatTypeId: "",
        formatId: "",
        unitId: "Фикс",
        platformId: "",
        budgetId: null,
        adPlatformId: "Telegram",
        service: null,
        formatSize: null,
        ca: null,
        mpmId: null,
      },
    ],
    uniqueKeys: ["688", "676", "18842", "124", "82226", "1026"],
  },
};

const mock2 = {
  test: [encoded[0], encoded[1]],
  result: {
    decoded: [
      {
        groupId: 783,

        areaId: "",
        departmentId: "Маркетинг",
        directionId: "",
        mediaTypeId: "",
        mediaId: "Диджитал",
        resellingId: "Нет",
        serviceTypeId: "Размещение",
        formatTypeId: "",
        formatId: "",
        unitId: "Фикс",
        platformId: "",
        budgetId: null,
        adPlatformId: "Telegram",
        service: null,
        formatSize: null,
        ca: null,
        mpmId: null,
      },
      {
        groupId: 784,

        areaId: "",
        departmentId: "Маркетинг",
        directionId: "",
        mediaTypeId: "",
        mediaId: "Диджитал",
        resellingId: "Нет",
        serviceTypeId: "Размещение",
        formatTypeId: "",
        formatId: "",
        unitId: "Фикс",
        platformId: "",
        budgetId: null,
        adPlatformId: "Telegram",
        service: null,
        formatSize: null,
        ca: null,
        mpmId: null,
      },
    ],
    uniqueKeys: [],
  },
};


describe("decode", () => {
  it("should return valid results", () => {
    const result1 = decode(mock1.test, translations, ignoredKeys);
    const result2 = decode(mock2.test, translations, ignoredKeys);

    expect(result1.decoded).toStrictEqual(mock1.result.decoded);
    expect(result1.uniqueKeys).toStrictEqual(mock1.result.uniqueKeys);

    expect(result2.decoded).toStrictEqual(mock2.result.decoded);
    expect(result2.uniqueKeys).toStrictEqual(mock2.result.uniqueKeys);
  });
  it("shouldn't mutate original data", () => {
    const copyOfData = encoded.map((v) => ({ ...v }));
    decode(encoded, translations, ignoredKeys);

    expect(copyOfData).toStrictEqual(encoded);
  });
});
