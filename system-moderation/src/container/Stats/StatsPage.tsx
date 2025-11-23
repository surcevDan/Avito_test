import React, { useEffect, useState } from "react";
import { Box, createListCollection, Flex, Listbox, Text } from "@chakra-ui/react";
import { type AppStateType, useAppDispatch } from "@/redux";
import {
  getActivChartThunkCreator, getCategoriChartThunkCreator,
  getPieChartThunkCreator,
  getStatsThunkCreator
} from "@/redux/reducers/stats-reducer.ts";
import type { StatsPeriod } from "@/types/reducers.ts";
import { useSelector } from "react-redux";
import MetricCard from "@/components/MetricCard.tsx";
import { BarList, type BarListData, Chart, useChart } from "@chakra-ui/charts";
import { Cell, Pie, PieChart, BarChart, CartesianGrid, Tooltip, Bar, YAxis, Legend, XAxis } from "recharts";


const StatsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [period, setPeriod] = useState<StatsPeriod>("week");
  const stats = useSelector((state: AppStateType) => state.stats.stats);
  const pieChart = useSelector((state: AppStateType) => state.stats.pieChart);
  const activChart = useSelector((state: AppStateType) => state.stats.activityChart);
  const categoriChart = useSelector((state: AppStateType) => state.stats.categoriesStats);

  console.log(period);


  useEffect(() => {
    dispatch(getStatsThunkCreator({ period }));
    dispatch(getPieChartThunkCreator({ period }));
    dispatch(getActivChartThunkCreator({ period }));
    dispatch(getCategoriChartThunkCreator({ period }));

  }, [period]);


  const chart = useChart({
    data: [
      { name: "Одобрено", value: pieChart?.approved, color: "blue.solid" },
      { name: "Отклонено", value: pieChart?.rejected, color: "orange.solid" },
      { name: "Отправлено на изменения", value: pieChart?.requestChanges, color: "green.solid" }
    ]
  });


  const chartColumnData = activChart?.map(item => ({
    type: item.date,
    "Одобрено": item.approved,
    "Отклонено": item.rejected,
    "Отправлено на изменения": item.requestChanges
  })) ?? [];

  const chartColumn = useChart({
    data: chartColumnData,
    series: [
      { name: "Одобрено", color: "blue.solid" },
      { name: "Отклонено", color: "red.solid" },
      { name: "Отправлено на изменения", color: "yellow.solid" }
    ]
  });

  const category = useChart<BarListData>({
    sort: { by: "value", direction: "desc" },
    data: Object.entries(categoriChart || {}).map(([name, value]) => ({
      name: name,
      value: value
    })),
    series: [{ name: "name", color: "teal.subtle" }]
  });


  const statsPeriod = createListCollection({
    items: [
      { label: "День", value: "today" },
      { label: "Неделя", value: "week" },
      { label: "Месяц", value: "month" }
    ]
  });


  return (

    <Box>
      <Box mr="20px" ml="20px">
        <Text textStyle="2xl" fontWeight="bold">Статистика</Text>

        <Flex justify="space-between">
          <MetricCard stats={stats} />
          <Listbox.Root collection={statsPeriod} width="150px">
            <Listbox.Label>Статистика за:</Listbox.Label>
            <Listbox.Content>
              {statsPeriod.items.map((item) => (
                <Listbox.Item item={item} key={item.value}>
                  <Listbox.ItemText onClick={() => setPeriod(item.value)}>{item.label}</Listbox.ItemText>
                  <Listbox.ItemIndicator />
                </Listbox.Item>
              ))}
            </Listbox.Content>
          </Listbox.Root>
        </Flex>

        <Flex direction="row" gap="10px" wrap="wrap">
          <Box flex="1" minW="500px">
            <Box backgroundColor="gray.300" borderRadius="25px" mb="25px">
              <Flex direction="column" gap="10px" justify="center" align="center">
                <Text textStyle="2xl" fontWeight="bold">Дневная активность</Text>
                <Chart.Root maxH="350px" maxW="700px" chart={chartColumn}>
                  <BarChart data={chartColumn.data}>
                    <CartesianGrid stroke={chartColumn.color("border.muted")} vertical={false} />
                    <XAxis
                      tickLine={false}
                      dataKey={chartColumn.key("type")}
                      stroke={chartColumn.color("border")}
                    />
                    <YAxis tickLine={false} stroke={chartColumn.color("border")} />
                    <Tooltip
                      cursor={{ fill: chartColumn.color("bg.muted") }}
                      animationDuration={100}
                      content={<Chart.Tooltip />}
                    />
                    <Legend
                      layout="vertical"
                      align="right"
                      verticalAlign="top"
                      wrapperStyle={{ paddingLeft: 30 }}
                      content={<Chart.Legend orientation="vertical" />}
                    />
                    {chartColumn.series.map((item) => (
                      <Bar
                        isAnimationActive={false}
                        key={item.name}
                        dataKey={chartColumn.key(item.name)}
                        fill={chartColumn.color(item.color)}
                      />
                    ))}
                  </BarChart>
                </Chart.Root>
              </Flex>
            </Box>


            <Box backgroundColor="gray.300" borderRadius="25px">
              <Flex direction="column" gap="10px" justify="center" align="center">
                <Text textStyle="2xl" fontWeight="bold">Диаграмма решений</Text>
                <Chart.Root backgroundColor="gray.300" maxW="700px" maxH="350px" chart={chart}>
                  <PieChart>
                    <Pie
                      isAnimationActive={false}
                      data={chart.data}
                      dataKey={chart.key("value")}
                      outerRadius={100}
                      innerRadius={0}
                      labelLine={false}
                      label={({ name, index }) => {
                        const { value } = chart.data[index ?? -1];
                        const percent = value / chart.getTotal("value");
                        return `${name}: ${(percent * 100).toFixed(1)}%`;
                      }}
                    >
                      {chart.data.map((item) => {
                        return <Cell key={item.name} fill={chart.color(item.color)} />;
                      })}
                    </Pie>
                  </PieChart>
                </Chart.Root>
              </Flex>
            </Box>

          </Box>


          <Box flex="1" minW="300px" ml="10px">
            <Box backgroundColor="gray.300" borderRadius="25px">
              <Flex direction="column" gap="10px" justify="center">
                <Box ml=" 15px" mt="10px" mb="10px">
                  <Text textStyle="2xl" fontWeight="bold" mb="10px">График по категориям</Text>
                  <BarList.Root maxW="700px" maxH="400px" chart={category}>
                    <BarList.Content>
                      <BarList.Bar />
                      <BarList.Value />
                    </BarList.Content>
                  </BarList.Root>
                </Box>
              </Flex>


            </Box>

          </Box>
        </Flex>

      </Box>
    </Box>
  );

};

export default StatsPage;