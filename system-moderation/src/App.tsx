import { NavLink, Route, Routes } from "react-router-dom";
import ListPage from "@/container/List/ListPage.tsx";
import ItemPage from "@/container/Item/ItemPage.tsx";
import StatsPage from "@/container/Stats/StatsPage.tsx";
import { Box, Button, Flex } from "@chakra-ui/react";


function App() {


  return (
    <div className="app-wrapper">
      <Box p="10px" backgroundColor="gray.300">
        <Flex gap="10px">
          <NavLink to={`/list`}><Button>Объявления</Button></NavLink>
          <NavLink to={`/stats`}><Button>Статистика</Button></NavLink>


        </Flex>

      </Box>

      <div className="app-wrapper-content">
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </div>
    </div>


  );
}

export default App;
