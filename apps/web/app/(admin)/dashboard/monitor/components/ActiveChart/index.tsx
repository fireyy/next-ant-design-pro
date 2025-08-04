import { Area } from "@ant-design/plots";
import { Statistic } from "antd";
import useStyles from "./index.style";

const ActiveChart = ({
  data: activeData,
}: {
  data: { x: string; y: number }[];
}) => {
  const { styles } = useStyles();

  return (
    <div className={styles.activeChart}>
      <Statistic title="目标评估" value="有望达到预期" />
      <div
        style={{
          marginTop: 32,
        }}
      >
        <Area
          padding={[0, 0, 0, 0]}
          xField="x"
          axis={false}
          yField="y"
          height={84}
          shapeField="smooth"
          style={{
            fill: "linear-gradient(-90deg, white 0%, #6294FA 100%)",
            fillOpacity: 0.6,
          }}
          data={activeData || []}
        />
      </div>
      {activeData && (
        <div>
          <div className={styles.activeChartGrid}>
            <p>{[...activeData].sort()[activeData.length - 1]?.y + 200} 亿元</p>
            <p>
              {[...activeData].sort()[Math.floor(activeData.length / 2)]?.y}{" "}
              亿元
            </p>
          </div>
          <div className={styles.dashedLine}>
            <div className={styles.line} />
          </div>
          <div className={styles.dashedLine}>
            <div className={styles.line} />
          </div>
        </div>
      )}
      {activeData && (
        <div className={styles.activeChartLegend}>
          <span>00:00</span>
          <span>{activeData[Math.floor(activeData.length / 2)]?.x}</span>
          <span>{activeData[activeData.length - 1]?.x}</span>
        </div>
      )}
    </div>
  );
};

export default ActiveChart;
