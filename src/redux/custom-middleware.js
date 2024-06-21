const loggerMiddleware = (store) => (next) => (action) => {
  console.log("Dispatched action:", action);
  return next(action);
};

export default loggerMiddleware;
