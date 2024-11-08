
import axios from "axios";

const axiosIntercepterCall = (endpoint) => {
  // Use the provided endpoint with the base URL
  
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`);
};

 export const axiosIntercepterCallPost=(endpoint,studentData)=>{
  console.log(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,studentData)
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,studentData);
}

export default axiosIntercepterCall;
