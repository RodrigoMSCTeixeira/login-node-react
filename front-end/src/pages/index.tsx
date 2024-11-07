import RequestForwardingController from "@/server/controllers/RequestForwardingController";
import ReadDataService from "@/server/services/ReadDataService";
import { canSSRGuest } from "@/utils/functions/canSSRGuests";
import IUser from "@/utils/interfaces/IUser";
import { Method } from "@/utils/types/THttpRequest";

interface HomeProps {
  users: IUser;
}

export default function Home({ users }: HomeProps) {
  console.log("users", users);
  return (
    <section>
      <h1>Página de home</h1>
    </section>
  );
}

export const getServerSideProps = canSSRGuest(async (context) => {
  try {
    const params = {
      endpoint: "user",
      method: "GET" as Method,
    };

    const { data } = await new RequestForwardingController<IUser>({
      ...params,
    }).getRequest;

    const readData = new ReadDataService<IUser>(data).getRead;

    return {
      props: {
        users: readData,
      },
    };
  } catch (error) {
    return {
      props: {
        users: {},
      },
    };
  }
});
