interface IMessageRabbit {
  message: string;
}

interface INewUser {
  id: string;
  username: string;
  profile: IProfile;
}

interface IProfile {
  id: string;
  name: string;
  phone_number: string;
  email: string;
  avatar: string;
  province_code: string;
  ward_code: string;
  district_code: string;
  address: string;
}

export { IMessageRabbit, INewUser, IProfile };
