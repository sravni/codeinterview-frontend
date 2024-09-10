import classNames from "classnames";

import styles from "./styles.module.css";

export type LogoProps = React.HTMLAttributes<HTMLSpanElement>;

export const Logo: React.FC = (props: LogoProps) => {
    const { className, ...rest } = props;

    return (
        <span className={classNames(className, styles.logo)} {...rest}>
            <img src="https://s91588.cdn.ngenix.net/shared/static/images/design-system/sravni-logo-sign.png" alt="logo" height="24" width="28" />
            <span className={classNames(styles.text)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 20"><path d="M55.1901 12.0798V9.28988H59.6148C60.5695 9.28988 61.1738 9.84218 61.1738 10.6722C61.1738 11.5022 60.5458 12.0798 59.6148 12.0798H55.1901ZM59.3386 3.85998C60.2933 3.85998 60.8724 4.38861 60.8724 5.14289C60.8724 5.94767 60.2949 6.49997 59.3386 6.49997H55.1901V3.85998H59.3386ZM62.9333 7.78131V7.62982C64.1405 6.85029 64.6928 5.81985 64.6928 4.41228C64.6928 2.17467 63.2095 0.86809 60.6452 0.86809H51.3697V15.2468H60.4953C63.2852 15.2468 65.0699 13.6373 65.0699 11.0983C65.0699 9.49028 64.4671 8.61134 62.9333 7.78131ZM28.1858 8.08271C28.1858 10.2193 26.6014 11.8541 24.5406 11.8541C22.4545 11.8541 20.8702 10.1199 20.8702 7.98329C20.8702 5.84668 22.4545 4.21187 24.5406 4.21187C26.603 4.21187 28.1858 5.84668 28.1858 8.08271ZM17.277 19.3954H20.998V14.1422C21.9274 14.9218 23.2103 15.4993 24.9698 15.4993C29.0426 15.4993 32.0582 12.1808 32.0582 7.95804C32.0582 3.73532 29.041 0.617188 24.9698 0.617188C23.2103 0.617188 21.9274 1.16949 20.998 1.94902V0.767097H17.277V19.3954ZM37.275 8.08271C37.275 5.8451 38.8593 4.21187 40.9202 4.21187C43.0063 4.21187 44.5906 5.84668 44.5906 7.98329C44.5906 10.1199 43.0063 11.8541 40.9202 11.8541C38.8593 11.8541 37.275 10.2193 37.275 8.08271ZM48.1853 15.2484V0.768675H44.4644V2.10051C43.5334 1.19631 42.252 0.617188 40.4926 0.617188C36.4198 0.617188 33.4042 3.73374 33.4042 7.95804C33.4042 12.1808 36.4213 15.4993 40.4926 15.4993C42.252 15.4993 43.535 14.8713 44.4644 13.8661V15.2484H48.1853ZM89.4879 15.3983C91.3484 15.3983 92.7307 14.7703 93.586 13.6893V15.2484H97.3321V0.86809H93.5118V8.30836C93.5118 10.4702 92.18 11.8273 90.269 11.8273C88.2823 11.8273 87.0767 10.4702 87.0767 8.30836V0.86809H83.2564V8.53559C83.2532 12.8593 85.4908 15.3983 89.4879 15.3983ZM67.4496 15.2484H71.3709V9.84376H76.4489V15.2484H80.3702V0.86809H76.4489V6.09758H71.3709V0.86809H67.4496V15.2484ZM8.20986 15.4993C11.7793 15.4993 14.4698 13.5631 15.3992 10.3708L11.6041 9.41612C11.1513 10.8489 9.81942 11.8289 8.2856 11.8289C6.14899 11.8289 4.56468 10.2193 4.56468 8.05746C4.56468 5.8956 6.14899 4.28604 8.2856 4.28604C9.79417 4.28604 11.1008 5.24073 11.5536 6.62463L15.374 5.66994C14.4445 2.57706 11.6783 0.617188 8.20986 0.617188C3.8104 0.617188 0.693848 3.70849 0.693848 8.05746C0.693848 12.4317 3.78515 15.4993 8.20986 15.4993Z" fill="currentColor"></path></svg>
            </span>
        </span>
    )
}