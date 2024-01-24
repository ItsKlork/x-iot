const obj = {
  navigate: null,
  push: (page, ...rest) => obj.navigate(page, ...rest),
};

export default obj;
