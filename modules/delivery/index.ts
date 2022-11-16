import { IDeliveryConfig } from "../../interfaces/delivery";
import shippingOrder from "./shipping-order";
import masterData from "./master-data";

let delivery: IDeliveryConfig;

const init = (cfg: NodeJS.ProcessEnv) => {
  delivery = {
    masterDataURL: cfg.GHN_MASTERDATA_URL,
    shippingOrderURL: cfg.GHN_SHIPING_ORDER_URL,
    token: cfg.GHN_TOKEN || "",
    shopID: Number(cfg.GHN_SHOP_ID) || 1,
  } as IDeliveryConfig;
};

const getDeliveryConfig = () => {
  return delivery;
};

export default {
  init,
  getDeliveryConfig,
  shippingOrder,
  masterData,
};
