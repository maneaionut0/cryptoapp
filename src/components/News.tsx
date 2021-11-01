/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Row, Col, Input, Select, Typography, Avatar } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { ISimplifedComp } from '../typescript/components.types'
import demoImage from '../assets/images/th.jpg'
import { coinNames } from '../constants/constants';
import Loader from './UI/Loader';


const { Text, Title } = Typography
const { Option } = Select

const News: React.FC<ISimplifedComp> = ({ simplified }) => {
  const count = simplified ? 6 : 12
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const [news, setNews] = useState([]);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count })


  function handleChange(value: string) {
    if (!coinNames.includes(value)) return;

    setNewsCategory(value)
  }

  useEffect(() => {
    if (!isFetching) {

      setNews(cryptoNews.value)
    }
  }, [newsCategory, cryptoNews, isFetching])

  if (isFetching) return <Loader />
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value: string) => handleChange(value)}
            // children in loc de value
            filterOption={(input, option) => option?.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {coinNames.map((coinName, i) => <Option key={i} value={coinName}>{coinName}</Option>)}
          </Select>
        </Col>
      )}
      {news.map((news: any, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.name}</Title>
                <img className='news-image' src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
              </div>
              <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('s').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News
