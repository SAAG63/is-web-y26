import { FC } from 'react';
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
  NavIdProps,
} from '@vkontakte/vkui';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';


export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}


const open_story = async () => {
    await bridge.send('VKWebAppShowStoryBox', {
      background_type: 'image',
      url : "https://picsum.photos/200/300",
      attachment: {
        text: 'book',
        type: 'photo',
        owner_id: 743784474,
        id: 12345678
      }}).then((data) => {
      if (data.result) {
        // Редактор историй открыт
        console.log(data);
      }})
        .catch((error) => {
          // Ошибка
          console.log(error);
        })
}

export const Home: FC<HomeProps> = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      {fetchedUser && (
        <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
          <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button onClick={open_story}>Открыть Истории</Button>
        </Div>
      </Group>
    </Panel>
  );
};
