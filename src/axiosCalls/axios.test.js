import axios from 'axios';

import { getAxios } from './axiosCalls';

jest.mock('axios');

describe('getAxios', () => {
  it('fetches successfully data from an API', async () => {
    const data = {
      system_name: 'Name 1',
      type: 'MAC',
      hdd_capacity: 100,
    };
    axios.get.mockResolvedValueOnce(data);

    const result = await getAxios();
    expect(result).toEqual(data.data);
    expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/devices`);
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
    await expect(getAxios()).rejects.toThrow(errorMessage);
  });
});
