import { dictionaryServiceFactory } from './lib/dictionary-service-factory'
import { currencyFormat } from './lib/number-formats'
import { sitePlugin } from "./lib/site";
      
export default defineI18nConfig(async () => {
  const { hostname, origin } = useRequestURL();

  const siteContext = sitePlugin.create(hostname);
  const dictionaryServiceInstance = dictionaryServiceFactory.create(siteContext, origin)
  const currentLang = siteContext?.sitecore?.context?.site?.language || 'en'
  const numberFormats = {
    [currentLang]: currencyFormat(currentLang)
  }

  const phrases = await dictionaryServiceInstance.fetchDictionaryData(currentLang)
   
  return {
      globalInjection: true,
      fallbackLocale: false,
      messages: {
        [currentLang]: phrases
      },
      locale: currentLang,
      numberFormats
    }
  })