export const formatDate = (date: string | number): string => {
    let D = new Date(typeof date == "string" ? parseInt(date) : date);
    let day, month, year, hours, minutes;
    day = (D.getDay() + 1).toString().padStart(2, "0");
    month = (D.getMonth() + 1).toString().padStart(2, "0");
    year = D.getFullYear().toString();
    hours = D.getHours().toString().padStart(2, "0");
    minutes = D.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
}