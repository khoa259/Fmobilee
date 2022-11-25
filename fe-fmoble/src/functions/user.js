import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );
export const getUserCart = async (authtoken) =>
  await axios.get(`http://localhost:8000/api/user/cart`, {
    headers: {
      authtoken:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6ImE5NmFkY2U5OTk5YmJmNWNkMzBmMjlmNDljZDM3ZjRjNWU2NDI3NDAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoidG9haSBidWkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUxtNXd1MlpRMWZzc0NJTjlGSmpHR19VQVRoVm1tNUlCMlBScFJqTlNzLXZUdz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9lLWNvbW1lcmNlLWFiNDk5IiwiYXVkIjoiZS1jb21tZXJjZS1hYjQ5OSIsImF1dGhfdGltZSI6MTY2OTM0MzYyMSwidXNlcl9pZCI6IlJ3bEVxY1FsQ0pYM09aVTdNMktRU3JCV3R0UTIiLCJzdWIiOiJSd2xFcWNRbENKWDNPWlU3TTJLUVNyQld0dFEyIiwiaWF0IjoxNjY5MzYxMTU2LCJleHAiOjE2NjkzNjQ3NTYsImVtYWlsIjoiYnVpdG9haTIwMzFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTA5OTQwMzU2MzExMDcxNDE4ODYiXSwiZW1haWwiOlsiYnVpdG9haTIwMzFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.tj2lTvYDhp_k7yjK5N6AyvfGbLZsGIaoXJDAiWFCEmFsdKxH5jFQ2jf1FjBrgm_ASpXCCk_LNXCBtFjZ8w5hvEgwpPcX4zfdgFksb636GBk8al7YqPO9WIOXLx2WHMdgGf5I1KAHgpe1mJe_xjHJMZNqc7oIPun8d2lhA6pUk8L2rTJyFDnaZTM13-VaUTZaizUD-rxloroO0KmpSHRcjJYw0zZFVu-CXSwDtBECclMxPqGYIKH3U37-b6jOODUgNJ-I7Ii8e6du8Qz5ub7jF4JRpXFEy1TQ2KhNNbG_k3ZNyN_ABnH-RqO4CgjcWUlRU2Oq4t3HbFMIc6c3vmR7QQ",
    },
  });
