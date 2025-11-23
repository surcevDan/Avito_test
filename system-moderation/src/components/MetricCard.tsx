import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import type { SummaryStatsT } from "@/types/reducers.ts";


const MetricCard: React.FC<{ stats: SummaryStatsT | null }> = ({ stats }) => {
  const rejectPercentage = () => {
    return 100 - (stats?.approvedPercentage ?? 0);
  };
  return (
    <Box mb="20px" mt="20px">
      <Flex justify="flex-start" gap="15px">

        <Box w="200px" p="10px" backgroundColor="gray.300" borderRadius="10px">
          <Text>Проверенно: </Text>
          <Text>{stats?.totalReviewed}</Text>
        </Box>
        <Box w="200px" p="10px" backgroundColor="gray.300" borderRadius="10px">
          <Text>Время отклика(ср.): </Text>
          <Text>{stats?.averageReviewTime}сек</Text>
        </Box>
        <Box w="200px" p="10px" backgroundColor="gray.300" borderRadius="10px">
          <Text>Одобренных: </Text>
          <Text>{Math.round(stats?.approvedPercentage ?? 0)}%</Text>
        </Box>
        <Box w="200px" p="10px" backgroundColor="gray.300" borderRadius="10px">
          <Text>Отклоненных: </Text>
          <Text>{Math.round(rejectPercentage())}%</Text>
        </Box>
      </Flex>
    </Box>


  );
};

export default MetricCard;