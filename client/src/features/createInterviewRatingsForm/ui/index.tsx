import { useCallback, useEffect, useMemo, useState } from "react";
import { Col, notification, Rate, Row } from "antd";
import { useMutation } from "@tanstack/react-query";

import { RATING_TYPE } from "../../../entities/interview/consts";
import { InterviewApi, RatingModel } from "../../../entities/interview";
import type { CreateInterviewRatingParams, UpdateInterviewRatingParams } from "../../../entities/interview";

// TODO: Заменить на i18n 
const RATING_VIEW = {
    [RATING_TYPE.ALGORITHMS]: "Алгоритмы",
    [RATING_TYPE.BASICKNOWLEDGE]: "Базовые знания языка",
    [RATING_TYPE.CODEQUALITY]: "Качество кода",
    [RATING_TYPE.COMMUNICATION]: "Общение",
    [RATING_TYPE.DECOMPOSE]: "Декомпозиция задач",
    [RATING_TYPE.DESIGN]: "Проектирование",
    [RATING_TYPE.REASONING]: "Рассуждение",
};

type UpdateInterviewRatingWithRatingIdParams = UpdateInterviewRatingParams & { ratingId: string };
type DeleteInterviewRatingWithRatingIdParams = { ratingId: string };

export type CreateInterviewRatingsFormProps = React.HTMLAttributes<HTMLDivElement> & {
    interviewId: string;
    ratings: RatingModel[];
    onSuccess: (rating: RatingModel | void) => void;
};

export const CreateInterviewRatingsForm = (props: CreateInterviewRatingsFormProps) => {
    const { ratings, onSuccess, interviewId, ...rest } = props;

    const [innerRatings, setInnerRatings] = useState(ratings);

    const {
        isPending: isCreateInterviewRatingPending,
        error: createInterviewRatingError,
        mutate: createInterviewRating,
    } = useMutation({
        mutationFn: (params: CreateInterviewRatingParams) => InterviewApi.createInterviewRating(interviewId, params),
        onSuccess,
    });

    const {
        isPending: isUpdateInterviewRatingPending,
        error: updateInterviewRatingError,
        mutate: updateInterviewRating,
    } = useMutation<RatingModel, Error, UpdateInterviewRatingWithRatingIdParams>({
        mutationFn: (params) => {
            const { ratingId, ...rest } = params;
            return InterviewApi.updateInterviewRating(interviewId, ratingId, rest)
        },
        onSuccess,
    });

    const {
        isPending: isDeleteInterviewRatingPending,
        error: removeInterviewRatingError,
        mutate: removeInterviewRating,
    } = useMutation<void, Error, DeleteInterviewRatingWithRatingIdParams>({
        mutationFn: (params) => {
            const { ratingId } = params;
            return InterviewApi.removeInterviewRating(interviewId, ratingId)
        },
        onSuccess,
    });
    
    const ratingsAsObject = useMemo(() => {
        return innerRatings.reduce((acc, { type, rate }) => {
            acc[type] = rate

            return acc
        }, {} as Record<RATING_TYPE, number>);
    }, [innerRatings]);

    const handleRateChange = useCallback((type: RATING_TYPE) => (rate: number) => { 
        const rating = innerRatings.find(rating => rating.type === type);

        const isCreateRating = typeof rating === 'undefined';
        const isUpdateRating = rating instanceof RatingModel;
        const isDeleteRating = rating instanceof RatingModel && rate === 0;

        if (isDeleteRating) {
            setInnerRatings((state) => state.filter(item => item.id !== rating.id))
            removeInterviewRating({ ratingId: rating.id })
            return;
        };

        if (isUpdateRating) {
            setInnerRatings((state) => state.filter(item => item.id !== rating.id).concat([{ ...rating, rate }]))
            updateInterviewRating({ ratingId: rating.id, rate})
            return;
        };
        
        if (isCreateRating) {
            createInterviewRating({ type, rate });
            return;
        }
    }, [innerRatings, removeInterviewRating, updateInterviewRating, createInterviewRating]);

    useEffect(() => { 
        if (createInterviewRatingError) {
            notification.error({
                message: `Ошибка создания рейтинга для интервью с id ='${interviewId}'`,
                description: <>Для подробной информации смотри панель разработчика</>
            })
        }
    }, [createInterviewRatingError, interviewId]);

    useEffect(() => { 
        if (updateInterviewRatingError) {
            notification.error({
                message: `Ошибка обновления рейтинга для интервью с id ='${interviewId}'`,
                description: <>Для подробной информации смотри панель разработчика</>
            })
        }
    }, [updateInterviewRatingError, interviewId]);

    useEffect(() => { 
        if (removeInterviewRatingError) {
            notification.error({
                message: `Ошибка удаления рейтинга для интервью с id ='${interviewId}'`,
                description: <>Для подробной информации смотри панель разработчика</>
            })
        }
    }, [removeInterviewRatingError, interviewId]);

    useEffect(() => { 
        setInnerRatings(ratings)
    }, [ratings]);

    return (
        <div {...rest}>
            {
                Object.entries(RATING_VIEW).map(([type, label]) => (
                    <Row key={type} align="middle" justify="space-between" style={{ marginBottom: '8px'}} gutter={[16, 0]}>
                        <Col>{label}</Col>
                        <Col>
                            <Rate
                                allowHalf
                                disabled={isCreateInterviewRatingPending || isUpdateInterviewRatingPending || isDeleteInterviewRatingPending}
                                onChange={handleRateChange(type as RATING_TYPE)}
                                value={ratingsAsObject[type as RATING_TYPE]}
                            />
                        </Col>
                    </Row>
                ), [ratings])
            }            
        </div>
    )
}