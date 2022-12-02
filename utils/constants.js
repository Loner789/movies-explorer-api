const BAD_REQUEST_MESSAGE = 'Переданы некорректные данные';
const FORBIDDEN_MESSAGE = 'Недостаточно прав для удаления фильма';
const NOT_FOUND_MESSAGE = 'Объект с указанным _id не найден';
const CONFLICT_MESSAGE = 'Пользователь с таким email уже существует';
const UNAUTHORIZED_MESSAGE = 'Необходима авторизация';
const INTERNAL_ERROR_MESSAGE = 'На сервере произошла ошибка';
const LOGIN_ERROR_MESSAGE = 'Передан неверный email или пароль';
const WRONG_PATH_MESSAGE = 'Запрашиваемый ресурс не найден';
const WRONG_EMAIL_MESSAGE = 'Некорректный email';
const WRONG_URL_MESSAGE = 'Некорректный url-адрес';
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  BAD_REQUEST_MESSAGE,
  FORBIDDEN_MESSAGE,
  NOT_FOUND_MESSAGE,
  CONFLICT_MESSAGE,
  UNAUTHORIZED_MESSAGE,
  INTERNAL_ERROR_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  WRONG_PATH_MESSAGE,
  WRONG_EMAIL_MESSAGE,
  WRONG_URL_MESSAGE,
  DEFAULT_ALLOWED_METHODS,
};
