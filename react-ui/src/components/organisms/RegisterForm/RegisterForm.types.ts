export type RegisterFormProps = {
  userID: string | null | undefined;
  register: (username: string, email: string, password: string) => void;
};
