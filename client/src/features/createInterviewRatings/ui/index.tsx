import { Popover, Rate, RateProps, Typography } from "antd";
import { useCallback, useMemo } from "react";
import cn from "classnames";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { InterviewApi } from "../../../entities/interview";
import { CreateInterviewRatingsForm } from "../../createInterviewRatingsForm";
import { REQUEST_KEY } from "../consts";

import styles from "./styles.module.css";

export type CreateInterviewRatingsProps = RateProps & {
    id: string;
}

export const CreateInterviewRatings = (props: CreateInterviewRatingsProps) => {
    const { id, className, ...rest } = props;

    const queryClient = useQueryClient();

    const { data: ratings = [], error } = useQuery({
        queryKey: [REQUEST_KEY, id],
        queryFn: () => InterviewApi.getInterviewRatings(id)
    });

    const handleRatingsSuccess = useCallback(() => {        
        queryClient.invalidateQueries({
            queryKey: [REQUEST_KEY, id]
        });
    }, [id, queryClient]);


    const rateAverageForAuthor = useMemo(() => {
        if (!ratings || ratings.length === 0) {
            return 0
        }

        return ratings.reduce((acc, { rate }) => acc + rate, 0) / ratings.length;
    }, [ratings]);

    if (error)
        <Typography.Text type="danger">Ошибка получения рейтингов</Typography.Text>;

    return (
        <Popover content={<CreateInterviewRatingsForm interviewId={id} ratings={ratings} onSuccess={handleRatingsSuccess} />} trigger="click">
            <Rate disabled allowHalf value={rateAverageForAuthor} className={cn(className, styles.rating)} {...rest} />
        </Popover>
    )
}