import { Box } from "@chakra-ui/react"
import { FC } from "react"
import { DepositSingleTokenType } from "./Deposit"
import { WithdrawSingleTokenType } from "./Withdraw"
import { SwapToken } from "./Swap"

export const TokenSwapForm: FC = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box display="flex">
                <DepositSingleTokenType />
                <WithdrawSingleTokenType />
            </Box>
            <SwapToken />
        </Box>
    )
}
