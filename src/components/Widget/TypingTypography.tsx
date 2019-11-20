import React, {useEffect, useState} from 'react'

interface Props {
    content: string
}

export const TypingTypography: React.FunctionComponent<Props> = React.memo(props => {
    const {content} = props;
    const [title, setTitle] = useState('');

    useEffect(() => {
            let arrIndex = 0;
            let tempTitle = '';
            const arr = content.split('');
            setInterval(() => (arrIndex !== arr.length) ? (function () {
                    tempTitle = tempTitle + arr[arrIndex];
                    setTitle(tempTitle);
                    arrIndex++
                })() : clearInterval(), 100
            )
        }, []
    );
    return <>
        {title}
    </>
});