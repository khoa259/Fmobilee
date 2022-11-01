import axios from "axios";

export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);

export const getCategory = async (slug, authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6ImRjMzdkNTkzNjVjNjIyOGI4Y2NkYWNhNTM2MGFjMjRkMDQxNWMxZWEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoidG9haSBidWkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUxtNXd1MlpRMWZzc0NJTjlGSmpHR19VQVRoVm1tNUlCMlBScFJqTlNzLXZUdz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9lLWNvbW1lcmNlLWFiNDk5IiwiYXVkIjoiZS1jb21tZXJjZS1hYjQ5OSIsImF1dGhfdGltZSI6MTY2NzMxNjkzMCwidXNlcl9pZCI6IlJ3bEVxY1FsQ0pYM09aVTdNMktRU3JCV3R0UTIiLCJzdWIiOiJSd2xFcWNRbENKWDNPWlU3TTJLUVNyQld0dFEyIiwiaWF0IjoxNjY3MzE2OTMwLCJleHAiOjE2NjczMjA1MzAsImVtYWlsIjoiYnVpdG9haTIwMzFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTA5OTQwMzU2MzExMDcxNDE4ODYiXSwiZW1haWwiOlsiYnVpdG9haTIwMzFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.RWI_68z75AuwC6rJjcpOoE4mqXMIEKVaicS1j5y7CKwSqi4wfr1R1dDzfQCMCfYU7iHQVXQCRBPEvihKXM9UYcpqXGE0NxQwRUNJvzB83YzmSo1nQgo8lNg8t9BmZpiylj-mvgRes2HdA1CGEDcpVAVd2x91roj7lXMONSkG3aKdw-swpo1a33NyGsICfJSZehPCU-oNLphjFLkr9BY8VpUuS_GbWA-MjNZ6fKyjjkftEEW3__lvU7p8blp-a9j4ZwPvt3vV6wNSotlTRnlJYeY76Fgn7nyr4C4f7zUbJH9wHB5ankjYp7gMC20mHhZ2gOMtZcrNZBMNFr9DyOImWg",
    },
  });

export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
    headers: {
      authtoken,
    },
  });

export const createCategory = async (category, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/category`, category, {
    headers: {
      authtoken,
    },
  });
