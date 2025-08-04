"use client";
import { Gauge, Liquid, WordCloud } from "@ant-design/plots";
import { GridContent } from "@ant-design/pro-components";
import { useRequest } from "@/services";
import { Card, Col, Progress, Row, Skeleton, Statistic } from "antd";
import numeral from "numeral";
import { useCallback, useEffect, useRef, useState, type FC } from "react";
import { queryTags } from "./service";
import useStyles from "./style.style";
import dynamic from "next/dynamic";

const MonitorMap = dynamic(() => import("./components/Map"), {
  ssr: false,
  loading: () => (
    <Skeleton style={{ margin: "24px 40px", height: "60vh" }} active />
  ),
});

const ActiveChart = dynamic(() => import("./components/ActiveChart"), {
  ssr: false,
  loading: () => (
    <Skeleton style={{ margin: "24px 40px", height: "60vh" }} active />
  ),
});

const { Timer } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

function fixedZero(val: number) {
  return val * 1 < 10 ? `0${val}` : val;
}
function getActiveData() {
  const activeData = [];
  for (let i = 0; i < 24; i += 1) {
    activeData.push({
      x: `${fixedZero(i)}:00`,
      y: Math.floor(Math.random() * 200) + i * 50,
    });
  }
  return activeData;
}

const Monitor: FC = () => {
  const { styles } = useStyles();
  const { loading, data } = useRequest(queryTags);
  const wordCloudData = (data?.list || []).map((item) => {
    return {
      id: +Date.now(),
      word: item.name,
      weight: item.value,
    };
  });

  const timerRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);
  const [activeData, setActiveData] = useState<{ x: string; y: number }[]>([]);
  const loopData = useCallback(() => {
    requestRef.current = requestAnimationFrame(() => {
      timerRef.current = window.setTimeout(() => {
        setActiveData(getActiveData());
        loopData();
      }, 2000);
    });
  }, []);

  useEffect(() => {
    setActiveData(getActiveData());
    loopData();
    return () => {
      clearTimeout(timerRef.current as number);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [loopData]);

  return (
    <GridContent>
      <Row gutter={24}>
        <Col
          xl={18}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <Card title="活动实时交易情况" variant="borderless">
            <Row>
              <Col md={6} sm={12} xs={24}>
                <Statistic
                  title="今日交易总额"
                  suffix="元"
                  value={numeral(124543233).format("0,0")}
                />
              </Col>
              <Col md={6} sm={12} xs={24}>
                <Statistic title="销售目标完成率" value="92%" />
              </Col>
              <Col md={6} sm={12} xs={24}>
                <Timer
                  type="countdown"
                  title="活动剩余时间"
                  value={deadline}
                  format="HH:mm:ss:SSS"
                />
              </Col>
              <Col md={6} sm={12} xs={24}>
                <Statistic
                  title="每秒交易总额"
                  suffix="元"
                  value={numeral(234).format("0,0")}
                />
              </Col>
            </Row>
            <div className={styles.mapChart}>
              <MonitorMap />
            </div>
          </Card>
        </Col>
        <Col xl={6} lg={24} md={24} sm={24} xs={24}>
          <Card
            title="活动情况预测"
            style={{
              marginBottom: 24,
            }}
            variant="borderless"
          >
            <ActiveChart data={activeData || []} />
          </Card>
          <Card
            title="券核效率"
            style={{
              marginBottom: 24,
            }}
            styles={{
              body: {
                textAlign: "center",
              },
            }}
            variant="borderless"
          >
            <Gauge
              height={180}
              data={
                {
                  target: 80,
                  total: 100,
                  name: "score",
                  thresholds: [20, 40, 60, 80, 100],
                } as const
              }
              padding={-16}
              style={{
                textContent: () => "优",
              }}
              meta={{
                color: {
                  range: [
                    "#6395FA",
                    "#62DAAB",
                    "#657798",
                    "#F7C128",
                    "#1F8718",
                  ],
                },
              }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col
          xl={12}
          lg={24}
          sm={24}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <Card title="各品类占比" variant="borderless">
            <Row
              style={{
                padding: "16px 0",
              }}
            >
              <Col span={8}>
                <Progress type="dashboard" percent={75} />
              </Col>
              <Col span={8}>
                <Progress type="dashboard" percent={48} />
              </Col>
              <Col span={8}>
                <Progress type="dashboard" percent={33} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col
          xl={6}
          lg={12}
          sm={24}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <Card
            title="热门搜索"
            loading={loading}
            variant="borderless"
            styles={{
              body: {
                overflow: "hidden",
              },
            }}
          >
            <WordCloud
              data={wordCloudData}
              height={162}
              textField="word"
              colorField="word"
              layout={{ spiral: "rectangular", fontSize: [10, 20] }}
            />
          </Card>
        </Col>
        <Col
          xl={6}
          lg={12}
          sm={24}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <Card
            title="资源剩余"
            styles={{
              body: {
                textAlign: "center",
                fontSize: 0,
              },
            }}
            variant="borderless"
          >
            <Liquid height={160} percent={0.35} />
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default Monitor;
