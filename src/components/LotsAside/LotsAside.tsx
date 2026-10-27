import {
  ActionIcon,
  Divider,
  Group,
  Stack,
  TextInput,
  ThemeIcon,
  Text,
  useMantineTheme,
  ScrollAreaAutosize,
} from "@mantine/core";
import { PlusCircleIcon, TrashIcon } from "@phosphor-icons/react";
import type { Lot } from "../../types/types";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { ASIDE_WIDTH } from "../../const/const";
import { getHslColor, sortLots } from "../../helpers/helpers";

type Props = {
  lots: Lot[];
  setLots: React.Dispatch<React.SetStateAction<Lot[]>>;
  highlightedLotId: string;
  setHighlightedLotId: React.Dispatch<React.SetStateAction<string>>;
};

function LotsAside({
  lots,
  setLots,
  highlightedLotId,
  setHighlightedLotId,
}: Props) {
  const [newLot, setNewLot] = useState("");
  const theme = useMantineTheme();

  const newLotSubmitHandler = (evt: React.SubmitEvent<HTMLDivElement>) => {
    evt.preventDefault();

    if (newLot) {
      setLots((prev) => [
        ...prev,
        {
          name: newLot,
          id: uuid(),
          bets: [],
          color: getHslColor(prev[prev.length - 1]?.color),
        },
      ]);
      setNewLot("");
    }
  };

  const removeLotHandler = (id: string) => {
    setLots((prev) => prev.filter((item) => item.id !== id));
    setHighlightedLotId("")
  };

  return (
    <>
      <Group
        align="flex-end"
        gap="xs"
        component="form"
        onSubmit={newLotSubmitHandler}
      >
        <TextInput
          label="Новый лот"
          value={newLot}
          onChange={(event) => setNewLot(event.currentTarget.value)}
          flex={1}
        />

        <ActionIcon size="input-sm" aria-label="Добавить" type="submit">
          <PlusCircleIcon size={20} />
        </ActionIcon>
      </Group>

      <Divider my="md" />

      <ScrollAreaAutosize scrollbarSize={4}>
        <Stack
          bg="var(--mantine-color-body)"
          align="stretch"
          justify="center"
          gap={0}
          pr={6}
        >
          {lots.sort(sortLots).map((item, index) => (
            <Group
              key={item.id}
              gap="xs"
              align="end"
              wrap="nowrap"
              onMouseEnter={() => setHighlightedLotId(item.id)}
              onMouseLeave={() => setHighlightedLotId("")}
              py={4}
            >
              <ThemeIcon color={theme.colors.cyan[7]}>
                <Text fw={700} fz={theme.fontSizes.sm}>
                  {index + 1}
                </Text>
              </ThemeIcon>

              <Text
                fw={500}
                flex={1}
                style={{ textOverflow: "ellipsis", overflow: "hidden", color: highlightedLotId === item.id ? item.color : undefined }}
                maw={ASIDE_WIDTH - 137}
                title={item.name}
                textWrap="nowrap"
              >
                {item.name}
              </Text>

              <ThemeIcon color={theme.colors.lime[7]}>
                <Text fw={700} fz={theme.fontSizes.sm}>
                  {item.bets.reduce((prev, curr) => prev + (curr.value ?? 0), 0)}
                </Text>
              </ThemeIcon>

              <ActionIcon
                aria-label="Удалить"
                color={theme.colors.red[9]}
                onClick={() => removeLotHandler(item.id)}
              >
                <TrashIcon />
              </ActionIcon>
            </Group>
          ))}
        </Stack>
      </ScrollAreaAutosize>
    </>
  );
}

export default LotsAside;
