import axios from 'axios';
export const api=axios.create({baseURL:import.meta.env.VITE_API_URL||'http://localhost:4000/api/v1',withCredentials:true,headers:{'Content-Type':'application/json'}});
export type User={id:string;name:string;email:string;role:string};
export async function currentUser(){const r=await api.get('/auth/me');return r.data.user as User;}
