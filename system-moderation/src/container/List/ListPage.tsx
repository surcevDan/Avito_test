import { Box, Flex, Separator, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Card from "@/components/Card.tsx";
import Filter from "@/components/Filter.tsx";
import type { TFilters } from "@/types/reducers.ts";
import { getAdsThunkCreator } from "@/redux/reducers/list-reducer.ts";
import { useSelector } from "react-redux";
import { type AppStateType, useAppDispatch } from "@/redux";
import { NavLink } from "react-router-dom";
import Paginator from "@/components/Paginator.tsx";


const ListPage = () => {

  const ads = useSelector((state: AppStateType) => state.list.ads);
  const pagination = useSelector((state: AppStateType) => state.list.pagination);
  // const [ads, setAds] = useState([]);
  const dispatch = useAppDispatch();

  const [filters, setFilters] = useState<TFilters>({
    status: [],
    categoryId: null,
    minPrice: null,
    maxPrice: null,
    search: "",
    sortBy: "",
    sortOrder: "",
    page: 1
  });


  useEffect(() => {
    dispatch(getAdsThunkCreator(filters));
  }, []);

  useEffect(() => {
    dispatch(getAdsThunkCreator(filters));
  }, [filters]);


  // useEffect(() => {
  //   dispatch(getNewPageThunkCreator(pagination.currentPage ?? 1));
  // }, [pagination]);


  // const [filters, setFilters] = useState<TFilters>({
  //   status: [],
  //   categoryId: null,
  //   minPrice: null,
  //   maxPrice: null,
  //   search: ""
  // });


  return (
    <Box m="20px">
      <Filter filters={filters} setFilters={setFilters} />
      <Separator style={{ borderTop: "1px solid gray" }} mb="10px" />
      <Text mb="10px">Всего объявлений: {pagination.totalItems}</Text>
      <Flex direction="row" justifyContent="start" gap="10px" wrap="wrap">
        {/*<div onClick={() => setFilters}></div>*/}
        {ads.map((ad, index) => {
          return <NavLink to={`/item/${ad.id}`} state={{ allAds: ads, currentIndex: index }}><Card
            ads={ad} /></NavLink>;
        })

        }
      </Flex>
      <Paginator filters={filters} setFilters={setFilters} />
    </Box>
  );
};

export default ListPage;