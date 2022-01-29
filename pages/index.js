import Head from "next/head";
import DatePicker from "../components/date-picker";

export default function Home() {
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
        <DatePicker />
      </main>
    </div>
  );
}
