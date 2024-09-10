import { useCallback } from 'react';
import { Layout, Result, Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { UserModel, useUser } from '../../../entities/user';

import { generateInterviewDetailsRequestKey, InterviewModel } from '../../../entities/interview';
import { ForbiddenError, NetworkError, NotFoundError } from '../../../shared/lib/errors/network';
import { InterviewRoomLoginWidget } from '../../../widgets/interviewRoomLoginWidget/ui';

import { InterviewRoomApi } from '../api';

import { InterviewRoom } from './view';
import styles from './styles.module.css';


export function InterviewRoomController() {
    const { id: interviewId = 'wrongId' } = useParams<'id'>();
    const [user, setUser] = useUser();
    const handleInterviewRoomLogin = useCallback((user: UserModel) => { setUser(user) }, [setUser]);
    
    const { data: interview, isLoading, error } = useQuery({
        queryKey: generateInterviewDetailsRequestKey(interviewId),
        queryFn: () => InterviewRoomApi.getInterviewForRoom(interviewId),
        staleTime: 0,
    });
  
    if (isLoading) return (
        <>
            <Helmet>
                <title>Загрузка интервью</title>
            </Helmet>
            <Layout className={styles.layout}><div className={styles.loaderWrapper}><Spin size="large" /></div></Layout>
        </>
    );
  
    if (error) {
        if (error instanceof ForbiddenError)
            return <Navigate to="/forbidden" />;

        if (error instanceof NotFoundError)
            return <Navigate to="/404" />;

        if (error instanceof NetworkError)
            return (
                <>
                    <Helmet>
                        <title>Ошибка</title>
                    </Helmet>
                    <Layout className={styles.layout}><Result status={500} title={500} subTitle='Что-то пошло не так. Попробуйте позже' /></Layout>
                </>
            );
    }

    if (!interview) {
        return <Navigate to="/404" />;
    }

    return (
        <>
            <Helmet>
                <title>{ interview instanceof InterviewModel ? `Интервью - ${interview.title} - ${interview.intervieweeName}` : `Интервью Сравни.ру` }</title>
            </Helmet>
            {
                user
                    ? <InterviewRoom interview={interview} />
                    : <InterviewRoomLoginWidget onLogin={handleInterviewRoomLogin} />
            }            
        </>
    )
}

