import { useMemo } from "react";
import classNames from "classnames";
import { Col, Popover, Rate, Row, Typography } from "antd";

import { useIsMobile } from "../../../../shared/lib/hooks/useDevice"
import { RatingAverageModel } from "../../model/ratingAverage";
import { RATING_TYPE } from "../../consts";

import styles from "./styles.module.css";

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

export type InterviewRatingAverageProps = React.HTMLAttributes<HTMLDivElement> & {
    ratingAverage: RatingAverageModel;
}

export const InterviewRatingAverage = (props: InterviewRatingAverageProps) => {
    const { ratingAverage, className, children, ...rest } = props;
    const isMobile = useIsMobile();
    const { summary, details } = ratingAverage;

    const ratesList = useMemo(() => (
        <div className={styles.ratingsList}>
            {
                Object.entries(RATING_VIEW).map(([type, label]) => { 
                    const value = details[type as RATING_TYPE] || 0;

                    return (
                        <Row key={type} align="middle" justify="space-between">
                            <Col><Typography.Text style={{ fontSize: '12px' }}>{label}</Typography.Text></Col>
                            <Col><Rate style={{ fontSize: '14px' }} disabled allowHalf value={value}/></Col>
                        </Row>
                    )
                })
            }
        </div>
    ), [details])

    const view = useMemo(() => {
        if (summary > 0) {
            return (
                <Popover content={ratesList}>
                    <Rate style={{ fontSize: '14px' }} disabled allowHalf value={summary} />
                    {children ? <span className={styles.children}>{children}</span> : null}
                </Popover>
            )
        }

        return (
            <>
                <Rate style={{ fontSize: '14px' }} disabled allowHalf value={summary} />
                {children ? <span className={styles.children}>{children}</span> : null}
            </>
        )
    }, [children, summary, ratesList]);
    
    return (
        <div className={classNames(styles.ratingAverage, className)} title={ratingAverage.summary.toString()} {...rest}>
            {
                isMobile
                    ? ratingAverage.summary
                    : view
            }
        </div>
    )
}