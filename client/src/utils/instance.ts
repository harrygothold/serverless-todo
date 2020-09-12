import axios, { AxiosInstance } from 'axios';

const baseURL: string =
  'https://krkige49ha.execute-api.eu-west-2.amazonaws.com/dev/';

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 15000,
});

export default instance;
