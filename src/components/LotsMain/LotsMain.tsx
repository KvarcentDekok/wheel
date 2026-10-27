import {
  Box,
  Card,
  Divider,
  SegmentedControl,
  SimpleGrid,
  Text,
} from "@mantine/core";
import type { Lot, Member } from "../../types/types";

type Props = {
  lots: Lot[];
  setLots: React.Dispatch<React.SetStateAction<Lot[]>>;
  members: Member[];
  highlightedLotId: string;
};

function LotsMain({ lots, setLots, members, highlightedLotId }: Props) {
  const betChangeHandler = (
    lotId: string,
    memberId: string,
    value: number | undefined,
  ) => {
    setLots((prev) => {
      const lots = [...prev];
      const lot = lots.find((item) => item.id === lotId);

      if (lot) {
        const bet = lot.bets.find((item) => item.memberId === memberId);

        if (bet) {
          bet.value = value;
        } else {
          lot.bets.push({ memberId, value });
        }
      }

      return lots;
    });
  };

  return (
    <SimpleGrid cols={3} spacing="xs" verticalSpacing="xs">
      {lots.map((lot) => (
        <Card
          key={lot.id}
          shadow="sm"
          padding="sm"
          withBorder
          bg={
            highlightedLotId
              ? highlightedLotId === lot.id
                ? lot.color
                : undefined
              : lot.color
          }
        >
          <Text fw={600} mb="auto" style={{wordWrap: "break-word"}}>
            {lot.name}
          </Text>

          <Divider mb={8} />

          <Box display="flex" style={{ gap: "8px", flexDirection: "column" }}>
            {members.map((member) => (
              <Box key={`${lot.id}-${member.id}`}>
                <Text fw={500} fz={14}>
                  {member.name}
                </Text>

                <SegmentedControl
                  color={lot.color}
                  value={
                    lot.bets.find((item) => item.memberId === member.id)
                      ?.value ?? 0
                  }
                  fullWidth
                  onChange={(value) =>
                    betChangeHandler(lot.id, member.id, value)
                  }
                  data={Array.from({ length: 11 }, (_, index) => ({
                    value: index,
                    label: index,
                    disabled: lots
                      .filter((item) => item.id !== lot.id)
                      .some(
                        (lot) =>
                          lot.bets.find((bet) => bet.memberId === member.id)
                            ?.value === index && index !== 0,
                      ),
                  })).reverse()}
                />
              </Box>
            ))}
          </Box>
        </Card>
      ))}
    </SimpleGrid>
  );
}

export default LotsMain;
