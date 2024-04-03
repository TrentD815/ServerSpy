function formatDate(dateString) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const suffix = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${month} ${day}${getDaySuffix(day)}, ${year} at ${formattedHours}:${formattedMinutes}${suffix} UTC`;
}

function getDaySuffix(day) {
    if (day === 1 || day === 21 || day === 31) {
        return 'st';
    } else if (day === 2 || day === 22) {
        return 'nd';
    } else if (day === 3 || day === 23) {
        return 'rd';
    } else {
        return 'th';
    }
}
export {
  formatDate
}
