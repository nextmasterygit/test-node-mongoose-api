import { Request, Response } from 'express';
import { NodeMongooseApi, helpers, CustomParamsType, QueryType } from 'node-mongoose-api';

import { Member } from '../model/member';
import { MemberSchemaType } from '../interface/modelInterface';

const model = Member;
const modelName = 'Member';

const { createOp, updateOp, deleteOp, listAggregation } = NodeMongooseApi(model);
const { handleAsync, ResponseJson, utility, message } = helpers;
// ##create test##
export const create = handleAsync(async (req: Request, res: Response) => {
  const data: MemberSchemaType = req.body;
  utility.removeUndefined(data);
  const response = await createOp.create({ data });
  ResponseJson(res, 200, message.INSERT_SUCCESS, response);
}, modelName);

// ##updating test##
export const update = handleAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: MemberSchemaType = req.body;
  const response = await updateOp.findByIdAndUpdate({ id, data });
  ResponseJson(res, 200, message.UPDATED_SUCCESS, response);
}, modelName);
export const updateMany = handleAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const { ids, ...updateData } = data;
  await updateOp.updateMany({ ids, data: updateData });
  ResponseJson(res, 200, message.UPDATED_SUCCESS);
}, modelName);
export const updateManyFast = handleAsync(async (req: Request, res: Response) => {
  await updateOp.updateManyFast({ req, res });
  ResponseJson(res, 200, message.UPDATED_SUCCESS);
}, modelName);

// ##removing test##
export const remove = handleAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteOp.deleteOne({ id });
  ResponseJson(res, 200, message.DELETE_SUCCESS);
}, modelName);
export const removeMany = handleAsync(async (req: Request, res: Response) => {
  const ids = req.body.ids;
  await deleteOp.deleteMany({ ids });
  ResponseJson(res, 200, message.DELETE_SUCCESS);
}, modelName);
export const removeManyFast = handleAsync(async (req: Request, res: Response) => {
  await deleteOp.deleteManyFast({ req, res });
}, modelName);

// ##list aggregation##
export const list = handleAsync(async (req: Request, res: Response) => {
  const customParams: CustomParamsType = {
    projectionFields: {
      _id: 1,
      fullName: 1,
      phone: 1,
      createdAt: 1,
      updatedAt: 1
    },
    searchTerms: ['_id', 'fullName']
  };
  const {
    columnFilters,
    fromDate,
    toDate,
    fieldDate,
    limit,
    searchTerm,
    page,
    sortField,
    sortOrder,
    deleted
  }: QueryType = req.query;
  const result = await listAggregation({
    model,
    customParams,
    query: req.query
    // ids: ['66cd4955ea80fe74a77a983b']
  });
  if (result) {
    const { data, total } = result;
    return ResponseJson(res, 200, message.SUCCESS, data, total);
  }
}, modelName);
