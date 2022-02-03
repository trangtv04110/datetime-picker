import Head from "next/head";
import DatePicker from "../components/date-picker";
import TimePicker from "../components/time-picker";

export default function Home() {
  const defaultDate = "2022-02-18";
  const defaultTime = "04:19";

  return (
    <div>
      <Head>
        <title>Demo App</title>
        <meta name="description" content="Demo app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>

      <main>
        <DatePicker
          selected={defaultDate}
          onChange={(value) => console.log(value)}
        />
        <TimePicker
          selected={defaultTime}
          onChange={(value) => console.log(value)}
        />
      </main>
    </div>
  );
}
