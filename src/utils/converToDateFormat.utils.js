function convertToDateTimeFormat(createdAt) {
    const date = new Date(createdAt)

    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    };

    return new Intl.DateTimeFormat(['ban', 'id'], options).format(date);
}

export default convertToDateTimeFormat