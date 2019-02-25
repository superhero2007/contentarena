export const validationTypes = {
  ENABLE_VALIDATION: "ENABLE_VALIDATION",
  DISABLE_VALIDATION: "DISABLE_VALIDATION",
};

export const validation = (state = false, action) => {
  switch (action.type) {
    case validationTypes.ENABLE_VALIDATION:
      return true;

    case validationTypes.DISABLE_VALIDATION:
      return false;

    default:
      return state;
  }
};
