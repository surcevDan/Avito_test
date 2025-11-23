import React, { type SetStateAction } from "react";
import { Box, Button, Checkbox, createListCollection, Flex, Input, InputGroup, Listbox } from "@chakra-ui/react";


import { LuSearch } from "react-icons/lu";
import type { TFilters } from "@/types/reducers.ts";
import { humanCard } from "@/types/helpers.ts";


interface FiltersProps {
  filters: TFilters;
  setFilters: React.Dispatch<SetStateAction<TFilters>>;
}


const Filter: React.FC<FiltersProps> = ({ filters, setFilters }) => {


  type KeyCard = keyof typeof humanCard;
  const status: KeyCard[] = ["rejected", "approved", "pending"];


  const handleStatusToggle = (status: string) => {
    setFilters((prev): TFilters => {
      const isChecked = prev.status.includes(status);
      if (isChecked) {
        return {
          ...prev,
          status: prev.status.filter((s) => s !== status)
        };
      } else {
        return {
          ...prev,
          status: [...prev.status, status]
        };
      }
    });
  };


  const onSearchChange = (text: string) => {
    setFilters((prev) => {
      return {
        ...prev,
        search: text
      };
    });
  };

  const onPriceRangeChange = (price: number, filter: string) => {
    if (filter === "maxPrice") {
      setFilters((prev) => {
        return {
          ...prev,
          maxPrice: price
        };
      });
    } else if (filter === "minPrice") {
      setFilters((prev) => {
        return {
          ...prev,
          minPrice: price
        };
      });
    }
  };

  const onSortBy = (value: string) => {
    setFilters((prev) => {
      return {
        ...prev,
        sortBy: value
      };
    });
  };

  const onSortOrder = (value: string) => {
    setFilters((prev) => {
      return {
        ...prev,
        sortOrder: value
      };
    });
  };


  // const sortBy = ["createdAt", "price", "priority"];
  const sortBy = createListCollection({
    items: [
      { label: "Дата", value: "createdAt" },
      { label: "Цена", value: "price" },
      { label: "Приоретет", value: "priority" }
    ]
  });
  const sortOrder = createListCollection({
    items: [
      { label: "А-Я", value: "asc" },
      { label: "Я-А", value: "desc" }
    ]
  });

  return (
    <Box mb="20px">
      <Flex direction="column"></Flex>
      <Flex direction="row" justify="space-between" align="center">
        <Box>
          <Flex direction="column" gap="8px">
            {
              status.map((status) => {
                return (
                  <Checkbox.Root
                    checked={filters.status.includes(status)}
                    onCheckedChange={() => handleStatusToggle(status)}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>{humanCard[status]}</Checkbox.Label>
                  </Checkbox.Root>
                );
              })
            }
          </Flex>
        </Box>


        <Box>
          <InputGroup startAddon="₽" w="150px">
            <Input name="minPrice" type="number" placeholder="мин.Цен." value={filters.minPrice || ""} onChange={(e) =>
              onPriceRangeChange(Number(e.target.value), "minPrice")
            } />
          </InputGroup>-
          <InputGroup startAddon="₽" w="150px">
            <Input name="maxPrice" type="number" placeholder="макс.Цен." value={filters.maxPrice || ""}
                   onChange={(e) =>
                     onPriceRangeChange(Number(e.target.value), "maxPrice")
                   } />
          </InputGroup>
        </Box>


        <Box>
          <InputGroup flex="1" startElement={<LuSearch />}>
            <Input w="850px" type="text" value={filters.search} onChange={(e) => onSearchChange(e.target.value)}
                   placeholder="Поиск по названию объявления" />
          </InputGroup>
        </Box>
        <Box>
          <Flex>
            <Listbox.Root collection={sortBy} width="150px">
              <Listbox.Label>Сортировка по:</Listbox.Label>
              <Listbox.Content>
                {sortBy.items.map((item) => (
                  <Listbox.Item item={item} key={item.value}>
                    <Listbox.ItemText onClick={() => onSortBy(item.value)}>{item.label}</Listbox.ItemText>
                    <Listbox.ItemIndicator />
                  </Listbox.Item>
                ))}
              </Listbox.Content>
            </Listbox.Root>
            <Box>
              <Listbox.Root collection={sortOrder} width="150px">
                <Listbox.Label>Сортировка в:</Listbox.Label>
                <Listbox.Content>
                  {sortOrder.items.map((item) => (
                    <Listbox.Item item={item} key={item.value}>
                      <Listbox.ItemText onClick={() => onSortOrder(item.value)}>{item.label}</Listbox.ItemText>
                      <Listbox.ItemIndicator />
                    </Listbox.Item>
                  ))}
                </Listbox.Content>
              </Listbox.Root>
              <Button mt="5px" w="100%" onClick={() => setFilters({
                status: [],
                categoryId: null,
                minPrice: null,
                maxPrice: null,
                search: "",
                sortBy: "",
                sortOrder: ""
              })}>Сбросить всё</Button>
            </Box>


          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Filter;

//
// Фильтр по категории
// Фильтр по диапазону цен
// Поиск по названию объявления
// Сброс всех фильтров