import { NavLink, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { type AppStateType, useAppDispatch } from "@/redux";
import { getItemAdsThunkCreator, postApproveStatusItemAdsThunkCreator } from "@/redux/reducers/item-reducer.ts";
import { useSelector } from "react-redux";
import { Badge, Box, Button, Flex, HStack, Icon, Image, Separator, Table, Text, useDisclosure } from "@chakra-ui/react";

import RejectModal from "@/container/reject-modal/RejectModal.tsx";
import ReqestModal from "@/container/request-modal/RequestModal.tsx";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { colorMap, humanCard } from "@/types/helpers.ts";


const ItemPage = () => {

  const { id } = useParams();
  const location = useLocation();


  const dispatch = useAppDispatch();


  const currentIndex = location.state?.currentIndex || 0;
  const allAds = location.state?.allAds || [];


  const getPreviousAd = () => {
    if (currentIndex > 0) {
      return allAds[currentIndex - 1];
    }
    return null;
  };

  const getNextAd = () => {
    if (currentIndex < allAds.length - 1) {
      return allAds[currentIndex + 1];
    }
    return null;
  };

  const previousAd = getPreviousAd();
  const nextAd = getNextAd();


  useEffect(() => {
    if (id) {
      dispatch(getItemAdsThunkCreator(id));
    }
  }, [id, dispatch]);


  const item = useSelector((state: AppStateType) => state.item.item);

// Модальное окно (управление состянием модального окна)
  const { open: isRejectOpen, onOpen: onRejectOpen, onClose: onRejectClose } = useDisclosure();
  const { open: isRequestOpen, onOpen: onRequestOpen, onClose: onRequestClose } = useDisclosure();


  return (

    <Box>

      <Box m="20px">
        <Flex>
          <NavLink to={`/list`}><Box width="fit-content" mb="10px"><Text><Icon><GoArrowLeft /></Icon>К
            списку</Text></Box></NavLink>
          <Box ml="40px">
            <Flex gap="10px">
              {previousAd ? (
                <NavLink to={`/item/${previousAd.id}`}
                         state={{ allAds, currentIndex: currentIndex - 1 }}><Box
                  width="fit-content"
                  mb="10px"><Text><Icon><GoArrowLeft /></Icon>Пред</Text></Box></NavLink>) : <></>}
              {nextAd ? (
                <NavLink to={`/item/${nextAd.id}`}
                         state={{ allAds, currentIndex: currentIndex + 1 }}><Box
                  width="fit-content"
                  mb="10px"><Text>След<Icon><GoArrowRight /></Icon></Text></Box></NavLink>) : <></>}
            </Flex>
          </Box>
        </Flex>


        <Flex direction="row" justify="space-between" alignItems="flex-start">
          <Box>
            <Flex direction="row" justify="start" gap="15px">
              {item?.images.map((elem) => {
                return (
                  <Image src={elem} />
                );
              })
              }
            </Flex>
          </Box>
          <Box>
            <Box backgroundColor="gray.300" p="10px" borderRadius="10px" maxH="300px" overflowY="auto">
              <Text textStyle="lg" fontWeight="bold">История модерации</Text>
              <Separator style={{ borderTop: "1px solid gray" }} mb="10px" />
              <Box>
                {item?.moderationHistory?.map((e) => {
                  return (
                    <Box>
                      <Text>Кто проверял: {e.moderatorName}</Text>
                      <Text>Дата проверки: {new Date(e.timestamp ?? "").toLocaleString("ru-RU")}</Text>
                      <Text>Решение: {humanCard[e.action]}</Text>
                      <Text>Комментарий:<Text>{e.comment}</Text></Text>
                      <Separator style={{ borderTop: "1px solid gray" }} mb="10px" />
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Box mt="20px">
              <Button bg="green" color="black"
                      onClick={() => dispatch(postApproveStatusItemAdsThunkCreator(id ?? ""))}>Подтвердить</Button>
              <Button bg="red" color="black" onClick={onRejectOpen}>Отклонить</Button>
              <Button bg="yellow" color="black" onClick={onRequestOpen}>Вернуть на доработку</Button>
            </Box>

          </Box>


        </Flex>


        <Text textStyle="2xl" fontWeight="bold">{item?.title}
          <HStack>
            <Badge colorPalette={item?.status ? colorMap[item.status] : "gray"} variant="solid">
              {item?.status ? humanCard[item?.status] : "Черновик"}
            </Badge>
          </HStack>
        </Text>


        <Flex direction="row" justify="start" gap="15px">
          <Box mt="20px">
            <Table.Root w="350px">
              <Table.Caption captionSide="top">Характеристики</Table.Caption>
              <Table.Body>
                {Object.entries(item?.characteristics ?? {}).map(([key, value]) => (
                  <Table.Row key={key}>
                    <Table.Cell>{key}</Table.Cell>
                    <Table.Cell>{value}</Table.Cell>

                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>

          <Box mt="20px">
            <Table.Root w="350px">
              <Table.Caption captionSide="top">Продавец:</Table.Caption>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Имя:</Table.Cell>
                  <Table.Cell>{item?.seller?.name}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Рейтинг:</Table.Cell>
                  <Table.Cell>{item?.seller?.rating}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Всего объявлений:</Table.Cell>
                  <Table.Cell>{item?.seller?.totalAds}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Най сайте с:</Table.Cell>
                  <Table.Cell>{new Date(item?.seller?.registeredAt ?? "").toLocaleString("ru-RU")}</Table.Cell>
                </Table.Row>

              </Table.Body>
            </Table.Root>
          </Box>
        </Flex>
        <Box mt="20px">
          <Text>Описание товара:</Text>
          <Text fontWeight="light">{item?.description}</Text>
        </Box>


      </Box>

      <RejectModal id={id ?? ""} isOpen={isRejectOpen} onClose={onRejectClose} />
      <ReqestModal id={id ?? ""} isOpen={isRequestOpen} onClose={onRequestClose} />
    </Box>

  );
};

export default ItemPage;

