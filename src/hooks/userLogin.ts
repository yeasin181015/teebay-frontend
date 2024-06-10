import { LOGIN_USER } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

export const loginUser = (email: string, password: string) => {
  const { data, error, loading } = useQuery(LOGIN_USER, {
    variables: {
      email,
      password,
    },
  });

  return {
    data,
    error,
    loading,
  };
};
