export type LoginFormProps = {
  userID: string | null | undefined;
  authenticate: (username: string, password: string) => void;
};
