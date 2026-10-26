import {
  AppShell,
  Tabs,
} from "@mantine/core";
import { useState } from "react";
import { Tab } from "../../const/enum";
import type { Lot, Member } from "../../types/types";
import LotsAside from "../LotsAside/LotsAside";
import Members from "../Members/Members";
import { ASIDE_WIDTH } from "../../const/const";

function Home() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Lots);
  const [lots, setLots] = useState<Lot[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

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
        <AppShell.Header>
          <Tabs.List h="100%">
            <Tabs.Tab value={Tab.Lots}>Лоты</Tabs.Tab>
            <Tabs.Tab value={Tab.Wheel}>Колесо</Tabs.Tab>
            <Tabs.Tab value={Tab.Members}>Участники</Tabs.Tab>
          </Tabs.List>
        </AppShell.Header>

        <AppShell.Navbar component="aside" px={8} py={16}>
          <LotsAside lots={lots} setLots={setLots} />
        </AppShell.Navbar>

        <AppShell.Main>
          <Tabs.Panel value={Tab.Lots}>First panel</Tabs.Panel>
          <Tabs.Panel value={Tab.Wheel}>Second panel</Tabs.Panel>
          <Tabs.Panel value={Tab.Members}><Members members={members} setMembers={setMembers} /></Tabs.Panel>
        </AppShell.Main>
      </Tabs>
    </AppShell>
  );
}

export default Home;
