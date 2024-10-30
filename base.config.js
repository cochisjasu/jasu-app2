export default {
  defaultTitle: "Jasu",
  rootDomain:
    process.env.NODE_ENV === "developments"
      ? "sandbox.blackpixel.mx"
      : "jasu.us",
  httpsUri:
    process.env.NODE_ENV === "developments"
      ? "https://gql.sandbox.blackpixel.mx"
      : "https://gql.jasu.us",
  wssUri:
    process.env.NODE_ENV === "developments"
      ? "wss://gql.sandbox.blackpixel.mx"
      : "wss://gql.jasu.us",
  cdnRoot:
    process.env.NODE_ENV === "developments"
      ? "https://cdn.blackpixel.mx"
      : "https://cdn.blackpixel.mx",
  previewRoot:
    process.env.NODE_ENV === "developments"
      ? "https://preview.sandbox.blackpixel.mx"
      : "https://gql.jasu.us/preview",
  passwordMinLength: 8,
  recaptchaSiteKey: "6LdQaMQkAAAAAJzecPrw21m9ZVTAdEd5Jag4oXMg",
};
