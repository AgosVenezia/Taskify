import axios from "axios";

export default async function uploadAvatar(img) {
  const data = new FormData();
  data.set("key", process.env.IMGBB_KEY);
  data.append('image', img.data.toString('base64'))

  return await axios
    .post("https://api.imgbb.com/1/upload", data)
    .then((res) => res.data)
    .catch((err) => err);
};
