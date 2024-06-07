const validateFields = (fields: String[]) => {
  const requiredFields = ["product_code", "new_price"];
  return requiredFields.filter((field, i) => !(field === fields[i]));
};

export default validateFields;
