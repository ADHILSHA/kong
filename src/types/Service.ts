export interface Service {
  id:string;
  name:string;
  description:string;
  type:'REST'|'GraphQL';
  published:boolean;
  configured:boolean;
  versions:Version[];
}
export interface Version {
  id:string;
  name:string;
  description:string;
  updated_at:string;
}
