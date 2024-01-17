import {
    Box,
    Button,
    FormControl,
    FormLabel,
    NumberInput,
    NumberInputField,
} from "@chakra-ui/react"
import { FC, useState } from "react"
import * as Web3 from "@solana/web3.js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import {
    Memecoin1Mint,
    Memecoin2Mint,
    tokenSwapStateAccount,
    swapAuthority,
    poolMemecoin1Account,
    poolMemecoin2Account,
    ourpoolMint,
    feeAccount,
} from "../utils/constants"
import { TokenSwap, TOKEN_SWAP_PROGRAM_ID } from "@solana/spl-token-swap"
import * as token from "@solana/spl-token"
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"

export const WithdrawSingleTokenType: FC = (props: {
    onInputChange?: (val: number) => void
    onMintChange?: (account: string) => void
}) => {
    const [poolTokenAmount, setAmount] = useState(0)
    const { connection } = useConnection()
    const { publicKey, sendTransaction } = useWallet()

    const handleWithdrawSubmit = (event: any) => {
        event.preventDefault()
        handleTransactionSubmit()
    }

    const handleTransactionSubmit = async () => {
        if (!publicKey) {
            alert("Please connect your wallet!")
            return
        }

        const poolMintInfo = await token.getMint(connection, ourpoolMint)

        const kryptATA = await token.getAssociatedTokenAddress(
            Memecoin1Mint,
            publicKey
        )
        const scroogeATA = await token.getAssociatedTokenAddress(
            Memecoin2Mint,
            publicKey
        )
        const tokenAccountPool = await token.getAssociatedTokenAddress(
            ourpoolMint,
            publicKey
        )

        const transaction = new Web3.Transaction()

        let account = await connection.getAccountInfo(tokenAccountPool)

        if (account == null) {
            const createATAInstruction =
                token.createAssociatedTokenAccountInstruction(
                    publicKey,
                    tokenAccountPool,
                    publicKey,
                    ourpoolMint
                )
            transaction.add(createATAInstruction)
        }

        const instruction = TokenSwap.withdrawAllTokenTypesInstruction(
            tokenSwapStateAccount,
            swapAuthority,
            publicKey,
            ourpoolMint,
            feeAccount,
            tokenAccountPool,
            poolMemecoin1Account,
            poolMemecoin2Account,
            kryptATA,
            scroogeATA,
            TOKEN_SWAP_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            poolTokenAmount * 10 ** poolMintInfo.decimals,
            0,
            0
        )

        transaction.add(instruction)
        try {
            let txid = await sendTransaction(transaction, connection)
            alert(
                `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
            )
            console.log(
                `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
            )
        } catch (e) {
            console.log(JSON.stringify(e))
            alert(JSON.stringify(e))
        }
    }

    return (
        <Box
            p={4}
            display={{ md: "flex" }}
            maxWidth="32rem"
            margin={2}
            justifyContent="center"
        >
            <form onSubmit={handleWithdrawSubmit}>
                <FormControl isRequired>
                    <FormLabel color="gray.200">
                        Our Memecoin - Withdraw
                    </FormLabel>
                    <NumberInput
                        max={1000}
                        min={1}
                        onChange={(valueString) =>
                            setAmount(parseInt(valueString))
                        }
                    >
                        <NumberInputField id="amount" color="gray.400" />
                    </NumberInput>
                </FormControl>
                <Button width="full" mt={4} type="submit">
                    Withdraw
                </Button>
            </form>
        </Box>
    )
}
