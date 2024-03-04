import Task from "@common/types/task";
import Tasks from "../common/Tasks"
import { languages, fallbackLng } from '../i18n/settings'
import { revalidate } from "../actions";

const ENDPOINT = `${process.env.NEXT_PUBLIC_URL}/api`;

export async function getData() {
  const res = await fetch(ENDPOINT, { next: { tags: ['tasks']} });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export async function postData(task: Partial<Task>) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...task
    })
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to post data');
  }
  const response = res.json();
  return response;
}

export async function removeData(id: string) {
  const res = await fetch(`${ENDPOINT}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to remove data');
  }
  return res.json();
}

export default async function Page({ params: { lng } }: {
  params: {
    lng: string;
  };
}) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const tasks = await getData();
  return <Tasks lng={lng} tasks={tasks} revalidator={revalidate} />;
}
