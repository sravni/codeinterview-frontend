import { Layout, Space } from 'antd';

import { Logo } from '../../../shared/ui/Logo';
import { InterviewModel, InterviewPublicModel } from '../../../entities/interview';

import { InterviewRoomActions } from '../../../widgets/interviewRoomActions/ui';
import { InterviewRoomTerminal } from '../../../widgets/interviewRoomTerminal/ui';
import { InterviewRoomEditor } from '../../../widgets/interviewRoomEditor/ui';
import { InterviewRoomUsersList } from '../../../widgets/interviewRoomUsersList/ui';

import { InterviewRoomProvider } from '../../../features/interviewRoomProvider';
import { InviteToInterviewButton } from '../../../features/inviteToInterviewButton/ui';
import { AdminSection } from '../../../features/adminSection';

import styles from './styles.module.css';

const { Header, Footer, Content } = Layout;

export type InterviewRoomProps = {
    interview: InterviewModel | InterviewPublicModel
}

export function InterviewRoom(props: InterviewRoomProps) {
    const { interview } = props;
    const { id, language } = interview;

    return (
        <InterviewRoomProvider interview={interview} users={[]} messages={[]}>
            <Layout className={styles.layout}>
                <Header className={styles.header}>
                    <Logo />
                    <Space>
                        <AdminSection>
                            <InviteToInterviewButton interviewId={id} />
                        </AdminSection>
                        <InterviewRoomUsersList className={styles.users} />
                    </Space>
                </Header>
                <Content className={styles.content}>
                    <section className={styles.editor}>
                        <InterviewRoomEditor language={language}/>
                    </section>
                    <section className={styles.results}>
                        <InterviewRoomTerminal/>
                    </section>
                </Content>
                <Footer>
                    <InterviewRoomActions interview={interview}  />
                </Footer>
            </Layout>
        </InterviewRoomProvider>
    );
}