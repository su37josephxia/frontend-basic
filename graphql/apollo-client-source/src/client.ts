import Axios, { AxiosInstance } from "axios";

type config = {
  uri: string;
};

export class Client {
  constructor({ uri }: config) {
    this.uri = uri;
    this.axios = Axios.create();
  }
  private uri: string;
  private axios: AxiosInstance;
  query({ query, variables }: { query: string; variables: any }) {
    return this.axios.post(this.uri, { query, variables });
  }
}


interface ProviderProps {
  client: Client;
}

