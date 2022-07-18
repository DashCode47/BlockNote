/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const env = process.env.ENV;
const AppsyncID = process.env.API_BLOCKNOTE_GRAPHQLAPIIDOUTPUT;
const TableName = "User-t444oaagovasrm4w3tq6klbd3q-staging";

const userExist = async (id) => {
  const params = {
    TableName: "",
    Key: id,
  };
  try {
    const response = await docClient.get(params).promise();
    return !!response?.Item;
  } catch (e) {
    return false;
  }
};

const saveUser = async (user) => {
  const date = new Date();
  const dateStr = date.toISOString();
  const timestamp = date.getTime();

  const Item = {
    ...user,
    __typename: "User",
    createdAt: dateStr,
    updatedAt: dateStr,
    _lastChangedAt: timestamp,
    _version: 1,
  };
  const params = {
    TableName,
    Item,
  };
  try {
    await docClient.put(params).promise();
  } catch (e) {
    console.log(e);
  }
};

exports.handler = async (event, context) => {
  if (!event?.request?.userAttributes) {
    console.log("No User data availabel");
    return;
  }
  const { sub, name, email } = event.request.userAttributes;

  const newUser = {
    id: sub,
    name,
    email,
  };

  if (!(await userExist(newUser.id))) {
    await saveUser(newUser);
  }
  return event;
};
