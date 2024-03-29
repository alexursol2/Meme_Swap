import { FC } from "react"
import styles from "../styles/Home.module.css"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import Image from "next/image"

export const AppBar: FC = () => {
    return (
        <div className={styles.AppHeader}>
            <Image
                alt="Solana logo"
                src="/1.png"
                height={80}
                width={80}
            />
            <span>Meme Swap</span>
            <WalletMultiButton />
        </div>
    )
}
