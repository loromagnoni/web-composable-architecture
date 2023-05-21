export default function UserRepository() {
  return {
    getUser: async () => {
      await new Promise((res) => setTimeout(res, 5000));
      return {
        name: "John Doe",
        email: "john.doe@domain.com",
        avatarSrc: "https://avatars.githubusercontent.com/u/1",
      };
    },
  };
}
