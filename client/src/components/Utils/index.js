const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const convertDateToWord = (date) => {
    if (date) {
        const dateObj = new Date(date);
        const month = dateObj.getMonth();
        const day = dateObj.getDate() + 1;
        const year = dateObj.getFullYear();
        return `${months[month]} ${day}, ${year}`;
    }
    return "N/A";
};

export const formatPrice = (raw_price, err) => {
    if (!raw_price) {
        return err;
    }
    const roundedPrice = `${Math.round(raw_price * 100) / 100}`;
    let [dollar, cents] = roundedPrice.split(".");
    let newDollar = '';
    let count = 0;
    [...dollar].reverse().forEach(num => {
        if (count === 3) {
            count = 1;
            newDollar = `${num},` + newDollar;
        } else {
            newDollar = num + newDollar;
            count++;
        }
    });
    if (!cents) {
        cents = "";
    }
    if (cents.length === 0) {
        cents = "00";
    } else if (cents.length === 1) {
        cents += "0";
    }

    return `$${newDollar}.${cents}`;
};

export const formatPercentage = (raw_pct, err) => {
    if (!raw_pct) {
        return err;
    }
    return `${Math.round(raw_pct * 10000) / 100}%`;
}
