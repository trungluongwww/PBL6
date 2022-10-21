// moi request deu co header bearer token

//API Tao hoa don va cac API lien quan

// create order:
//

// POST localhost:5000/orders/
// EX: payload
const BODY = {
  shopId: "8dcc2580-95ed-4ec2-a43f-9e3eeae7d122",
  address: "string",
  toName: "string",
  toPhone: "string",
  toStreet: "string",
  toWardCode: 40611,
  toDistrictId: 1687,
  serviceId: 53321,
  voucherId: "8dcc9380-95ed-4ec2-a43f-9e3eeae7d600",
  items: [
    {
      product_id: "8dcc9380-12ed-4ec2-a43f-9e3eeae7d688",
      quantity: 2,
    },
    {
      product_id: "8dcc2280-95ed-4ec2-a43f-9e3eeae7d688",
      quantity: 2,
    },
  ],
};

const responsee = {
  data: {},
  message: "success",
};

// cac field start = "to" có 2 options  lấy từ thông tin cá nhân hoặc nhập tay
// cách lấy serviceId
// API
// POST localhost:5000/services
// EX: payload
const Body = {
  from_district: 3695,
  to_district: 1531,
};
const responseee = {
  data: [
    {
      service_id: 53321,
      short_name: "Đi bộ",
      service_type_id: 2,
    },
  ],
  message: "success",
};

// cách lấy preview fee
//API
// localhost:5000/feePOST
const body = {
  from_district_id: 3695,
  service_id: 53321,
  to_district_id: 1687,
  to_ward_code: "40611",
  items: [
    {
      product_id: "8dcc9380-95ed-4ec2-a43f-9e3eeae7d612",
      quantity: 1,
    },
    {
      product_id: "8dcc9380-95ed-4ec2-a43f-9e3eeae7d695",
      quantity: 1,
    },
  ],
};

const responseeee = {
  data: {
    total: 49000,
    service_fee: 49000,
    insurance_fee: 0,
    pick_station_fee: 0,
    coupon_value: 0,
    r2s_fee: 0,
  },
  message: "success",
};

//API lấy danh sách order
// GET localhost:5000/orders/?limit=10&page=1&status=wait_for_confirm
const res = {
  data: [
    {
      id: "5e378176-5980-40be-89bb-66ddf5103872",
      createdAt: "2022-10-15T05:34:17.285Z",
      updatedAt: "2022-10-15T05:34:17.285Z",
      total: "251599",
      status: "wait_for_confirm",
      shop: {
        id: "8dcc2580-95ed-4ec2-a43f-9e3eeae7d122",
        name: "Thanh",
      },
      items: [
        {
          id: "a5aba643-2aca-4152-8175-c50b2bf035c1",
          quantity: 2,
          product: {
            id: "8dcc9380-12ed-4ec2-a43f-9e3eeae7d688",
            name: "san pham 3",
            description: "qweqweqw",
            price: "30000",
            avatar: "default.png",
          },
        },
        {
          id: "a3591539-9300-4fc3-8721-ceedd5302088",
          quantity: 2,
          product: {
            id: "8dcc2280-95ed-4ec2-a43f-9e3eeae7d688",
            name: "san pham 4",
            description: "qweqweqw",
            price: "100000",
            avatar: "default.png",
          },
        },
      ],
    },
    {
      id: "1694f3c6-8b8a-4a8b-9c2a-89a1e63344f5",
      createdAt: "2022-10-09T10:23:12.703Z",
      updatedAt: "2022-10-09T10:23:12.703Z",
      total: "285997",
      status: "wait_for_confirm",
      shop: {
        id: "8dcc9380-95ed-4ec2-a43f-9e3eeae7d697",
        name: "Trang",
      },
      items: [
        {
          id: "7ac8a68a-0d63-4d83-8127-2cb6385d1a89",
          quantity: 4,
          product: {
            id: "8dcc9380-95ed-4ec2-a43f-9e3eeae7d612",
            name: "san pham 2",
            description: "qweqweqw",
            price: "50000",
            avatar: "default.png",
          },
        },
        {
          id: "612c1ef1-76be-42cf-b1b1-82ed641bd4ce",
          quantity: 2,
          product: {
            id: "8dcc9380-95ed-4ec2-a43f-9e3eeae7d695",
            name: "san pham 1",
            description: "qweqweqw",
            price: "25000",
            avatar: "default.png",
          },
        },
      ],
    },
  ],
  message: "success",
};
// APi lấy chi tiết order
// GET localhost:5000/orders/3bf50dd5-e212-4fe1-95b1-f1fc56817831
//EX : response
const response = {
  data: {
    createdAt: "2022-10-08T15:03:25.144Z",
    updatedAt: "2022-10-14T14:11:07.368Z",
    address: "string",
    totalDiscount: "45000",
    productDiscount: "0",
    voucherDiscount: "0",
    totalPrice: "250000",
    deliveryFee: "78997",
    total: "283997",
    status: "completed",
    customer: {
      id: "8dcc9380-95ed-4ec2-a43f-9e3eeae7d698",
      name: "Trung",
      email: "trungluongw@gmail.com",
      phone: "077887878",
    },
    shop: {
      id: "8dcc9380-95ed-4ec2-a43f-9e3eeae7d697",
      name: "Trang",
      email: "wqeqw@gmail.com",
      phone: "044568787",
    },
    items: [
      {
        id: "25d000fa-2eb2-4bae-b822-3aa80ade387c",
        quantity: 4,
        product: {
          id: "8dcc9380-95ed-4ec2-a43f-9e3eeae7d612",
          name: "san pham 2",
          description: "qweqweqw",
          price: "50000",
          avatar: "default.png",
        },
      },
      {
        id: "57bbac1f-bfc6-4c3b-94ac-5ac5350e6921",
        quantity: 2,
        product: {
          id: "8dcc9380-95ed-4ec2-a43f-9e3eeae7d695",
          name: "san pham 1",
          description: "qweqweqw",
          price: "25000",
          avatar: "default.png",
        },
      },
    ],
  },
  message: "success",
};
// Các API lấy address
// get province
//GET localhost:5000/provinces/

