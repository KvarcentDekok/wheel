import { ActionIcon, Group, Stack, TextInput, ThemeIcon, Text, useMantineTheme, Divider } from "@mantine/core";
import { PlusCircleIcon, TrashIcon } from "@phosphor-icons/react";
import type { Member } from "../../types/types";
import { useState } from "react";
import { v4 as uuid } from "uuid";

type Props = {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
};

function Members({ members, setMembers }: Props) {
  const [newMember, setNewMember] = useState("");
  const theme = useMantineTheme();

  const newMemberSubmitHandler = (evt: React.SubmitEvent<HTMLDivElement>) => {
    evt.preventDefault();

    setMembers((prev) => [...prev, { name: newMember, id: uuid() }]);
    setNewMember("");
  };

  const removeMemberHandler = (id: string) => {
    setMembers((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <Group
        align="flex-end"
        gap="xs"
        component="form"
        onSubmit={newMemberSubmitHandler}
      >
        <TextInput
          label="Новый участник"
          value={newMember}
          onChange={(event) => setNewMember(event.currentTarget.value)}
          flex={1}
        />

        <ActionIcon size="input-sm" aria-label="Добавить" type="submit">
          <PlusCircleIcon size={20} />
        </ActionIcon>
      </Group>

      <Divider my="md" />

      <Stack
        bg="var(--mantine-color-body)"
        align="stretch"
        justify="center"
        gap="xs"
      >
        {members.map((item, index) => (
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
              onClick={() => removeMemberHandler(item.id)}
            >
              <TrashIcon />
            </ActionIcon>
          </Group>
        ))}
      </Stack>
    </>
  );
}

export default Members;
