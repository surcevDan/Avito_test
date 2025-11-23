import React from "react";
import { Badge, Box, HStack, Image, Text } from "@chakra-ui/react";
import type { adsT } from "@/types/reducers.ts";
import { colorMap, colorMapPriority, humanCard, humanCardPriority } from "@/types/helpers.ts";


interface CardProps {
  ads: adsT;
}


const Card: React.FC<CardProps> = ({ ads }) => {


  const formater: (price: number) => string = (price) => {
    const formatter = Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0
    });
    return formatter.format(price);
  };


  return (

    <Box maxW="300px" borderWidth="2px">
      <Image src={ads.images[0]} alt="" />
      <Box p="4" spaceY="2">
        <Text fontWeight="medium" color="fg">
          {ads.title}
        </Text>

        <HStack color="fg.muted">
          <Text>Категория:</Text>{ads.category}
        </HStack>

        <HStack color="fg.muted">
          <Text>Цена:</Text>{formater(ads.price)}
        </HStack>


        <HStack>
          <Badge colorPalette={colorMap[ads.status] || "gray"} variant="solid">
            {humanCard[ads.status]}
          </Badge>
          <Badge colorPalette={colorMapPriority[ads.priority] || "gray"} variant="solid">
            {humanCardPriority[ads.priority]}
          </Badge>

          <Text>Созданно:<Box>{new Date(ads.createdAt).toLocaleString("ru-RU")}</Box></Text>
        </HStack>


      </Box>
    </Box>
  );
};
export default Card;
