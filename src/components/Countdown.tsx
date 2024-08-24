import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

interface CountdownProps {
    seconds: number
}

export const Countdown: React.FC<CountdownProps> = ({seconds}) => {
    const [time, setTime] = useState<number>(seconds);
    useEffect(() => {
        let interval = undefined;
        if (time > 0) interval = setInterval(() => setTime(time - 1), 1000);
        return () => clearInterval(interval)
    }, [time])
    return (
        <Box display={"inline-block"}>
            {time}
        </Box>
    );
}