import React, {useEffect, useRef, useState} from 'react';
import Theme from './Theme';
import Context from './Context';
import Nav from './Nav';
import Footer from "./Footer";

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            return () => {
                clearTimeout(handler);
            };
        },
        [value]
    );
    return debouncedValue;
};

export default {Context, Theme, Nav, Footer};

export {
    Theme,
    Context,
    Nav,
    Footer,
    useDebounce,
};