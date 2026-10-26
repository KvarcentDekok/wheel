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

type Props = {
  lots: Lot[];
  setLots: React.Dispatch<React.SetStateAction<Lot[]>>;
};

function LotsAside({ lots, setLots }: Props) {
  const [newLot, setNewLot] = useState("");
  const theme = useMantineTheme();

  const newLotSubmitHandler = (evt: React.SubmitEvent<HTMLDivElement>) => {
    evt.preventDefault();

    if (newLot) {
      setLots((prev) => [...prev, { name: newLot, id: uuid() }]);
      setNewLot("");
    }
  };

  const removeLotHandler = (id: string) => {
    setLots((prev) => prev.filter((item) => item.id !== id));
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
          gap="xs"
          pr={6}
        >
          {lots.map((item, index) => (
            <Group key={index} gap="xs" align="end">
              <ThemeIcon color={theme.colors.cyan[7]}>
                <Text fw={700} fz={theme.fontSizes.sm}>
                  {index + 1}
                </Text>
              </ThemeIcon>

              <Text fw={500} flex={1}>
                {item.name}
              </Text>

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
