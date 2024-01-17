import { Center, Box, Heading } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import { AppBar } from "../components/AppBar"
import styles from "../styles/Home.module.css"
import { Airdrop } from "../components/AirdropForm"
import { TokenSwapForm } from "../components/TokenSwapForm"

const Home: NextPage = () => {
    return (
        <div className={styles.App}>
            <Head>
                <title>Token Swap</title>
            </Head>
            <AppBar />
            <Center>
                <Box>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "3rem", color: "white" }}>
                    <h1>Team 10</h1>
                </div>
                    <Airdrop />
                    <TokenSwapForm />
                </Box>
            </Center>
        </div>
    )
}

export default Home
