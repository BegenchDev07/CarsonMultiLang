import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { productsApi, FeatureList, FeatureCardFirst, Item, getImageUrl, Image } from '../services/api';
  




interface FeatureZones {
  feature_list:  FeatureList;
  feature_card_first: FeatureCardFirst;
  feature_card_second: FeatureCardFirst;
}

/**
 * ProductDetailPage component
 * 
 * featureData: FeatureZones | null
 */
const ProductDetailPage = ({ featureData }: { featureData: FeatureZones|null }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });


  const featureListChild = (arr: Item[]) => {
    return arr.map((item: Item, index: number) => {
      return(
          <div className={`w-full flex ${ isMobile ? 'flex-col' : `justify-between ${item.imagePosition === 'left' ? 'flex-row-reverse' : 'flex-row'}`}`} key={index}>
            <div className={`flex flex-col justify-center ${ isMobile ? 'w-full py-5' : 'w-[40%]'}`}>
              <div className={`font-semibold pb-8 ${ isMobile ? 'text-2xl' : 'text-3xl'}`}>{ item.title }</div>
              <div className={`whitespace-pre-wrap font-semibold text-xl`}>{ item.description }</div>
            </div>
            <div className={`bg-white ${ isMobile ? 'w-full' : 'w-[55%]'}`}>
              <img className='w-full' src={getImageUrl(item.image)} alt="" />
            </div>
          </div>
        )
    })
  }

  const featureCardFirst = (arr: Item[]) => {
    return arr.map((item, index)=>{
      return(
        <div className={`flex  ${isMobile ? 'flex-col-reverse w-full' : 'flex-col flex-1'}`} key={index}>
          <div className={`w-full ${isMobile ? 'text-start' : 'text-center'}`}>
            <div className={`text-3xl font-bold py-5 ${ arr.length === 1 ? 'text-center': '' } `}>{ item.title }</div>
            <div className='text-xl whitespace-pre-wrap pb-5'>{ item.description }</div>
          </div>
          <div className={ `bg-white ${ arr.length === 1 ? 'w-[50%] m-auto': 'w-full' }` }><img className='w-full' src={getImageUrl(item.image)} alt="" /></div>
        </div>
      )
    })
  }

    const featureCardSecond = (arr: Item[]) => {
    return arr.map((item, index)=>{
      return(
        <div className={`flex  ${isMobile ? 'flex-col-reverse w-full' : 'flex-col flex-1'}`} key={index}>
          <div className={ `bg-white ${ arr.length === 1 ? 'w-[50%] m-auto': 'w-full' }` }><img className='w-full' src={getImageUrl(item.image)} alt="" /></div>
          <div className={`w-full ${isMobile ? 'text-start' : 'text-center'}`}>
            <div className={`text-3xl font-bold py-5 ${ arr.length === 1 ? 'text-center': '' } `}>{ item.title }</div>
            <div className='text-xl whitespace-pre-wrap pb-5'>{ item.description }</div>
          </div>
        </div>
      )
    })
  }

  if(!featureData)return null;
  return ( 
    <div className={`w-full mt-5 space-y-32`}>
      {
        featureData.feature_list && (
          <div className="w-full">
            <div className={ `w-full pb-5 ${ isMobile ? '' : 'text-center'}` }>
              <div className="text-5xl font-semibold py-8">{ featureData?.feature_list.title }</div>
              <div className="text-xl font-semibold">{ featureData?.feature_list.description }</div>
            </div>
            <div className='space-y-6'>{featureData && featureListChild(featureData.feature_list.items)}</div>
          </div>
        )
      }
      {
        featureData.feature_card_first && (
          <div className='w-full'>
            <div className='w-full'>
              <div className={`w-full text-5xl flex justify-center pb-5 ${ isMobile ? '' : 'text-center'}`}>{ featureData?.feature_card_first.title }</div>
              <div className='w-full text-2xl flex justify-center pb-5'>{ featureData?.feature_card_first.description }</div>
            </div>
            <div className={`w-full flex justify-center flex-col space-y-5 text-center}`}>
              { featureData && featureCardFirst(featureData.feature_card_first.cards_one) }
            </div>
          </div>
        )
      }
      {
        featureData.feature_card_second && (
          <div className='w-full'>
            <div className='w-full'>
              <div className='w-full text-5xl flex justify-center pb-5'>{ featureData?.feature_card_second.title }</div>
              <div className='w-full text-2xl flex justify-center pb-5'>{ featureData?.feature_card_second.description }</div>
            </div>
            <div className={`w-full grid  ${isMobile ? 'flex-col space-y-5 grid-cols-1' : 'flex-row grid-cols-2 gap-5'}`}>
              {
                featureData && featureCardSecond(featureData.feature_card_second.cards_one)
              }
            </div>
          </div>
        )
      }
    </div>
  )
};


export default ProductDetailPage;