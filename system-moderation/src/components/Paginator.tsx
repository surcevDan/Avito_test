import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useSelector } from "react-redux";
import { type AppStateType } from "@/redux";
import React, { type SetStateAction } from "react";
import type { TFilters } from "@/types/reducers.ts";


interface FiltersProps {
  filters: TFilters;
  setFilters: React.Dispatch<SetStateAction<TFilters>>;
}

const Paginator: React.FC<FiltersProps> = ({ setFilters }) => {

  const setPage = (number: number) => {
    setFilters((prev): TFilters => {
      return {
        ...prev,
        page: number

      };
    });
  };
  const pagination = useSelector((state: AppStateType) => state.list.pagination);


  return (
    <Pagination.Root count={pagination.totalItems} pageSize={10} defaultPage={1}>
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton onClick={() => setPage(page.value)}
                        variant={{ base: "ghost", _selected: "outline" }}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export default Paginator;