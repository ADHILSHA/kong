export interface Service {
  id:string;
  name:string;
  description:string;
  type:'REST'|'GraphQL';
  published:boolean;
  configured:boolean;
  versions:Version[];
  metrics:Metrics;
}
export interface Version {
  id:string;
  name:string;
  description:string;
  updated_at:string;
  developer:User;
}
export interface Metrics {
  latency: number;
  uptime: number;
  requests: number;
  errors: number;
}
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}