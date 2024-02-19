"use client";
import React, { FC, useState } from "react";
import TaskType from "@common/types/task";
import { formatRelativeDate } from "@common/utils/dateUtils";
import Input from "./Input";
import { fallbackLng, languages } from "../i18n/settings";
import { useTranslation } from "../i18n/client";
import { Checkbox } from "./Checkbox";

type TaskProps = {
    id: string
    description: string
    completed_at?: Date
    created_at: Date
    updated_at: Date
    onChange: (task: TaskType) => void
    onDelete: (id: string) => void
}

export const Task: FC<TaskProps & {lng: string}> = ({
    id,
    description,
    completed_at,
    created_at,
    updated_at,
    onChange,
    onDelete,
    lng
}) => {
    if (languages.indexOf(lng) < 0) lng = fallbackLng;
    const { t } = useTranslation(lng);
    const [editing, setEditing] = useState<boolean>(false);
    const [val, setValue] = useState<string>(description);

    const complete = (checked: boolean): void => {
        onChange({ id, description, completed_at: checked ? new Date() : undefined, created_at, updated_at });
    };

    const edit = (): void => {
        if(editing){
            onChange({ id, description: val, completed_at, created_at, updated_at: new Date() });
        }
        setEditing(!editing);
    };

    const formatDate = (date: Date | string): string => {
        date = typeof date === "string" ? new Date(date) : date;
        return formatRelativeDate(date, "be-NL");
    };

    const formatTimestamp = (date: Date | string): string => {
        date = typeof date === "string" ? new Date(date) : date;
        return date.toLocaleDateString("be-NL")
    }

    return (
        <div className="task--wrapper" id={id}>
            <div className={`task ${!!completed_at ? "complete" : ""}`}>
                <Checkbox checked={!!completed_at} onChange={complete} />
                <Input id="task--input" className="task--input" type="text" value={val} disabled={!editing} onChange={(change) => setValue(change)} />
                <div className="task--controls">
                    {!completed_at && <button onClick={edit} disabled={!!completed_at ? true : undefined} className="pill-segment">{ t(editing ? "task.save" : "task.edit") }</button>}
                    <button onClick={() => onDelete(id)} className="pill-segment">{t("task.delete")}</button>
                </div>
            </div>
            <div className="task--meta">
                <div className="task--date" title={formatTimestamp(updated_at || created_at)}>
                    <span>{t(updated_at ? "time.updated" : "time.created")}</span>
                    <span>{formatDate(updated_at || created_at)}</span>
                </div>
                {completed_at && <div className="task--date" title={formatTimestamp(completed_at)}>
                    <span>{t("time.completed")}</span>
                    <span>{formatDate(completed_at)}</span>
                </div>}
            </div>
        </div>
    )
}