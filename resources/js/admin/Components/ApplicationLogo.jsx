import { twMerge } from "tailwind-merge";
import logo from "../../../../public/img/logo.png";
import logoDark from "../../../../public/img/logo_black.png";

export default function ApplicationLogo({ className, ...props }) {
    return (
        <>
            <img src={logoDark} {...props} className={twMerge(className, 'block dark:hidden')} />
            <img src={logo} {...props} className={twMerge(className, 'hidden dark:block')} />
        </>
    );
}
