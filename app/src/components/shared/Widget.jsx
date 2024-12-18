import React, { useState } from 'react'
import WidgetItem from './app/WidgetItem'

const visbility = {
  more: "Vedi più",
  less: "Vedi meno"
}

const Widget = ({ title, wgt, role = "", val_review = "", className = "" }) => {

  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore((more) => !more);
  }

  return (
    <>
      <div className={" m-5 rounded-lg bg-white w-full shadow relative dark:bg-elements_dark dark:shadow-slate-600 max-lg:max-w-[400px]" + " " + className + (showMore ? " max-h-96 overflow-y-scroll" : " max-h-80 overflow-hidden")}>
        <div className='flex justify-between pt-4 px-4'>
          <h2 className='dark:text-slate-100'> {title}</h2>
          {val_review}
        </div>
        <div className='mt-4 flex flex-col gap-3 px-4'>
          {
            wgt == "events" && (
              <>
                <WidgetItem
                  to=''
                  img="https://images.pexels.com/photos/10340676/pexels-photo-10340676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Natale"
                  text="Mercatini di Natale - Amburgo"
                  wgt={wgt}
                />
                <WidgetItem
                  to=''
                  img="https://images.pexels.com/photos/19042071/pexels-photo-19042071/free-photo-of-donne-messicano-seduto-insieme.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Muertos"
                  text="Dìa de Muertos - Messico"
                  wgt={wgt}
                />
                <WidgetItem
                  to=''
                  img="https://images.pexels.com/photos/20356100/pexels-photo-20356100/free-photo-of-natura-moda-amore-donna.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="cosplay fantasy"
                  text="Festa dell'Unicorno - Vinci (FI)"
                  wgt={wgt}
                />
                {
                  role == "business" && (
                    <button className='btn'>Crea Evento</button>
                  )
                }
              </>
            )
          }
          {
            wgt == "city" && (
              <>
                <div className='w-full overflow-hidden rounded-lg mb-3'>
                  <img src="/Public/Images/visited_city.avif" alt="map" />
                </div>
                <WidgetItem
                  to=''
                  text="Londra"
                  wgt={wgt}
                />
                <WidgetItem
                  to=''
                  text="Dublino"
                  wgt={wgt}
                />
                <WidgetItem
                  to=''
                  text="Cile"
                  wgt={wgt}
                />
              </>
            )
          }
          {
            wgt == "review" && (
              <>
                <WidgetItem
                  to=''
                  img="https://images.pexels.com/photos/12421204/pexels-photo-12421204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Natale"
                  text="Bellissimo locale a tema piratesco, cibo molto buono e ottimo intrattenimento"
                  wgt={wgt}
                />
                <WidgetItem
                  to=''
                  img="https://images.pexels.com/photos/670741/pexels-photo-670741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Natale"
                  text="Abbiamo partecipato ad un evento "
                  wgt={wgt}
                />
              </>
            )
          }
          {
            wgt == "account" && (
              <>
                <WidgetItem
                  to=''
                  img="https://images.pexels.com/photos/12893376/pexels-photo-12893376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Mario Rossi"
                  text="Mario Rossi"
                  wgt={wgt}
                />
                <WidgetItem
                  to=''
                  img="https://images.pexels.com/photos/8219320/pexels-photo-8219320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Anna Bianchi"
                  text="Anna Bianchi"
                  wgt={wgt}
                />
                <WidgetItem
                  to=''
                  img="https://images.pexels.com/photos/5967959/pexels-photo-5967959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Gino Fluffy"
                  text="Gino Fluffy"
                  wgt={wgt}
                />
                <WidgetItem
                  to=''
                  img="https://images.pexels.com/photos/6617683/pexels-photo-6617683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Sara Gialli"
                  text="Sara Gialli"
                  wgt={wgt}
                />
                <WidgetItem
                  to=''
                  img="https://images.pexels.com/photos/2287129/pexels-photo-2287129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Alex Bryan"
                  text="Alex Bryan"
                  wgt={wgt}
                />
              </>
            )
          }
        </div>
        {
          /* !role == "business" && !wgt == "events" &&  */(
            <div onClick={handleShowMore} className='sticky -bottom-px h-10 w-full shadow rounded-b-lg text-center content-center cursor-pointer z-10 bg-white'>
              <span className='text-primaryColor'>{showMore ? visbility.less : visbility.more}</span>
            </div>
          )
        }
      </div>
    </>
  )
}

export default Widget