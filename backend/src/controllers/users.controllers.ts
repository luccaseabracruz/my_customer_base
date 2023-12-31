import { Request, Response } from "express";
import { TUserRequest, TUserResponse } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.service";
import listUsersService from "../services/users/listUsers.service";
import deleteUserService from "../services/users/deleteUser.service";
import retrieveUserService from "../services/users/retrieveUser.service";
import updateUserService from "../services/users/updateUser.service";
import { retrieveSelfDataService } from "../services/users/retrieveSelfData.service";
import { User } from "../entities/user.entities";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;
  const user: TUserResponse = await createUserService(userData);

  return res.status(201).json(user);
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: TUserResponse[] = await listUsersService();
  return res.status(200).json(users);
};

const selfDataController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(res.locals.userId);
  const user: User = await retrieveSelfDataService(userId);

  return res.status(200).json(user);
};

const retrieveUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const user: TUserResponse = await retrieveUserService(userId);

  return res.status(200).json(user);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUserData: Partial<TUserRequest> = req.body;
  const userId: number = parseInt(req.params.id);

  const updatedUserData: TUserResponse = await updateUserService(
    newUserData,
    userId
  );

  return res.status(200).json(updatedUserData);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  await deleteUserService(userId);
  return res.status(204).send();
};

export {
  createUserController,
  listUsersController,
  selfDataController,
  retrieveUserController,
  updateUserController,
  deleteUserController,
};
