import * as Yup from "yup";

import {
   FIELD_NAME
  } from "./consts";
import { LANGUAGES } from "../../../shared/consts/languages";

export const validationSchema = Yup.object().shape({
    [FIELD_NAME.TITLE]: Yup.string().trim().required('Поле обязательно'),
    [FIELD_NAME.LANGUAGE]: Yup.mixed<LANGUAGES>().oneOf(Object.values(LANGUAGES)).defined('Поле обязательно'),
    [FIELD_NAME.CODE]: Yup.string().trim().required('Поле обязательно'),
    [FIELD_NAME.ANSWER]: Yup.string().trim(),    
});