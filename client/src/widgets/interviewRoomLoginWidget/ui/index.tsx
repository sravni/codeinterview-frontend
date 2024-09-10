import { useCallback } from 'react';
import { Layout, Card } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import { UserModel } from '../../../entities/user';
import { InterviewRoomLoginForm, Values } from '../../../features/interviewRoomLoginForm';

import styles from './styles.module.css';

export type InterviewRoomLoginWidgetProps = {
    onLogin: (user: UserModel) => void;
}

export const InterviewRoomLoginWidget = (props: InterviewRoomLoginWidgetProps) => {
    const { onLogin } = props;
    const handleSubmit = useCallback((values: Values) => {
        const { displayName } = values;
        const user = new UserModel({
            id: uuidv4(),
            displayName,
        });

        onLogin(user);
    }, [onLogin]);

    return (
        <Layout className={styles.layout}>
            <Card title="Вход" style={{ width: 300 }}>
                <InterviewRoomLoginForm onSubmit={handleSubmit} />
            </Card>
        </Layout>
    )
}