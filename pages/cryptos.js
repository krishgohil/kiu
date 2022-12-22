import React, { useEffect, useState } from 'react'



import { BsArrowLeft } from 'react-icons/bs';

import parse from 'html-react-parser';

import { Line } from "react-chartjs-2"

import { host } from '../host'
import { Chart as ChartJS, registerables } from 'chart.js';
import InfiniteScroll from 'react-infinite-scroll-component'
import { Spinner } from 'react-bootstrap';
import Router, { useRouter } from 'next/router';
import styles from "../styles/Crypto.module.css"
import Test3 from '../components/Test3';

ChartJS.register(...registerables);


const Crypto = () => {




  const [cryptosArr, setcryptos] = useState([])
  const [showcryptos, setshowcryptos] = useState(false)

  const [latestcryptos, setlatestcryptos] = useState([])
  const [showlatestcryptos, setshowlatestcryptos] = useState(false)





  const [coinPrices, setcoinPrices] = useState()

  const [top, settop] = useState(true)
  const [showtop, setshowtop] = useState(false)
  const [showlatest, setshowlatest] = useState(false)

  const [latest, setlatest] = useState(false)
  const [prices, setprices] = useState(false)

  const [cryptoId, setcryptoId] = useState('')

  const router = useRouter()

  useEffect(() => {

    const queryParams = new URLSearchParams(window.location.search);
    const c = queryParams.get('coin');
    if (c) { setcryptoId(c) } else { setcryptoId('') }
    console.log("skjflasjljsf", c)
  }, [router.asPath])



  const fetchcryptos_latest = (requirement) => async dispatch => {
    // try {


    //     const response = await fetch(`${host}/api/cryptos/fetchcryptos_latest`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         // body: JSON.stringify({ requirement }),

    //     })
    //     const json = await response.json();
    //     // console.log(json)
    //     const { cryptos } = json
    //     setlatestcryptos(cryptos)
    //     setshowlatestcryptos(true)

    // } catch (error) {

    // }
    let sortit = crypto_posts.sort(function (a, b) {
      return (a?.content?.posted_Date > b?.content?.posted_Date) ? -1 : ((a?.content?.posted_Date < b?.content?.posted_Date) ? 1 : 0);
    });

    setlatestcryptos(sortit)
    setshowlatestcryptos(true)
    setshowlatest(true)
  }

  async function fetchcryptos (){

    console.log('books', host)
    try {

      const response = await fetch(`${host}/api/cryptos/fetchcryptos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: _id }),

      })
      const json = await response.json();
      const { cryptos } = json
      console.log(cryptos, '[][][')
      setcryptos(cryptosArr.concat(cryptos))
      setshowcryptos(true)
      setshowtop(true)
      let sortit = cryptos.sort(function (a, b) {
        return (a?.content?.totalStarRating > b?.content?.totalStarRating) ? -1 : ((a?.content?.totalStarRating < b?.content?.totalStarRating) ? 1 : 0);
      });



    } catch (error) {

    }
  }


  useEffect(() => {
    // if (path === '/cryptos') {
    //     let z = sessionStorage.getItem('cryptoScrollId')
    //     if (z) {
    //         setfirst(z)
    //         sessionStorage.removeItem('cryptoScrollId')
    //         console.log('shivaji', z)
    //     }
    // }

    console.log(router.asPath, cryptoId)
    if (router.asPath === '/cryptos' && cryptosArr.length === 0) {
      // console.log('yessss')

      fetchcryptos()

    }


    if (router.asPath === `/cryptos?coin=${cryptoId}`) {
      console.log("here")
      settop(false)
      setlatest(false)
      setprices(false)
      if (!showCoinInfo) {
        setshowCoinInfo(true)

      }

      // CoinInfoFunc(cryptoId)
    }
    else if (router.asPath == `/cryptos?vertical=latest`) {
      settop(false)
      setprices(false)
      setshowCoinInfo(false)
      setlatest(true)
      if (latestcryptos.length == 0) {
        (fetchcryptos_latest())
      }
    }
    else if (router.asPath == `/cryptos?vertical=prices`) {
      settop(false)
      setlatest(false)
      setshowCoinInfo(false)
      setprices(true)
      if (coinPrices == undefined || !coinPrices) {
        fetchPricesandVolume()
      }
    }
    else if (router.asPath === `/cryptos`) {
      setshowCoinInfo(false)
      setprices(false)
      setlatest(false)
      settop(true)
    }

  }, [router.asPath, cryptoId])




  const latestFunc = () => {


    if (router.asPath !== "/cryptos?vertical=latest") {
      setshowCoinInfo(false)
      setprices(false)
      setlatest(true)
      // console.log("ganpati bappad morya")
      settop(false)
      router.push({
        pathname: '/cryptos',
        query: { vertical: "latest" }
      }, undefined, { shallow: true }
      )
    }

  }
  const pricesFunc = () => {
    // https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    settop(false)
    setlatest(false)
    setshowCoinInfo(false)
    setprices(true)
    router.push({
      pathname: '/cryptos',
      query: { vertical: "prices" }
    }, undefined, { shallow: true }
    )
    fetchPricesandVolume()
  }
  const topFunc = () => {
    router.push({
      pathname: '/cryptos',
      query: null
    }, undefined, { shallow: true }
    )
    setshowCoinInfo(false)
    setprices(false)
    setlatest(false)
    settop(true)
  }



  async function fetchPricesandVolume(rpostid) {

    console.log('FEETCH UNIQ PRODUCT')
    try {
      // console.log(_id)

      const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ rpostid: rpostid, userId: _id }),
      })
      const json = await response.json();
      console.log(json)
      setcoinPrices(json)

    } catch (error) {

    }
  }

  var kee = 0
  const ons = () => {
    console.log(window.scrollY)
    var stickba = document.getElementById('stickba')
    if (stickba) {
      if (window.scrollY < kee) {
        stickba.style.top = "14vh"
        // console.log(stickba, 'stickba', kee)
      } else {
        stickba.style.top = "-54vh"
      }
      kee = window.scrollY
    }

  }




  const [showCoinInfo, setshowCoinInfo] = useState(false)
  const CoinInfoFunc = (_cid) => {
    setshowCoinInfo(true)
    console.log("waha pe wahi hai")
    router.push({
      pathname: '/cryptos',
      query: { coin: _cid }
    }, undefined, { shallow: true }
    )
  }

  const gotolatestFunc = () => {

    if (path !== "/cryptos/latest") {
      settop(false)
      navigate("latest")
    }
  }
  const gototopFunc = () => {

    if (path !== "/cryptos") {
      console.log("waha pe wahi hai")
      setlatest(false)
      navigate("/cryptos")
    }
  }


  const fetchAgain = () => {
    // alert("soorma")
    (fetchcryptos())


  }

  return (
    <>



      <div style={{
        display: 'flex', flexDirection: 'row', boxSizing: 'border-box', justifyContent: 'center', position: "relative",
        scrollMargin: 0, margin: 0,
      }}  >

        {
          !prices && !showCoinInfo ?
            <div className='centertest3'>


              <div className='stickba' style={{ height: "6vh", padding: "0.5rem", position: "sticky", top: "8vh", zIndex: 99, backgroundColor: "black" }} >

                <div className='pop' style={{ display: "flex", width: "100%", justifyContent: "space-evenly " }} >

                  <div onClick={topFunc} className='op' style={top ? { backgroundColor: "#212121" } : {}} >
                    Top
                  </div>
                  <div onClick={latestFunc} className='op' style={latest ? { backgroundColor: "#212121" } : {}} >
                    Latest
                  </div>
                  <div onClick={pricesFunc} className='op' style={prices ? { backgroundColor: "#212121" } : {}} >
                    Prices
                  </div>


                </div>


              </div>


              {
                top ?
                  <div>
                    <InfiniteScroll

                      id='myHeader'
                      dataLength={cryptosArr.length}
                      next={fetchAgain}
                      hasMore={true}
                      className='row'

                      style={{ padding: 0, margin: 0, marginBottom: '7vh' }}
                    >
                      <div>
                        {
                          showtop ?
                            crypto_posts.map((f, i) => {
                              return (
                                <>

                                  {
                                    f && f.content != null && f.content != undefined ?
                                      <Test3 ikey={i} feed={f} _id={_id} />
                                      : ""
                                  }
                                </>

                              )
                            }
                            )
                            : <div style={{ margin: "auto", width: "100%", textAlign: "center" }}>
                              <Spinner style={{ margin: "1rem 0", color: "skyblue" }} />
                            </div>
                        }
                      </div>
                    </InfiniteScroll>
                  </div>


                  : ""
              }
              {
                latest ?
                  <div>
                    {
                      showlatest ?
                        latestcryptos.map((f, i) => {
                          return (
                            <>
                              {
                                f && f.content != null && f.content != undefined ?
                                  <Test3 key={i} feed={f} _id={_id} />
                                  : ""
                              }
                            </>

                          )
                        }
                        )
                        : <div style={{ margin: "auto", width: "100%", textAlign: "center" }}>
                          <Spinner style={{ margin: "1rem 0", color: "skyblue" }} />
                        </div>
                    }
                  </div>
                  : ""
              }
            </div>
            : ""
        }




        {
          prices && coinPrices ?

            <div style={{ width: "100%" }} >
              <div className='stickba' style={{ height: "6vh", padding: "0.5rem", position: "sticky", top: "8vh", zIndex: 99, backgroundColor: "black" }} >

                <div className='pop' style={{ display: "flex", width: "100%", justifyContent: "space-evenly " }} >

                  <div onClick={topFunc} className='op' style={top ? { backgroundColor: "#212121" } : {}} >
                    Top
                  </div>
                  <div onClick={latestFunc} className='op' style={latest ? { backgroundColor: "#212121" } : {}} >
                    Latest
                  </div>
                  <div onClick={pricesFunc} className='op' style={prices ? { backgroundColor: "#212121" } : {}} >
                    Prices
                  </div>


                </div>


              </div>

              <div style={{ display: 'flex', width: "100%", marginBottom: "0.5rem", fontWeight: 'bold', borderBottom: "1px solid #323136", paddingBottom: "0.3rem", marginTop: "0.25rem" }} >
                <div className={`${styles.hcommon} ${styles.hCoin}`} >Coin</div>
                <div className={`${styles.hcommon} ${styles.hPrice}`} >Price</div>
                <div className={`${styles.hcommon} ${styles.h24h}`} >24h</div>
                <div className={`${styles.hcommon} ${styles.hMcap}`} >Market Cap</div>
              </div>


              {


                coinPrices.map((block, i) => {
                  return (
                    <div className={styles.coinmain} key={i} onClick={() => CoinInfoFunc(block.id)} >
                      <div className={`${styles.icommon} ${styles.icoin}`} style={{ display: "flex", alignItems: "center", paddingLeft: "0.5rem", cursor: "pointer" }} >
                        <img alt="img" src={block.image} style={{ height: "2.5rem", width: "2.5rem", marginRight: "0.75rem" }} />
                        <div style={{ display: "flex", flexDirection: "column", fontSize: '0.9rem' }} >
                          <p style={{ margin: 0 }} >{block.name}</p>
                          <p style={{ margin: 0 }} >{block.name}</p>
                        </div>



                      </div>
                      <div className={`${styles.icommon} ${styles.iprice}`} style={{ fontSize: '0.9rem', cursor: "pointer" }} >
                        <span style={{ marginRight: "0.1rem" }} >$</span>
                        {block.current_price}
                      </div>
                      <div className={`${styles.icommon} ${styles.i24price}`} style={{ fontSize: '0.9rem', cursor: "pointer" }} >
                        {
                          Math.sign(block.price_change_percentage_24h) == 1 ?
                            <span style={{ color: "#70ff92" }} >{block.price_change_percentage_24h}%</span>
                            : <span style={{ color: "red" }} >{block.price_change_percentage_24h}%</span>
                        }

                      </div>

                      <div className={`${styles.iMcap} ${styles.icommon}`} style={{ fontSize: '0.9rem', cursor: "pointer" }} >
                        <span style={{ marginRight: "0.1rem" }} >$</span>
                        {block.market_cap}
                      </div>


                    </div>
                  )
                })
              }
            </div>
            : ''
        }

        {
          showCoinInfo ?
            <div style={{ display: "flex", flexDirection: "column" }} >
              <div className={styles.pmgoback} style={{ padding: "0.2rem" }} >
                <BsArrowLeft size={24} color='silver' onClick={() => navigate(-1)} ></BsArrowLeft>
              </div>
              <CoinInfo cryptoId={cryptoId} />
            </div>
            : ""
        }
        {
          !showCoinInfo ?
            // <FrndRecommendation />
            ""
            : ""
        }

      </div>


    </>
  )
}

export default Crypto



export const CoinInfo = ({ cryptoId }) => {
  const [crypto, setcrypto] = useState()

  useEffect(() => {
    if (cryptoId && cryptoId.length > 0) {
      fetchCryptoInfo()
    }
  }, [])



  useEffect(() => {

    if (crypto != null || crypto != undefined) {
      relatedWiki(crypto.name)
    }
  }, [crypto])


  // to get coin simple info curl -X 'GET' \
  //   'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false' \
  //   -H 'accept: application/json'

  const [show, setshow] = useState(false)

  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);


  async function fetchCryptoInfo() {


    console.log('FEETCH UNIQ PRODUCT')
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json();
      console.log(json)
      setcrypto(json)
      fetchCryptoGraphInfo()

    } catch (error) {
      console.log(error)
    }
  }
  async function fetchCryptoGraphInfo() {

    console.log('FEETCH UNIQ PRODUCT')
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json();
      console.log(json)
      setHistoricData(json.prices)
      setshow(true)
      console.log(crypto)

    } catch (error) {
      console.log(error)
    }
  }


  const [relatedArticles, setrelatedArticles] = useState([])
  async function relatedWiki(search) {
    try {
      const response = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=20&prop=extracts|pageimages&pithumbsize=400&origin=*&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=
            ${search}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json();
      console.log(json)
      // console.log()
      // let arr = []
      // arr.push()
      setrelatedArticles(Object.values(json.query.pages))
    } catch (error) {
      console.log(error)
    }
  }


  const h = () => {
    console.log(relatedArticles)
  }
  // https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts|pageimages&pithumbsize=400&origin=*&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=ASIANPAINT
  return (
    <>
      {
        show ?
          <>
            <div className={styles.cdetailmain} style={{}} >

              <div style={{ display: "flex", flexDirection: "column", marginBottom: "2rem" }} >

                <div className={styles.cdetailHead} >
                  <img alt="img" src={crypto.image.large} style={{ width: "10rem", height: "10rem", marginRight: "2rem" }} />
                  <div style={{ display: "flex", flexDirection: "column", }} >
                    <h2>{crypto.name}</h2>
                    <div style={{ fontSize: "20px", marginBottom: "0.5rem" }} >

                      <span style={{ fontWeight: "600" }} >Current Price : </span>
                      <span style={{ color: "" }} >₹</span>
                      <span style={{ marginLeft: "0.1rem" }} >{crypto.market_data.current_price.inr}</span>
                    </div>
                    <div style={{ fontSize: "20px", marginBottom: "0.5rem" }} >

                      <span style={{ fontWeight: "600" }} >Market Cap : </span>
                      <span style={{ color: "" }} >₹</span>
                      <span style={{ marginLeft: "0.1rem" }} >{crypto.market_data.market_cap.inr}</span>
                    </div>
                  </div>
                </div>

              </div>
              <div style={{ width: "100%", height: "200%" }} >
                <Line
                  style={{ width: "auto", height: "200%" }}
                  data={{
                    labels: historicData.map((coin) => {
                      let date = new Date(coin[0]);
                      let time =
                        date.getHours() > 12
                          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                          : `${date.getHours()}:${date.getMinutes()} AM`;
                      return days === 1 ? time : date.toLocaleDateString();
                    }),

                    datasets: [
                      {
                        data: historicData.map((coin) => coin[1]),
                        label: `Price ( Past ${days} Days ) in USD`,
                        borderColor: "#EEBC1D",
                      },
                    ],
                  }}
                  options={{
                    elements: {
                      point: {
                        radius: 1,
                      },
                    },


                  }}></Line>
              </div>

              <div className={styles.cdetaildesc} style={{}} >
                {parse(crypto.description.en)}
              </div>


              <div style={{ marginTop: "2rem" }} >
                <h5 onClick={h} >Related Articles on Wikipedia </h5>
                {
                  relatedArticles && relatedArticles.length > 0 ?
                    relatedArticles.map((article, index) => {
                      return (
                        <>
                          <div key={index} className={styles.raMain} style={{}}
                            onClick={() => window.open(`https://en.wikipedia.org/wiki/${article.title}`, '_blank')}  >
                            <div style={{ display: "flex", flexDirection: "column" }} >
                              <div style={{ fontWeight: "500", textDecoration: "underline" }} >{article.title} </div>
                              <div>{article.extract}</div>
                            </div>
                            {
                              article.thumbnail && article.thumbnail.source && article.thumbnail.source.length > 0 ?
                                < img className={styles.raImg} src={article.thumbnail.source} alt="" />
                                : ""
                            }

                          </div>

                          <div
                            onClick={() => window.open(`https://en.wikipedia.org/wiki/${article.title}`, '_blank')}
                            key={index} className={styles.raMainMob} style={{}} >

                            {
                              article.thumbnail && article.thumbnail.source && article.thumbnail.source.length > 0 ?
                                < img className={styles.raImgMob} src={article.thumbnail.source} alt="" />
                                : ""
                            }
                            <div style={{ display: "flex", flexDirection: "column" }} >
                              <div style={{ fontWeight: "500", textDecoration: "underline" }} >{article.title} </div>
                              <div>{article.extract}</div>
                            </div>


                          </div>

                        </>
                      )
                    })
                    : ""
                }



              </div>




            </div>




          </>

          : <div style={{ margin: "auto", width: "100%", textAlign: "center" }}>
            <Spinner style={{ margin: "1rem 0", color: "skyblue" }} />
          </div>
      }


    </>
  )
}




export const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];

