import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"
const TOKEN= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGM3ZjgzNzBiNTViNDhhZDBlMWMxMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3ODY1ODUyNSwiZXhwIjoxNjc4OTE3NzI1fQ.tkkiR9Ho6UmUbc-X8PHJuyeTYGVWhReBggcer6P63n0";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
  });
  
  export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
  });
