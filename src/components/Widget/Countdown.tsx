import React, {useEffect, useState} from 'react';

interface Props {
    initNum: number
}

export const CountDown: React.FunctionComponent<Props> = props => {
    const {initNum} = props;
    const [num, setNum] = useState(initNum);
    const gg = (() => {
        return `5415 ${setNum(4)} {num}`
    })();
    useEffect(
        () => {
            if (num > 0) {
                setTimeout(
                    () => {
                        setNum(num - 1)
                    }, 1000
                )
            }
        }, [num]
    );
    return <>
        {num === 0 ? null : num}
    </>
};