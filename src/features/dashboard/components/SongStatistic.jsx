import { Card } from 'antd';
import songAPI from 'api/songAPI';
import Highcharts from 'highcharts';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

function SongStatistic(props) {
  const { data, isLoading } = useQuery('song-statistic', () => songAPI.getSongStatistic(), {
    select: (value) => value?.data,
  });

  const getX = () => {
    const result = [];
    const days = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'];
    for (let i = 1; i < 8; i++) {
      const day = new Date(Date.now() - i * 24 * 60 * 60 * 1000).getDay();
      result.unshift(days[day]);
    }
    return result;
  };

  useEffect(() => {
    renderChart();
  }, [data]);

  const renderChart = () => {
    Highcharts.chart('song-statistic-chart-container', {
      chart: {
        type: 'spline',
      },
      title: {
        text: 'Bài hát tải lên theo ngày trong tuần',
      },
      subtitle: {
        text: '',
      },
      xAxis: {
        categories: getX(),
      },
      yAxis: {
        title: {
          text: 'Bài hát',
        },
        labels: {
          formatter: function () {
            return this.value + ' bài hát';
          },
        },
      },
      tooltip: {
        crosshairs: true,
        shared: true,
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1,
          },
        },
      },
      series: [
        {
          name: 'Số lượng',
          data: data ? Object.values(data)?.reverse() : [],
        },
      ],
    });
  };

  return (
    <Card title="Thống kê số lượng bài hát tải lên mỗi ngày trong tuần" className="mt-4">
      <div id="song-statistic-chart-container"></div>
    </Card>
  );
}

SongStatistic.propTypes = {};

export default SongStatistic;
