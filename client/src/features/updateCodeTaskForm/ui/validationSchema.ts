import * as Yup from "yup";

import {
   FIELD_NAME
  } from "./consts";
import { LANGUAGES } from "../../../shared/consts/languages";

export const validationSchema = Yup.object().shape({
  [FIELD_NAME.TITLE]: Yup.string().trim().required('Поле обязательно для заполнения'),
  [FIELD_NAME.LANGUAGE]: Yup.mixed<LANGUAGES>().oneOf(Object.values(LANGUAGES)).defined('ПОле обязательно для заполнения'),
  [FIELD_NAME.CODE]: Yup.string().trim().required('Поле обязательно для заполнения'),
  [FIELD_NAME.ANSWER]: Yup.string().trim(),
});