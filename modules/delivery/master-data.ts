import fetch from "node-fetch";
import constants from "../../constants";
import delivery from "./index";
import { IServiceResponse } from "../../interfaces/delivery";

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
