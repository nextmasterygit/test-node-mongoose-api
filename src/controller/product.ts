import { Request, Response } from 'express';
import { NodeMongooseApi, helpers, CustomParamsType } from 'node-mongoose-api';
import { Product } from '../model/product';
import { Member } from '../model/member';
import { MemberSchemaType, ProductSchemaType } from '../interface/modelInterface';

const model = Product;
const modelName = 'Product';
const MemberModel = Member;

const { createOp, updateOp, deleteOp, listAggregation, lookupUnwindStage } =
  NodeMongooseApi(model);
const memberModel = NodeMongooseApi(MemberModel);
const {
  handleAsync,
  handleAsyncSession,
  handleFormAsync,
  ResponseJson,
  utility,
  message
} = helpers;
// ##create test##
export const create = handleFormAsync(
  async (req: Request, res: Response, next, err, fields, files) => {
    let data: ProductSchemaType;
    const { title, images, price, publishby, category } =
      utility.extractArrayItems(fields);
    data = { title, price, publishby, category };
    data.images = JSON.parse(images);

    const response = await createOp.create({ data });
    ResponseJson(res, 200, message.INSERT_SUCCESS, response);
  },
  modelName
);
export const createSession = handleAsyncSession(async (req, res, next, session) => {
  let data: ProductSchemaType = req.body;
  console.log(data);
  const memberData: MemberSchemaType = { fullName: 'session test', phone: '1234' };
  await memberModel.createOp.create({ data: memberData, options: { session } });
  const response = await createOp.create({ data, options: { session } });
  ResponseJson(res, 200, message.INSERT_SUCCESS, response);
}, modelName);

// ##list aggregation##
export const list = handleAsync(async (req: Request, res: Response) => {
  const lookup = [
    ...lookupUnwindStage('categories', 'category', '_id', 'category'),
    ...lookupUnwindStage('members', 'publishby', '_id', 'publishby')
  ];
  const projectionFields = {
    _id: 1,
    title: 1,
    images: 1,
    price: 1,
    publishby: { fullName: 1, _id: 1 },
    category: 1,
    createdAt: 1,
    updatedAt: 1
  };
  const customParams: CustomParamsType = {
    lookup,
    projectionFields,
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
