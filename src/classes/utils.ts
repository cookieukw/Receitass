export const isValidUrl = (url: string) => {
  const urlPattern = /^(ftp|hcttp|https):\/\/[^ "]+$/;
  console.log({ test: urlPattern.test(url), url });
  return urlPattern.test(url);
};
