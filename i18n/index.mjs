const countryList = [
  {
    country: 'us',
    language: 'en',
  },
  {
    country: "fr",
    language: "fr",
  },
  {
    country: "de",
    language: "de",
  }
]

//根据country获取对应的语言，并获取对应的语言配置文件
const getLanguage = (country) => {
  return countryList.find(item => {
    return item.country === country
  }).language
}
export default {
  getLanguage
}
