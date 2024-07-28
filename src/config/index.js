const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
  development: {
    baseApi: '/api',
    mockApi: '',
  },
  test: {
    baseApi: '//test.future.com/api',
    mockApi: '',
  },
  prod: {
    baseApi: '//future.com/api',
    mockApi: '',
  },
}

export default {
  ...EnvConfig[env],
  //mock
  mock: false,
}
