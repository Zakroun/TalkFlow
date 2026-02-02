export default function formatMessageTime(messageTime) {
    const date = new Date(messageTime);
    const now = new Date();

    const messageDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffTime = today - messageDay;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;

    if (diffDays === 0) {
        return `Today ${time}`;
    } else if (diffDays === 1) {
        return `Yesterday ${time}`;
    } else {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year} ${time}`;
    }
}