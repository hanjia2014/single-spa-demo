import http from './user.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('should fetch users', () => {
  const users = [{ name: 'Bob' }];
  const resp = { data: users };
  mockedAxios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return http.get('').then((response: any) => expect(response).toEqual({ data: users }));
});