import { Response } from "express";
import status from "http-status";

import { ISuccessResponse } from "./success.interface";

const SuccessOk = (
  response: Response,
  payload?: unknown
): Response<ISuccessResponse> => {
  const statusOk: ISuccessResponse = {
    statusCode: status.OK,
    statusName: status[status.OK],
    ...(payload ? { payload } : {})
  };

  return response.status(statusOk.statusCode).json(statusOk);
};

const SuccessCreated = (
  response: Response,
  payload?: unknown
): Response<ISuccessResponse> => {
  const statusCreated: ISuccessResponse = {
    statusCode: status.CREATED,
    statusName: status[status.CREATED],
    ...(payload ? { payload } : {})
  };

  return response.status(statusCreated.statusCode).json(statusCreated);
};

const SuccessAccepted = (
  response: Response,
  payload?: unknown
): Response<ISuccessResponse> => {
  const statusAccepted: ISuccessResponse = {
    statusCode: status.ACCEPTED,
    statusName: status[status.ACCEPTED],
    ...(payload ? { payload } : {})
  };

  return response.status(statusAccepted.statusCode).json(statusAccepted);
};

const SuccessNonAuthInfo = (
  response: Response,
  payload?: unknown
): Response<ISuccessResponse> => {
  const statusNonAuthInfo: ISuccessResponse = {
    statusCode: status.NON_AUTHORITATIVE_INFORMATION,
    statusName: status[status.NON_AUTHORITATIVE_INFORMATION],
    ...(payload ? { payload } : {})
  };

  return response.status(statusNonAuthInfo.statusCode).json(statusNonAuthInfo);
};

const SuccessNoContent = (
  response: Response,
  payload?: unknown
): Response<ISuccessResponse> => {
  const statusNonAuthInfo: ISuccessResponse = {
    statusCode: status.NO_CONTENT,
    statusName: status[status.NO_CONTENT],
    ...(payload ? { payload } : {})
  };

  return response.status(statusNonAuthInfo.statusCode).json(statusNonAuthInfo);
};

export {
  SuccessAccepted,
  SuccessCreated,
  SuccessNoContent,
  SuccessNonAuthInfo,
  SuccessOk
};
