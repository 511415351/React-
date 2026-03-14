import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Descriptions, Avatar, Button, Statistic } from 'antd';
import ReactECharts from 'echarts-for-react';
import api from '../../api'; 
import type { IReportData, ILineData , IPieData, IRadarData, IUser } from '../../types/api';

const Dashboard: React.FC = () => {
  // 定义所有状态
  const [userInfo, setUserInfo] = useState<IUser>(); // 用户信息
  const [reportData, setReportData] = useState<IReportData>(); // 卡片数据
  const [lineData, setLineData] = useState<ILineData>(); // 折线图
  const [cityData, setCityData] = useState<IPieData[]>([]); // 城市饼图
  const [ageData, setAgeData] = useState<IPieData[]>([]); // 年龄饼图
  const [radarData, setRadarData] = useState<IRadarData>(); // 雷达图

  // 初始化获取所有数据
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const [user, report, line, city, age, radar] = await Promise.all([
      api.getUserInfo(),      // 获取用户信息
      api.getReportData(),    // 获取统计报表
      api.getLineData(),      // 获取流水折线
      api.getPieCityData(),   // 获取城市分布
      api.getPieAgeData(),    // 获取年龄分布
      api.getRadarData()      // 获取能力雷达
    ]);
    
    setUserInfo(user);
    setReportData(report);
    setLineData(line);
    setCityData(city);
    setAgeData(age);
    setRadarData(radar);
  };

  // --- 图表配置  ---
  const getLineOption = () => ({
    tooltip: { trigger: 'axis' },
    legend: { data: ['订单量', '流水金额'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
    xAxis: { type: 'category', data: lineData?.label || [] },
    yAxis: { type: 'value' },
    series: [
      { name: '订单量', type: 'line', data: lineData?.order || [], smooth: true, itemStyle: { color: '#335eea' } },
      { name: '流水金额', type: 'line', data: lineData?.money || [], smooth: true, itemStyle: { color: '#6f42c1' } },
    ],
  });

  const getPieOption = (title: string, data: IPieData[]) => ({
    title: { text: title, left: 'center', textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'item' },
    series: [
      {
        name: title,
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        data: data,
      },
    ],
  });

  const getRadarOption = () => ({
    title: { text: '程序员特征分析', left: 'center' },
    radar: { indicator: radarData?.indicator || [], radius: '60%' },
    series: [{ type: 'radar', data: radarData?.data || [], areaStyle: { color: 'rgba(51, 94, 234, 0.3)' } }],
  });

  // --- 卡片配置 ---
  const cardConfigs = [
    { label: '提交代码行数', val: reportData?.codeLine, unit: '行', color: '#335eea' },
    { label: '工资', val: reportData?.salary, unit: '元', color: '#6f42c1', prefix: '¥' },
    { label: '完成需求', val: reportData?.icafeCount, unit: '卡片', color: '#4ec13c' },
    { label: '项目数量', val: reportData?.projectNum, unit: '个', color: '#f64d9c' },
  ];

  return (
    <div style={{ padding: 20, background: '#f5f7fa', minHeight: '100vh' }}>
      
      {/* 顶部个人信息 */}
      <Card bordered={false} style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            size={64} 
            src={userInfo?.userImg} 
            alt="用户头像"
          />
          <div style={{ marginLeft: 20, flex: 1 }}>
            <Descriptions 
                title={<span>欢迎回来，<b>{userInfo?.userName}</b></span>} 
                column={3} 
                size="small"
            >
              <Descriptions.Item label="用户ID">{userInfo?.userId}</Descriptions.Item>
              <Descriptions.Item label="邮箱">{userInfo?.userEmail}</Descriptions.Item>
              <Descriptions.Item label="状态">
                {userInfo?.state === 1 ? '在职' : '离职'}
              </Descriptions.Item>
              <Descriptions.Item label="手机号">{userInfo?.mobile}</Descriptions.Item>
              <Descriptions.Item label="岗位">{userInfo?.job}</Descriptions.Item>
              <Descriptions.Item label="部门">{userInfo?.deptName}</Descriptions.Item>
            </Descriptions>
          </div>
          <Button type="primary" onClick={fetchAllData}>刷新数据</Button>
        </div>
      </Card>

      {/* 数据卡片 */}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        {cardConfigs.map((item, idx) => (
          <Col span={6} key={idx}>
            <Card bordered={false} style={{ background: item.color, color: '#fff' }}>
              <Statistic 
                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>{item.label}</span>} 
                value={item.val} 
                suffix={item.unit}
                prefix={item.prefix}
                precision={item.label === '工资' ? 2 : 0}
                valueStyle={{ color: '#fff' }} 
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* 折线图 */}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={24}>
          <Card title="年度汇总趋势" bordered={false}>
            <ReactECharts option={getLineOption()} style={{ height: 350 }} />
          </Card>
        </Col>
      </Row>

      {/* 三个分布图 */}
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false}><ReactECharts option={getPieOption('城市分布', cityData)} style={{ height: 300 }} /></Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}><ReactECharts option={getPieOption('年龄段分布', ageData)} style={{ height: 300 }} /></Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}><ReactECharts option={getRadarOption()} style={{ height: 300 }} /></Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;