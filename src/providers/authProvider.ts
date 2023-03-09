import { AuthProvider } from "@pankod/refine-core";
import dataProvider, { GraphQLClient } from "@pankod/refine-strapi-graphql";

const API_URL = "https://pptg8cym.directus.app/graphql/system";

const client = new GraphQLClient(API_URL);
const gqlDataProvider = dataProvider(client);
//export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        try {
            // eslint-disable-next-line
            const { data } = await gqlDataProvider.custom!({
                url: "",
                method: "post",
                metaData: {
                    operation: "auth_login",
                    variables: {email: {value:email, required: true},password: {value:password, required: true} },
                    fields: ["access_token"],
                },
            });
console.log(data.access_token)
            localStorage.setItem("token", data.access_token);
            client.setHeader("Authorization", `Bearer ${data.access_token}`);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }},
  logout: async () => {
      localStorage.removeItem("token");
      client.setHeader("Authorization", "");
      return Promise.resolve("/");
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => {
      const jwt = localStorage.getItem("token");

      if (!jwt) {
          return Promise.reject();
      }

      client.setHeader("Authorization", `Bearer ${jwt}`);

      return Promise.resolve();
  },
  getPermissions: async () => {
      try {
          // eslint-disable-next-line
          const { data } = await gqlDataProvider.custom!({
              url: "",
              method: "get",
              metaData: {
                  operation: "me",
                  fields: [
                      {
                          role: ["name", "description", "type"],
                      },
                  ],
              },
          });
          const { role } = data;

          return Promise.resolve(role);
      } catch (error) {
          return Promise.reject(error);
      }
  },
  getUserIdentity: async () => {
      try {
          // eslint-disable-next-line
          const { data } = await gqlDataProvider.custom!({
              url: "",
              method: "get",
              metaData: {
                  operation: "users_me",
                  fields: ["id", "first_name", "email"],
              },
          });
          const { id, first_name, email } = data;
          return Promise.resolve({
              id,
              name: first_name,
              email,
          });
      } catch (error) {
          return Promise.reject(error);
      }
  },
};
