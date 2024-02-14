export const formatRelativeDate = (date: Date, locale: string) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60000) {
        return 'a moment ago';
    } else if (diff < 3600000) {
        const minutes = Math.round(diff / 60000);
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (diff < 86400000) {
        const hours = Math.round(diff / 3600000);
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
        // Use specified format and locale
        return new Date(date).toLocaleDateString(locale);
    }
}