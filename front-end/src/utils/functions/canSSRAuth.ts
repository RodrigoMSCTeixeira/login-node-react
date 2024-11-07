import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

export function canSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    try {
      return await fn(context);
    } catch (error) {
      return {
        redirect: {
          destination: "/session",
          permanent: false,
        },
      };
    }
  };
}
