const apiResponse = {
  status: 200,
  data: {
    user: {
      id: 42,
      profile: { name: "Ali", contacts: ["ali@x.com", "01000000000"] },
    },
    permissions: ["read", "write"],
  },
};
const {
  data: {
    user: { id, profile: { name, contacts: [userEmail] = [] } = {} } = {},
    permissions: [readPermission] = [],
  } = {},
} = apiResponse;