const responseeeee = {
  data: [
    {
      ProvinceID: 269,
      ProvinceName: "Lào Cai",
      CountryID: 1,
      Code: "20",
      NameExtension: [
        "Lào Cai",
        "Tỉnh Lào Cai",
        "T.Lào Cai",
        "T Lào Cai",
        "laocai",
      ],
      IsEnable: 1,
      RegionID: 6,
      UpdatedBy: 1718600,
      CreatedAt: "2019-12-05 15:41:26.891384 +0700 +07 m=+0.010448463",
      UpdatedAt: "2019-12-05 15:41:26.891384 +0700 +07 m=+0.010449016",
      CanUpdateCOD: false,
      Status: 1,
    },
    {
      ProvinceID: 268,
      ProvinceName: "Hưng Yên",
      CountryID: 1,
      Code: "321",
      NameExtension: [
        "Hưng Yên",
        "Tỉnh Hưng Yên",
        "T.Hưng Yên",
        "T Hưng Yên",
        "hungyen",
      ],
      IsEnable: 1,
      RegionID: 6,
      UpdatedBy: 1718600,
      CreatedAt: "2019-12-05 15:41:26.89138 +0700 +07 m=+0.010444468",
      UpdatedAt: "2019-12-05 15:41:26.891383 +0700 +07 m=+0.010447473",
      CanUpdateCOD: false,
      Status: 1,
    },
    //......
    //...
  ],
  message: "success",
};
// get dícstrict
//GET localhost:5000/districts/:idProvince

const ressponse = {
  data: [
    {
      DistrictID: 3695,
      ProvinceID: 202,
      DistrictName: "Thành Phố Thủ Đức",
      Code: "3695",
      Type: 1,
      SupportType: 3,
      NameExtension: [
        "TP Thủ Đức",
        "thành phố thủ đức",
        "TP. Thủ Đức",
        "TP. Thu Duc",
        "thuduc",
        "Thu Duc City",
      ],
      IsEnable: 1,
      CanUpdateCOD: false,
      Status: 1,
      WhiteListClient: {
        From: null,
        To: null,
        Return: null,
      },
      WhiteListDistrict: {
        From: null,
        To: null,
      },
      ReasonCode: "",
      ReasonMessage: "",
      OnDates: null,
      CreatedIP: "35.247.155.234",
      CreatedEmployee: 242614,
      CreatedSource: "internal",
      CreatedDate: "2020-12-25T08:02:27.479Z",
      UpdatedIP: "35.247.155.234",
      UpdatedEmployee: 242614,
      UpdatedSource: "internal",
      UpdatedDate: "2021-11-25T10:21:20.226Z",
    },
    //......
    //...
  ],
  message: "success",
};
// get wards
//GET localhost:5000/wards/:idDistrict
const resssponse = {
  data: [
    {
      WardCode: "40611",
      DistrictID: 1687,
      WardName: "Xã Hòa Tiến",
      NameExtension: [
        "Xã Hòa Tiến",
        "X.Hòa Tiến",
        "X Hòa Tiến",
        "Hòa Tiến",
        "Hoa Tien",
        "Xa Hoa Tien",
        "hoatien",
      ],
      IsEnable: 1,
      CanUpdateCOD: false,
      UpdatedBy: 1718600,
      CreatedAt: "2019-12-05 16:02:20.395076 +0700 +07 m=+0.031413060",
      UpdatedAt: "2020-09-29 13:52:55.315039 +0700 +07 m=+199.978057832",
      SupportType: 3,
      WhiteListClient: {
        From: null,
        To: null,
        Return: null,
      },
      WhiteListWard: {
        From: null,
        To: null,
      },
      Status: 1,
      ReasonCode: "",
      ReasonMessage: "",
      OnDates: null,
    },
  ],
  message: "success",
};
