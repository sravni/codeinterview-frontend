import { useEffect } from "react";
import { Avatar, Spin, notification } from "antd";
import { useQuery } from "@tanstack/react-query";

import { InterviewApi, InterviewRatingAverage, InterviewRatingAverageProps } from "../../../entities/interview";

import { UserAvatar } from "../../../features/userAvatar";

import { REQUEST_KEY } from "../consts";

const DEFAULT_DATA: InterviewRatingAverageProps['ratingAverage'] = {
    authors: [],
    summary: 0,
    details: {}
};

export type InterviewRatingAverageWithUsersProps = Omit<InterviewRatingAverageProps, 'ratingAverage'> & {
    interviewId: string;
}
export const InterviewRatingAverageWithUsers = (props: InterviewRatingAverageWithUsersProps) => { 
    const { interviewId, ...rest } = props;

    const { isLoading, data = DEFAULT_DATA, error } = useQuery({
        queryKey: [REQUEST_KEY, interviewId],
        queryFn: () => InterviewApi.getInterviewRatingAverage(interviewId)
    });

    useEffect(() => { 
        if (error) {
            notification.error({
                message: `Ошибка запроса рейтинга для интервью с id ='${interviewId}'`,
                description: <>Для подробной информации смотри панель разработчика</>
            });
        }
    }, [error, interviewId])
    
    if (isLoading) {
        return (
            <Spin/>
        )
    }

    return (
        <InterviewRatingAverage {...rest} ratingAverage={data}>
            <Avatar.Group>
                {
                    data.authors.map((id) => (
                        <UserAvatar key={id} userId={id} size={20} />
                    ))
                }
            </Avatar.Group>
        </InterviewRatingAverage>
    )
}