export function findAverageRate(arr) {
  return arr.map((item) => {
    let rate = null;
    if (item.comments.length) {
      rate =
        item.comments.reduce((acc, comment) => acc + comment.rating, 0) /
        item.comments.length;
    }

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      comments: item.comments,
      rate: rate ? Math.round(rate * 100) / 100 : false,
      face: rate ? (rate > 4 ? "\u{1F600}" : "\u{1F614}") : "",
      disabled: false,
    };
  });
}

export function sortObjectsByKey(arr, key, ascending = true) {
  if (Array.isArray(arr)) {
    if (ascending) {
      return arr.sort((a, b) => a[key] - b[key]);
    }

    return arr.sort((a, b) => b[key] - a[key]);
  }
}

export const createFormattedDate = (dateString, onlyDate = false) => {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  if (onlyDate) {
    return `${day}-${month}-${year}`;
  }
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: "#334063",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
