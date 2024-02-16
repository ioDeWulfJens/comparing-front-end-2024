import Tasks from "../common/Tasks"
import { languages, fallbackLng } from '../i18n/settings'

export default async function Page({ params: { lng } }: {
  params: {
    lng: string;
  };
}) {

  if (languages.indexOf(lng) < 0) lng = fallbackLng;

  return (
    <Tasks lng={lng} />
  );
}
