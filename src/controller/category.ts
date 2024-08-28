import { Request, Response } from 'express';
import { NodeMongooseApi, helpers, CustomParamsType } from 'node-mongoose-api';
import { Category } from '../model/category';
import { CategorySchemaType } from '../interface/modelInterface';

const model = Category;
const modelName = 'Category';

const { createOp, updateOp, deleteOp, listAggregation } = NodeMongooseApi(model);
const { handleAsync, ResponseJson, utility, message } = helpers;
// ##create test##
export const create = handleAsync(async (req: Request, res: Response) => {
  const data: CategorySchemaType = req.body;
  utility.removeUndefined(data);
  const response = await createOp.create({ data });
  ResponseJson(res, 200, message.INSERT_SUCCESS, response);
}, modelName);

// ##updating test##
export const update = handleAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: CategorySchemaType = req.body;
  const response = await updateOp.findByIdAndUpdate({ id, data });
  ResponseJson(res, 200, message.UPDATED_SUCCESS, response);
}, modelName);

// ##removing test##
export const remove = handleAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteOp.deleteOne({ id });
  ResponseJson(res, 200, message.DELETE_SUCCESS);
}, modelName);

// ##list aggregation##
export const list = handleAsync(async (req: Request, res: Response) => {
  const customParams: CustomParamsType = {
    projectionFields: {
      _id: 1,
      name: 1,
      createdAt: 1,
      updatedAt: 1
    },
    searchTerms: ['_id', 'name']
  };

  const result = await listAggregation({
    model,
    customParams,
    query: req.query
  });
  if (result) {
    const { data, total } = result;
    return ResponseJson(res, 200, message.SUCCESS, data, total);
  }
}, modelName);
