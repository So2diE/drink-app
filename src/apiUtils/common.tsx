import {defaultImg} from "../constants";
import {EventType} from "../types/server";
import Axios from "axios";

export const copyToClipboard = (str: string) => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

export const getEventImgPath = (eventType: EventType) => `/image/${eventType.toLowerCase().slice(0,-1)}-icon-background.png`;

export const refactorTextLength = (content: string, length: number = 20): string =>
    content.length > length ? content.slice(0, length).concat('...') : content;

export const handleImgValid = (img?: any): string => img ? img.url ? img.url : img : defaultImg;

export const isImgCached = (src: string): boolean => {
    let img = new Image();
    img.src = src;
    console.log(img.complete);
    return img.complete;
};

export const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
