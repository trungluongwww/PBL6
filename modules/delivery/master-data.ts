import fetch from "node-fetch";
import constants from "../../constants";
import delivery from "./index";
import database from "../database";
import { District, Province, Ward } from "../database/entities";

const getProvinces = async (): Promise<[any | null, Error | null]> => {
  const deliveryCfg = delivery.getDeliveryConfig();

  const result = await fetch(
    deliveryCfg.masterDataURL + constants.delivery.province,
    {
      method: "GET",
      headers: {
        Token: "eecc4477-3722-11ed-ad26-3a4226f77ff0",
        "Content-Type": "application/json",
      },
    }
  );
  const response = await result.json();
  if (String(response.code).startsWith("4")) {
    const err = new Error(response.message);
    return [null, err];
  }
  // // crawl data
  // const db = database.getDataSource();
  // console.log(response.data?.length?.message);
  //
  // response.data.map(async (item: any) => {
  //   const p = new Province();
  //   p.provinceId = Number(item.ProvinceID);
  //   p.name = item.ProvinceName;
  //   await db.manager.save(p);
  //   // crawl districts
  //
  //   const [d, err] = await getDistricts(p.provinceId);
  //   console.log(d?.length, err?.message);
  //
  //   if (d?.length > 0) {
  //     await d.map(async (d: any) => {
  //       const disctrict = new District();
  //       disctrict.provinceId = p.provinceId;
  //       disctrict.name = d.DistrictName;
  //       disctrict.districtId = Number(d.DistrictID);
  //       await db.manager.save(disctrict);
  //       // crawl ward
  //       const [w, err2] = await getWards(disctrict.districtId);
  //       console.log(w?.length, err2?.message);
  //       if (w?.length > 0) {
  //         w.map(async (wd: any) => {
  //           const ward = new Ward();
  //           ward.name = wd.WardName;
  //           ward.districtId = disctrict.districtId;
  //           ward.ward_id = wd.WardCode;
  //           await db.manager.save(ward);
  //         });
  //       }
  //     });
  //   }
  //   console.log("done");
  // });

  return [response.data, null];
};

const getDistricts = async (
  provinceId: number
): Promise<[any | null, Error | null]> => {
  const deliveryCfg = delivery.getDeliveryConfig();

  const result = await fetch(
    deliveryCfg.masterDataURL + constants.delivery.district,
    {
      method: "POST",
      headers: {
        Token: "eecc4477-3722-11ed-ad26-3a4226f77ff0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ province_id: provinceId }),
    }
  );
  const response = await result.json();
  if (String(response.code).startsWith("4")) {
    const err = new Error(response.message);
    return [null, err];
  }

  return [response.data, null];
};

const getWards = async (
  districtId: number
): Promise<[any | null, Error | null]> => {
  const deliveryCfg = delivery.getDeliveryConfig();

  const result = await fetch(
    deliveryCfg.masterDataURL + constants.delivery.ward,
    {
      method: "POST",
      headers: {
        Token: "eecc4477-3722-11ed-ad26-3a4226f77ff0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ district_id: districtId }),
    }
  );
  const response = await result.json();
  if (String(response.code).startsWith("4")) {
    const err = new Error(response.message);
    return [null, err];
  }

  return [response.data, null];
};

export default {
  getProvinces,
  getDistricts,
  getWards,
};
