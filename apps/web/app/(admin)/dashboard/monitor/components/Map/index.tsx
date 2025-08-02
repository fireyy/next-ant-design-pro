import { PageLoading } from "@ant-design/pro-components";
import { HeatmapLayer, LarkMap, PointLayer } from "@antv/larkmap";
import * as React from "react";
import { useEffect, useState } from "react";

const colors = [
  "#eff3ff",
  "#c6dbef",
  "#9ecae1",
  "#6baed6",
  "#4292c6",
  "#2171b5",
  "#084594",
];

export default function MonitorMap() {
  const [data, setData] = useState(null);
  const [grid, setGrid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [geoData, gridData] = await Promise.all([
        fetch(
          "https://gw.alipayobjects.com/os/bmw-prod/c5dba875-b6ea-4e88-b778-66a862906c93.json"
        ).then((d) => d.json()),
        fetch(
          "https://gw.alipayobjects.com/os/bmw-prod/8990e8b4-c58e-419b-afb9-8ea3daff2dd1.json"
        ).then((d) => d.json()),
      ]);
      setData(geoData);
      setGrid(gridData);
      setLoading(false);
    }
    fetchData();
  }, []);

  return loading === true ? (
    <PageLoading />
  ) : (
    <LarkMap
      mapType="Map"
      mapOptions={{
        center: [110.19382669582967, 50.258134],
        pitch: 0,
        style: "normal",
        zoom: 1,
      }}
      style={{
        height: "452px",
      }}
    >
      {grid && (
        <HeatmapLayer
          key="1"
          id="myHeatmapLayer"
          source={{
            data: grid,
            transforms: [
              {
                type: "hexagon",
                size: 800000,
                field: "capacity",
                method: "sum",
              },
            ],
          }}
          color="#ddd"
          shape="hexagon"
          style={{
            coverage: 0.7,
            opacity: 0.8,
          }}
        />
      )}
      {data && [
        <PointLayer
          id="PointLayer"
          key="2"
          autoFit={true}
          source={{
            data,
          }}
          scale={{
            color: {
              type: "quantile",
              field: "cum_conf",
            },
          }}
          color={{
            field: "cum_conf",
            value: [
              "#eff3ff",
              "#c6dbef",
              "#9ecae1",
              "#6baed6",
              "#4292c6",
              "#2171b5",
              "#084594",
            ],
          }}
          shape="circle"
          activeColor="#0c2c84"
          size={{
            field: "cum_conf",
            value: [0, 30],
            scale: {
              type: "log",
            },
          }}
          style={{
            opacity: 0.8,
          }}
        />,
        <PointLayer
          id="PointLayer2000"
          key="5"
          source={{
            data,
          }}
          color="#fff"
          shape={{
            field: "Short_Name_ZH",
            value: "text",
          }}
          filter={{
            field: "cum_conf",
            value: (v) => {
              return v["cum_conf"] > 2000;
            },
          }}
          size={12}
          style={{
            opacity: 1,
            strokeOpacity: 1,
            strokeWidth: 0,
          }}
        />,
      ]}
    </LarkMap>
  );
}
