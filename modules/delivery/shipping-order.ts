import {
  ICalculateFeePayload,
  IServicePayload,
} from "../../interfaces/delivery/request";
import {
  ICalculateFeeResponse,
  ICalculateFeeData,
  IServiceResponse,
  IServiceData,
} from "../../interfaces/delivery/response";
import fetch from "node-fetch";
import delivery from "./index";
import constants from "../../constants";

const calculateFee = async (
  payload: ICalculateFeePayload
): Promise<[ICalculateFeeData | null, Error | null]> => {
  const deliveryCfg = delivery.getDeliveryConfig();
  const result = await fetch(
    deliveryCfg.shippingOrderURL + constants.delivery.calCulateFee,
    {
      method: "POST",
      headers: {
        Token: "eecc4477-3722-11ed-ad26-3a4226f77ff0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload, service_type_id: null, coupon: null }),
    }
  );
  const response = (await result.json()) as ICalculateFeeResponse;
  if (String(response.code).startsWith("4")) {
    const err = new Error(response.message);
    return [null, err];
  }

  return [response.data, null];
};

const getServices = async (
  payload: IServicePayload
): Promise<[Array<IServiceData> | null, Error | null]> => {
  const deliveryCfg = delivery.getDeliveryConfig();
  const result = await fetch(
    deliveryCfg.shippingOrderURL + constants.delivery.service,
    {
      method: "POST",
      headers: {
        Token: "eecc4477-3722-11ed-ad26-3a4226f77ff0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload, shop_id: deliveryCfg.shopID }),
    }
  );
  const response = (await result.json()) as IServiceResponse;
  if (String(response.code).startsWith("4")) {
    const err = new Error(response.message);
    return [null, err];
  }

  return [response.data, null];
};
export default {
  getServices,
  calculateFee,
};
