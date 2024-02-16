import { FC, Fragment } from "react";

type CheckboxProps = {
    label?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export const Checkbox: FC<CheckboxProps> = ({label, checked, onChange}) => {
    const toggle = () => {
        onChange(!checked);
    }

    return (
        <Fragment>
            {label && <label>{label}</label>}
            <input className="checkbox" type="checkbox" checked={checked} onChange={toggle} />
        </Fragment>
    )
}