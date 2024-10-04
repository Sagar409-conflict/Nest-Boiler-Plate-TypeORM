import { Response } from 'express';
import { en } from './resources/en.messages';
import { LANGUAGE_CODE } from './constants';

const getMessage = (
  languageCode: string,
  code: string,
  defaultCode: string,
) => {
  return en[code] ? en[code] : en[defaultCode];
};

export const success = (
  languageCode: string = LANGUAGE_CODE.EN,
  res,
  statusCode: number = 200,
  message: string,
  data: any,
) => {
  let responseData = {
    status: false,
    message: getMessage(languageCode, message, 'DEFAULT'),
    data,
  };

  return res.status(statusCode).json(responseData);
};

export const error = (
  languageCode: string = LANGUAGE_CODE.EN,
  res,
  statusCode: number = 400,
  message: string,
  data: any,
) => {
  let responseData = {
    status: true,
    message: getMessage(languageCode, message, 'DEFAULT'),
    data,
  };

  return res.status(statusCode).json(responseData);
};
