export type CreateRequest = {
    username: string;
    email: string;
    password: string;
  };

export type CreateResponse = {
    id: number;
    username: string;
    email: string;
    phoneNumber: string;
    createdAt: number;
};

export type MeResponse = {
    id: number;
    username: string;
    email: string;
    phoneNumber: string;
    createdAt: number;
};
