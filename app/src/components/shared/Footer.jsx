const Footer = () => {
  return (
    <>
      <footer className="flex flex-col items-center w-full dark:bg-bg_dark">
        <div className="w-full h-1 mb-5 bg-gradient-to-r from-white via-slate-500 to-white">
        </div>
        <div className="flex flex-col text-xs max-xs:px-2">
          <div className="flex justify-center gap-8">
            <span className="link">Condizioni d'uso</span>
            <span className="link">Informativa sulla privacy</span>
            <span className="link">Aiuto</span>
            <span className="link">Informativa sui Cookie</span>
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