/** Format Response data from rest api
 * @property status: string (for status code)
 * @property message: string (for description from rest api)
 * @property result: T[] (data from rest api)
 */
export interface ResponseDTO<T> {
  status: string;
  message: string;
  result: T;
}
