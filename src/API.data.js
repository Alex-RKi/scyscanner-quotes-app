export function getURL(from, to, day) {
  const country = "RU";
  const currency = "RUB";
  const lang = "en-US"; // API locale

  return `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0
/${country}
/${currency}
/${lang}
/${from}
/${to}
/${day}`;
}
export async function getData(URL) {
  return await fetch(URL, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "868e812878msh41527bc14c70e8cp148d20jsn00abc1bca6fc",
      "x-rapidapi-host":
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(err);
      return "Fetching error";
    });
}
