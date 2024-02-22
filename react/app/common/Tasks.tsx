"use client";
import { Fragment, useEffect, useState } from "react";
import { languages, fallbackLng } from '../i18n/settings'
import { useTranslation } from '../i18n/client'
import Input from "./Input";
import TaskType from "@common/types/task";
import { Task } from "./Task";
import { getData, postData, removeData } from "../[lng]/page";

export default function Tasks({ lng }: { lng: string }) {

    if (languages.indexOf(lng) < 0) lng = fallbackLng;
    const { t } = useTranslation(lng);
    const [task, setTask] = useState<string>('');
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [activeTasks, setActiveTasks] = useState<TaskType[]>([]);
    const [archivedTasks, setArchivedTasks] = useState<TaskType[]>([]);


    const onChange = async () => {
        const res = await getData();
        setTasks(res);
    }

    const add = async (): Promise<void> => {
        const entry = await postData({
            description: task,
            created_at: new Date(),
            updated_at: new Date(),
        });
        if (entry) {
            setTask("");
            onChange();
        }
    }

    const edit = async (task: TaskType): Promise<void> => {
        if (!task.id) return;
        await postData(task).finally(() => onChange());
    }

    const remove = async (id: string): Promise<void> => {
        if(!id) return;
        await removeData(id).finally(() => onChange());
    }

    useEffect(() => {
        setActiveTasks(tasks.filter(({ completed_at }) => !completed_at));
        setArchivedTasks(tasks.filter(({ completed_at }) => !!completed_at));
    }, [tasks]);

    useEffect(() => {
        onChange();
    }, []);

    return (
        <Fragment>
            <div className="tasks--header">
                <Input className="tasks--input" id="task--input" type="text" value={task} onChange={setTask} placeholder={t("task.placeholder")}/>
                <button onClick={add} className="pill-segment">
                    {t("task.add")}
                </button>
            </div>
            <ul className="tasks">
                {activeTasks.map(({ id, description, created_at, updated_at, completed_at }) =>
                (<li key={id}>
                    <Task
                        lng={lng}
                        id={id!}
                        description={description}
                        created_at={created_at}
                        updated_at={updated_at}
                        completed_at={completed_at}
                        onDelete={(taskId) => remove(taskId)}
                        onChange={event => edit(event)}
                    />
                </li>)
                )}
                {!tasks.length && <li>{t("task.empty")}</li>}
            </ul>
            <h2 className="underlined">{t("task.archive")}</h2>
            <ul className="tasks">
                {archivedTasks.map(({ id, description, created_at, updated_at, completed_at }) =>
                (<li key={id}>
                    <Task
                        lng={lng}
                        id={id!}
                        description={description}
                        created_at={created_at}
                        updated_at={updated_at}
                        completed_at={completed_at}
                        onDelete={(taskId) => remove(taskId)}
                        onChange={event => edit(event)}
                    />
                </li>)
                )}
                {!archivedTasks.length && <li>{t("task.empty_archive")}</li>}
            </ul>
        </Fragment>
    )
}