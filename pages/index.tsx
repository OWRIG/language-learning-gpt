import { type NextPage } from "next";
import Head from "next/head";
import MainContainer from "@/components/Container";
import Header from "@/components/Header";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>English Helper</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
				<Header />
				<MainContainer />
			</div>
		</>
	);
};

export default Home;
