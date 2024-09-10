import { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Flex, Layout } from 'antd'
import { useQueryClient } from '@tanstack/react-query';

import { Logo } from '../../../shared/ui/Logo';
import { generateCodeTasksCommonRequestKey } from '../../../entities/codeTask';
import { CodeTasksTableWithFilters } from '../../../widgets/codeTasksTableWithFilters';
import { CreateCodeTask } from '../../../widgets/createCodeTask';
import { TopMenu } from '../../../shared/ui/TopMenu';
import { UserAvatarWithName, useUser } from '../../../entities/user';

import styles from './styles.module.css';

function CodeTasks() {
  const queryClient = useQueryClient();
  const handleCodeTaskCreateSuccess = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: generateCodeTasksCommonRequestKey()
    })
  }, [queryClient]);
  const [user] = useUser();
  
  return (
    <>
      <Helmet>
        <title>Список заданий</title>
      </Helmet>
      <Layout className={styles.layout}>
        <Layout.Header className={styles.header}>
          <Flex gap="middle" align="center">
              <Logo />
              <TopMenu />
          </Flex>
          
          <Flex gap="middle" align="center">
            <CreateCodeTask onSuccess={handleCodeTaskCreateSuccess} />
            { user ? <UserAvatarWithName user={user} /> : null }
          </Flex>
        </Layout.Header>
        <Layout.Content className={styles.content}>
          <CodeTasksTableWithFilters/>
        </Layout.Content>
      </Layout>
    </>
  );
}

export default CodeTasks;