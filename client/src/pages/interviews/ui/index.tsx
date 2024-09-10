import { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Flex, Layout } from 'antd'

import { useQueryClient } from '@tanstack/react-query';

import { generateInterviewsCommonRequestKey } from '../../../entities/interview';
import { InterviewsTableWithFilters } from '../../../widgets/interviewsTableWithFilters';
import { CreateInterview } from '../../../widgets/createInterview';
import { Logo } from '../../../shared/ui/Logo';
import { TopMenu } from '../../../shared/ui/TopMenu';

import styles from './styles.module.css';
import { useUser, UserAvatarWithName } from '../../../entities/user';

function Interviews() {
  const queryClient = useQueryClient();
  const handleInterviewCreateSuccess = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: generateInterviewsCommonRequestKey()
    })
  }, [queryClient]);
  const [user] = useUser();

  return (
    <>
      <Helmet>
        <title>Список интервью</title>
      </Helmet>
      <Layout className={styles.layout}>
        <Layout.Header className={styles.header}>
          <Flex gap="middle" align="center">
            <Logo />
            <TopMenu />
          </Flex>
          <Flex gap="middle" align="center">
            <CreateInterview onSuccess={handleInterviewCreateSuccess} />
            { user ? <UserAvatarWithName user={user} /> : null }
          </Flex>
        </Layout.Header>
        <Layout.Content className={styles.content}>
          <InterviewsTableWithFilters/>
        </Layout.Content>
      </Layout>
    </>
  );
}

export default Interviews;