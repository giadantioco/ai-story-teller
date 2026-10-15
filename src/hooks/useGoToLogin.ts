import { useRouter } from "next/router";

export function useGoToLogin() {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login");
  };

  return goToLogin;
}
