export const handler = async (...args: any[]) => {
  console.log({ args });
  return {
    statusCode: 200,
    body: "hello",
  };
};
