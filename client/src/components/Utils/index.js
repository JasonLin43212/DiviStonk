const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const convertDateToWord = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.getMonth();
    const day = dateObj.getDate() + 1;
    const year = dateObj.getFullYear();
    return `${months[month]} ${day}, ${year}`
};
