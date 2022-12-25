import {
  IDeliveryPreviewFeePayload,
  IGHNServicePayload,
  IGHNFeePayload,
  IGHNPreviewFeeData,
  IGHNServiceResponse,
  IGHNServiceData,
  IGHNPreviewFeeResponse,
} from "../../interfaces/delivery";
import fetch from "node-fetch";
import delivery from "./index";
import constants from "../../constants";
import services from "../../server/services";
import { IOrderInfo } from "../../interfaces/order";

const calculateFee = async (
  payload: IDeliveryPreviewFeePayload,
  orderInfo: IOrderInfo | null
): Promise<[IGHNPreviewFeeData | null, Error | null]> => {
  const deliveryCfg = delivery.getDeliveryConfig();

  let err;

  if (!orderInfo) {
    [orderInfo, err] = await services.product.calculator.infoOrder(
      payload.items,
      null
    );
    if (err) {
      return [null, err];
    }
  }

  const GHNPayload = {
    from_district_id: payload.from_district_id,
    service_id: payload.service_id,
    to_district_id: payload.to_district_id,
    to_ward_code: payload.to_ward_code,
    height: orderInfo?.height || 0,
    weight: orderInfo ? Math.floor(orderInfo.weight) : 0,
    length: orderInfo?.length || 0,
    width: orderInfo?.width || 0,
    insurance_value: orderInfo?.insurance_value,
  } as IGHNFeePayload;

  if (
    GHNPayload.weight < 1 ||
    GHNPayload.height < 1 ||
    GHNPayload.length < 1 ||
    GHNPayload.width < 1
  ) {
    return [null, Error("invalid info product")];
  }

  const result = await fetch(
    deliveryCfg.shippingOrderURL + constants.delivery.calCulateFee,
    {
      method: "POST",
      headers: {
        Token: "eecc4477-3722-11ed-ad26-3a4226f77ff0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...GHNPayload,
        service_type_id: null,
        coupon: null,
      }),
    }
  );

  const response = (await result.json()) as IGHNPreviewFeeResponse;
  if (String(response.code).startsWith("4")) {
    const err = new Error(response.message);
    return [null, err];
  }

  return [response.data, null];
};

const getServices = async (
  payload: IGHNServicePayload
): Promise<[Array<IGHNServiceData> | null, Error | null]> => {
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
  const response = (await result.json()) as IGHNServiceResponse;
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
