// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Notas, Note } = initSchema(schema);

export {
  User,
  Notas,
  Note
};