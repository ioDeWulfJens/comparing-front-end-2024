"use client";
import { Fragment } from "react";
import { languages, fallbackLng } from '../i18n/settings'
import { useTranslation } from '../i18n/client'
import Input from "./Input";

export default function Tasks({lng}: {lng: string}) {
    
    if (languages.indexOf(lng) < 0) lng = fallbackLng;
    const { t } = useTranslation(lng);
    
    const add = () => {

    }
    return (
        <Fragment>

            <div className="tasks--header">
                <Input className="tasks--input" id="task--input" type="text" value="" />
                <button onClick={add} className="pill-segment">
                    {t("task.add")}
                </button>
            </div>
        </Fragment>
    )
}