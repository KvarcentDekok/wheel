import { AppShell, Box, Button, Tabs } from "@mantine/core";
import { useState } from "react";
import { Tab } from "../../const/enum";
import type { Lot, Member } from "../../types/types";
import LotsAside from "../LotsAside/LotsAside";
import Members from "../Members/Members";
import { ASIDE_WIDTH } from "../../const/const";
import LotsMain from "../LotsMain/LotsMain";
import Wheel from "../Wheel/Wheel";

function Home() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Lots);
  const [lots, setLots] = useState<Lot[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [highlightedLotId, setHighlightedLotId] = useState("");

  const clearLots = () => {
    setLots([]);
  };

  const clearBets = () => {
    setLots((prev) => prev.map((item) => ({ ...item, bets: [] })));
  };

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: ASIDE_WIDTH,
        breakpoint: "sm",
      }}
    >
      <Tabs value={activeTab} onChange={(value) => setActiveTab(value as Tab)}>
        <AppShell.Header
          display="flex"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Tabs.List h="100%">
            <Tabs.Tab value={Tab.Lots}>Лоты</Tabs.Tab>
            <Tabs.Tab value={Tab.Wheel}>Колесо</Tabs.Tab>
            <Tabs.Tab value={Tab.Members}>Участники</Tabs.Tab>
          </Tabs.List>

          <Box display="flex" px={8} style={{ gap: "4px" }}>
            <Button color="yellow" onClick={clearLots}>
              Очистить лоты
            </Button>
            <Button color="orange" onClick={clearBets}>
              Очистить ставки
            </Button>
          </Box>
        </AppShell.Header>

        <AppShell.Navbar component="aside" px={8} py={16}>
          <LotsAside
            lots={lots}
            setLots={setLots}
            highlightedLotId={highlightedLotId}
            setHighlightedLotId={setHighlightedLotId}
          />
        </AppShell.Navbar>

        <AppShell.Main style={{height: 1}}>
          <Tabs.Panel value={Tab.Lots}>
            <LotsMain
              lots={lots}
              setLots={setLots}
              members={members}
              highlightedLotId={highlightedLotId}
            />
          </Tabs.Panel>
          <Tabs.Panel
            value={Tab.Wheel}
            style={{ width: "100%", height: "100%" }}
          >
            <Wheel lots={lots} highlightedLotId={highlightedLotId} />
          </Tabs.Panel>
          <Tabs.Panel value={Tab.Members}>
            <Members members={members} setMembers={setMembers} />
          </Tabs.Panel>
        </AppShell.Main>
      </Tabs>
    </AppShell>
  );
}

export default Home;
