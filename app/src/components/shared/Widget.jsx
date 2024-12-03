import React from 'react'
import WidgetItem from './app/WidgetItem'

const Widget = () => {
  return (
    <>
      <div className="m-5 rounded-lg bg-white w-full shadow p-4 dark:bg-elements_dark dark:shadow-slate-600">
        <h2 className='dark:text-slate-100'>Eventi Suggeriti</h2>
        <div className='mt-4 flex flex-col gap-3'>
          <WidgetItem
            to=''
            img="https://images.pexels.com/photos/10340676/pexels-photo-10340676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Natale"
            text="Mercatini di Natale - Amburgo"
          />
          <WidgetItem
            to=''
            img="https://images.pexels.com/photos/19042071/pexels-photo-19042071/free-photo-of-donne-messicano-seduto-insieme.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Muertos"
            text="Dìa de Muertos - Messico"
          />
          <WidgetItem
            to=''
            img="https://images.pexels.com/photos/20356100/pexels-photo-20356100/free-photo-of-natura-moda-amore-donna.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="cosplay fantasy"
            text="Festa dell'Unicorno - Vinci (FI)"
          />
        </div>
      </div>
    </>
  )
}

export default Widget