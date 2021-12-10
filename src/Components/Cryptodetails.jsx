import React, {useState} from 'react'
import HTMLReactParser from  "html-react-parser";
import {useParams} from "react-router-dom"; 
import millify from "millify";
import Loader from "./Loader"
import {useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} from  "../services/cryptoAPI"
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import {Col, Row, Typography, Select} from "antd"
import "./crypto.css"
import LineChart from './LineChart';
const{Title, Text} = Typography;
const {Option} = Select;
const Cryptodetails = () => {
  const {id} = useParams();
   const [TimePeriod, setTimePeriod] = useState(" 7d");
   const {data, isFetching} = useGetCryptoDetailsQuery(id);
   
  //  const {data : coinHistory} = useGetCryptoHistoryQuery({id, TimePeriod})
   const cryptoDetails = data?.data?.coin;
  if(isFetching) return <Loader/>
   console.log(cryptoDetails);
   const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

   const stats = [
     { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
     { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
     { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
     { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
     { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
   ];
 
   const genericStats = [
     { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
     { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
     { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
     { title: 'Total Supply', value: ` ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
     { title: 'Circulating Supply', value: `${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
   ];
 
  return (
    <div className = "otherPagesContainer">
      <Col className = "coin-detail-container">
        <Col className="coin-heading-container">
          <Title level = {2} className = "coin-name">
            {cryptoDetails.name} {cryptoDetails.slug} price
          </Title>
          <p>
            {cryptoDetails.name} live price in us dollars
          </p>
        </Col>
        <Select
         default = "7d" 
         className  = "select-timeperiod" 
         placeholder = "Select Time Period"
         onChange = {(value)=>setTimePeriod(value)}
         >
            {time.map((date)=> <Option key  = {date}>{date}</Option>)}
        </Select>
        {/* <LineChart 
        coinHistory = {coinHistory}
        currentPrice = {millify(cryptoDetails.price)}
        coinName = {cryptoDetails.name}
        /> */}
        <Col className = "stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title className  = "coin-detailes-heading" level = {3}>
                      {cryptoDetails.name} Value Statistics
              </Title>
              <p>
                An overview showing the stats of {cryptoDetails.name}
              </p>
            </Col>
            {stats.map(({icon,title, value}) => (
                  <Col className = "coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                    <Text className = "stats">{value} </Text>
                    </Col>
            ))}
          </Col>
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title className  = "coin-detailes-heading" level = {3}>
                     Other Statistics
              </Title>
              <p>
                An overview showing the stats of all cryptocurrencies
              </p>
            </Col>
            {genericStats.map(({icon,title, value}) => (
                  <Col className = "coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                    <Text className = "stats">{value} </Text>
                    </Col>
            ))}
          </Col>
          </Col>
          <Col className = "coin-desc-link">
            <Row className = "coin-desc">
              <Title level = {3} className = "coin-details-heading">
                       what is {cryptoDetails.name}
                       {HTMLReactParser(cryptoDetails.description)}
              </Title>
            </Row>
               <Col className = "coin-links">
                 <Title level = {3} className = "coin-details-heading">
                       {cryptoDetails.name} Links
                 </Title>
                 {cryptoDetails.links.map((link)=>(
                       <Row className = "coin-link" key = {link.name}>
                         <Title level = {5} className = "link-name">
                           {link.type}
                         </Title>
                         <a href = {link.url} target = "_blank" rel = "noreffer">
                              {link.name}
                         </a>
                         </Row>
                     ))}
                 </Col>
            </Col>
      </Col>
    </div>
  )
}

export default Cryptodetails
