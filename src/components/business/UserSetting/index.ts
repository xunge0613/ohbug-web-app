import { dynamic } from 'umi'

export default dynamic({
  async loader() {
    const { default: UserSetting } = await import(
      /* webpackChunkName: "UserSetting" */ './UserSetting'
    )
    return UserSetting
  },
})
