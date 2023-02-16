import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import Loader from './Loader';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const chartLabel = [];
  const chartData = [];
  if (!coinHistory) return <Loader />
  for(let i=0; i<coinHistory?.data?.history?.length; i++){
    chartData.push(coinHistory?.data?.history[i]?.price)
  }
  for(let i=0; i<coinHistory?.data?.history?.length; i++){
    chartLabel.push(new Date(coinHistory?.data?.history[i]?.timestamp * 1000).toLocaleDateString())
  }
  coinHistory?.data?.history?.slice(0,50)?.map((item) => new Date(item.timestamp * 1000).toLocaleDateString()).reverse()
  const data = {
    labels: chartLabel,
    datasets: [
      {
        label: 'Price In USD',
        data: chartData.reverse(),
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'right',
      },

    },
  };


  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Dataset 1',
  //       data: coinPrice,
  //       borderColor: 'rgb(255, 99, 132)',
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //     {
  //       label: 'Dataset 2',
  //       data: coinPrice,
  //       borderColor: 'rgb(53, 162, 235)',
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // }


  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;