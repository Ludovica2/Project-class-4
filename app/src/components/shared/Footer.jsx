import { useDictionary } from '../../provider/Language';

const Footer = () => {
  const [dictionary] = useDictionary()
  return (
    <>
      <footer className="flex flex-col items-center w-full dark:bg-bg_dark">
        <div className="w-full h-1 mb-5 bg-gradient-to-r from-white via-slate-500 to-white">
        </div>
        <div className="flex flex-col text-xs max-xs:px-2">
          <div className="flex justify-center gap-8">
            <span className="link">{dictionary.footer.TERMS}</span>
            <span className="link">{dictionary.footer.PRIVACY}</span>
            <span className="link">{dictionary.footer.HELP}</span>
            <span className="link">{dictionary.footer.COOKIES}</span>
          </div>
          <div className="text-center mt-3 pb-2 dark:pb-5">
              <i className="fa-regular fa-copyright text-dark"></i>
              <span className="ml-1 text-dark">Ilaria Mammana & Ludovica Spinelli By Mia Tech Academy</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer